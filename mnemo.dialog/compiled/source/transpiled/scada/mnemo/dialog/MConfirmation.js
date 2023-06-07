(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {},
      "scada.widget.window.confirm.Dialog": {},
      "qx.data.Conversion": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Mixin.define("scada.mnemo.dialog.MConfirmation", {
    destruct: function destruct() {
      if (this.__sureDialog__P_112_0) {
        this.__sureDialog__P_112_0.dispose();
        this.__sureDialog__P_112_0 = null;
      }
    },
    properties: {
      confirmation: {
        init: false,
        check: "Boolean",
        apply: "_applyConfirmation"
      }
    },
    members: {
      openConfirmation: function openConfirmation() {
        if (this.__sureDialog__P_112_0) {
          this._dialogStack.add(this.__sureDialog__P_112_0);
          this._dialogStack.setSelection([this.__sureDialog__P_112_0]);
        }
      },
      _applyConfirmation: function _applyConfirmation(value) {
        if (value && !this.__sureDialog__P_112_0) {
          this.__sureDialog__P_112_0 = this.__createDialog__P_112_1();
        }
      },
      __createDialog__P_112_1: function __createDialog__P_112_1() {
        var message = qx.locale.Manager.tr("Are you sure") + "?";
        var dialog = new scada.widget.window.confirm.Dialog(message);
        dialog.addListener("confirmed", function () {
          this._onConfirm();
          this._onConfirmButtonPressed();
        }, this);
        dialog.addListener("denied", this._onConfirmButtonPressed, this);
        this._dialogStack.add(dialog);
        return dialog;
      },
      initConfirmationByJson: function initConfirmationByJson(settings) {
        this.setConfirmation(qx.data.Conversion.toBoolean(settings));
      },
      _onConfirmButtonPressed: function _onConfirmButtonPressed() {
        this.hide();
      }
    }
  });
  scada.mnemo.dialog.MConfirmation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MConfirmation.js.map?dt=1686131256981