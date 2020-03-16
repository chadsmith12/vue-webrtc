<template>
  <v-footer color="primary lighten-1" padless>
    <v-layout justify-center wrap>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-footer-link`"
        :to="link.url"
        color="white"
        text
        rounded
      >{{link.label}}</v-btn>
    </v-layout>
    <v-flex primary lighten-2 py-4 text-center white--text xs12>
      {{ new Date().getFullYear() }} -
      <strong>Vuetify Dashboard</strong>
    </v-flex>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavigationItems from "@/models/navigation/NavigationItems";
import NavBtnInfo from "../../models/navigation/NavBtnInfo";

@Component
export default class AppFooter extends Vue {
  links: NavBtnInfo[] = NavigationItems;
}
</script>