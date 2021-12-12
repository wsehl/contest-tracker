import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "quasar/dist/quasar.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import { Quasar, Notify, Loading } from "quasar";
import langRu from "quasar/lang/ru";
import router from "./router";
import store from "./store";

const app = createApp(App);

const quasarConfig = {
  plugins: {
    Notify,
    Loading,
  },
  lang: langRu,
};

app.use(Quasar, quasarConfig).use(router).use(store);

app.mount("#app");
