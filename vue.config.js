const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5180
  },
  pwa: {
    name: 'Sporty Leagues',
    themeColor: '#ED1C24',
    msTileColor: '#ED1C24',
    manifestPath: 'manifest.json',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      faviconSVG: null,
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'img/icons/icon-192x192.png',
      maskIcon: null,
      msTileImage: 'img/icons/icon-192x192.png'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
})
