/**
 * The different kinds of devices we can have.
 */
export type DeviceKind = 'audioinput' | 'audiooutput' | 'videoinput';
export type DeviceOptions = { [key in DeviceKind]: MediaDeviceInfo[] };

export class DeviceSelectionOptions {
    private _deviceOptions: DeviceOptions;
    constructor() {
        this._deviceOptions = {
            'audioinput': [],
            'audiooutput': [],
            'videoinput': [],
        };
    }

    /**
     * Adds an array of MediaDeviceInfo for the kind of devices these are for.
     * @param kind the kind of device these device infos are for
     * @param deviceInfos The device infos that we are adding for this kind.
     */
    public addDeviceOptions(kind: DeviceKind, deviceInfos: MediaDeviceInfo[]) {
        this._deviceOptions[kind] = deviceInfos;
    }

    /**
     * Gets the device options for the kind passed in.
     * @param kind The kind of media devices we need.
     */
    public getDeviceOptions(kind: DeviceKind): MediaDeviceInfo[] {
        return this._deviceOptions[kind];
    }
}