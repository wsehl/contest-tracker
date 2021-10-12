import Vue from "vue";

import "quasar/dist/quasar.css";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import { Quasar, Notify, Loading } from "quasar";

Vue.use(Quasar, {
  plugins: {
    Notify,
    Loading,
  },
  config: {},
  iconSet: iconSet,
});
