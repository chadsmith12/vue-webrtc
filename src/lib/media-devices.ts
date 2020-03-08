import { DeviceSelectionOptions } from "@/lib/DeviceSelectionOptions";
import { LocalMediaTrack } from './tracks/index';


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

/**
 * Attempts to get access to the users media devices, and returns a promise.
 * @param constraints The stream constraints when getting the devices.
 * @returns {Promise<LocalMediaTrack[]>} Promise that resolves to an array of LocalMediaTrack's.
 */
export function getLocalTracks(constraints: MediaStreamConstraints) {
    return navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        return mediaStream.getTracks().map(track => {
            return new LocalMediaTrack(track);
        });
    });
}