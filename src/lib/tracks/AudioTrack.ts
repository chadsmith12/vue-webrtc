import { Track, TrackKind } from './index';

/**
 * Represents a track that is an audio track.
 */
export class AudioTrack extends Track {
    /**
     * The audio media stream track.
     */
    mediaStreamTrack: MediaStreamTrack;

    constructor(track: MediaStreamTrack) {
        const trackKind = track.kind as TrackKind;
        super(track.id, trackKind);

        this.mediaStreamTrack = track;
    }
}