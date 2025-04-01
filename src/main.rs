#![no_std]
#![no_main]

pub mod app;
pub mod handlers;

use app::AppTx;
use defmt::*;
use defmt_rtt as _;
use embassy_executor::Spawner;
use embassy_rp::{
    bind_interrupts,
    gpio::{Level, Output},
    peripherals::{UART0, USB},
    uart::{self, BufferedInterruptHandler, BufferedUart},
    usb,
};
use embassy_sync::{blocking_mutex::raw::ThreadModeRawMutex, mutex::Mutex};
use embassy_time::{Duration, Instant, Ticker};
use embassy_usb::{Config, UsbDevice};
use panic_probe as _;
use postcard_rpc::{
    header::VarSeq,
    sender_fmt,
    server::{Dispatch, Sender, Server},
};
use static_cell::{ConstStaticCell, StaticCell};
use uartbridge_icd::{UartFrame, UartRecvTopic};

bind_interrupts!(pub struct Irqs {
    USBCTRL_IRQ => usb::InterruptHandler<USB>;
    UART0_IRQ => BufferedInterruptHandler<UART0>;
});

fn usb_config(serial: &'static str) -> Config<'static> {
    let mut config = Config::new(0x16c0, 0x27DD);
    config.manufacturer = Some("MimoCAD");
    config.product = Some("MimoFPS");
    config.serial_number = Some(serial);

    // Required for windows compatibility.
    // https://developer.nordicsemi.com/nRF_Connect_SDK/doc/1.9.1/kconfig/CONFIG_CDC_ACM_IAD.html#help
    config.device_class = 0xEF;
    config.device_sub_class = 0x02;
    config.device_protocol = 0x01;
    config.composite_with_iads = true;

    config
}

// Program metadata for `picotool info`.
// This isn't needed, but it's recomended to have these minimal entries.
#[unsafe(link_section = ".bi_entries")]
#[used]
pub static PICOTOOL_ENTRIES: [embassy_rp::binary_info::EntryAddr; 4] = [
    embassy_rp::binary_info::rp_program_name!(c"MimoCAD MimoFPS"),
    embassy_rp::binary_info::rp_program_description!(c"MimoCAD Finger Print Sensor"),
    embassy_rp::binary_info::rp_cargo_version!(),
    embassy_rp::binary_info::rp_program_build_attribute!(),
];

#[embassy_executor::main]
async fn main(spawner: Spawner) {
    // SYSTEM INIT
    info!("Start");
    let p = embassy_rp::init(Default::default());
    // Obtain the RP2350 Serial Number
    let unique_id: u64 = embassy_rp::otp::get_chipid().unwrap();
    static SERIAL_STRING: StaticCell<[u8; 16]> = StaticCell::new();
    let mut ser_buf = [b' '; 16];
    // This is a simple number-to-hex formatting
    unique_id
        .to_be_bytes()
        .iter()
        .zip(ser_buf.chunks_exact_mut(2))
        .for_each(|(b, chs)| {
            let mut b = *b;
            for c in chs {
                *c = match b >> 4 {
                    v @ 0..10 => b'0' + v,
                    v @ 10..16 => b'A' + (v - 10),
                    _ => b'X',
                };
                b <<= 4;
            }
        });
    let ser_buf = SERIAL_STRING.init(ser_buf);
    let ser_buf = core::str::from_utf8(ser_buf.as_slice()).unwrap();

    // UART
    static TX_BUF: ConstStaticCell<[u8; 1024]> = ConstStaticCell::new([0u8; 1024]);
    static RX_BUF: ConstStaticCell<[u8; 1024]> = ConstStaticCell::new([0u8; 1024]);
    static UART_MTX: StaticCell<Mutex<ThreadModeRawMutex, BufferedUart<'static, UART0>>> =
        StaticCell::new();
    let serial = UART_MTX.init_with(|| {
        Mutex::new(BufferedUart::new(
            p.UART0,
            Irqs,
            p.PIN_0,
            p.PIN_1,
            TX_BUF.take(),
            RX_BUF.take(),
            uart::Config::default(),
        ))
    });

    // USB/RPC INIT
    let driver = usb::Driver::new(p.USB, Irqs);
    let pbufs = app::PBUFS.take();
    let config = usb_config(ser_buf);
    let led = Output::new(p.PIN_25, Level::Low);

    let context = app::Context {
        unique_id,
        led,
        serial,
        baudrate: uart::Config::default().baudrate,
    };

    let (device, tx_impl, rx_impl) =
        app::STORAGE.init_poststation(driver, config, pbufs.tx_buf.as_mut_slice());
    let dispatcher = app::MyApp::new(context, spawner.into());
    let vkk = dispatcher.min_key_len();
    let mut server: app::AppServer = Server::new(
        tx_impl,
        rx_impl,
        pbufs.rx_buf.as_mut_slice(),
        dispatcher,
        vkk,
    );
    let sender = server.sender();
    // We need to spawn the USB task so that USB messages are handled by
    // embassy-usb
    spawner.must_spawn(uart_recver(serial, sender.clone()));
    spawner.must_spawn(usb_task(device));
    spawner.must_spawn(logging_task(sender));

    // Begin running!
    loop {
        // If the host disconnects, we'll return an error here.
        // If this happens, just wait until the host reconnects
        let _ = server.run().await;
    }
}

#[embassy_executor::task]
pub async fn uart_recver(
    serial: &'static Mutex<ThreadModeRawMutex, BufferedUart<'static, UART0>>,
    sender: Sender<AppTx>,
) {
    use embedded_io_async::{Read, ReadReady};
    let mut ticker = Ticker::every(Duration::from_millis(10));
    let mut seq_no = 0u16;
    'outer: loop {
        ticker.next().await;
        loop {
            let mut serial = serial.lock().await;
            if serial.read_ready() != Ok(true) {
                continue 'outer;
            }
            let mut buf = [0u8; 128];
            // todo: backup timeout?
            let Ok(used) = serial.read(&mut buf).await else {
                continue 'outer;
            };
            if used == 0 {
                continue 'outer;
            }
            let valid = &buf[..used];
            seq_no = seq_no.wrapping_add(1);
            let _ = sender
                .publish::<UartRecvTopic>(VarSeq::Seq2(seq_no), &UartFrame { data: valid })
                .await;
        }
    }
}

/// This handles the low level USB management
#[embassy_executor::task]
pub async fn usb_task(mut usb: UsbDevice<'static, app::AppDriver>) {
    usb.run().await;
}

/// This task is a "sign of life" logger
#[embassy_executor::task]
pub async fn logging_task(sender: Sender<AppTx>) {
    let mut ticker = Ticker::every(Duration::from_secs(3));
    let start = Instant::now();
    loop {
        ticker.next().await;
        let _ = sender_fmt!(sender, "Uptime: {:?}", start.elapsed()).await;
    }
}
