(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "scada.mnemo.dialog.signal.SignalWindow": {},
      "qx.ui.form.Button": {},
      "scada.mnemo.dialog.signal.ResetAlarmsGroup": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.Window", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.VBox());
      this.__resetGroup__P_61_0 = this.__createAndAddResetAlarmGroup__P_61_1();
    },
    destruct: function destruct() {
      if (this.__signalButton__P_61_2) {
        this.__signalButton__P_61_2.dispose();
        this.__signalButton__P_61_2 = null;
      }
      if (this.__signalWindow__P_61_3) {
        this.__signalWindow__P_61_3.dispose();
        this.__signalWindow__P_61_3 = null;
      }
      this._disposeObjects("__resetGroup__P_61_0");
    },
    events: {
      "resetAlarm": "qx.event.type.Data"
    },
    members: {
      setConfig: function setConfig(config) {
        if (config.hasOwnProperty("signals")) {
          this.__signalButton__P_61_2 = this.__createShowTerminalButton__P_61_4();
          this.__signalWindow__P_61_3 = this.__createAndOpenSignalWindow__P_61_5(config.signals, config.caption);
        }
        this.__resetGroup__P_61_0.addButtonsForKeys(config.reset_keys);
      },
      __createAndOpenSignalWindow__P_61_5: function __createAndOpenSignalWindow__P_61_5(signals, caption) {
        var window = new scada.mnemo.dialog.signal.SignalWindow(caption);
        window.setSignals(signals);
        window.addListener("resize", function () {
          this.center();
        });
        return window;
      },
      __createShowTerminalButton__P_61_4: function __createShowTerminalButton__P_61_4() {
        var button = new qx.ui.form.Button("Окно терминала");
        button.addListener("execute", this._onPressShowTerminalButton, this);
        this.addBefore(button, this.__resetGroup__P_61_0);
        return button;
      },
      _onPressShowTerminalButton: function _onPressShowTerminalButton() {
        this.__signalWindow__P_61_3.open();
      },
      setKeyForSignal: function setKeyForSignal(key, value) {
        if (this.__signalWindow__P_61_3) {
          this.__signalWindow__P_61_3.setKeyForSignal(key, value);
        }
      },
      __createAndAddResetAlarmGroup__P_61_1: function __createAndAddResetAlarmGroup__P_61_1() {
        var group = new scada.mnemo.dialog.signal.ResetAlarmsGroup();
        group.addListener("resetAlarm", function (e) {
          this.fireDataEvent("resetAlarm", e.getData());
        }, this);
        this.add(group);
        return group;
      }
    }
  });
  scada.mnemo.dialog.signal.Window.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Window.js.map?dt=1686131251416