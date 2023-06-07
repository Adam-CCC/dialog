(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Mixin.define("scada.mnemo.dialog.MPosition", {
    properties: {
      center: {
        init: false,
        check: "Boolean",
        apply: "_applyCenter"
      },
      leftCoord: {
        init: 0,
        check: "Integer"
      },
      topCoord: {
        init: 0,
        check: "Integer"
      }
    },
    members: {
      _applyCenter: function _applyCenter(value) {
        if (!value) {
          this.__placeToPoint__P_110_0();
        }
      },
      __placeToPoint__P_110_0: function __placeToPoint__P_110_0() {
        var coord = {
          left: this.getLeftCoord(),
          top: this.getTopCoord() + 10
        };
        this.placeToPoint(coord);
      },
      setupPosition: function setupPosition() {
        if (!this.getCenter()) {
          this.__placeToPoint__P_110_0();
        } else {
          this.center();
        }
      }
    }
  });
  scada.mnemo.dialog.MPosition.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MPosition.js.map?dt=1686131256922