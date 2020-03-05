<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul v-for="device in deviceInfo" :key="device.deviceId">
      <li>{{ device.label }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { getDevices } from '@/lib/media-devices';

export default {
  name: 'Home',
  data() {
    return {
      deviceInfo: []
    }
  },
  created() {
    getDevices().then(options => {
      this.deviceInfo = options.getDeviceOptions('audioinput');
    });
  },
}
</script>
