function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.Canvas": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Atom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Mixin.define("scada.mnemo.dialog.MProtection", {
    construct: function construct() {
      this.initProtectionMessage(this.tr("The control is blocked"));
      this.__protectionOnValue__P_111_0 = [scada.mnemo.dialog.MProtection.PROTECTION_DEFAULT_VALUE];
    },
    destruct: function destruct() {
      this._disposeObjects("__protectionDialog");
      this.__protectionOnValue__P_111_0 = null;
    },
    properties: {
      protectionKey: {
        init: null,
        nullable: true,
        check: "String"
      },
      protectionMessage: {
        deferredInit: true,
        check: "String"
      },
      showProtectionDialog: {
        init: false,
        check: "Boolean"
      }
    },
    statics: {
      PROTECTION_DEFAULT_VALUE: 1
    },
    members: {
      __protectionDialog: null,
      initProtection: function initProtection(settings) {
        if (settings === undefined) return;
        if (_typeof(settings) !== 'object') {
          this.setProtectionKey(settings);
          return;
        }
        var protectionKey = this.extractOptionFromSettings("key", settings, "Не задан ключ для блокировки окна");
        this.setProtectionKey(protectionKey);
        if (this.settingsHasParam(settings, "onValue")) {
          this.__parseValuesOn__P_111_1(settings.onValue);
        }
        if (this.settingsHasParam(settings, "show_message")) {
          this.setShowProtectionDialog(settings.show_message);
        }
        if (this.settingsHasParam(settings, "message")) {
          this.setShowProtectionDialog(true);
          this.setProtectionMessage(settings.message);
        }
      },
      __parseValuesOn__P_111_1: function __parseValuesOn__P_111_1(valueOrValues) {
        var protectionValueOn;
        if (Array.isArray(valueOrValues)) {
          protectionValueOn = valueOrValues.slice();
        } else {
          protectionValueOn = [valueOrValues];
        }
        this.__protectionOnValue__P_111_0 = protectionValueOn;
      },
      checkProtected: function checkProtected() {
        var value = this.getData();
        if (this.isProtected(value[this.getProtectionKey()])) {
          if (this.getShowProtectionDialog()) {
            this.__showProtectionDialog__P_111_2();
          }
        } else {
          if (this.__protectionDialog && this._dialogStack) {
            this._dialogStack.remove(this.__protectionDialog);
            this._dialogStack.setSelection([]);
            this.__protectionDialog = null;
          }
        }
      },
      isProtected: function isProtected(value) {
        return this.__protectionOnValue__P_111_0.includes(value);
      },
      __showProtectionDialog__P_111_2: function __showProtectionDialog__P_111_2() {
        if (!this.__protectionDialog) {
          this.__protectionDialog = this._createMsgWindow();
        }
        this._dialogStack.addAt(this.__protectionDialog, 0);
      },
      _createMsgWindow: function _createMsgWindow() {
        var win = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
        this.__setupLayout__P_111_3(win);
        win.add(this.__createAtom__P_111_4());
        return win;
      },
      __setupLayout__P_111_3: function __setupLayout__P_111_3(win) {
        var layout = new qx.ui.layout.HBox();
        layout.setSpacing(10);
        layout.setAlignX("center");
        win.setLayout(layout);
      },
      __createAtom__P_111_4: function __createAtom__P_111_4() {
        var atom = new qx.ui.basic.Atom(this.getProtectionMessage(), "@MaterialIcons/warning/32");
        atom.getChildControl("icon").setTextColor("yellow");
        return atom;
      }
    }
  });
  scada.mnemo.dialog.MProtection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MProtection.js.map?dt=1686131256958