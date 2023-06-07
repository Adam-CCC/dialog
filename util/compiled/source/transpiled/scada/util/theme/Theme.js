(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "scada.util.theme.Color": {
        "require": true
      },
      "scada.util.theme.Decoration": {
        "require": true
      },
      "scada.util.theme.Font": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      },
      "scada.util.theme.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     Copyright: 2020 Ugpa Inc
  
     License: MIT license
  
     Authors: zolotovdy zolotovdy@ugpa.ru
  
  ************************************************************************ */

  qx.Theme.define("scada.util.theme.Theme", {
    meta: {
      color: scada.util.theme.Color,
      decoration: scada.util.theme.Decoration,
      font: scada.util.theme.Font,
      icon: qx.theme.icon.Tango,
      appearance: scada.util.theme.Appearance
    }
  });
  scada.util.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1685967533502