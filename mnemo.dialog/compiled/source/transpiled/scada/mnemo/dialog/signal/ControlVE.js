function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "scada.mnemo.dialog.signal.Dialog": {
        "construct": true,
        "require": true
      },
      "scada.widget.window.confirm.Dialog": {},
      "qx.ui.form.Button": {},
      "qx.ui.layout.Flow": {},
      "qx.ui.container.Composite": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.ControlVE", {
    extend: scada.mnemo.dialog.signal.Dialog,
    construct: function construct() {
      this.__veBlock__P_4_0 = this.__createAndAddVEBlock__P_4_1();
      scada.mnemo.dialog.signal.Dialog.constructor.call(this);
      this.__veConfirmWin__P_4_2 = this.__createConfirmWindow__P_4_3();
    },
    destruct: function destruct() {
      this._disposeObjects("__veBlock__P_4_0", "__veConfirmWin__P_4_2");
    },
    members: {
      _createWidgetContent: function _createWidgetContent() {
        scada.mnemo.dialog.signal.ControlVE.superclass.prototype._createWidgetContent.call(this);
        this._mainWindow.add(this.__veBlock__P_4_0);
      },
      _onLoadSettings: function _onLoadSettings(settings) {
        scada.mnemo.dialog.signal.ControlVE.superclass.prototype._onLoadSettings.call(this, settings);
        var dialogSettings = settings.control_ve;
        if (!dialogSettings) {
          return;
        }
        this.__key__P_4_4 = this.extractOptionFromSettings("key", dialogSettings);
        this.__veStateKey__P_4_5 = this.extractOptionFromSettings("state_key", dialogSettings);
      },
      _onReceiveData: function _onReceiveData(e) {
        scada.mnemo.dialog.signal.ControlVE.superclass.prototype._onReceiveData.call(this, e);
        this.__updateQuestionLabel__P_4_6(e.getData());
      },
      __createConfirmWindow__P_4_3: function __createConfirmWindow__P_4_3() {
        var win = new scada.widget.window.confirm.Dialog();
        win.addListener("confirmed", this._onWindowConfirm, this);
        win.addListener("denied", this._onWindowDeny, this);
        return win;
      },
      __updateQuestionLabel__P_4_6: function __updateQuestionLabel__P_4_6(data) {
        if (this.__veStateKey__P_4_5 && data.hasOwnProperty(this.__veStateKey__P_4_5) && data[this.__veStateKey__P_4_5] !== undefined) {
          var stateLabel;
          if (data[this.__veStateKey__P_4_5]) {
            stateLabel = this.tr("control state");
          } else {
            stateLabel = this.tr("work state");
          }
          this.__veConfirmWin__P_4_2.setQuestion(stateLabel.toUpperCase());
        }
      },
      __createControlVEButton__P_4_7: function __createControlVEButton__P_4_7() {
        var button = new qx.ui.form.Button("Управление ВЭ");
        button.addListener("execute", this._onPressControlVEButton, this);
        return button;
      },
      __createAndAddVEBlock__P_4_1: function __createAndAddVEBlock__P_4_1() {
        var layout = new qx.ui.layout.Flow();
        layout.setAlignX("center");
        var block = new qx.ui.container.Composite(layout);
        block.add(this.__createControlVEButton__P_4_7());
        return block;
      },
      _onWindowConfirm: function _onWindowConfirm() {
        if (this.__key__P_4_4) {
          this._confirmActions.push(function () {
            this.setOutData(_defineProperty({}, this.__key__P_4_4, true));
          }.bind(this));
          this.next();
        }
      },
      _onWindowDeny: function _onWindowDeny() {
        this.hide();
      },
      _onPressControlVEButton: function _onPressControlVEButton() {
        this._dialogStack.addAfter(this.__veConfirmWin__P_4_2, this._mainWindow);
        this.next();
      },
      show: function show() {
        scada.mnemo.dialog.signal.ControlVE.superclass.prototype.show.call(this);
        if (this._dialogStack.indexOf(this.__veConfirmWin__P_4_2) !== -1) {
          this._dialogStack.remove(this.__veConfirmWin__P_4_2);
        }
      }
    }
  });
  scada.mnemo.dialog.signal.ControlVE.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ControlVE.js.map?dt=1686131241091