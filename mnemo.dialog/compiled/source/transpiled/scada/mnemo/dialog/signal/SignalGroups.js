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
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Flow": {
        "construct": true
      },
      "scada.mnemo.dialog.signal.SizeHelper": {},
      "qx.lang.Type": {},
      "scada.mnemo.dialog.signal.SignalGroup": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.SignalGroups", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      this.setLayout(new qx.ui.layout.Flow());
      this.__groups__P_150_0 = [];
      this.__signals__P_150_1 = [];
    },
    destruct: function destruct() {
      this._disposeArray("__groups__P_150_0");
      this.__signals__P_150_1 = null;
    },
    members: {
      __createGroupOrGroups__P_150_2: function __createGroupOrGroups__P_150_2() {
        var sizeHelper = scada.mnemo.dialog.signal.SizeHelper;
        if (this.__areSignalsGrouped__P_150_3()) {
          var groupCount = Object.entries(this.__signals__P_150_1).length;
          var width = sizeHelper.getElementWidth(groupCount);
          var height = sizeHelper.getElementHeight(groupCount);
          this.__createAndAddGroups__P_150_4(width, height);
        } else {
          var _groupCount = 1;
          var _width = sizeHelper.getElementWidth(_groupCount);
          var _height = sizeHelper.getElementHeight(_groupCount);
          this.__createAndAddGroup__P_150_5(this.__signals__P_150_1, _width, _height);
        }
      },
      __areSignalsGrouped__P_150_3: function __areSignalsGrouped__P_150_3() {
        return qx.lang.Type.isObject(this.__signals__P_150_1);
      },
      __createAndAddGroups__P_150_4: function __createAndAddGroups__P_150_4(width, height) {
        Object.entries(this.__signals__P_150_1).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            groupSignals = _ref2[1];
          if (groupSignals.length) {
            this.__createAndAddGroup__P_150_5(groupSignals, width, height, name);
          }
        }, this);
      },
      __createAndAddGroup__P_150_5: function __createAndAddGroup__P_150_5(signals, width, height, title) {
        var group = new scada.mnemo.dialog.signal.SignalGroup(title);
        group.addSignals(signals, width, height);
        this.__groups__P_150_0.push(group);
        this.add(group);
      },
      setValueForSignal: function setValueForSignal(key, value) {
        var foundGroup = this.__groups__P_150_0.find(function (group) {
          return group.getTable().hasSignalWithId(key);
        });
        if (foundGroup) {
          foundGroup.getTable().setSignalValue(key, value);
        }
      },
      addSignals: function addSignals(signals) {
        this.__signals__P_150_1 = signals;
        this.__createGroupOrGroups__P_150_2();
      }
    }
  });
  scada.mnemo.dialog.signal.SignalGroups.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SignalGroups.js.map?dt=1686131261402