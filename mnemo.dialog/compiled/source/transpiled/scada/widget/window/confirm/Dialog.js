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
      "qx.bom.Font": {},
      "qx.ui.basic.Label": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.widget.window.confirm.Dialog", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      var question = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.VBox());
      this.setFont(this.__getFont__P_22_0());
      this.__questionLabel__P_22_1 = this.__createAndAddQuestionLabel__P_22_2();
      this.__createAndAddOptionBar__P_22_3();
      this.initQuestion(question);
    },
    destruct: function destruct() {
      this._disposeObjects("__questionLabel__P_22_1");
    },
    events: {
      "confirmed": "qx.event.type.Event",
      "denied": "qx.event.type.Event"
    },
    properties: {
      question: {
        deferredInit: true,
        apply: "_applyQuestion"
      }
    },
    members: {
      _applyQuestion: function _applyQuestion(value) {
        this.__questionLabel__P_22_1.setValue(value);
      },
      __getFont__P_22_0: function __getFont__P_22_0() {
        var fontFamily = ["Lucida Grande", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans"];
        return new qx.bom.Font(20, fontFamily);
      },
      __createAndAddQuestionLabel__P_22_2: function __createAndAddQuestionLabel__P_22_2() {
        var label = new qx.ui.basic.Label("");
        this.add(label);
        return label;
      },
      __createAndAddOptionBar__P_22_3: function __createAndAddOptionBar__P_22_3() {
        var bar = new qx.ui.container.Composite(this.__createOptionBarLayout__P_22_4());
        var yesButton = this.__createOptionButton__P_22_5(this.tr("Yes"), "confirmed");
        bar.add(yesButton);
        var noButton = this.__createOptionButton__P_22_5(this.tr("No"), "denied");
        bar.add(noButton);
        this.add(bar);
      },
      __createOptionBarLayout__P_22_4: function __createOptionBarLayout__P_22_4() {
        var layout = new qx.ui.layout.HBox();
        layout.setSpacing(10);
        layout.setAlignX("center");
        return layout;
      },
      __createOptionButton__P_22_5: function __createOptionButton__P_22_5(label, eventName) {
        var button = new qx.ui.form.Button(label);
        button.setWidth(60);
        button.addListener("execute", function () {
          this.fireEvent(eventName);
        }, this);
        return button;
      }
    }
  });
  scada.widget.window.confirm.Dialog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dialog.js.map?dt=1686131244477