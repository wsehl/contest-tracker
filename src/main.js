import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import "./quasar";
import "./quasar";

Vue.config.productionTip = false;

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
