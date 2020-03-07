/**
 * Represents the kind of track this is.
 */
export type TrackKind = 'audio' | 'data' | 'video';

export interface MediaTrack {
    /**
      * represents the unique identifier for a track.
      */
    id: string;

     /**
      * Represents the kind of track this is.
      * This can either be 'video', 'audio', 'data'
      */
    kind: TrackKind;

    /**
     * Creates a media element for the track.
     */
    attach(): HTMLVideoElement | HTMLAudioElement | HTMLDataElement;
}