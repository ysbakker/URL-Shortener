const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      'icons',
      path.resolve(__dirname, 'node_modules/vue-material-design-icons')
    )
    if (process.env.NODE_ENV === 'development') {
      config.plugins.delete('preload')
    }
  },
  devServer: {
    port: 3000,
  },
  productionSourceMap: false,
  lintOnSave: false,
}
