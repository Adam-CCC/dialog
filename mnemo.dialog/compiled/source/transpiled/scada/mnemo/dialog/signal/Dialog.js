function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "scada.mnemo.dialog.Dialog": {
        "construct": true,
        "require": true
      },
      "scada.mnemo.dialog.signal.Window": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.Dialog", {
    extend: scada.mnemo.dialog.Dialog,
    construct: function construct() {
      scada.mnemo.dialog.Dialog.constructor.call(this);
      this._confirmActions = [];
    },
    destruct: function destruct() {
      this._confirmActions = null;
    },
    properties: {
      showIfBadValues: {
        init: true,
        refine: true
      }
    },
    members: {
      _createWidgetContent: function _createWidgetContent() {
        var window = new scada.mnemo.dialog.signal.Window();
        window.addListener("resetAlarm", this._onResetAlarm, this);
        this.addListener("changeData", this._onReceiveData, this);
        this._mainWindow = window;
      },
      _onLoadSettings: function _onLoadSettings(settings) {
        scada.mnemo.dialog.signal.Dialog.superclass.prototype._onLoadSettings.call(this, settings);
        this._mainWindow.setConfig(settings);
      },
      _onReceiveData: function _onReceiveData(e) {
        var data = e.getData();
        if (!data) return;
        Object.entries(data).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          this._mainWindow.setKeyForSignal(key, Number(value));
        }, this);
      },
      _onResetAlarm: function _onResetAlarm(e) {
        var resetKey = e.getData();
        this._confirmActions.push(function () {
          this.setOutData(_defineProperty({}, resetKey, true));
        }.bind(this));
        this.next();
      },
      _onConfirm: function _onConfirm() {
        var action = this._confirmActions.pop();
        action();
      }
    }
  });
  scada.mnemo.dialog.signal.Dialog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dialog.js.map?dt=1686131244260