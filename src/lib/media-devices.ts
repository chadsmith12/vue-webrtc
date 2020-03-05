import { DeviceSelectionOptions, DeviceKind } from "@/lib/DeviceSelectionOptions";


/**
 * Gets a list of the avaliable media devices of a given kind.
 * This filters down deviceInfos array to only the kind given.
 * @param deviceInfos An array of device information or media devices
 * @param kind Kind - one of audioinput, audiooutput, videoinput
 * @returns {Array<MediaDeviceInfo>} Only the media devices of the given kind
 */
export function getDevicesOfKind(deviceInfos: Array<MediaDeviceInfo>, kind: string) {
    return deviceInfos.filter(deviceInfo => deviceInfo.kind === kind);
}

/**
 * @returns Promise that resolves to an array of MediaDeviceInfo
 */
export function getDevices() {
    return navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
        const kinds: Array<string> = ['audioinput', 'audiooutput', 'videoinpput'];
        return kinds.reduce<DeviceSelectionOptions>((deviceSelections: DeviceSelectionOptions, kind: string) => {
            const currentKind = kind as DeviceKind;
            deviceSelections.addDeviceOptions(currentKind, getDevicesOfKind(deviceInfos, kind));
            return deviceSelections;
        }, new DeviceSelectionOptions());
    });
}
