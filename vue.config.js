module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Pharmacie de la Mer d'Iroise - Calendrier",
        appId: "pharmaciedelamerdiroise.com",
        win: {
          target: ["nsis"],
          icon: "public/icon.png",
          // requestedExecutionLevel: "requireAdministrator",
        },
        mac: {
          icon: "public/icon.png",
        },
        nsis: {
          installerIcon: "public/favicon.ico",
          uninstallerIcon: "public/favicon.ico",
          uninstallDisplayName: "Pharmacie de la Mer d'Iroise - Calendrier",
          //  license: "license.txt",
          oneClick: false,
          allowToChangeInstallationDirectory: false,
        },
      },
    },
  },
};
