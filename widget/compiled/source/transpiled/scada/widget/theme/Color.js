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
  
     Copyright: 2020 undefined
  
     License: MIT license
  
     Authors: undefined
  
  ************************************************************************ */

  qx.Theme.define("scada.widget.theme.Color", {
    extend: qx.theme.indigo.Color,
    colors: {}
  });
  scada.widget.theme.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1685967376597