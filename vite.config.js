import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

const path = require("path");

export default defineConfig({
  root: "./client",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({}),
  ],
});
