(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "scada.widget.window.Place": {
        "construct": true,
        "require": true
      },
      "scada.mnemo.dialog.MData": {
        "require": true
      },
      "scada.mnemo.dialog.MPosition": {
        "require": true
      },
      "scada.mnemo.dialog.MProtection": {
        "require": true
      },
      "scada.mnemo.dialog.MConfirmation": {
        "require": true
      },
      "qx.ui.layout.Basic": {
        "construct": true
      },
      "qx.core.Assert": {},
      "qx.ui.container.Stack": {},
      "qx.bom.Font": {},
      "qx.data.Conversion": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.Dialog", {
    extend: scada.widget.window.Place,
    include: [scada.mnemo.dialog.MData, scada.mnemo.dialog.MPosition, scada.mnemo.dialog.MProtection, scada.mnemo.dialog.MConfirmation],
    construct: function construct() {
      scada.widget.window.Place.constructor.call(this);
      this.set(this.getCommonDialog());
      this.getChildControl("title").setFont(this.getCommonDialog().font);
      this.setLayout(new qx.ui.layout.Basic());
      this._dialogStack = this.__createStack__P_60_0();
      this.add(this._dialogStack);
      this._createWidgetContent();
    },
    destruct: function destruct() {
      this._disposeObjects("_dialogStack");
      if (this._mainWindow) {
        this._mainWindow.dispose();
        this._mainWindow = null;
      }
      this.resetData();
      this.resetOutData();
    },
    properties: {
      event: {
        init: "click",
        check: ["click", "dblclick"]
      },
      showIfBadValues: {
        init: false,
        check: "Boolean"
      }
    },
    events: {
      "goto": "qx.event.type.Data"
    },
    members: {
      _mainWindow: null,
      extractOptionFromSettings: function extractOptionFromSettings(name, settings, errorMessage) {
        qx.core.Assert.assertString(name);
        if (this.settingsHasParam(settings, name)) {
          return settings[name];
        }
        if (!errorMessage) {
          errorMessage = "\u041D\u0435\u0442 \u043A\u043B\u044E\u0447\u0430 \u0432 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438: ".concat(name);
        }
        this.error(errorMessage);
        return null;
      },
      settingsHasParam: function settingsHasParam(settings, name) {
        return settings.hasOwnProperty(name);
      },
      _onConfirm: function _onConfirm() {},
      _createWidgetContent: function _createWidgetContent() {},
      __createStack__P_60_0: function __createStack__P_60_0() {
        var stack = new qx.ui.container.Stack();
        stack.setDynamic(true);
        return stack;
      },
      getCommonDialog: function getCommonDialog() {
        var PADDING = 10;
        return {
          font: new qx.bom.Font(20, ["Lucida Grande", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans"]),
          showClose: true,
          showMaximize: false,
          showMinimize: false,
          allowMaximize: false,
          allowMinimize: false,
          contentPadding: PADDING,
          resizable: [false, false, false, false]
        };
      },
      initSettingsFromJson: function initSettingsFromJson(settings) {
        this._onLoadSettings(settings);
      },
      _onLoadSettings: function _onLoadSettings(settings) {
        var _settings$update;
        this.initProtection(settings.protection);
        this.initConfirmationByJson(settings.confirmation);
        this.setCenter(qx.data.Conversion.toBoolean(settings.center));
        if (this.settingsHasParam(settings, "caption") && settings.caption) {
          this.setCaption(settings.caption);
        } else {
          this._excludeChildControl("captionbar");
        }
        if (settings !== null && settings !== void 0 && (_settings$update = settings.update) !== null && _settings$update !== void 0 && _settings$update.key) {
          var _settings$update2;
          this.setOutputKey(settings === null || settings === void 0 ? void 0 : (_settings$update2 = settings.update) === null || _settings$update2 === void 0 ? void 0 : _settings$update2.key);
        }
      },
      show: function show() {
        if (!this.getShowIfBadValues() && this.__hasBadValues__P_60_1()) {
          return;
        }
        if (this._mainWindow) {
          this._dialogStack.addAt(this._mainWindow, 0);
        }
        this.checkProtected();
        if (this._dialogStack.getChildren().length) {
          this._dialogStack.setSelection([this._dialogStack.getChildren()[0]]);
          this.setupPosition();
          scada.mnemo.dialog.Dialog.superclass.prototype.show.call(this);
        } else {
          this._onConfirm();
        }
      },
      __hasBadValues__P_60_1: function __hasBadValues__P_60_1() {
        return Object.values(this.getData()).some(function (value) {
          return value === undefined || value === null;
        });
      },
      next: function next() {
        if (this._dialogStack.indexOf(this._mainWindow) === this._dialogStack.getChildren().length - 1) {
          this._onConfirm();
          this.hide();
        } else {
          this._dialogStack.next();
        }
      },
      _isUnknownValue: function _isUnknownValue(value) {
        return value === null || value === undefined;
      }
    }
  });
  scada.mnemo.dialog.Dialog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dialog.js.map?dt=1686131251373