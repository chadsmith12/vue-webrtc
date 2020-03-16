<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
    <v-spacer />
    <nav-bar-button
      v-for="link in links"
      :key="`${link.label}-header-link`"
      :text="link.label"
      :url="link.url"
    ></nav-bar-button>
    <v-btn @click="toggleTheme" text rounded>Toggle Theme</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBarButton from "@/components/navigation/NavBarButton.vue";
import NavBtnInfo from "@/models/navigation/NavBtnInfo";
import NavigationItems from "@/models/navigation/NavigationItems";

@Component({
  components: {
    NavBarButton
  }
})
export default class NavBar extends Vue {
  links: NavBtnInfo[] = NavigationItems;

  toggleTheme() {
    this.$vuetify.theme.themes.dark.anchor = "#41B883";
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>