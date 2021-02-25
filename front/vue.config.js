module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/plugins/vuetify/scss/style.scss";',
      },
    },
  },
  devServer: {
    host: process.env.NODE_HRM_HOST || '0.0.0.0',
    port: process.env.NODE_HRM_PORT || 8080,
    disableHostCheck: true,
    watchOptions: {
      poll: true,
    },
  }
};
