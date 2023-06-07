(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Document": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("scada.mnemo.dialog.signal.SizeHelper", {
    type: "static",
    statics: {
      SCALE_RATIO: 0.8,
      DIMENSION_TABLE: [[1, 1], [1, 1], [2, 1], [2, 2], [2, 2], [3, 2], [3, 2], [3, 3], [3, 3], [3, 3], [4, 3]],
      getContainerWidth: function getContainerWidth() {
        return this.applyRatio(qx.bom.Document.getWidth());
      },
      getContainerHeight: function getContainerHeight() {
        return this.applyRatio(qx.bom.Document.getHeight());
      },
      applyRatio: function applyRatio(size) {
        return Math.ceil(size * this.SCALE_RATIO);
      },
      getElementWidth: function getElementWidth(elementCount) {
        return Math.trunc(this.getContainerWidth() / this.getColumnCount(elementCount)) - 15;
      },
      getElementHeight: function getElementHeight(elementCount) {
        return Math.trunc(this.getContainerHeight() / this.getRowCount(elementCount));
      },
      getColumnCount: function getColumnCount(tableCount) {
        return this.getDimensions(tableCount)[0];
      },
      getRowCount: function getRowCount(elementCount) {
        return this.getDimensions(elementCount)[1];
      },
      getDimensions: function getDimensions(elementCount) {
        return this.DIMENSION_TABLE[elementCount];
      }
    }
  });
  scada.mnemo.dialog.signal.SizeHelper.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SizeHelper.js.map?dt=1686131261355