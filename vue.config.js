const path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "client/src/main.js",
      template: "client/public/index.html",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("copy").use(require("copy-webpack-plugin"), [
      [
        {
          from: path.resolve(__dirname, "client/public"),
          to: path.resolve(__dirname, "dist"),
          toType: "dir",
          ignore: [".DS_Store"],
        },
      ],
    ]);
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
};
