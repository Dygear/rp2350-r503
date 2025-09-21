// Enums for structured packet interpretation
export const Instruction = {
    None:               0x00, // No instruction
    GenImg:             0x01, // Collect Finger Image
    Img2Tx:             0x02, // To generate character file from image
    Match:              0x03, // Carry out precise matching of two templates;
    Search:             0x04, // Search the finger library
    RegModel:           0x05, // To combine character files and generate template
    Store:              0x06, // To store template;
    LoadChar:           0x07, // to read/load template
    UpChar:             0x08, // to upload template
    DownChar:           0x09, // to download template
    UpImage:            0x0A, // To upload image
    DownImage:          0x0B, // To download image
    DeleteChar:         0x0C, // to delete templates
    Empty:              0x0D, // to empty the library
    SetSysPara:         0x0E, // To set system Parameter
    ReadSysPara:        0x0F, // To read system Parameter
    SetPwd:             0x12, // To set password
    VfyPwd:             0x13, // To verify password
    GetRandomCode:      0x14, // to get randomcode
    SetAdder:           0x15, // To set device address
    ReadInfPage:        0x16, // Read informationpage
    WriteNotepad:       0x18, // to write note pad
    ReadNotepad:        0x19, // To read note pad
    TempleteNum:        0x1D, // To read finger template numbers
    ReadIndexTable:     0x1F, // Read-fingerprint template index table
    GetImageEx:         0x28, // Fingerprint image collectionextension command
    Cancel:             0x30, // Cancel instruction
    AutoEnroll:         0x31, // Automatic registration template
    AutoIdentify:       0x32, // Automatic fingerprint verification
    AuraLedConfig:      0x35, // LED Ring Config
    CheckSensor:        0x36, // Check Sensor
    GetAlgVer:          0x39, // Get the algorithm library version
    GetFwVer:           0x3A, // Get the firmware version
    ReadProdInfo:       0x3C, // Read product information
    SoftRst:            0x3D, // Soft reset
    HandShake:          0x40, // Hand shake
};

export const Identifier = {
    Command:            0x01, // Command Packet
    DataContiune:       0x02, // Data packet shall not appear alone in executing process, must follow command packet or acknowledge packet
    Acknowledge:        0x07, // Acknowledge Command Packet;
    DataEnd:            0x08, // End of Data packet
};

export const Acknowledgement = {
    Complete:           0x00, // Command execution complete
    Error:              0x01, // Error when receiving data package
    FailNoFinger:       0x02, // No finger on the sensor
    FailEnroll:         0x03, // Fail to enroll the finger
    FailDisorderly:     0x06, // Fail to generate character file due to the over-disorderly fingerprint image;
    FailIndistinct:     0x07, // Fail to generate character file due to lackness of character point or over-smallness offingerprint image
    FailNoMatch:        0x08, // Fail finger doesnâ€™t match;
    FailFindMatch:      0x09, // Fail to find the matching finger;
    FailCharCombine:    0x0A, // Fail to combine the character files;
    FailOutsidePage:    0x0B, // Fail addressing PageID is beyond the finger library;
    FailTemplateFind:   0x0C, // Fail when reading template from library or the template is invalid;
    FailTemplateUpload: 0x0D, // Fail when uploading template;
    FailDataPacket:     0x0E, // Fail Module canâ€™t receive the following data packages.
    FailImageUpload:    0x0F, // Fail when uploading image;
    FailTemplateDelete: 0x10, // Fail to delete the template;
    FailLibaryClear:    0x11, // Fail to clear finger library;
    FailPasswordWrong:  0x13, // Fail wrong password!
    FailImagePrimary:   0x15, // Fail to generate the image for the lackness of valid primary image;
    FailWritingFlash:   0x18, // Fail when writing to flash;
    FailNoDefinition:   0x19, // Fail No definition error;
    FailRegisterInvalid:0x1A, // Fail register number invalid;
    FailRegisterConfig: 0x1B, // Fail register configuration incorrect;
    FailNotepadWrong:   0x1C, // Fail wrong notepad page number;
    FailCommPort:       0x1D, // Fail to operate the communication port;
    FailLibaryFull:     0x1F, // Fail fingerprint library is full;
    FailWrongAddress:   0x20, // Fail the address is incorrect;
    FailPasswordProvide:0x21, // Fail password must be verified;
    FailTemplateEmpty:  0x22, // Fail fingerprint template is empty;
    FailLibaryEmpty:    0x24, // Fail fingerprint library is empty;
    FailTimeout:        0x26, // Fail timeout
    FailFingerExist:    0x27, // Fail fingerprints already exist;
    FailHardwareError:  0x29, // Fail sensor hardware error;
    FailUnsupported:    0xFC, // Fail unsupported command;
    FailHardwareError:  0xFD, // Fail hardware error;
    FailExecutionError: 0xFE, // Fail command execution;
};

