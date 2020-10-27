const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      'icons',
      path.resolve(__dirname, 'node_modules/vue-material-design-icons')
    )
  },
  devServer: {
    port: 3000,
  },
  productionSourceMap: false,
  lintOnSave: false,
}
