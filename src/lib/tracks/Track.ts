/**
 * Represents the kind of track this is.
 */
export type TrackKind = 'audio' | 'data' | 'video';

/**
 * A Track represents a stream of data. Could either be audio, video, data.
 * This represents the id and kind that every track will have.
 */
export interface Track {
    /**
      * represents the unique identifier for a track.
      */
    id: string;

     /**
      * Represents the category this track is for.
      * This can either be 'video', 'audio', 'data'
      */
    kind: TrackKind;
}