export const ConfirmationCode = {
    Success:            0x00, // Successfully Set
    Failed:             0x01, // Failed Set
    FailedNoFinger:     0x02, // Failed to Detect Finger
    FailedCollectFinger:0x03, // Failed to Collect Finger
    FailedFeature:      0x07, // Failed to Generate a Feature
    FailedFind:         0x09, // Failed to Find Fingerprint
    FailedMerge:        0x0A, // Failed to Merge Templates
    FailedIDOutOfRange: 0x0B, // Failed The ModelID is Out of Range
    FailedInvalid:      0x0C, // Failed When Reading Template From Library, or The Readout Template is Invalid
    FailedUploading:    0x0D, // Failed When Uploading Template
    FailedDataPacket:   0x0F, // Failed When Receiving The Following Data Packet
    FailedToDelete:     0x10, // Failed to Delete Templates
    FailedToFlash:      0x18, // Failed to Write to Flash
    FailedWrongRegister:0x1A, // Failed Wrong Register Number
    FailedLibaryFull:   0x1F, // Failed Fingerprint Libary is Full
    FailedTemplateEmpty:0x22, // Failed Template is Empty
    FailedLibraryEmpty: 0x24, // Failed Library is Empty
    FailedTimedOut:     0x26, // Failed Timeout
    FailedExists:       0x27, // Failed Fingerprint Already Exists.
};

