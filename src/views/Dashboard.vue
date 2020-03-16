<template>
  <v-container>
    <h1>Dashboard</h1>

    <v-row>
      <v-col v-for="sale in salesData" :key="`${sale.title}`" cols="12" md="4" sm="6">
        <SalesGraph :sale="sale" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <dashboard-table :headers="headers" :items="audioInputDevices" @select-row="selectRow"></dashboard-table>
      </v-col>
      <v-col>
        <dashboard-table :headers="headers" :items="audioOutputDevices" @select-row="selectRow"></dashboard-table>
      </v-col>
    </v-row>

    <v-row id="below-the-fold" v-intersect="showMoreContent">
      <v-col>
        <dashboard-table :headers="headers" :items="audioInputDevices" @select-row="selectRow"></dashboard-table>
      </v-col>
      <v-col>
        <dashboard-table :headers="headers" :items="audioOutputDevices" @select-row="selectRow"></dashboard-table>
      </v-col>
    </v-row>

    <v-row v-if="loadNewContent" id="more-content">
      <v-col>
        <v-skeleton-loader ref="skeleton" type="table" class="mx-auto"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-snackbar v-model="showSnackbar" :left="$vuetify.breakpoint.lgAndUp">
      You have selected {{ currentItem }}
      <v-btn color="pink" text @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getDevices } from "@/lib/media-devices";
import { DataTableHeader } from "vuetify";
import DashboardTable from "@/components/dashboard/DashboardTable.vue";
import SalesGraph from "@/components/dashboard/SalesGraph.vue";
import { DeviceSelectionOptions } from "../lib/DeviceSelectionOptions";
import { Nullable, hasValue, getValue } from "@/lib/Nullable";

import salesData from "@/data/sales.json";
import SalesInformation from "../models/sales/SalesInformation";

interface TableItem {
  label: string;
  kind: string;
}

@Component({
  components: {
    DashboardTable,
    SalesGraph
  }
})
export default class extends Vue {
  loadNewContent = false;
  showSnackbar = false;
  onLeft = true;
  currentItem = "";
  headers: DataTableHeader[] = [
    {
      text: "Label",
      align: "start",
      sortable: true,
      value: "label"
    },
    { text: "Kind", value: "kind" }
  ];
  devices: Nullable<DeviceSelectionOptions> = null;
  salesData: SalesInformation[] = salesData;

  get audioInputDevices(): TableItem[] {
    if (!hasValue(this.devices)) {
      return [];
    }

    return getValue(this.devices).deviceGroups.audioinput.map(item => {
      return {
        label: item.label,
        kind: item.kind
      };
    });
  }

  get audioOutputDevices(): TableItem[] {
    if (!hasValue(this.devices)) {
      return [];
    }

    return getValue(this.devices).deviceGroups.audiooutput.map(item => {
      return {
        label: item.label,
        kind: item.kind
      };
    });
  }

  selectRow(event: TableItem) {
    this.showSnackbar = true;
    this.currentItem = event.label;
  }

  showMoreContent(entries: IntersectionObserverEntry[]) {
    this.loadNewContent = entries[0].isIntersecting;
  }

  async mounted() {
    this.devices = await getDevices();
  }
}
</script>