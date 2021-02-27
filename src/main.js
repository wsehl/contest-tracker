import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

createApp(App)
  .use(router)
  .use(Buefy)
  .mount("#app");