// Marks this class as the default export for this module.
// Makes is so you can import it directly, like so:
// ```
//     import WebUSBDevice from './WebUSBDevice.js';
//     const device = new WebUSBDevice(0x1EE7);
// ```
// In other JavaScript modules. We also export to Window below.
export default class WebUSBDevice extends EventTarget {
    // Private Function Declarations.
    static #getKeyByValue(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value) || null;
    }

    #handlePacket(data) {
        this.partialBuffer.push(...data);

        const length = (new DataView(new Uint8Array(data).buffer)).getUint16(7, false);
        const fullLength = 9 + length;
        if (this.partialBuffer.length < fullLength)
            return;

        const rawPacket = this.partialBuffer.slice(0, fullLength);
        this.partialBuffer = this.partialBuffer.slice(fullLength);

        const packet = this.parsePacket(rawPacket);
        this.dispatchEvent(new CustomEvent('packet', { detail: packet }));
    }

    async #readWithTimeout(length, timeout) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        try {
            const result = await this.device.transferIn(1, length, { signal: controller.signal });
            clearTimeout(timer);
            return new Uint8Array(result.data.buffer);
        } catch (e) {
            clearTimeout(timer);
            throw e;
        }
    }

    async #readLoop() {
        while (this.keepReading && this.device?.opened) {
            try {
                const raw = await this.#readWithTimeout(64, 100);
                this.#handlePacket(raw);
            } catch (e) {
                if (e.name !== 'AbortError')
                    console.error('Read error:', e);
                await new Promise(r => setTimeout(r, 100));
            }
        }
    }

    async #usbWrite(identifier, instruction, payload) {
        const bytes = [0xEF, 0x01];
        bytes.push(0xFF, 0xFF, 0xFF, 0xFF);
        bytes.push(identifier);
        let checksum = parseInt(identifier);

        const len = 3 + parseInt(payload.length);
        const hi = (len >> 8) & 0xFF;
        const lo = len & 0xFF;
        bytes.push(hi, lo);
        checksum += hi + lo;

        bytes.push(instruction);
        checksum += parseInt(instruction);

        payload.forEach(b => {
            bytes.push(b);
            checksum += parseInt(b);
        });

        bytes.push((checksum >> 8) & 0xFF, checksum & 0xFF);

        const u8Array = new Uint8Array(bytes);
        await this.device.transferOut(this.interfaceNumber, u8Array);
    }

    async #startWriteQueue() {
        while (this.device?.opened) {
            if (!this.writeQueue.length) {
                await new Promise(r => setTimeout(r, 100));
                continue;
            }
            const [id, instr, payload] = this.writeQueue.shift();
            await this.#usbWrite(id, instr, payload).catch(console.error);
        }
    }

    async #connectDevice(usbDevice) {
        this.console.innerHTML = `${usbDevice.manufacturerName} ${usbDevice.productName} - ${usbDevice.serialNumber} Connected`;
        this.button?.classList.remove('btn-success');
        this.button?.classList.add('btn-outline-primary');

        this.device = usbDevice;

        if (!this.device.opened)
            await this.device.open();

        if (!this.device.configuration)
            await this.device.selectConfiguration(1);

        await this.device.claimInterface(this.interfaceNumber);

        this.keepReading = true;
        this.#readLoop();
        this.#startWriteQueue();
        this.dispatchEvent(new Event('connected'));
    }

    async #onUsbConnect(event) {
        if (!this.autoReconnectEnabled)
            return;
        const usbDevice = event.device;
        if (usbDevice.vendorId !== this.vendorId)
            return;
        await this.#connectDevice(usbDevice).catch(console.error);
    }

    /**
    * @param {HTMLElement} buttonElement - Where the user starts interactions with this class.
    * @param {HTMLElement} consoleElement - Where to output user console messages.
    * @param {u16} vendorId - USB VID (Vendor ID)
    * @param {u16} interfaceNumber - Internal interface of USB device for WebUSB traffic.
    */
    constructor(buttonElement, consoleElement, vendorId, interfaceNumber = 1) {
        super();
        this.button = buttonElement;
        this.console = consoleElement;
        this.vendorId = vendorId;
        this.interfaceNumber = interfaceNumber;
        this.device = null;
        this.keepReading = false;
        this.writeQueue = [];
        this.partialBuffer = [];
        this.autoReconnectEnabled = true;
        navigator.usb.addEventListener('connect', this.#onUsbConnect.bind(this));

        // If a device has already been authroized, let's reconnect to that.
        navigator.usb.getDevices({ filters: [{ vendorId: this.vendorId }] }).then(devices => {
            devices.forEach(async (usbDevice) => {
                console.debug(`Product name: ${usbDevice.productName}, serial number ${usbDevice.serialNumber}`);
                await this.#connectDevice(usbDevice).catch(console.error);
            });
        });
    }

    /**
    * START: Internal Functions
    **/

    enableAutoReconnect() {
        this.autoReconnectEnabled = true;
    }

    disableAutoReconnect() {
        this.autoReconnectEnabled = false;
    }

    async connect() {
        const filters = [{ vendorId: this.vendorId }];
        const usbDevice = await navigator.usb.requestDevice({ filters });
        await this.#connectDevice(usbDevice);
    }

    async disconnect() {
        this.keepReading = false;

        if (this.device?.opened)
            await this.device.close();

        this.console.innerHTML = `Device Disconnected`;
        this.button?.classList.remove('btn-outline-primary');
        this.button?.classList.add('btn-success');

        this.device = null;
        this.dispatchEvent(new Event('disconnected'));
    }

    /**
    * @param {[u8]} bytes - Raw bytes.
    * @return {R503Packet} - The R503's Packet
    **/
    parsePacket(bytes) {
        const header = [bytes[0], bytes[1]];
        const address = [bytes[2], bytes[3], bytes[4], bytes[5]];
        const identifier = bytes[6];
        const identifierName = WebUSBDevice.#getKeyByValue(Identifier, identifier);
        const length = ((bytes[7] << 8) | bytes[8]);
        const instruction = bytes[9];
        const instructionName = WebUSBDevice.#getKeyByValue(ConfirmationCode, instruction) ?? WebUSBDevice.#getKeyByValue(Instruction, instruction);
        const payload = bytes.slice(10, 10 + (length - 3));
        const checksum = (bytes[10 + (length - 3)] << 8) | bytes[11 + (length - 3)];

        let ack = null;
        if (identifier === Identifier.Acknowledge && payload.length > 0) {
            const ackCode = payload[0];
            const ackName = WebUSBDevice.#getKeyByValue(Acknowledgement, ackCode);
            ack = { code: ackCode, name: ackName };
        }

        return {
            header,
            address,
            identifier: {
                code: identifier,
                name: identifierName
            },
            length,
            instruction: {
                code: instruction,
                name: instructionName
            },
            payload,
            acknowledgement: ack,
            checksum,
            bytes
        };
    }

    /**
    * @param {u8} Identifier
    * @param {u8} Instruction
    * @param {[u8]} Payload
    * @return void
    **/
    send(identifier, instruction, payload = []) {
        this.writeQueue.push([identifier, instruction, payload]);
    }

    /**
    * STOP: Internal Functions
    **/

    /**
    * Configure the LED ring on the device.
    * @param u8 pattern 1=Breathing,2=Flashing,3=AlwaysOn,4=AlwaysOff,5=FadeUpToOff,6=FadeDownToOn
    * @param u8 speed   0-255 (higher is slower)
    * @param u8 color   1=Red,2=Blue,3=Purple,4=Green,5=Yellow,6=Cyan,7=White
    * @param u8 times   0-255 (0=infinite)
    * @returns {Promise<boolean>} true on success, false on failure
    **/
    async auraLedConfig(ptn, spd, clr, x) {
        console.debug(`Func 0x35 AuraLedConfig(${ptn}, ${spd}, ${clr}, ${x})`);
        this.send(Identifier.Command, Instruction.AuraLedConfig, [ptn, spd, clr, x]);
        return new Promise(resolve => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge && pkt.instruction.code === Instruction.AuraLedConfig) {
                    this.removeEventListener('packet', handler);
                    const success = pkt.acknowledgement?.code === Acknowledgement.Complete;
                    resolve(success);
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Requests and returns a random 32-bit code from the device.
    * @returns {Promise<number>} random code as unsigned 32-bit integer
    * @throws {Error} on failure
    **/
    async getRandomCode() {
        console.debug("Func 0x14 GetRandomCode()");
        this.send(Identifier.Command, Instruction.GetRandomCode, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    this.removeEventListener('packet', handler);
                    resolve((new DataView(new Uint8Array(pkt.payload).buffer).getUint32(0, false)))
                } else {
                    this.removeEventListener('packet', handler);
                    reject(new Error(`Unexpected Acknowledgement Code: ${pkt.acknowledgement?.code}`));
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Auto-enroll fingerprints
    * @param {number} (Should be u16) modelID 0x00 (0) - 0xC7 (199) (This really should be u16 bytes? But is not?!)
    * @param {bool} coverID - Allow Cover ID number?
    * @param {bool} duplicateFingers - Allow Duplicate Fingerprints?
    * @param {bool} criticalSteps - Return a packet on each step of the process.
    * @param {bool} fingerLeave - Require the finger to leave the sensor for each capture.
    * @returns {Promise<number>} returns the u16 of where the finger print was stored.
    * @throws {Error} on failure
    **/
    async autoEnroll(modelID, coverID, duplicateFingers, criticalSteps, fingerLeave) {
        console.debug(`autoEnroll(${modelID}, ${coverID}, ${duplicateFingers}, ${criticalSteps}, ${fingerLeave})`);
        this.send(Identifier.Command, Instruction.AutoEnroll, [
            modelID / 256,
            modelID % 256,
            coverID,
            duplicateFingers,
            criticalSteps,
            fingerLeave
        ]);
        return new Promise((resolve, reject) => {
            let attempts = 0;

            const steps = {
                0x00: 'Place Finger on Sensor (1st Time)',
                0x01: 'Generate Feature for the first time.',
                0x02: 'Place Finger on Sensor (2nd Time)',
                0x03: 'Generate Feature for the second time.',
                0x04: 'Place Finger on Sensor (3rd Time)',
                0x05: 'Generate Feature for the third time.',
                0x06: 'Place Finger on Sensor (4th Time)',
                0x07: 'Generate Feature for the fourth time.',
                0x08: 'Place Finger on Sensor (5th Time)',
                0x09: 'Generate Feature for the fifth time.',
                0x0A: 'Place Finger on Sensor (6th Time)',
                0x0B: 'Generate Feature for the sixth time.',
                0x0C: 'Repeat fingerprint check.',
                0x0D: 'Merge features.',
                0x0E: 'Store template.',
                0x0F: 'Stored Successfully.',
            };

            const handler = event => {
                const pkt = event.detail;
                attempts++;
                this.console.innerHTML = `Step ${attempts} / 15 - ${steps[attempts]}`;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    // ConfirmationCode.FailedExists = 0x27; Auto-Enroll Failed Fingerprint Already Exists.
                    if (pkt.instruction.code === ConfirmationCode.FailedExists) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed Fingerprint Already Exists'));
                    }
                    // ConfirmationCode.FailedTimedOut = 0x26; Auto-Enroll Failed Timeout.
                    if (pkt.instruction.code === ConfirmationCode.FailedTimedOut) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed Timeout'));
                    }
                    // ConfirmationCode.FailedTemplateEmpty = 0x22; Auto-Enroll Failed Template is Empty.
                    if (pkt.instruction.code === ConfirmationCode.FailedTemplateEmpty) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed Template is Empty'));
                    }
                    // ConfirmationCode.FailedLibaryFull = 0x1F; Auto-Enroll Failed Fingerprint Libary is Full.
                    if (pkt.instruction.code === ConfirmationCode.FailedLibaryFull) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed Fingerprint Libary is Full'));
                    }
                    // ConfirmationCode.FailedIDOutOfRange = 0x0B; Auto-Enroll Failed The ID is Out of Range.
                    if (pkt.instruction.code === ConfirmationCode.FailedIDOutOfRange) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed The ID is Out of Range'));
                    }
                    // ConfirmationCode.FailedMerge = 0x0A; Auto-Enroll Failed to Merge Templates.
                    if (pkt.instruction.code === ConfirmationCode.FailedMerge) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed to Merge Templates'));
                    }
                    // ConfirmationCode.FailedFeature = 0x07; Auto-Enroll Failed to Generate a Feature
                    if (pkt.instruction.code === ConfirmationCode.FailedMerge) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed to Generate a Feature'));
                    }
                    // ConfirmationCode.Failed = 0x01; Auto-Enroll Failed Set
                    if (pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Enroll Failed Set'));
                    }

                    // ConfirmationCode.Success = 0x00; Auto-Enroll Successfully Set
                    // Payload[0] is the step in the capture process. 0x0F is complete.
                    if (pkt.instruction.code === ConfirmationCode.Success && pkt.payload[0] == 0x0F) {
                        this.removeEventListener('packet', handler);
                        resolve((new DataView(new Uint8Array(pkt.payload).buffer)).getUint16(1, false));
                    }
                }
                if (attempts > 16) {
                    this.removeEventListener('packet', handler);
                    reject(new Error('Auto-Enroll Over Attemp Count'));
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Auto-Identify fingerprint
    * @param {enum} securityLevel  - 1 = Lowest, 5 = Highest / Most Restrictive
    * @param {u16} posStart        - Start Position
    * @param {u16} posEnd          - End Position
    * @param {bool} keyStep        - Emit Key Steps
    * @param {u8} attempts          - Number of attempts to find the correct finger 0=Inf (Don't use 0)
    * @return {Promise<(number, number)>} - Model ID and Match Score
    * @throws {Error} on failure
    **/
    async autoIdentify(securityLevel, posStart, posEnd, keyStep, attempts) {
        console.debug(`autoIdentify(${securityLevel}, ${posStart}, ${posEnd}, ${keyStep}, ${attempts})`);
        this.send(Identifier.Command, Instruction.AutoIdentify, [
            securityLevel,
            posStart / 256,
            posStart % 256,
            posEnd / 256,
            posEnd % 256,
            keyStep,
            attempts
        ]);
        return new Promise((resolve, reject) => {
            let attempt = 0;
            const handler = event => {
                const pkt = event.detail;
                this.console.innerHTML = `Attempt ${attempt + 1} / ${attempts}`;
                console.debug(`autoIdentify Loop: ${attempt + 1} / ${attempts} { PacketIdentifier: ${pkt.identifier.code}, ConfirmationCode: ${pkt.instruction.code}, Step: ${pkt.payload[0]} };`);

                // ConfirmationCode.FailedTimedOut = 0x26; Auto-Identify Failed Timeout.
                if (pkt.instruction.code === ConfirmationCode.FailedTimedOut) {
                    this.removeEventListener('packet', handler);
                    reject(new Error('Auto-Identify Failed Timeout'));
                }
                // ConfirmationCode.FailedLibraryEmpty = 0x24; Auto-Identify Failed Library is Empty.
                if (pkt.instruction.code === ConfirmationCode.FailedLibraryEmpty) {
                    this.removeEventListener('packet', handler);
                    reject(new Error('Auto-Identify Failed Library is Empty'));
                }
                // ConfirmationCode.FailedTemplateEmpty = 0x22; Auto-Identify Failed Template is Empty.
                if (pkt.instruction.code === ConfirmationCode.FailedTemplateEmpty) {
                    this.removeEventListener('packet', handler);
                    reject(new Error('Auto-Identify Failed Template is Empty'));
                }
                // ConfirmationCode.FailedIDOutOfRange = 0x0B; Auto-Identify Failed The ID is Out of Range
                if (pkt.instruction.code === ConfirmationCode.FailedIDOutOfRange) {
                    this.removeEventListener('packet', handler);
                    reject(new Error('Auto-Identify Failed The ID is Out of Range'));
                }

                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                    // Third step is the final step, so we should take action on that one.
                    && pkt.payload[0] === 0x03
                ) {
                    attempt++;

                    // ConfirmationCode.FailedFind = 0x09; Auto-Identify Failed to Find Fingerprint.
                    if (attempt == attempts && pkt.instruction.code === ConfirmationCode.FailedFind) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Identify Failed to Find Fingerprint'));
                    }
                    // ConfirmationCode.Failed = 0x01; Auto-Identify Failed Set
                    if (attempt == attempts && pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Auto-Identify Failed Set'));
                    }

                    // ConfirmationCode.Success = 0x00; Auto-Identify Successfully Set
                    // Payload[0] is the step in the capture process. 0x03 is complete.
                    if (pkt.instruction.code === ConfirmationCode.Success && pkt.payload[0] == 0x03) {
                        this.removeEventListener('packet', handler);
                        const dataView = new DataView(Uint8Array.from(pkt.payload).buffer);
                        const modelId = dataView.getUint16(1, false);
                        const matchScore = ((dataView.getUint16(3, false) / 256) * 100).toFixed(2);
                        resolve([modelId, matchScore]);
                    }
                }
                if (attempt > attempts) {
                    this.removeEventListener('packet', handler);
                    reject(new Error('Auto-Enroll Over Attemp Count'));
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Reads the product information from the Grow Fingerprint Sensor.
    * @returns {Promise<ProdInfoObj>}
    **/
    async readProductInformation() {
        console.error("This function does not work.");
        return reject('Does Not Work');
        this.send(Identifier.Command, Instruction.ReadProdInfo, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    this.removeEventListener('packet', handler);
                    const dataView= new DataView(Uint8Array.from(pkt.payload).buffer);
                    const type    = pkt.payload.slice( 0, 15);      // 16 Bytes (Module type, ASCII)
                    const batch   = pkt.payload.slice(16, 20);      //  4 Bytes (Module batch number, ASCII)
                    const serial  = pkt.payload.slice(21, 28);      //  8 Bytes (Module serial number, ASCII)
                    const major   = pkt.payload[29];                //  1 Bytes (Hardware Version Minor)
                    const minor   = pkt.payload[30];                //  1 Bytes (Hardware Version Minor)
                    const model   = pkt.payload.slice(31, 38);      //  8 Bytes (Sensor type, ASCII)
                    const width   = dataView.getUint16(39, false);   //  2 Bytes (Sensor image width)
                    const height  = dataView.getUint16(41, false);   //  2 Bytes (Sensor image height)
                    const tp_size = dataView.getUint16(43, false);   //  2 Bytes (Template size)
                    const db_size = dataView.getUint16(45, false);   //  2 Bytes (Fingerprint database size)
                    resolve({
                        moduleType: type,
                        moduleBatch: batch,
                        moduleSerial: serial,
                        hwVersionMajor: major,
                        hwVersionMinor: minor,
                        sensorWidth: width,
                        sensorHeight: height,
                        sizeTemplate: tp_size,
                        sizeDatabase: db_size
                    });
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Get the algorithm library version
    * @return {Promise<String>} The Version String
    **/
    async getAlgorithmVersion() {
        console.debug(`Func 0x39 GetAlgVer()`);
        this.send(Identifier.Command, Instruction.GetAlgVer, []);
        return new Promise(resolve => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge && pkt.instruction.code === Acknowledgement.Complete) {
                    this.removeEventListener('packet', handler);
                    resolve((new TextDecoder()).decode(new Uint8Array(pkt.payload).buffer));
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Get the algorithm library version
    * @return {Promise<String>} The Libary Version String
    **/
    async getFirmwareVersion() {
        console.debug(`Func 0x3A GetFwVer()`);
        this.send(Identifier.Command, Instruction.GetFwVer, []);
        return new Promise(resolve => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge && pkt.instruction.code === Acknowledgement.Complete) {
                    this.removeEventListener('packet', handler);
                    resolve((new TextDecoder()).decode(new Uint8Array(pkt.payload).buffer));
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Clear fingerprint library
    * @returns {Promise<bool>} returns true on success.
    **/
    async emptySensor() {
        console.debug(`Func 0x0D Empty()`);
        this.send(Identifier.Command, Instruction.Empty, []);
        return new Promise(resolve => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    this.removeEventListener('packet', handler);
                    resolve(true);
                }
            };
            this.addEventListener('packet', handler);
        });
    }

    /**
    * Read fingerprint index table
    * @returns {Promise<[u8;32]>} - 32 Bytes, Each Byte is 8 Bools.
    **/
    async readIndexTable(indexPage) {
        console.debug(`Func 0x1F readIndexTable(${indexPage})`);
        this.send(Identifier.Command, Instruction.ReadIndexTable, [indexPage]);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge && pkt.instruction.code === Acknowledgement.Complete) {
                    this.removeEventListener('packet', handler);
                    let payload = [];
                    pkt.payload.forEach ((value, idx) => {
                        payload[idx] = [
                            Boolean(value & 128),
                            Boolean(value & 64),
                            Boolean(value & 32),
                            Boolean(value & 16),
                            Boolean(value & 8),
                            Boolean(value & 4),
                            Boolean(value & 2),
                            Boolean(value & 1)
                        ];
                    })
                    resolve(payload);
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Soft Reset - Not just off the Finger Print Model,
    * But also of the Feather Interposer's buffer.
    * The SoftRst command is read by both devices and clears both buffers.
    * @return {Promise<Bool>} - True on Success.
    **/
    async softReset() {
        console.debug(`Func 0x3D SoftRst()`);
        this.send(Identifier.Command, Instruction.SoftRst, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    this.removeEventListener('packet', handler);
                    resolve(pkt.payload);
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Set Moduleâ€™s status register and operation parameter settings.
    * The finger print module must be power cycled for these changes to take effect.
    * @param {u8} parameter - 4=Baud Rate; 5=Security Level; 6=Packet Content Length;
    * @param {u8} value - 4 = {1, 2, 4, *6*, 12}; 5 = {1, 2, *3*, 4, 5}; 6 = {0, 1, *2*, 3};
    * @return {Promise<bool>} True on success.
    * @throws {Error} on failure.
    **/
    async setSystemParamater(parameter, value) {
        console.debug(`Func 0x0E SetSysPara(${parameter}, ${value})`);
        this.send(Identifier.Command, Instruction.SetSysPara, [parameter, value]);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    // ConfirmationCode.Failed = 0x01; Error When Receiving Package
                    if (pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Error When Receiving Package'));
                    }
                    // ConfirmationCode.FailedWrongRegister = 0x1A; Failed Wrong Register Number
                    if (pkt.instruction.code === ConfirmationCode.FailedWrongRegister) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed Wrong Register Number'));
                    }
                    // ConfirmationCode.FailedToFlash = 0x18; Failed to Write to Flash
                    if (pkt.instruction.code === ConfirmationCode.FailedToFlash) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed to Write to Flash'));
                    }

                    // ConfirmationCode.Success = 0x00; Parameter Setting Complete
                    if (pkt.instruction.code === ConfirmationCode.Success) {
                        this.removeEventListener('packet', handler);
                        resolve(true);
                    }
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Read Moduleâ€™s status register and system basic configuration parameters;
    * @return {Promise<systemObj>} System Object
    **/
    async readSystemParameters() {
        console.debug(`Func 0x0F ReadSysPara()`);
        this.send(Identifier.Command, Instruction.ReadSysPara, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    this.removeEventListener('packet', handler);
                    const dataView = new DataView(Uint8Array.from(pkt.payload).buffer);
                    const statusRegister = dataView.getUint16(0, false);
                    const systemIdCode = dataView.getUint16(2, false);
                    const fingerLibSize = dataView.getUint16(4, false);
                    const securityLevel = dataView.getUint16(6, false);
                    const address = [pkt.payload[8], pkt.payload[9], pkt.payload[10], pkt.payload[11]];
                    const packetSize = 2 ^ (dataView.getUint16(12, false) + 5); // In Bytes
                    const baudRate = dataView.getUint16(14, false) * 9600; // In Bytes Per Second.
                    resolve({
                        statusRegister: statusRegister,
                        systemIdCode: systemIdCode,
                        fingerLibSize: fingerLibSize,
                        securityLevel: securityLevel,
                        address: address,
                        packetSize: packetSize,
                        baudRate: baudRate
                    });
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Finger Print Processing Instructions
    **/

    /**
    * Detecting finger and store the detected finger image in ImageBuffer.
    * @return {Promise<bool>} True on Success
    * @throws {Error} On Failure
    **/
    async getImage() {
        console.debug(`Func 0x01 GenImg()`);
        this.send(Identifier.Command, Instruction.GenImg, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    // ConfirmationCode.Failed = 0x01; Error When Receiving Package
                    if (pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Error When Receiving Package'));
                    }
                    // ConfirmationCode.FailedNoFinger = 0x02; Failed to Detect Finger
                    if (pkt.instruction.code === ConfirmationCode.FailedNoFinger) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed to Detect Finger'));
                    }
                    // ConfirmationCode.FailedCollectFinger = 0x03; Failed To Collect Finger
                    if (pkt.instruction.code === ConfirmationCode.FailedCollectFinger) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed To Collect Finger'));
                    }

                    // ConfirmationCode.Success = 0x00; Auto-Enroll Successfully Set
                    if (pkt.instruction.code === ConfirmationCode.Success) {
                        this.removeEventListener('packet', handler);
                        resolve(true);
                    }
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Load template at the specified location (PageID) of Flash library to template buffer CharBuffer1/CharBuffer2
    * @param {u8} charBufferID - Buffer number
    * @param {u16} modelID - Page number
    * @return {Promise<bool>} - True on success.
    * @throws {Error} On Failure
    **/
    async LoadChar(charBufferID = 1, modelID) {
        console.debug(`Func 0x07 LoadChar(${charBufferID}, ${modelID})`);
        this.send(Identifier.Command, Instruction.LoadChar, [
            charBufferID,
            modelID / 256,
            modelID % 256
        ]);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    // ConfirmationCode.Failed = 0x01; Error When Receiving Package
                    if (pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Error When Receiving Package'));
                    }
                    // ConfirmationCode.FailedInvalid = 0x0C; Failed When Reading Template From Library, or The Readout Template is Invalid
                    if (pkt.instruction.code === ConfirmationCode.FailedInvalid) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed to Detect Finger'));
                    }
                    // ConfirmationCode.FailedCollectFinger = 0x0B; ModelID is Beyond the Finger Library
                    if (pkt.instruction.code === ConfirmationCode.FailedCollectFinger) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('ModelID is Beyond the Finger Library'));
                    }

                    // ConfirmationCode.Success = 0x00; Load Success
                    if (pkt.instruction.code === ConfirmationCode.Success) {
                        this.removeEventListener('packet', handler);
                        resolve(true);
                    }
                }
            };
            this.addEventListener('packet',handler);
        });
    }


    /**
    * Delete character templates, from StartID for Length including StartID.
    * @param {u16} StartID - Starting ModelID Buffer
    * @param {u16} Length - Number of ModelID's delete from StartID (At least 1)
    * @return {Promise<bool>} - True on success.
    * @throws {Error} On Failure
    **/
    async DeleteChar(startID, length = 1) {
        console.debug(`Func 0x0C DeleteChar(${startID}, ${length})`);
        this.send(Identifier.Command, Instruction.DeleteChar, [
            startID / 256,
            startID % 256,
            length / 256,
            length % 256
        ]);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    // ConfirmationCode.Failed = 0x01; Error When Receiving Package
                    if (pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Error When Receiving Package'));
                    }
                    // ConfirmationCode.FailedToDelete = 0x10; Failed to Delete Templates
                    if (pkt.instruction.code === ConfirmationCode.FailedToDelete) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed to Delete Templates'));
                    }
                    // ConfirmationCode.FailedToFlash = 0x18; Failed to Write to Flash
                    if (pkt.instruction.code === ConfirmationCode.FailedToFlash) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed to Write to Flash'));
                    }

                    // ConfirmationCode.Success = 0x00; Load Success
                    if (pkt.instruction.code === ConfirmationCode.Success) {
                        this.removeEventListener('packet', handler);
                        resolve(true);
                    }
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Upload the data in the template buffer ModelBuffer to the upper computer.
    * @param {u8} charBufferID - Character Buffer ID
    * @return {Promise<bool>}
    * @throws {Error} On Failure
    **/
    async UpChar(charBufferID = 1) {
        console.debug(`Func 0x08 UpChar(${charBufferID})`);
        this.send(Identifier.Command, Instruction.UpChar, [charBufferID]);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (
                    // Identifier.Acknowledge = 0x07; Acknowledge Command Packet;
                    pkt.identifier.code === Identifier.Acknowledge
                ) {
                    // ConfirmationCode.Failed = 0x01; Error When Receiving Package
                    if (pkt.instruction.code === ConfirmationCode.Failed) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Error When Receiving Package'));
                    }
                    // ConfirmationCode.FailedUploading = 0x0D; Failed When Uploading Template
                    if (pkt.instruction.code === ConfirmationCode.FailedUploading) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed When Uploading Template'));
                    }
                    // ConfirmationCode.FailedDataPacket = 0x0F; Failed When Receiving The Following Data Packet
                    if (pkt.instruction.code === ConfirmationCode.FailedDataPacket) {
                        this.removeEventListener('packet', handler);
                        reject(new Error('Failed When Receiving The Following Data Packet'));
                    }

                    // ConfirmationCode.Success = 0x00; Auto-Enroll Successfully Set
                    if (pkt.instruction.code === ConfirmationCode.Success) {
                        this.removeEventListener('packet', handler);
                        resolve(true);
                    }
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * Download template from upper computer to module buffer.
    * @param {u8} charBufferID - Character Buffer ID
    * @param {[u8]} templateData - Template from Upper Computer
    * @return {Promise<[u8]>}
    * @throws {Error} On Failure
    **/
    async DownChar(charBufferID = 1, templateData) {
        console.debug(`Func 0x09 DownChar(${charBufferID}, ${templateData})`);
        this.send(Identifier.Command, Instruction.DownChar, [CharBufferID]);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    resolve();
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * To upload the image in Img_Buffer to upper computer.
    * @return {Promise<[u8]>}
    * @throws {Error} On Failure
    **/
    async UpImage() {
        console.debug(`Func 0x0A UpImage()`);
        this.send(Identifier.Command, Instruction.UpImage, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    resolve();
                }
            };
            this.addEventListener('packet',handler);
        });
    }

    /**
    * To upload the image in Img_Buffer to upper computer.
    * @return {Promise<[u8]>}
    * @throws {Error} On Failure
    **/
    async DownImage() {
        console.debug(`Func 0x0B DownImage()`);
        this.send(Identifier.Command, Instruction.DownImage, []);
        return new Promise((resolve, reject) => {
            const handler = event => {
                const pkt = event.detail;
                if (pkt.identifier.code === Identifier.Acknowledge) {
                    resolve();
                }
            };
            this.addEventListener('packet',handler);
        });
    }
}

// Makes it available in regular script tags. Only after DOMContentLoaded is fired, as JavaScript modules process last.
window.WebUSBDevice = WebUSBDevice;
