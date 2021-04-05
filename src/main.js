import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { store } from "./store";
import Axios from "axios";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Quasar);
app.use(quasarUserOptions);
app.mount("#app");
