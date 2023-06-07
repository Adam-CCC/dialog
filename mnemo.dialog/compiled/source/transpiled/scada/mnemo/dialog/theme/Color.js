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
  
     Copyright: 2023 ugpa
  
     License: Private
  
     Authors: Dmitrii Zolotov (goldim) zolotovdy@ugpa.ru
  
  ************************************************************************ */

  qx.Theme.define("scada.mnemo.dialog.theme.Color", {
    extend: qx.theme.indigo.Color,
    colors: {}
  });
  scada.mnemo.dialog.theme.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1686131241536