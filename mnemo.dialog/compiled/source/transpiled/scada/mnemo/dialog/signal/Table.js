(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.Table": {
        "construct": true,
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      },
      "qx.ui.table.columnmodel.Resize": {},
      "qx.ui.table.model.Simple": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.Table", {
    extend: qx.ui.table.Table,
    construct: function construct(signals, width, height) {
      var _this = this;
      qx.core.Assert.assertArray(signals, "something wrong with signal section");
      var model = this.__createDataModel__P_193_0(signals);
      qx.ui.table.Table.constructor.call(this, model, {
        tableColumnModel: function tableColumnModel(table) {
          return _this.__createColumnModel__P_193_1(table, width);
        }
      });
      this.__setupTableColumnModel__P_193_2(width);
      this.setHeight(height);
    },
    properties: {
      columnVisibilityButtonVisible: {
        init: false,
        refine: true
      },
      statusBarVisible: {
        init: false,
        refine: true
      },
      defaultSignalValue: {
        init: "?",
        check: "String"
      }
    },
    statics: {
      NAME_WIDTH_PERCENT: 0.8,
      VALUE_WIDTH_PERCENT: 0.2
    },
    members: {
      hasSignalWithId: function hasSignalWithId(searchedId) {
        var model = this.getTableModel();
        for (var i = 0; i < model.getRowCount(); i++) {
          var id = model.getValue(0, i);
          if (id === searchedId) {
            return true;
          }
        }
        return false;
      },
      setSignalValue: function setSignalValue(searchedId, value) {
        var model = this.getTableModel();
        for (var i = 0; i < model.getRowCount(); i++) {
          var id = model.getValue(0, i);
          if (id === searchedId) {
            model.setValue(2, i, value);
            break;
          }
        }
      },
      __createColumnModel__P_193_1: function __createColumnModel__P_193_1(table) {
        return new qx.ui.table.columnmodel.Resize(table);
      },
      __setupTableColumnModel__P_193_2: function __setupTableColumnModel__P_193_2(width) {
        var model = this.getTableColumnModel();
        model.setColumnVisible(0, false);
        var behavior = model.getBehavior();
        behavior.setWidth(1, Math.trunc(width * this.constructor.NAME_WIDTH_PERCENT));
        behavior.setWidth(2, Math.trunc(width * this.constructor.VALUE_WIDTH_PERCENT));
      },
      __createDataModel__P_193_0: function __createDataModel__P_193_0(signals) {
        var _this2 = this;
        var model = new qx.ui.table.model.Simple();
        model.setColumns(["ID", "Сигнал", "Значение"]);
        model.setColumnSortable(1, false);
        model.setColumnSortable(2, false);
        var processedData = signals.map(function (signalConfig) {
          return [signalConfig.key, signalConfig.label, _this2.getDefaultSignalValue()];
        });
        model.setData(processedData);
        return model;
      }
    }
  });
  scada.mnemo.dialog.signal.Table.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Table.js.map?dt=1686131266008