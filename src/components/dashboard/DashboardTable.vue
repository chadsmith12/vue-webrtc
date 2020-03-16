<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    :multi-sort="multiSort"
    class="elevation-1"
    @click:row="selectRow"
  ></v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";

@Component
export default class DashboardTable extends Vue {
  @Prop() headers!: DataTableHeader[];
  @Prop() items!: Array<unknown>;
  @Prop({ default: false }) multiSort!: boolean;

  selectRow(event: unknown) {
    this.$emit("select-row", event);
  }
}
</script>