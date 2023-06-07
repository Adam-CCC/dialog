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
      "qx.core.Assert": {},
      "qx.locale.Manager": {},
      "scada.mnemo.dialog.signal.ResetAlarmButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.ResetAlarmsGroup", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.VBox());
    },
    events: {
      "resetAlarm": "qx.event.type.Data"
    },
    members: {
      addButtonsForKeys: function addButtonsForKeys(keys) {
        this.__createAndAddButtons__P_115_0(keys);
      },
      __createAndAddButtons__P_115_0: function __createAndAddButtons__P_115_0(keys) {
        qx.core.Assert.assertArray(keys);
        keys.forEach(this.__createAndAddButton__P_115_1, this);
      },
      __createAndAddButton__P_115_1: function __createAndAddButton__P_115_1(button) {
        var resetAlarmPart = qx.locale.Manager.tr("Reset alarm");
        var label = "".concat(resetAlarmPart, " ").concat(button.label);
        var btn = new scada.mnemo.dialog.signal.ResetAlarmButton(label, button.key);
        btn.addListener("resetAlarm", this._onResetAlarm, this);
        this.add(btn);
      },
      _onResetAlarm: function _onResetAlarm(e) {
        var key = e.getData();
        this.fireDataEvent("resetAlarm", key);
      }
    }
  });
  scada.mnemo.dialog.signal.ResetAlarmsGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ResetAlarmsGroup.js.map?dt=1686131257221