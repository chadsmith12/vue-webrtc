import { VideoTrack, AudioTrack, TrackKind, MediaTrack } from './index';
import UnknownTrackError from "../errors/UnknownTrackError";

 /**
 * Represents a video, audio, or data stream
 */
 export class Track implements MediaTrack {
     id: string;
     kind: TrackKind;

     constructor(id: string, kind: TrackKind) {
         this.id =  id;
         this.kind = kind;
     }

     attach(): HTMLVideoElement | HTMLAudioElement | HTMLDataElement {
        return document.createElement(this.kind);
    }

    /**
     * Creates a track from the correct type of track for the track in the media stream.
     * @param track the underling media stream track.
     */
     static GenerateTrack(track: MediaStreamTrack): Track {
        const kind = track.kind as TrackKind;

        switch(kind) {
            case 'audio': 
                return new AudioTrack(track);
            case 'video':
                return new VideoTrack(track);
            default:
                throw new UnknownTrackError(track.kind);
        }
     }
 }