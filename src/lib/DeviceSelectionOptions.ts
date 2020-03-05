/**
 * The different kinds of devices we can have.
 * @summary The different device kinds can be audioinput, audiooutput, videoinput
 */
export enum DeviceKind {
    AudioInput = 'audioinput',
    AudioOutput = 'audiooutput',
    VideoInput = 'videoinput'
}

/**
 * Represents a dictionary for the different devices.
 * Each device kind has an array of devices that there are for that kind.
 */
export type DeviceOptions = { [key in DeviceKind]: MediaDeviceInfo[] };

/**
 * Represents the different options/selections there are for devices
 * These are divded up into @see DeviceOptions for each @see DeviceKind
 */
export class DeviceSelectionOptions {
    private _devices: MediaDeviceInfo[];
    public deviceGroups: DeviceOptions = {
        audioinput: [],
        audiooutput: [],
        videoinput: [],
    };

    /**
     * Initailizes the devices into their different groups of devices for easier access by kind
     * @param devices the devices the user has
     */
    constructor(devices: MediaDeviceInfo[]) {
        this._devices = devices;
        this.initDeviceOptions();
    }

    /**
     * Adds an array of MediaDeviceInfo for the kind of devices these are for.
     * @param kind the kind of device these device infos are for
     * @param deviceInfos The device infos that we are adding for this kind.
     */
    public addDeviceOptions(kind: DeviceKind, deviceInfos: MediaDeviceInfo[]) {
        this.deviceGroups[kind] = deviceInfos;
    }

    /**
     * Gets the device options for the kind passed in.
     * @param kind The kind of media devices we need.
     */
    public getDeviceOptions(kind: DeviceKind): MediaDeviceInfo[] {
        return this.deviceGroups[kind];
    }

    /**
     * goes through all the devices and puts all of them into their groups
     */
    private initDeviceOptions() {
        for (const device of this._devices) {
            this.deviceGroups[device.kind].push(device);
        }
    }
}