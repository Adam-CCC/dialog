(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Decoration": {
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

  qx.Theme.define("scada.mnemo.dialog.theme.Decoration", {
    extend: qx.theme.indigo.Decoration,
    decorations: {}
  });
  scada.mnemo.dialog.theme.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1686131241556