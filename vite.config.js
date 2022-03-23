import { defineConfig } from "vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Components from "unplugin-vue-components/vite";

const path = require("path");

export default defineConfig({
  root: "./client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "~shared": path.resolve(__dirname, "./shared"),
    },
  },
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
      deep: true,
    }),
    WindiCSS(),
    quasar({}),
  ],
});
