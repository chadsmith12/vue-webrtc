<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-btn @click="accessCamera">{{ recordingButtonText }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-card v-show="showVideo" class="mx-auto">
        <video id="localVideo" autoplay></video>
      </v-card>
    </v-row>
    <v-row class="text-center">
      <video id="recordedVideo" controls></video>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getDevices, getLocalMediaStream } from "@/lib/media-devices";
import {
  DeviceSelectionOptions
} from "../lib/DeviceSelectionOptions";
import { LocalMediaTrack } from "@/lib/tracks/index";
import { Nullable, getValue } from "@/lib/Nullable";

@Component
export default class HelloWorld extends Vue {
  devices: Nullable<DeviceSelectionOptions> = null;
  showVideo = false;
  localVideo: Nullable<HTMLVideoElement> = null;
  recordedBlobs: Blob[] = [];
  localTracks: LocalMediaTrack[] = [];
  mediaRecorder: Nullable<MediaRecorder> = null;

  get recordingButtonText()  {
    return this.showVideo ? 'Stop Recording' : 'Start Recording';
  }

  async getTracks() {
    const constraints: MediaStreamConstraints = {
      audio: {
        echoCancellation: true
      },
      video: {
        width: 1280,
        height: 720
      }
    };
    const stream = await getLocalMediaStream(constraints);

    this.showVideo = true;
    this.localVideo = document.querySelector('#localVideo');
    getValue(this.localVideo).srcObject = stream;

// eslint-disable-next-line
    this.startRecording(stream!);
  }

  startRecording(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (e) => {
      this.recordedBlobs.push(e.data);
    }
    this.mediaRecorder.start(10);
  }

  stopRecording() {
    this.mediaRecorder?.stop();
    const supperBuffer = new Blob(this.recordedBlobs,  {type: 'video/webm'});
    const recordingContainer: Nullable<HTMLVideoElement> = document.querySelector('#recordedVideo');
    getValue(recordingContainer).src = window.URL.createObjectURL(supperBuffer);
    getValue(recordingContainer).play();
  }

  stopTracks() {
    this.showVideo = false;
    this.stopRecording();
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
  }
}
</script>
