/**
 * Error that represents when the track kind was unknown.
 */
 export default class UnknownTrackError extends Error {
     constructor(kind: string, message?: string) {
         const errorMsg = message  || `Unknown Track kind found of: ${kind}. Supported Track types are 'audio', or 'video'`;
         super(errorMsg);

         Object.setPrototypeOf(this, new.target.prototype);
     }
 }