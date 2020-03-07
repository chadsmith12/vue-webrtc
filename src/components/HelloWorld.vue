<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Media Devices Found</h2>
        <v-card class="mx-auto" max-width="600" tile>
          <v-list :rounded="true">
            <v-subheader inset>Audio Output Devices</v-subheader>
              <v-list-item v-for="device in audioOutputDevices" :key="device.deviceId">
                <v-list-item-title v-text="device.label"></v-list-item-title>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-subheader inset>Video Devices</v-subheader>
                <v-list-item v-for="device in videoInputDevices" :key="device.deviceId">
                  <v-list-item-title>{{ device.label }}</v-list-item-title>
              </v-list-item>
          </v-list>
        </v-card>
        <v-btn @click="accessCamera">Start Recording</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getDevices, getLocalTracks } from "@/lib/media-devices";
import {
  DeviceSelectionOptions,
  DeviceKind
} from "../lib/DeviceSelectionOptions";
import { Nullable, getValue, hasValue } from "@/lib/Nullable";

@Component
export default class HelloWorld extends Vue {
  devices: Nullable<DeviceSelectionOptions> = null;

  get audioOutputDevices() {
    if (!hasValue(this.devices)) {
      return [];
    }

    return getValue(this.devices).getDeviceOptions(DeviceKind.AudioOutput);
  }

  get videoInputDevices() {
    if(!hasValue(this.devices)) {
      return [];
    }

    return getValue(this.devices).getDeviceOptions(DeviceKind.VideoInput);
  }

  async accessCamera() {
    const tracks = await getLocalTracks({
      audio: false,
      video: true
    });

    console.log(tracks);
  }

  async created() {
    this.devices = await getDevices();
  }
}
</script>
