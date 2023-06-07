(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
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

  qx.Theme.define("scada.mnemo.dialog.theme.Appearance", {
    extend: qx.theme.indigo.Appearance,
    appearances: {}
  });
  scada.mnemo.dialog.theme.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1686131241619