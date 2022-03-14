module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Pharmacie de la Mer d'Iroise - Calendrier",
        appId: "test.com",
        win: {
          target: ["nsis"],
          icon: "public/icon.png",
          requestedExecutionLevel: "requireAdministrator",
        },
        mac: {
          icon: "public/icon.png",
        },
        nsis: {
          installerIcon: "public/favicon.ico",
          uninstallerIcon: "public/favicon.ico",
          uninstallDisplayName: "CPU Monitor",
          license: "license.txt",
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
};
