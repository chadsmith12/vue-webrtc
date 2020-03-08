import { MediaTrack } from './index';

/**
 * Represents either an audio video for a local person.
 */
export class LocalMediaTrack extends MediaTrack {
    constructor(mediaStreamTrack: MediaStreamTrack) {
        super(mediaStreamTrack);
    }

    get isEnabled() {
        return this.mediaStreamTrack.enabled;
    }

    get isStopped() {
        return this.mediaStreamTrack.readyState === 'ended';
    }

    enable(enabled: boolean) {
        if(enabled !== this.isEnabled) {
            this.mediaStreamTrack.enabled = enabled;
        }

        return  this;
    }

    disable() {
        return this.enable(false);
    }

    stop() {
        this.mediaStreamTrack.stop();

        return this;
    }
}