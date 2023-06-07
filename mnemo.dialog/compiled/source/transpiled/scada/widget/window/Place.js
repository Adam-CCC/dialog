(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.window.Window": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MPlacement": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.widget.window.Place", {
    extend: qx.ui.window.Window,
    include: [qx.ui.core.MPlacement],
    construct: function construct() {
      qx.ui.window.Window.constructor.call(this);
    }
  });
  scada.widget.window.Place.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Place.js.map?dt=1686131256857