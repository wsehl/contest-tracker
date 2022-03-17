import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import WindiCSS from "vite-plugin-windicss";
import Components from "unplugin-vue-components/vite";

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
    WindiCSS(),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
      deep: true,
    }),
  ],
});
