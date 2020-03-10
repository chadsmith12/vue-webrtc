<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <v-select
          label="Video Device"
          :items="videoDevices"
          item-value="deviceId"
          item-text="label"
          v-model="currentVideoDevice">
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          label="Audio Output Device"
          :items="audioOutputDevices"
          item-value="deviceId"
          item-text="label"
          v-model="currentAudioOutputDevice"
          @change="updateSinkId">
        </v-select>
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-btn @click="accessCamera">{{ recordingButtonText }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <video id="localVideo" controls></video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getDevices, getLocalTracks } from "@/lib/media-devices";
import {
  DeviceSelectionOptions
} from "../lib/DeviceSelectionOptions";
import { LocalMediaTrack } from "@/lib/tracks/index";
import { Nullable, getValue, hasValue } from "@/lib/Nullable";

@Component
export default class HelloWorld extends Vue {
  devices: Nullable<DeviceSelectionOptions> = null;
  currentVideoDevice = "";
  currentAudioOutputDevice = "";
  showVideo = false;
  localVideo: Nullable<HTMLVideoElement> = null;
  recordedBlobs: Blob[] = [];
  localTracks: LocalMediaTrack[] = [];

  get recordingButtonText()  {
    return this.showVideo ? 'Stop Recording' : 'Start Recording';
  }

  get videoDevices() {
    if(!hasValue(this.devices)) {
      return [];
    }

    return getValue(this.devices).deviceGroups.videoinput;
  }

  get audioOutputDevices() {
    if(!hasValue(this.devices)) {
      return [];
    }

    return getValue(this.devices).deviceGroups.audiooutput;
  }

  updateSinkId() {
    // we have to use any here as typescript doesn't know about setSinkId yet
    // eslint-disable-next-line
    const videoElement = getValue(this.localVideo) as any;
    if(typeof videoElement.sinkId !== 'undefined') {
      videoElement.setSinkId(this.currentAudioOutputDevice)
        .catch(() => {
          // reset to the first index something happened
          this.currentAudioOutputDevice = 'default';
        });
    }
  }

  async getTracks() {
    const constraints: MediaStreamConstraints = {
      audio: {
        echoCancellation: true,
        deviceId: this.currentAudioOutputDevice
      },
      video: {
        deviceId: this.currentVideoDevice
      }
    };
    const tracks = await getLocalTracks(constraints);
    const mediaStream = new MediaStream(tracks.map(track => track.mediaStreamTrack));

    this.showVideo = true;
    this.localTracks = tracks;
    getValue(this.localVideo).srcObject = mediaStream;
  }

  stopTracks() {
    this.showVideo = false;
    getValue(this.localVideo).srcObject = null;
    for(const track of this.localTracks) {
      track.stop();
    }

    this.localTracks = [];
  }

  async accessCamera() {
    if(!this.showVideo) {
      await this.getTracks();
    }
    else {
      this.stopTracks();
    }
  }

  async mounted() {
    this.devices = await getDevices();
    this.localVideo = document.querySelector('#localVideo');

    this.currentVideoDevice = this.devices.deviceGroups.videoinput[0].deviceId;
    this.currentAudioOutputDevice = this.devices.deviceGroups.audiooutput[0].deviceId;
  }
}
</script>
