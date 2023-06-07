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
  
     Copyright: 2020 Ugpa Inc
  
     License: MIT license
  
     Authors: zolotovdy zolotovdy@ugpa.ru
  
  ************************************************************************ */

  qx.Theme.define("scada.util.theme.Decoration", {
    extend: qx.theme.indigo.Decoration,
    decorations: {}
  });
  scada.util.theme.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1685967534275