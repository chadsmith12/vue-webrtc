<template>
  <v-alert type="error" outlined>
    <slot></slot>
  </v-alert>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "app-alert" })
export default class AppAlert extends Vue {}
</script>