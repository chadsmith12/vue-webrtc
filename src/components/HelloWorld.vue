<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="onClickStream">
          {{ recordingButtonText }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <video id="localVideo" autoplay controls muted loop playsinline>
          <source :src="require('../assets/videos/chrome.mp4')"/>
          <source :src="require('../assets/videos/chrome.webm')"/>
        </video>
      </v-col>
      <v-col cols="6">
        <video id="videoStream" playsinline autoplay></video>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Nullable, getValue } from '@/lib/Nullable';

@Component
export default class HelloWorld extends Vue {
  isStreaming = false;
  localVideo: Nullable<HTMLVideoElement> = null;
  videoStream: Nullable<HTMLVideoElement> = null;
  stream: Nullable<MediaStream> = null;

  get recordingButtonText()  {
    return !this.isStreaming ? 'Start Streaming' : 'Stop Streaming';
  }

  onClickStream() {
    if(!this.isStreaming) {
      this.startStream();
    }
    else {
      this.stopStream();
    }
  }

  startStream() {
    // eslint-disable-next-line
    const local = getValue(this.localVideo) as any;
    if(local.captureStream) {
      this.stream = local.captureStream();
    }
    else if(local.mozCaptureStream) {
      this.stream = local.mozCaptureStream();
    }

    getValue(this.videoStream).srcObject = this.stream;
    this.isStreaming = true;
  }

  stopStream() {
    this.stream = null;
    this.isStreaming = false;
    getValue(this.videoStream).srcObject = null;
  }

  mounted() {
    this.localVideo = document.querySelector('#localVideo');
    this.videoStream = document.querySelector('#videoStream');
  }
}
</script>
