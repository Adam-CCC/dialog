(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Color": {
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

  qx.Theme.define("scada.util.theme.Color", {
    extend: qx.theme.indigo.Color,
    colors: {}
  });
  scada.util.theme.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1685967534253