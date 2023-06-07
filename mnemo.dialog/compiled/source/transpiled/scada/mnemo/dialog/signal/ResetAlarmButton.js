(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.ResetAlarmButton", {
    extend: qx.ui.form.Button,
    construct: function construct(label, key) {
      qx.ui.form.Button.constructor.call(this, label);
      this.__key__P_151_0 = key;
      this.addListener("execute", this._onBtnPressed, this);
    },
    events: {
      "resetAlarm": "qx.event.type.Data"
    },
    members: {
      _onBtnPressed: function _onBtnPressed() {
        this.fireDataEvent("resetAlarm", this.__key__P_151_0);
      }
    }
  });
  scada.mnemo.dialog.signal.ResetAlarmButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ResetAlarmButton.js.map?dt=1686131261425