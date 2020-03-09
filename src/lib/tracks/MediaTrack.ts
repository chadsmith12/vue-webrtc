import { TrackKind, Track } from './index';
import { Nullable, getValue, hasValue } from '../Nullable';

type MediaTrackKind = 'video' | 'audio';
 /**
 * Represents a video, or audio track that can be streamed.
 */
 export class MediaTrack implements Track {
     private _attachments: Set<HTMLMediaElement>;
     private _mediaStream: Nullable<MediaStream>;

     /**
      * The unique id for this track.
      */
     id: string;

     /**
      * The category this track represents.
      * Will be either "audio" or "video".
      */
     kind: TrackKind;

     /**
      * The underlying media stream track.
      */
     mediaStreamTrack: MediaStreamTrack;

     constructor(track: MediaStreamTrack) {
        const trackKind = track.kind as TrackKind

        this._attachments = new Set();
        this._mediaStream = null;
        this.id =  track.id;
        this.kind = trackKind;
        this.mediaStreamTrack = track;
     }

     /**
      * determines if this is a video track.
      */
     get isVideoTrack() {
         return this.kind === 'video';
     }

     /**
      * determines if this an audio track.
      */
     get isAudioTrack() {
         return this.kind === 'audio';
     }

     /**
      * Returns the set of constraints recently established for the track.
      */
     trackConstraints() {
         return this.mediaStreamTrack.getConstraints();
     }

     /**
      * generates a new media stream from this track.
      * If there is already a media stream generated, then removes previous tracks and adds new tracks.
      */
     generateMediaStream(): MediaStream {
        let mediaStream = this._mediaStream;
         // if we don't already have a media stream go ahead and create one
         if(!hasValue(this._mediaStream)) {
             mediaStream = new MediaStream();
         }
         
         // get the tracks for this type of media stream
         // eslint-disable-next-line
         this._getTracks(mediaStream!).forEach(track => {
             mediaStream?.removeTrack(track);
         });
         
         mediaStream?.addTrack(this.mediaStreamTrack);
         this._mediaStream = mediaStream;

         return getValue(mediaStream);
     }

     /**
      * Creates an HTMLMediaElement and attaches the MediaStreamTrack to it.
      */
     attach(): HTMLMediaElement {
         const mediaTrackKind =  this.kind as MediaTrackKind;
         const element = document.createElement(mediaTrackKind);

         element.srcObject = this.generateMediaStream();
         element.autoplay = true;
         this._attachments.add(element);
         return element;
     }

     /**
      * removes all elements attached to this track.
      */
     detach(): void {
         const attachments = this._getAttachmentsAsArray();

         for(const attachment of attachments) {
             this._attachments.delete(attachment);
         }
     }

     private _getAttachmentsAsArray() {
         const elements: HTMLMediaElement[] = []; 
         this._attachments.forEach(attachment => {
             elements.push(attachment);
         })

         return elements;
     }

     private _getTracks(stream: MediaStream) {
         if(this.kind === 'video') {
             return stream.getVideoTracks();
         }
         else {
             return stream.getAudioTracks();
         }
     }
 }