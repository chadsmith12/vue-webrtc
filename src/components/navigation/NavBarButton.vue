<template>
  <v-btn text rounded :to="url">{{text}}</v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() text!: string;
  @Prop() url!: string;
}
</script>