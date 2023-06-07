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
      "scada.mnemo.dialog.signal.SizeHelper": {},
      "qx.ui.layout.Grow": {},
      "scada.mnemo.dialog.signal.SignalGroups": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.SignalWindow", {
    extend: qx.ui.window.Window,
    construct: function construct() {
      var caption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      qx.ui.window.Window.constructor.call(this, caption);
      this.__setupWindow__P_114_0();
      this.__signalGroup__P_114_1 = this.__createAndAddSignalGroups__P_114_2();
    },
    destruct: function destruct() {
      this._disposeObjects("__signalGroup__P_114_1");
    },
    members: {
      setSignals: function setSignals(signals) {
        this.__signalGroup__P_114_1.addSignals(signals);
      },
      setKeyForSignal: function setKeyForSignal(key, value) {
        if (this.__signalGroup__P_114_1) {
          this.__signalGroup__P_114_1.setValueForSignal(key, value);
        }
      },
      clearContent: function clearContent() {
        if (this.__signalGroup__P_114_1) {
          this.__signalGroup__P_114_1.removeAll();
        }
      },
      __setupWindow__P_114_0: function __setupWindow__P_114_0() {
        var CONTENT_PADDING = 10;
        this.set({
          showMaximize: false,
          showMinimize: false,
          allowMaximize: false,
          allowMinimize: false,
          centerOnAppear: true,
          contentPadding: CONTENT_PADDING,
          resizable: [false, false, false, false]
        });
        var width = scada.mnemo.dialog.signal.SizeHelper.getContainerWidth();
        this.setWidth(width + 2 * CONTENT_PADDING);
        this.setLayout(new qx.ui.layout.Grow());
      },
      __createAndAddSignalGroups__P_114_2: function __createAndAddSignalGroups__P_114_2() {
        var groups = new scada.mnemo.dialog.signal.SignalGroups();
        this.add(groups);
        return groups;
      }
    }
  });
  scada.mnemo.dialog.signal.SignalWindow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SignalWindow.js.map?dt=1686131257179