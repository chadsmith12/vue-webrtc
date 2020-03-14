import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

// imports for the global components
import AppAlert from '@/components/alert/AppAlert.vue';
import NavBar from "@/components/navigation/NavBar.vue";
import AppFooter from "@/components/footer/AppFooter.vue";

Vue.config.productionTip = false

// set the global vue components
Vue.component('app-alert', AppAlert);
Vue.component('app-nav-bar', NavBar);
Vue.component('app-footer', AppFooter);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
