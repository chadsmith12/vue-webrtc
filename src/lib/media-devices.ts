import { DeviceSelectionOptions } from "@/lib/DeviceSelectionOptions";


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
 * Gets all the media devices there are and groups them by their kind for easy access.
 * @returns Promise that resolves to a @see DeviceSelectionOptions
 */
export function getDevices() {
    return navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
        return new DeviceSelectionOptions(deviceInfos);
    });
}
