import { Track, TrackKind } from './index';

/**
 * Represents a track that is a video track.
 */
export class VideoTrack extends Track {
    /**
     * The video media stream track.
     */
    mediaStreamTrack: MediaStreamTrack;

    constructor(track: MediaStreamTrack) {
        const trackKind = track.kind as TrackKind
        super(track.id, trackKind);

        this.mediaStreamTrack = track;
    }
}