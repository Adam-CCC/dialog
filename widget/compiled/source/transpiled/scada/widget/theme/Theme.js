(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "scada.widget.theme.Color": {
        "require": true
      },
      "scada.widget.theme.Decoration": {
        "require": true
      },
      "scada.widget.theme.Font": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      },
      "scada.widget.theme.Appearance": {
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

  qx.Theme.define("scada.widget.theme.Theme", {
    meta: {
      color: scada.widget.theme.Color,
      decoration: scada.widget.theme.Decoration,
      font: scada.widget.theme.Font,
      icon: qx.theme.icon.Tango,
      appearance: scada.widget.theme.Appearance
    }
  });
  scada.widget.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1685967363194