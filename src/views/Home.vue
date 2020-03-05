<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul v-for="device in deviceInfo" :key="device.deviceId">
      <li>{{ device.label }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from 'vue-property-decorator'
import { getDevices } from '@/lib/media-devices';
import {DeviceKind} from '@/lib/DeviceSelectionOptions';

@Component
export default class Home extends Vue {
  deviceInfo: MediaDeviceInfo[] = [];

  created() {
    getDevices().then(options => {
      this.deviceInfo = options.getDeviceOptions(DeviceKind.AudioInput);
    });
  }
}
</script>
