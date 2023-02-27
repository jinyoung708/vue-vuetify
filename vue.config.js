const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
        `
      },
      sass: {
        additionalData: `
          @import "@/assets/scss/vuetify_variables.sass"
        `
      }
    }
  }
})
