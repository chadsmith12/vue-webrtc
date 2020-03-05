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
            <v-subheader>Audio Output Devices</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="device in audioOutputDevices" :key="device.deviceId">
                <v-list-item-title>{{ device.label }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getDevices } from "@/lib/media-devices";
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

  async created() {
    this.devices = await getDevices();
  }
}
</script>
