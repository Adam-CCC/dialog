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
      "qx.ui.layout.VBox": {},
      "qx.ui.basic.Label": {},
      "scada.mnemo.dialog.signal.Table": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.SignalGroup", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Сигналы";
      qx.ui.container.Composite.constructor.call(this);
      this.__setupLayout__P_178_0();
      this.__createAndAddLabel__P_178_1(label);
    },
    destruct: function destruct() {
      if (this.__table__P_178_2) {
        this.__table__P_178_2.dispose();
        this.__table__P_178_2 = null;
      }
    },
    members: {
      getTable: function getTable() {
        return this.__table__P_178_2;
      },
      __setupLayout__P_178_0: function __setupLayout__P_178_0() {
        var layout = new qx.ui.layout.VBox();
        layout.setAlignX("center");
        this.setLayout(layout);
      },
      __createAndAddLabel__P_178_1: function __createAndAddLabel__P_178_1(name) {
        var label = new qx.ui.basic.Label(name);
        this.add(label);
      },
      __createAndAddTable__P_178_3: function __createAndAddTable__P_178_3(signals, width, height) {
        var table = new scada.mnemo.dialog.signal.Table(signals, width, height);
        this.add(table);
        return table;
      },
      addSignals: function addSignals(signals, width, height) {
        this.__table__P_178_2 = this.__createAndAddTable__P_178_3(signals, width, height);
      }
    }
  });
  scada.mnemo.dialog.signal.SignalGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SignalGroup.js.map?dt=1686131263951