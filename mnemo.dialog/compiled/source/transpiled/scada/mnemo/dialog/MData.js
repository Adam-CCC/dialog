(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Mixin.define("scada.mnemo.dialog.MData", {
    properties: {
      data: {
        init: "?",
        nullable: true,
        event: "changeData"
      },
      outData: {
        init: {},
        event: "changeOutData"
      },
      outputKey: {
        init: null,
        nullable: true,
        check: "String"
      }
    }
  });
  scada.mnemo.dialog.MData.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MData.js.map?dt=1686131256875