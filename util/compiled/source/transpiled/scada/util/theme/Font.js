(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Font": {
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

  qx.Theme.define("scada.util.theme.Font", {
    extend: qx.theme.indigo.Font,
    fonts: {}
  });
  scada.util.theme.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1685967534297