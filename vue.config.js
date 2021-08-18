module.exports = {
  pwa: {
    name: "MyOcean Learning English",
    themeColor: "#00af91",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    iconPaths: {
      favicon32: "assets/logo.jpeg",
      appleTouchIcon: "assets/logo.jpeg",
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "ru",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
}
