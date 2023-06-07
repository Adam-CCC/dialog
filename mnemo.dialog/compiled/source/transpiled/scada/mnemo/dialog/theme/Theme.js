(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "scada.mnemo.dialog.theme.Color": {
        "require": true
      },
      "scada.mnemo.dialog.theme.Decoration": {
        "require": true
      },
      "scada.mnemo.dialog.theme.Font": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      },
      "scada.mnemo.dialog.theme.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     Copyright: 2023 ugpa
  
     License: Private
  
     Authors: Dmitrii Zolotov (goldim) zolotovdy@ugpa.ru
  
  ************************************************************************ */

  qx.Theme.define("scada.mnemo.dialog.theme.Theme", {
    meta: {
      color: scada.mnemo.dialog.theme.Color,
      decoration: scada.mnemo.dialog.theme.Decoration,
      font: scada.mnemo.dialog.theme.Font,
      icon: qx.theme.icon.Tango,
      appearance: scada.mnemo.dialog.theme.Appearance
    }
  });
  scada.mnemo.dialog.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1686131239802