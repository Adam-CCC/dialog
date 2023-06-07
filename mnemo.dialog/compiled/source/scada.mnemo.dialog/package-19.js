(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.LayoutItem": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.queue.Dispose": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * A Spacer is a "virtual" widget, which can be placed into any layout and takes
   * the space a normal widget of the same size would take.
   *
   * Spacers are invisible and very light weight because they don't require any
   * DOM modifications.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var container = new qx.ui.container.Composite(new qx.ui.layout.HBox());
   *   container.add(new qx.ui.core.Widget());
   *   container.add(new qx.ui.core.Spacer(50));
   *   container.add(new qx.ui.core.Widget());
   * </pre>
   *
   * This example places two widgets and a spacer into a container with a
   * horizontal box layout. In this scenario the spacer creates an empty area of
   * 50 pixel width between the two widgets.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/spacer.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.core.Spacer", {
    extend: qx.ui.core.LayoutItem,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param width {Integer?null} the initial width
     * @param height {Integer?null} the initial height
     */
    construct: function construct(width, height) {
      qx.ui.core.LayoutItem.constructor.call(this);

      // Initialize dimensions
      this.setWidth(width != null ? width : 0);
      this.setHeight(height != null ? height : 0);
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Helper method called from the visibility queue to detect outstanding changes
       * to the appearance.
       *
       * @internal
       */
      checkAppearanceNeeds: function checkAppearanceNeeds() {
        // placeholder to improve compatibility with Widget.
      },
      /**
       * Recursively adds all children to the given queue
       *
       * @param queue {Map} The queue to add widgets to
       */
      addChildrenToQueue: function addChildrenToQueue(queue) {
        // placeholder to improve compatibility with Widget.
      },
      /**
       * Removes this widget from its parent and dispose it.
       *
       * Please note that the widget is not disposed synchronously. The
       * real dispose happens after the next queue flush.
       *
       */
      destroy: function destroy() {
        if (this.$$disposed) {
          return;
        }
        var parent = this.$$parent;
        if (parent) {
          parent._remove(this);
        }
        qx.ui.core.queue.Dispose.add(this);
      }
    }
  });
  qx.ui.core.Spacer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A widget used for decoration proposes to structure a toolbar. Each
   * Separator renders a line between the buttons around.
   */
  qx.Class.define("qx.ui.toolbar.Separator", {
    extend: qx.ui.core.Widget,
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "toolbar-separator"
      },
      // overridden
      anonymous: {
        refine: true,
        init: true
      },
      // overridden
      width: {
        refine: true,
        init: 0
      },
      // overridden
      height: {
        refine: true,
        init: 0
      }
    }
  });
  qx.ui.toolbar.Separator.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.basic.Image": {},
      "qx.ui.toolbar.PartContainer": {},
      "qx.ui.toolbar.Separator": {},
      "qx.ui.menubar.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * A part is a container for multiple toolbar buttons. Each part comes
   * with a handle which may be used in later versions to drag the part
   * around and move it to another position. Currently mainly used
   * for structuring large toolbars beyond the capabilities of the
   * {@link Separator}.
   *
   * @childControl handle {qx.ui.basic.Image} prat handle to visualize the separation
   * @childControl container {qx.ui.toolbar.PartContainer} holds the content of the toolbar part
   */
  qx.Class.define("qx.ui.toolbar.Part", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.MRemoteChildrenHandling],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      // Hard coded HBox layout
      this._setLayout(new qx.ui.layout.HBox());

      // Force creation of the handle
      this._createChildControl("handle");
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "toolbar/part"
      },
      /** Whether icons, labels, both or none should be shown. */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        event: "changeShow"
      },
      /** The spacing between every child of the toolbar */
      spacing: {
        nullable: true,
        check: "Integer",
        themeable: true,
        apply: "_applySpacing"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var _this = this;
        var control;
        switch (id) {
          case "handle":
            control = new qx.ui.basic.Image();
            control.setAlignY("middle");
            this._add(control);
            break;
          case "container":
            control = new qx.ui.toolbar.PartContainer();
            control.addListener("syncAppearance", this.__onSyncAppearance__P_194_0, this);
            this._add(control);
            control.addListener("changeChildren", function () {
              _this.__onSyncAppearance__P_194_0();
            });
            break;
        }
        return control || qx.ui.toolbar.Part.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.getChildControl("container");
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      _applySpacing: function _applySpacing(value, old) {
        var layout = this.getChildControl("container").getLayout();
        value == null ? layout.resetSpacing() : layout.setSpacing(value);
      },
      /*
      ---------------------------------------------------------------------------
        UTILITIES
      ---------------------------------------------------------------------------
      */
      /**
       * Helper which applies the left, right and middle states.
       */
      __onSyncAppearance__P_194_0: function __onSyncAppearance__P_194_0() {
        // check every child
        var children = this.getChildrenContainer().getChildren();
        children = children.filter(function (child) {
          return child.getVisibility() == "visible";
        });
        for (var i = 0; i < children.length; i++) {
          // if its the first child
          if (i == 0 && i != children.length - 1) {
            children[i].addState("left");
            children[i].removeState("right");
            children[i].removeState("middle");
            // if its the last child
          } else if (i == children.length - 1 && i != 0) {
            children[i].addState("right");
            children[i].removeState("left");
            children[i].removeState("middle");
            // if there is only one child
          } else if (i == 0 && i == children.length - 1) {
            children[i].removeState("left");
            children[i].removeState("middle");
            children[i].removeState("right");
          } else {
            children[i].addState("middle");
            children[i].removeState("right");
            children[i].removeState("left");
          }
        }
      },
      /**
       * Adds a separator to the toolbar part.
       */
      addSeparator: function addSeparator() {
        this.add(new qx.ui.toolbar.Separator());
      },
      /**
       * Returns all nested buttons which contains a menu to show. This is mainly
       * used for keyboard support.
       *
       * @return {Array} List of all menu buttons
       */
      getMenuButtons: function getMenuButtons() {
        var children = this.getChildren();
        var buttons = [];
        var child;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          if (child instanceof qx.ui.menubar.Button) {
            buttons.push(child);
          }
        }
        return buttons;
      }
    }
  });
  qx.ui.toolbar.Part.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.DragDropScrolling": {
        "construct": true
      },
      "qx.Class": {},
      "qx.ui.core.scroll.MScrollBarFactory": {},
      "qx.ui.core.Widget": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * Provides scrolling ability during drag session to the widget.
   */
  qx.Mixin.define("qx.ui.core.MDragDropScrolling", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      var widget = this;
      if (this instanceof qx.ui.core.DragDropScrolling) {
        widget = this._getWidget();
      }
      widget.addListener("drag", this.__onDrag__P_203_0, this);
      widget.addListener("dragend", this.__onDragend__P_203_1, this);
      this.__xDirs__P_203_2 = ["left", "right"];
      this.__yDirs__P_203_3 = ["top", "bottom"];
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The threshold for the x-axis (in pixel) to activate scrolling at the edges. */
      dragScrollThresholdX: {
        check: "Integer",
        init: 30
      },
      /** The threshold for the y-axis (in pixel) to activate scrolling at the edges. */
      dragScrollThresholdY: {
        check: "Integer",
        init: 30
      },
      /** The factor for slowing down the scrolling. */
      dragScrollSlowDownFactor: {
        check: "Float",
        init: 0.1
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __dragScrollTimer__P_203_4: null,
      __xDirs__P_203_2: null,
      __yDirs__P_203_3: null,
      /**
       * Finds the first scrollable parent (in the parent chain).
       *
       * @param widget {qx.ui.core.LayoutItem} The widget to start from.
       * @return {qx.ui.core.Widget} A scrollable widget.
       */
      _findScrollableParent: function _findScrollableParent(widget) {
        var cur = widget;
        if (cur === null) {
          return null;
        }
        while (cur.getLayoutParent()) {
          cur = cur.getLayoutParent();
          if (this._isScrollable(cur)) {
            return cur;
          }
        }
        return null;
      },
      /**
       * Whether the widget is scrollable.
       *
       * @param widget {qx.ui.core.Widget} The widget to check.
       * @return {Boolean} Whether the widget is scrollable.
       */
      _isScrollable: function _isScrollable(widget) {
        return qx.Class.hasMixin(widget.constructor, qx.ui.core.scroll.MScrollBarFactory);
      },
      /**
       * Gets the bounds of the given scrollable.
       *
       * @param scrollable {qx.ui.core.Widget} Scrollable which has scrollbar child controls.
       * @return {Map} A map with all four bounds (e.g. {"left":0, "top":20, "right":0, "bottom":80}).
       */
      _getBounds: function _getBounds(scrollable) {
        var bounds = scrollable.getContentLocation();

        // the scrollable may dictate a nested widget for more precise bounds
        if (scrollable.getScrollAreaContainer) {
          bounds = scrollable.getScrollAreaContainer().getContentLocation();
        }
        return bounds;
      },
      /**
       * Gets the edge type or null if the pointer isn't within one of the thresholds.
       *
       * @param diff {Map} Difference map with all for edgeTypes.
       * @param thresholdX {Number} x-axis threshold.
       * @param thresholdY {Number} y-axis threshold.
       * @return {String} One of the four edgeTypes ('left', 'right', 'top', 'bottom').
       */
      _getEdgeType: function _getEdgeType(diff, thresholdX, thresholdY) {
        if (diff.left * -1 <= thresholdX && diff.left < 0) {
          return "left";
        } else if (diff.top * -1 <= thresholdY && diff.top < 0) {
          return "top";
        } else if (diff.right <= thresholdX && diff.right > 0) {
          return "right";
        } else if (diff.bottom <= thresholdY && diff.bottom > 0) {
          return "bottom";
        } else {
          return null;
        }
      },
      /**
       * Gets the axis ('x' or 'y') by the edge type.
       *
       * @param edgeType {String} One of the four edgeTypes ('left', 'right', 'top', 'bottom').
       * @throws {Error} If edgeType is not one of the distinct four ones.
       * @return {String} Returns 'y' or 'x'.
       */
      _getAxis: function _getAxis(edgeType) {
        if (this.__xDirs__P_203_2.indexOf(edgeType) !== -1) {
          return "x";
        } else if (this.__yDirs__P_203_3.indexOf(edgeType) !== -1) {
          return "y";
        } else {
          throw new Error("Invalid edge type given (" + edgeType + "). Must be: 'left', 'right', 'top' or 'bottom'");
        }
      },
      /**
       * Gets the threshold amount by edge type.
       *
       * @param edgeType {String} One of the four edgeTypes ('left', 'right', 'top', 'bottom').
       * @return {Number} The threshold of the x or y axis.
       */
      _getThresholdByEdgeType: function _getThresholdByEdgeType(edgeType) {
        if (this.__xDirs__P_203_2.indexOf(edgeType) !== -1) {
          return this.getDragScrollThresholdX();
        } else if (this.__yDirs__P_203_3.indexOf(edgeType) !== -1) {
          return this.getDragScrollThresholdY();
        }
      },
      /**
       * Whether the scrollbar is visible.
       *
       * @param scrollable {qx.ui.core.Widget} Scrollable which has scrollbar child controls.
       * @param axis {String} Can be 'y' or 'x'.
       * @return {Boolean} Whether the scrollbar is visible.
       */
      _isScrollbarVisible: function _isScrollbarVisible(scrollable, axis) {
        if (scrollable && scrollable._isChildControlVisible) {
          return scrollable._isChildControlVisible("scrollbar-" + axis);
        } else {
          return false;
        }
      },
      /**
       * Whether the scrollbar is exceeding it's maximum position.
       *
       * @param scrollbar {qx.ui.core.scroll.IScrollBar} Scrollbar to check.
       * @param axis {String} Can be 'y' or 'x'.
       * @param amount {Number} Amount to scroll which may be negative.
       * @return {Boolean} Whether the amount will exceed the scrollbar max position.
       */
      _isScrollbarExceedingMaxPos: function _isScrollbarExceedingMaxPos(scrollbar, axis, amount) {
        var newPos = 0;
        if (!scrollbar) {
          return true;
        }
        newPos = scrollbar.getPosition() + amount;
        return newPos > scrollbar.getMaximum() || newPos < 0;
      },
      /**
       * Calculates the threshold exceedance (which may be negative).
       *
       * @param diff {Number} Difference value of one edgeType.
       * @param threshold {Number} x-axis or y-axis threshold.
       * @return {Number} Threshold exceedance amount (positive or negative).
       */
      _calculateThresholdExceedance: function _calculateThresholdExceedance(diff, threshold) {
        var amount = threshold - Math.abs(diff);
        return diff < 0 ? amount * -1 : amount;
      },
      /**
       * Calculates the scroll amount (which may be negative).
       * The amount is influenced by the scrollbar size (bigger = faster)
       * the exceedanceAmount (bigger = faster) and the slowDownFactor.
       *
       * @param scrollbarSize {Number} Size of the scrollbar.
       * @param exceedanceAmount {Number} Threshold exceedance amount (positive or negative).
       * @return {Number} Scroll amount (positive or negative).
       */
      _calculateScrollAmount: function _calculateScrollAmount(scrollbarSize, exceedanceAmount) {
        return Math.floor(scrollbarSize / 100 * exceedanceAmount * this.getDragScrollSlowDownFactor());
      },
      /**
       * Scrolls the given scrollable on the given axis for the given amount.
       *
       * @param scrollable {qx.ui.core.Widget} Scrollable which has scrollbar child controls.
       * @param axis {String} Can be 'y' or 'x'.
       * @param exceedanceAmount {Number} Threshold exceedance amount (positive or negative).
       */
      _scrollBy: function _scrollBy(scrollable, axis, exceedanceAmount) {
        var scrollbar = scrollable.getChildControl("scrollbar-" + axis, true);
        if (!scrollbar) {
          return;
        }
        var bounds = scrollbar.getBounds(),
          scrollbarSize = axis === "x" ? bounds.width : bounds.height,
          amount = this._calculateScrollAmount(scrollbarSize, exceedanceAmount);
        if (this._isScrollbarExceedingMaxPos(scrollbar, axis, amount)) {
          this.__dragScrollTimer__P_203_4.stop();
        }
        scrollbar.scrollBy(amount);
      },
      /*
      ---------------------------------------------------------------------------
      EVENT HANDLERS
      ---------------------------------------------------------------------------
      */
      /**
       * Event handler for the drag event.
       *
       * @param e {qx.event.type.Drag} The drag event instance.
       */
      __onDrag__P_203_0: function __onDrag__P_203_0(e) {
        if (this.__dragScrollTimer__P_203_4) {
          // stop last scroll action
          this.__dragScrollTimer__P_203_4.stop();
        }
        var target;
        if (e.getOriginalTarget() instanceof qx.ui.core.Widget) {
          target = e.getOriginalTarget();
        } else {
          target = qx.ui.core.Widget.getWidgetByElement(e.getOriginalTarget());
        }
        if (!target) {
          return;
        }
        var scrollable;
        if (this._isScrollable(target)) {
          scrollable = target;
        } else {
          scrollable = this._findScrollableParent(target);
        }
        while (scrollable) {
          var bounds = this._getBounds(scrollable),
            xPos = e.getDocumentLeft(),
            yPos = e.getDocumentTop(),
            diff = {
              left: bounds.left - xPos,
              right: bounds.right - xPos,
              top: bounds.top - yPos,
              bottom: bounds.bottom - yPos
            },
            edgeType = null,
            axis = "",
            exceedanceAmount = 0;
          edgeType = this._getEdgeType(diff, this.getDragScrollThresholdX(), this.getDragScrollThresholdY());
          if (!edgeType) {
            scrollable = this._findScrollableParent(scrollable);
            continue;
          }
          axis = this._getAxis(edgeType);
          if (this._isScrollbarVisible(scrollable, axis)) {
            exceedanceAmount = this._calculateThresholdExceedance(diff[edgeType], this._getThresholdByEdgeType(edgeType));
            if (this.__dragScrollTimer__P_203_4) {
              this.__dragScrollTimer__P_203_4.dispose();
            }
            this.__dragScrollTimer__P_203_4 = new qx.event.Timer(50);
            this.__dragScrollTimer__P_203_4.addListener("interval", function (scrollable, axis, amount) {
              this._scrollBy(scrollable, axis, amount);
            }.bind(this, scrollable, axis, exceedanceAmount));
            this.__dragScrollTimer__P_203_4.start();
            e.stopPropagation();
            return;
          } else {
            scrollable = this._findScrollableParent(scrollable);
          }
        }
      },
      /**
       * Event handler for the dragend event.
       *
       * @param e {qx.event.type.Drag} The drag event instance.
       */
      __onDragend__P_203_1: function __onDragend__P_203_1(e) {
        if (this.__dragScrollTimer__P_203_4) {
          this.__dragScrollTimer__P_203_4.stop();
        }
      }
    },
    destruct: function destruct() {
      if (this.__dragScrollTimer__P_203_4) {
        this.__dragScrollTimer__P_203_4.dispose();
      }
    }
  });
  qx.ui.core.MDragDropScrolling.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.core.Init": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  /**
   * Provides scrolling ability during drag session to the widget.
   */
  qx.Class.define("qx.ui.core.DragDropScrolling", {
    extend: qx.core.Object,
    include: [qx.ui.core.MDragDropScrolling],
    construct: function construct(widget) {
      qx.core.Object.constructor.call(this);
      this._widget = widget;
    },
    members: {
      _widget: null,
      /**
       * Returns the root widget whose children will have scroll on drag session
       * behavior. Widget was set on constructor or will be application root by
       * default.
       *
       * @return {qx.ui.core.Widget} The root widget whose children will have
       * scroll on drag session
       */
      _getWidget: function _getWidget() {
        return this._widget || qx.core.Init.getApplication().getRoot();
      }
    }
  });
  qx.ui.core.DragDropScrolling.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.table.rowrenderer.Default": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.ui.table.selection.Model": {},
      "qx.ui.table.ITableModel": {},
      "qx.ui.table.IRowRenderer": {},
      "qx.ui.table.columnmenu.Button": {},
      "qx.ui.table.selection.Manager": {},
      "qx.ui.table.columnmodel.Basic": {},
      "qx.ui.table.pane.Pane": {},
      "qx.ui.table.pane.Header": {},
      "qx.ui.table.pane.Scroller": {},
      "qx.ui.table.pane.Model": {},
      "qx.ui.basic.Label": {},
      "qx.ui.table.model.Simple": {},
      "qx.event.Registration": {},
      "qx.log.Logger": {},
      "qx.ui.table.pane.FocusIndicator": {},
      "qx.lang.Number": {},
      "qx.event.Timer": {},
      "qx.core.Assert": {},
      "qx.ui.table.IColumnMenuItem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Table
   *
   * A detailed description can be found in the package description
   * {@link qx.ui.table}.
   *
   * @childControl statusbar {qx.ui.basic.Label} label to show the status of the table
   * @childControl column-button {qx.ui.table.columnmenu.Button} button to open the column menu
   */
  qx.Class.define("qx.ui.table.Table", {
    extend: qx.ui.core.Widget,
    include: qx.ui.core.MDragDropScrolling,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param tableModel {qx.ui.table.ITableModel ? null}
     *   The table model to read the data from.
     *
     * @param custom {Map ? null}
     *   A map provided to override the various supplemental classes allocated
     *   within this constructor.  Each property must be a function which
     *   returns an object instance, as indicated by shown the defaults listed
     *   here:
     *
     *   <dl>
     *     <dt>initiallyHiddenColumns</dt>
     *       <dd>
     *         {Array?}
     *         A list of column numbers that should be initially invisible. Any
     *         column not mentioned will be initially visible, and if no array
     *         is provided, all columns will be initially visible.
     *       </dd>
     *     <dt>selectionManager</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.selection.Manager(obj);
     *         }
     *       </pre></dd>
     *     <dt>selectionModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.selection.Model(obj);
     *         }
     *       </pre></dd>
     *     <dt>tableColumnModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.columnmodel.Basic(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Model(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePane</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Pane(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneHeader</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Header(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneScroller</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Scroller(obj);
     *         }
     *       </pre></dd>
     *     <dt>tablePaneModel</dt>
     *       <dd><pre class='javascript'>
     *         function(obj)
     *         {
     *           return new qx.ui.table.pane.Model(obj);
     *         }
     *       </pre></dd>
     *     <dt>columnMenu</dt>
     *       <dd><pre class='javascript'>
     *         function()
     *         {
     *           return new qx.ui.table.columnmenu.Button();
     *         }
     *       </pre></dd>
     *   </dl>
     */
    construct: function construct(tableModel, custom) {
      qx.ui.core.Widget.constructor.call(this);
      //
      // Use default objects if custom objects are not specified
      //
      if (!custom) {
        custom = {};
      }
      if (custom.initiallyHiddenColumns) {
        this.setInitiallyHiddenColumns(custom.initiallyHiddenColumns);
      }
      if (custom.selectionManager) {
        this.setNewSelectionManager(custom.selectionManager);
      }
      if (custom.selectionModel) {
        this.setNewSelectionModel(custom.selectionModel);
      }
      if (custom.tableColumnModel) {
        this.setNewTableColumnModel(custom.tableColumnModel);
      }
      if (custom.tablePane) {
        this.setNewTablePane(custom.tablePane);
      }
      if (custom.tablePaneHeader) {
        this.setNewTablePaneHeader(custom.tablePaneHeader);
      }
      if (custom.tablePaneScroller) {
        this.setNewTablePaneScroller(custom.tablePaneScroller);
      }
      if (custom.tablePaneModel) {
        this.setNewTablePaneModel(custom.tablePaneModel);
      }
      if (custom.columnMenu) {
        this.setNewColumnMenu(custom.columnMenu);
      }
      this._setLayout(new qx.ui.layout.VBox());

      // Create the child widgets
      this.__scrollerParent__P_200_0 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      this._add(this.__scrollerParent__P_200_0, {
        flex: 1
      });

      // Allocate a default data row renderer
      this.setDataRowRenderer(new qx.ui.table.rowrenderer.Default(this));

      // Create the models
      this.__selectionManager__P_200_1 = this.getNewSelectionManager()(this);
      this.setSelectionModel(this.getNewSelectionModel()(this));
      this.setTableModel(tableModel || this.getEmptyTableModel());

      // create the main meta column
      this.setMetaColumnCounts([-1]);

      // Make focusable
      this.setTabIndex(1);
      this.addListener("keydown", this._onKeyDown);
      this.addListener("focus", this._onFocusChanged);
      this.addListener("blur", this._onFocusChanged);

      // attach the resize listener to the last child of the layout. This
      // ensures that all other children are laid out before
      var spacer = new qx.ui.core.Widget().set({
        height: 0
      });
      this._add(spacer);
      spacer.addListener("resize", this._onResize, this);
      this.__focusedCol__P_200_2 = null;
      this.__focusedRow__P_200_3 = null;

      // add an event listener which updates the table content on locale change
      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
      this.initStatusBarVisible();

      // If the table model has an init() method...
      tableModel = this.getTableModel();
      if (tableModel.init && typeof tableModel.init == "function") {
        // ... then call it now to allow the table model to affect table
        // properties.
        tableModel.init(this);
      }

      // ARIA attrs
      this.getContentElement().setAttribute("role", "grid");
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Dispatched before adding the column list to the column visibility menu.
       * The event data is a map with two properties: table and menu.  Listeners
       * may add additional items to the menu, which appear at the top of the
       * menu.
       */
      columnVisibilityMenuCreateStart: "qx.event.type.Data",
      /**
       * Dispatched after adding the column list to the column visibility menu.
       * The event data is a map with two properties: table and menu.  Listeners
       * may add additional items to the menu, which appear at the bottom of the
       * menu.
       */
      columnVisibilityMenuCreateEnd: "qx.event.type.Data",
      /**
       * Dispatched when the width of the table has changed.
       */
      tableWidthChanged: "qx.event.type.Event",
      /**
       * Dispatched when updating scrollbars discovers that a vertical scrollbar
       * is needed when it previously was not, or vice versa.  The data is a
       * boolean indicating whether a vertical scrollbar is now being used.
       */
      verticalScrollBarChanged: "qx.event.type.Data",
      /**
       * Dispatched when a data cell has been tapped.
       */
      cellTap: "qx.ui.table.pane.CellEvent",
      /**
       * Dispatched when a data cell has been tapped.
       */
      cellDbltap: "qx.ui.table.pane.CellEvent",
      /**
       * Dispatched when the context menu is needed in a data cell
       */
      cellContextmenu: "qx.ui.table.pane.CellEvent",
      /**
       * Dispatched after a cell editor is flushed.
       *
       * The data is a map containing this properties:
       * <ul>
       *   <li>row</li>
       *   <li>col</li>
       *   <li>value</li>
       *   <li>oldValue</li>
       * </ul>
       */
      dataEdited: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** Events that must be redirected to the scrollers. */
      __redirectEvents__P_200_4: {
        cellTap: 1,
        cellDbltap: 1,
        cellContextmenu: 1
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "table"
      },
      focusable: {
        refine: true,
        init: true
      },
      minWidth: {
        refine: true,
        init: 50
      },
      /**
       * The list of columns that are initially hidden. This property is set by
       * the constructor, from the value received in
       * custom.initiallyHiddenColumns, and is only used when a column model is
       * initialized. It can be of great benefit in tables with numerous columns
       * where most are not initially visible. The process of creating the
       * headers for all of the columns, only to have those columns discarded
       * shortly thereafter when setColumnVisibility(false) is called, is a
       * waste of (significant, in some browsers) time. Specifying the
       * non-visible columns at constructor time can therefore avoid the initial
       * creation of all of those superfluous widgets.
       */
      initiallyHiddenColumns: {
        init: null
      },
      /**
       * Whether the widget contains content which may be selected by the user.
       *
       * If the value set to <code>true</code> the native browser selection can
       * be used for text selection. But it is normally useful for
       * forms fields, longer texts/documents, editors, etc.
       *
       * Note: This has no effect on Table!
       */
      selectable: {
        refine: true,
        init: false
      },
      /** The selection model. */
      selectionModel: {
        check: "qx.ui.table.selection.Model",
        apply: "_applySelectionModel",
        event: "changeSelectionModel"
      },
      /** The table model. */
      tableModel: {
        check: "qx.ui.table.ITableModel",
        apply: "_applyTableModel",
        event: "changeTableModel"
      },
      /** The height of the table rows. */
      rowHeight: {
        check: "Number",
        init: 20,
        apply: "_applyRowHeight",
        event: "changeRowHeight",
        themeable: true
      },
      /**
       * Force line height to match row height.  May be disabled if cell
       * renderers being used wish to render multiple lines of data within a
       * cell.  (With the default setting, all but the first of multiple lines
       * of data will not be visible.)
       */
      forceLineHeight: {
        check: "Boolean",
        init: true
      },
      /**
       *  Whether the header cells are visible. When setting this to false,
       *  you'll likely also want to set the {#columnVisibilityButtonVisible}
       *  property to false as well, to entirely remove the header row.
       */
      headerCellsVisible: {
        check: "Boolean",
        init: true,
        apply: "_applyHeaderCellsVisible",
        themeable: true
      },
      /** The height of the header cells. */
      headerCellHeight: {
        check: "Integer",
        init: 16,
        apply: "_applyHeaderCellHeight",
        event: "changeHeaderCellHeight",
        nullable: true,
        themeable: true
      },
      /** Whether to show the status bar */
      statusBarVisible: {
        check: "Boolean",
        init: true,
        apply: "_applyStatusBarVisible"
      },
      /** The Statusbartext, set it, if you want some more Information */
      additionalStatusBarText: {
        nullable: true,
        init: null,
        apply: "_applyAdditionalStatusBarText"
      },
      /** Whether to show the column visibility button */
      columnVisibilityButtonVisible: {
        check: "Boolean",
        init: true,
        apply: "_applyColumnVisibilityButtonVisible",
        themeable: true
      },
      /**
       * @type {Integer[]} The number of columns per meta column. If the last array entry is -1,
       * this meta column will get the remaining columns.
       */
      metaColumnCounts: {
        check: "Object",
        apply: "_applyMetaColumnCounts"
      },
      /**
       * Whether the focus should moved when the pointer is moved over a cell. If false
       * the focus is only moved on pointer taps.
       */
      focusCellOnPointerMove: {
        check: "Boolean",
        init: false,
        apply: "_applyFocusCellOnPointerMove"
      },
      /**
       * Whether row focus change by keyboard also modifies selection
       */
      rowFocusChangeModifiesSelection: {
        check: "Boolean",
        init: true
      },
      /**
       * Whether the cell focus indicator should be shown
       */
      showCellFocusIndicator: {
        check: "Boolean",
        init: true,
        apply: "_applyShowCellFocusIndicator"
      },
      /**
       * By default, the "cellContextmenu" event is fired only when a data cell
       * is right-clicked. It is not fired when a right-click occurs in the
       * empty area of the table below the last data row. By turning on this
       * property, "cellContextMenu" events will also be generated when a
       * right-click occurs in that empty area. In such a case, row identifier
       * in the event data will be null, so event handlers can check (row ===
       * null) to handle this case.
       */
      contextMenuFromDataCellsOnly: {
        check: "Boolean",
        init: true,
        apply: "_applyContextMenuFromDataCellsOnly"
      },
      /**
       * Whether the table should keep the first visible row complete. If set to false,
       * the first row may be rendered partial, depending on the vertical scroll value.
       */
      keepFirstVisibleRowComplete: {
        check: "Boolean",
        init: true,
        apply: "_applyKeepFirstVisibleRowComplete"
      },
      /**
       * Whether the table cells should be updated when only the selection or the
       * focus changed. This slows down the table update but allows to react on a
       * changed selection or a changed focus in a cell renderer.
       */
      alwaysUpdateCells: {
        check: "Boolean",
        init: false
      },
      /**
       * Whether to reset the selection when a header cell is tapped. Since
       * most data models do not have provisions to retain a selection after
       * sorting, the default is to reset the selection in this case. Some data
       * models, however, do have the capability to retain the selection, so
       * when using those, this property should be set to false.
       */
      resetSelectionOnHeaderTap: {
        check: "Boolean",
        init: true,
        apply: "_applyResetSelectionOnHeaderTap"
      },
      /**
       * Whether to reset the selection when the unpopulated table area is tapped.
       * The default is false which keeps the behaviour as before
       */
      resetSelectionOnTapBelowRows: {
        check: "Boolean",
        init: false,
        apply: "_applyResetSelectionOnTapBelowRows"
      },
      /**
       * If set then defines the minimum height of the focus indicator when editing
       */
      minCellEditHeight: {
        check: "Integer",
        nullable: true,
        init: null,
        apply: "_applyMinCellEditHeight"
      },
      /** The renderer to use for styling the rows. */
      dataRowRenderer: {
        check: "qx.ui.table.IRowRenderer",
        init: null,
        nullable: true,
        event: "changeDataRowRenderer"
      },
      /**
       * A function to call when before modal cell editor is opened.
       *
       * @signature function(cellEditor, cellInfo)
       *
       * @param cellEditor {qx.ui.window.Window}
       *   The modal window which has been created for this cell editor
       *
       * @param cellInfo {Map}
       *   Information about the cell for which this cell editor was created.
       *   It contains the following properties:
       *       col, row, xPos, value
       *
       */
      modalCellEditorPreOpenFunction: {
        check: "Function",
        init: null,
        nullable: true
      },
      /**
       * By default, all Scrollers' (meta-columns') horizontal scrollbars are
       * shown if any one is required. Allow not showing any that are not
       * required.
       */
      excludeScrollerScrollbarsIfNotNeeded: {
        check: "Boolean",
        init: false,
        nullable: false
      },
      /**
       * A function to instantiate a new column menu button.
       */
      newColumnMenu: {
        check: "Function",
        init: function init() {
          return new qx.ui.table.columnmenu.Button();
        }
      },
      /**
       * A function to instantiate a selection manager.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property must
       * be set before calling the Table constructor.
       */
      newSelectionManager: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.selection.Manager(obj);
        }
      },
      /**
       * A function to instantiate a selection model.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property must
       * be set before calling the Table constructor.
       */
      newSelectionModel: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.selection.Model(obj);
        }
      },
      /**
       * A function to instantiate a table column model.  This allows subclasses
       * of Table to subclass this internal class.  To take effect, this
       * property must be set before calling the Table constructor.
       */
      newTableColumnModel: {
        check: "Function",
        init: function init(table) {
          return new qx.ui.table.columnmodel.Basic(table);
        }
      },
      /**
       * A function to instantiate a table pane.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property
       * must be set before calling the Table constructor.
       */
      newTablePane: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.pane.Pane(obj);
        }
      },
      /**
       * A function to instantiate a table pane.  this allows subclasses of
       * Table to subclass this internal class.  To take effect, this property
       * must be set before calling the Table constructor.
       */
      newTablePaneHeader: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.pane.Header(obj);
        }
      },
      /**
       * A function to instantiate a table pane scroller.  this allows
       * subclasses of Table to subclass this internal class.  To take effect,
       * this property must be set before calling the Table constructor.
       */
      newTablePaneScroller: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.table.pane.Scroller(obj);
        }
      },
      /**
       * A function to instantiate a table pane model.  this allows subclasses
       * of Table to subclass this internal class.  To take effect, this
       * property must be set before calling the Table constructor.
       */
      newTablePaneModel: {
        check: "Function",
        init: function init(columnModel) {
          return new qx.ui.table.pane.Model(columnModel);
        }
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __focusedCol__P_200_2: null,
      __focusedRow__P_200_3: null,
      __scrollerParent__P_200_0: null,
      __selectionManager__P_200_1: null,
      __additionalStatusBarText__P_200_5: null,
      __lastRowCount__P_200_6: null,
      __lastColCount__P_200_7: null,
      __internalChange__P_200_8: null,
      __columnMenuButtons__P_200_9: null,
      __columnModel__P_200_10: null,
      __emptyTableModel__P_200_11: null,
      __hadVerticalScrollBar__P_200_12: null,
      __timer__P_200_13: null,
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "statusbar":
            control = new qx.ui.basic.Label();
            control.set({
              allowGrowX: true
            });
            this._add(control);
            break;
          case "column-button":
            control = this.getNewColumnMenu()();
            control.set({
              focusable: false
            });

            // Create the initial menu too
            var menu = control.factory("menu", {
              table: this
            });

            // Add a listener to initialize the column menu when it becomes visible
            menu.addListener("appear", this._initColumnMenu, this);
            break;
        }
        return control || qx.ui.table.Table.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // property modifier
      _applySelectionModel: function _applySelectionModel(value, old) {
        this.__selectionManager__P_200_1.setSelectionModel(value);
        if (old != null) {
          old.removeListener("changeSelection", this._onSelectionChanged, this);
        }
        value.addListener("changeSelection", this._onSelectionChanged, this);
      },
      // property modifier
      _applyRowHeight: function _applyRowHeight(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].updateVerScrollBarMaximum();
        }
      },
      // property modifier
      _applyHeaderCellsVisible: function _applyHeaderCellsVisible(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          if (value) {
            scrollerArr[i]._showChildControl("header");
          } else {
            scrollerArr[i]._excludeChildControl("header");
          }
        }
        // also hide the column visibility button
        if (this.getColumnVisibilityButtonVisible()) {
          this._applyColumnVisibilityButtonVisible(value);
        }
      },
      // property modifier
      _applyHeaderCellHeight: function _applyHeaderCellHeight(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getHeader().setHeight(value);
        }
      },
      // property modifier
      _applyMinCellEditHeight: function _applyMinCellEditHeight(value) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setMinCellEditHeight(value);
        }
      },
      /**
       * Get an empty table model instance to use for this table. Use this table
       * to configure the table with no table model.
       *
       * @return {qx.ui.table.ITableModel} The empty table model
       */
      getEmptyTableModel: function getEmptyTableModel() {
        if (!this.__emptyTableModel__P_200_11) {
          this.__emptyTableModel__P_200_11 = new qx.ui.table.model.Simple();
          this.__emptyTableModel__P_200_11.setColumns([]);
          this.__emptyTableModel__P_200_11.setData([]);
        }
        return this.__emptyTableModel__P_200_11;
      },
      // property modifier
      _applyTableModel: function _applyTableModel(value, old) {
        this.getTableColumnModel().init(value.getColumnCount(), this);
        if (old != null) {
          old.removeListener("metaDataChanged", this._onTableModelMetaDataChanged, this);
          old.removeListener("dataChanged", this._onTableModelDataChanged, this);
        }
        value.addListener("metaDataChanged", this._onTableModelMetaDataChanged, this);
        value.addListener("dataChanged", this._onTableModelDataChanged, this);

        // Update the status bar
        this._updateStatusBar();
        this._updateTableData(0, value.getRowCount(), 0, value.getColumnCount());
        this._onTableModelMetaDataChanged();

        // If the table model has an init() method, call it. We don't, however,
        // call it if this is the initial setting of the table model, as the
        // scrollers are not yet initialized. In that case, the init method is
        // called explicitly by the Table constructor.
        if (old && value.init && typeof value.init == "function") {
          value.init(this);
        }
      },
      /**
       * Get the The table column model.
       *
       * @return {qx.ui.table.columnmodel.Basic} The table's column model
       */
      getTableColumnModel: function getTableColumnModel() {
        if (!this.__columnModel__P_200_10) {
          var columnModel = this.__columnModel__P_200_10 = this.getNewTableColumnModel()(this);
          columnModel.addListener("visibilityChanged", this._onColVisibilityChanged, this);
          columnModel.addListener("widthChanged", this._onColWidthChanged, this);
          columnModel.addListener("orderChanged", this._onColOrderChanged, this);

          // Get the current table model
          var tableModel = this.getTableModel();
          columnModel.init(tableModel.getColumnCount(), this);

          // Reset the table column model in each table pane model
          var scrollerArr = this._getPaneScrollerArr();
          for (var i = 0; i < scrollerArr.length; i++) {
            var paneScroller = scrollerArr[i];
            var paneModel = paneScroller.getTablePaneModel();
            paneModel.setTableColumnModel(columnModel);
          }
        }
        return this.__columnModel__P_200_10;
      },
      // property modifier
      _applyStatusBarVisible: function _applyStatusBarVisible(value, old) {
        if (value) {
          this._showChildControl("statusbar");
        } else {
          this._excludeChildControl("statusbar");
        }
        if (value) {
          this._updateStatusBar();
        }
      },
      // property modifier
      _applyAdditionalStatusBarText: function _applyAdditionalStatusBarText(value, old) {
        this.__additionalStatusBarText__P_200_5 = value;
        this._updateStatusBar();
      },
      // property modifier
      _applyColumnVisibilityButtonVisible: function _applyColumnVisibilityButtonVisible(value, old) {
        if (value) {
          this._showChildControl("column-button");
        } else {
          this._excludeChildControl("column-button");
        }
      },
      // property modifier
      _applyMetaColumnCounts: function _applyMetaColumnCounts(value, old) {
        var metaColumnCounts = value;
        var scrollerArr = this._getPaneScrollerArr();
        var handlers = {};
        if (value > old) {
          // Save event listeners on the redirected events so we can re-apply
          // them to new scrollers.
          var manager = qx.event.Registration.getManager(scrollerArr[0]);
          for (var evName in qx.ui.table.Table.__redirectEvents__P_200_4) {
            handlers[evName] = {};
            handlers[evName].capture = manager.getListeners(scrollerArr[0], evName, true);
            handlers[evName].bubble = manager.getListeners(scrollerArr[0], evName, false);
          }
        }

        // Remove the panes not needed any more
        this._cleanUpMetaColumns(metaColumnCounts.length);

        // Update the old panes
        var leftX = 0;
        for (var i = 0; i < scrollerArr.length; i++) {
          var paneScroller = scrollerArr[i];
          var paneModel = paneScroller.getTablePaneModel();
          paneModel.setFirstColumnX(leftX);
          paneModel.setMaxColumnCount(metaColumnCounts[i]);
          leftX += metaColumnCounts[i];
        }

        // Add the new panes
        if (metaColumnCounts.length > scrollerArr.length) {
          var columnModel = this.getTableColumnModel();
          for (var i = scrollerArr.length; i < metaColumnCounts.length; i++) {
            var paneModel = this.getNewTablePaneModel()(columnModel);
            paneModel.setFirstColumnX(leftX);
            paneModel.setMaxColumnCount(metaColumnCounts[i]);
            leftX += metaColumnCounts[i];
            var paneScroller = this.getNewTablePaneScroller()(this);
            paneScroller.setTablePaneModel(paneModel);

            // Register event listener for vertical scrolling
            paneScroller.addListener("changeScrollY", this._onScrollY, this);

            // Apply redirected events to this new scroller
            for (evName in qx.ui.table.Table.__redirectEvents__P_200_4) {
              // On first setting of meta columns (constructing phase), there
              // are no handlers to deal with yet.
              if (!handlers[evName]) {
                break;
              }
              if (handlers[evName].capture && handlers[evName].capture.length > 0) {
                var capture = handlers[evName].capture;
                for (var j = 0; j < capture.length; j++) {
                  // Determine what context to use.  If the context does not
                  // exist, we assume that the context is this table.  If it
                  // does exist and it equals the first pane scroller (from
                  // which we retrieved the listeners) then set the context
                  // to be this new pane scroller.  Otherwise leave the context
                  // as it was set.
                  var context = capture[j].context;
                  if (!context) {
                    context = this;
                  } else if (context == scrollerArr[0]) {
                    context = paneScroller;
                  }
                  paneScroller.addListener(evName, capture[j].handler, context, true);
                }
              }
              if (handlers[evName].bubble && handlers[evName].bubble.length > 0) {
                var bubble = handlers[evName].bubble;
                for (var j = 0; j < bubble.length; j++) {
                  // Determine what context to use.  If the context does not
                  // exist, we assume that the context is this table.  If it
                  // does exist and it equals the first pane scroller (from
                  // which we retrieved the listeners) then set the context
                  // to be this new pane scroller.  Otherwise leave the context
                  // as it was set.
                  var context = bubble[j].context;
                  if (!context) {
                    context = this;
                  } else if (context == scrollerArr[0]) {
                    context = paneScroller;
                  }
                  paneScroller.addListener(evName, bubble[j].handler, context, false);
                }
              }
            }

            // last meta column is flexible
            var flex = i == metaColumnCounts.length - 1 ? 1 : 0;
            this.__scrollerParent__P_200_0.add(paneScroller, {
              flex: flex
            });
            scrollerArr = this._getPaneScrollerArr();
          }
        }

        // Update all meta columns
        for (var i = 0; i < scrollerArr.length; i++) {
          var paneScroller = scrollerArr[i];
          var isLast = i == scrollerArr.length - 1;

          // Set the right header height
          paneScroller.getHeader().setHeight(this.getHeaderCellHeight());

          // Put the column visibility button in the top right corner of the last meta column
          paneScroller.setTopRightWidget(isLast ? this.getChildControl("column-button") : null);
        }
        if (!this.isColumnVisibilityButtonVisible()) {
          this._excludeChildControl("column-button");
        }
        this._updateScrollerWidths();
        this._updateScrollBarVisibility();
      },
      // property modifier
      _applyFocusCellOnPointerMove: function _applyFocusCellOnPointerMove(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setFocusCellOnPointerMove(value);
        }
      },
      // property modifier
      _applyShowCellFocusIndicator: function _applyShowCellFocusIndicator(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setShowCellFocusIndicator(value);
        }
      },
      // property modifier
      _applyContextMenuFromDataCellsOnly: function _applyContextMenuFromDataCellsOnly(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setContextMenuFromDataCellsOnly(value);
        }
      },
      // property modifier
      _applyKeepFirstVisibleRowComplete: function _applyKeepFirstVisibleRowComplete(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onKeepFirstVisibleRowCompleteChanged();
        }
      },
      // property modifier
      _applyResetSelectionOnHeaderTap: function _applyResetSelectionOnHeaderTap(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setResetSelectionOnHeaderTap(value);
        }
      },
      // property modifier
      _applyResetSelectionOnTapBelowRows: function _applyResetSelectionOnTapBelowRows(value, old) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].setResetSelectionOnTapBelowRows(value);
        }
      },
      /**
       * Returns the selection manager.
       *
       * @return {qx.ui.table.selection.Manager} the selection manager.
       */
      getSelectionManager: function getSelectionManager() {
        return this.__selectionManager__P_200_1;
      },
      /**
       * Returns an array containing all TablePaneScrollers in this table.
       *
       * @return {qx.ui.table.pane.Scroller[]} all TablePaneScrollers in this table.
       */
      _getPaneScrollerArr: function _getPaneScrollerArr() {
        return this.__scrollerParent__P_200_0.getChildren();
      },
      /**
       * Returns a TablePaneScroller of this table.
       *
       * @param metaColumn {Integer} the meta column to get the TablePaneScroller for.
       * @return {qx.ui.table.pane.Scroller} the qx.ui.table.pane.Scroller.
       */
      getPaneScroller: function getPaneScroller(metaColumn) {
        return this._getPaneScrollerArr()[metaColumn];
      },
      /**
       * Cleans up the meta columns.
       *
       * @param fromMetaColumn {Integer} the first meta column to clean up. All following
       *      meta columns will be cleaned up, too. All previous meta columns will
       *      stay unchanged. If 0 all meta columns will be cleaned up.
       */
      _cleanUpMetaColumns: function _cleanUpMetaColumns(fromMetaColumn) {
        var scrollerArr = this._getPaneScrollerArr();
        if (scrollerArr != null) {
          for (var i = scrollerArr.length - 1; i >= fromMetaColumn; i--) {
            scrollerArr[i].destroy();
          }
        }
      },
      /**
       * Event handler. Called when the locale has changed.
       *
       * @param evt {Event} the event.
       */
      _onChangeLocale: function _onChangeLocale(evt) {
        this.updateContent();
        this._updateStatusBar();
      },
      // overridden
      _onChangeTheme: function _onChangeTheme() {
        qx.ui.table.Table.superclass.prototype._onChangeTheme.call(this);
        this.getDataRowRenderer().initThemeValues();
        this.updateContent();
        this._updateStatusBar();
      },
      /**
       * Event handler. Called when the selection has changed.
       *
       * @param evt {Map} the event.
       */
      _onSelectionChanged: function _onSelectionChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onSelectionChanged();
        }
        this._updateStatusBar();
      },
      /**
       * Event handler. Called when the table model meta data has changed.
       *
       * @param evt {Map} the event.
       */
      _onTableModelMetaDataChanged: function _onTableModelMetaDataChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onTableModelMetaDataChanged();
        }
        this._updateStatusBar();
      },
      /**
       * Event handler. Called when the table model data has changed.
       *
       * @param evt {Map} the event.
       */
      _onTableModelDataChanged: function _onTableModelDataChanged(evt) {
        var data = evt.getData();
        this._updateTableData(data.firstRow, data.lastRow, data.firstColumn, data.lastColumn, data.removeStart, data.removeCount);
      },
      // overridden
      _onContextMenuOpen: function _onContextMenuOpen(e) {
        // This is Widget's context menu handler which typically retrieves
        // and displays the menu as soon as it receives a "contextmenu" event.
        // We want to allow the cellContextmenu handler to create the menu,
        // so we'll override this method with a null one, and do the menu
        // placement and display handling in our _onContextMenu method.
      },
      /**
       * To update the table if the table model has changed and remove selection.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       * @param removeStart {Integer ? null} The first index of the interval (including), to remove selection.
       * @param removeCount {Integer ? null} The count of the interval, to remove selection.
       */
      _updateTableData: function _updateTableData(firstRow, lastRow, firstColumn, lastColumn, removeStart, removeCount) {
        var scrollerArr = this._getPaneScrollerArr();

        // update selection if rows were removed
        if (removeCount) {
          this.getSelectionModel().removeSelectionInterval(removeStart, removeStart + removeCount - 1, true);

          // remove focus if the focused row has been removed
          if (this.__focusedRow__P_200_3 >= removeStart && this.__focusedRow__P_200_3 < removeStart + removeCount) {
            this.setFocusedCell();
          }
        }
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn);
        }
        var rowCount = this.getTableModel().getRowCount();
        if (rowCount != this.__lastRowCount__P_200_6) {
          this.__lastRowCount__P_200_6 = rowCount;
          this._updateScrollBarVisibility();
          this._updateStatusBar();

          // ARIA attrs
          this.getContentElement().setAttribute("aria-rowcount", rowCount);
        }
        var colCount = this.getTableModel().getColumnCount();
        if (colCount != this.__lastColCount__P_200_7) {
          this.__lastColCount__P_200_7 = colCount;

          // ARIA attrs
          this.getContentElement().setAttribute("aria-colcount", colCount);
        }
      },
      /**
       * Event handler. Called when a TablePaneScroller has been scrolled vertically.
       *
       * @param evt {Map} the event.
       */
      _onScrollY: function _onScrollY(evt) {
        if (!this.__internalChange__P_200_8) {
          this.__internalChange__P_200_8 = true;

          // Set the same scroll position to all meta columns
          var scrollerArr = this._getPaneScrollerArr();
          for (var i = 0; i < scrollerArr.length; i++) {
            scrollerArr[i].setScrollY(evt.getData());
          }
          this.__internalChange__P_200_8 = false;
        }
      },
      /**
       * Event handler. Called when a key was pressed.
       *
       * @param evt {qx.event.type.KeySequence} the event.
       * @deprecated {6.0} please use _onKeyDown instead!
       */
      _onKeyPress: function _onKeyPress(evt) {
        qx.log.Logger.deprecatedMethodWarning(this._onKeyPress, "The method '_onKeyPress()' is deprecated. Please use '_onKeyDown()' instead.");
        qx.log.Logger.deprecateMethodOverriding(this, qx.ui.table.Table, "_onKeyPress", "The method '_onKeyPress()' is deprecated. Please use '_onKeyDown()' instead.");
        this._onKeyDown(evt);
      },
      /**
       * Event handler. Called when on key down event
       *
       * @param evt {qx.event.type.KeySequence} the event.
       */
      _onKeyDown: function _onKeyDown(evt) {
        if (!this.getEnabled()) {
          return;
        }

        // No editing mode
        var oldFocusedRow = this.__focusedRow__P_200_3;
        var consumed = false;

        // Handle keys that are independent from the modifiers
        var identifier = evt.getKeyIdentifier();
        if (this.isEditing()) {
          // Editing mode
          if (evt.getModifiers() == 0) {
            switch (identifier) {
              case "Enter":
                this.stopEditing();
                var oldFocusedRow = this.__focusedRow__P_200_3;
                this.moveFocusedCell(0, 1);
                if (this.__focusedRow__P_200_3 != oldFocusedRow) {
                  consumed = this.startEditing();
                }
                break;
              case "Escape":
                this.cancelEditing();
                this.focus();
                break;
              default:
                consumed = false;
                break;
            }
          }
        } else {
          consumed = true;
          // No editing mode
          if (evt.isCtrlPressed()) {
            // Handle keys that depend on modifiers

            switch (identifier) {
              case "A":
                // Ctrl + A
                var rowCount = this.getTableModel().getRowCount();
                if (rowCount > 0) {
                  this.getSelectionModel().setSelectionInterval(0, rowCount - 1);
                }
                break;
              default:
                consumed = false;
                break;
            }
          } else {
            // Handle keys that are independent from the modifiers
            switch (identifier) {
              case "Space":
                this.__selectionManager__P_200_1.handleSelectKeyDown(this.__focusedRow__P_200_3, evt);
                break;
              case "F2":
              case "Enter":
                this.startEditing();
                consumed = true;
                break;
              case "Home":
                this.setFocusedCell(this.__focusedCol__P_200_2, 0, true);
                break;
              case "End":
                var rowCount = this.getTableModel().getRowCount();
                this.setFocusedCell(this.__focusedCol__P_200_2, rowCount - 1, true);
                break;
              case "Left":
                this.moveFocusedCell(-1, 0);
                break;
              case "Right":
                this.moveFocusedCell(1, 0);
                break;
              case "Up":
                this.moveFocusedCell(0, -1);
                break;
              case "Down":
                this.moveFocusedCell(0, 1);
                break;
              case "PageUp":
              case "PageDown":
                var scroller = this.getPaneScroller(0);
                var pane = scroller.getTablePane();
                var rowHeight = this.getRowHeight();
                var direction = identifier == "PageUp" ? -1 : 1;
                rowCount = pane.getVisibleRowCount() - 1;
                scroller.setScrollY(scroller.getScrollY() + direction * rowCount * rowHeight);
                this.moveFocusedCell(0, direction * rowCount);
                break;
              default:
                consumed = false;
            }
          }
        }
        if (oldFocusedRow != this.__focusedRow__P_200_3 && this.getRowFocusChangeModifiesSelection()) {
          // The focus moved -> Let the selection manager handle this event
          this.__selectionManager__P_200_1.handleMoveKeyDown(this.__focusedRow__P_200_3, evt);
        }
        if (consumed) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      },
      /**
       * Event handler. Called when the table gets the focus.
       *
       * @param evt {Map} the event.
       */
      _onFocusChanged: function _onFocusChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onFocusChanged();
        }
      },
      /**
       * Event handler. Called when the visibility of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onColVisibilityChanged: function _onColVisibilityChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onColVisibilityChanged();
        }
        var data = evt.getData();
        if (this.__columnMenuButtons__P_200_9 != null && data.col != null && data.visible != null) {
          this.__columnMenuButtons__P_200_9[data.col].setColumnVisible(data.visible);
        }
        this._updateScrollerWidths();
        this._updateScrollBarVisibility();
      },
      /**
       * Event handler. Called when the width of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onColWidthChanged: function _onColWidthChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          var data = evt.getData();
          scrollerArr[i].setColumnWidth(data.col, data.newWidth);
        }
        this._updateScrollerWidths();
        this._updateScrollBarVisibility();
      },
      /**
       * Event handler. Called when the column order has changed.
       *
       * @param evt {Map} the event.
       */
      _onColOrderChanged: function _onColOrderChanged(evt) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].onColOrderChanged();
        }

        // A column may have been moved between meta columns
        this._updateScrollerWidths();
        this._updateScrollBarVisibility();
      },
      /**
       * Gets the TablePaneScroller at a certain x position in the page. If there is
       * no TablePaneScroller at this position, null is returned.
       *
       * @param pageX {Integer} the position in the page to check (in pixels).
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller or null.
       */
      getTablePaneScrollerAtPageX: function getTablePaneScrollerAtPageX(pageX) {
        var metaCol = this._getMetaColumnAtPageX(pageX);
        return metaCol != -1 ? this.getPaneScroller(metaCol) : null;
      },
      /**
       * Sets the currently focused cell. A value of <code>null</code> hides the
       * focus cell.
       *
       * @param col {Integer?null} the model index of the focused cell's column.
       * @param row {Integer?null} the model index of the focused cell's row.
       * @param scrollVisible {Boolean ? false} whether to scroll the new focused cell
       *          visible.
       */
      setFocusedCell: function setFocusedCell(col, row, scrollVisible) {
        if (!this.isEditing() && (col != this.__focusedCol__P_200_2 || row != this.__focusedRow__P_200_3)) {
          if (col === null) {
            col = 0;
          }
          this.__focusedCol__P_200_2 = col;
          this.__focusedRow__P_200_3 = row;
          var scrollerArr = this._getPaneScrollerArr();
          for (var i = 0; i < scrollerArr.length; i++) {
            scrollerArr[i].setFocusedCell(col, row);
          }
          if (col != null && scrollVisible) {
            this.scrollCellVisible(col, row);
          }

          // ARIA attrs
          var cellId = "qooxdoo-table-cell-" + this.toHashCode() + "-" + row + "-" + col;
          this.getContentElement().setAttribute("aria-activedescendant", cellId);
        }
      },
      /**
       * Resets (clears) the current selection
       */
      resetSelection: function resetSelection() {
        this.getSelectionModel().resetSelection();
      },
      /**
       * Resets the focused cell.
       */
      resetCellFocus: function resetCellFocus() {
        this.setFocusedCell(null, null, false);
      },
      /**
       * Returns the column of the currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedColumn: function getFocusedColumn() {
        return this.__focusedCol__P_200_2;
      },
      /**
       * Returns the row of the currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedRow: function getFocusedRow() {
        return this.__focusedRow__P_200_3;
      },
      /**
       * Select whether the focused row is highlighted
       *
       * @param bHighlight {Boolean}
       *   Flag indicating whether the focused row should be highlighted.
       *
       */
      highlightFocusedRow: function highlightFocusedRow(bHighlight) {
        this.getDataRowRenderer().setHighlightFocusRow(bHighlight);
      },
      /**
       * Remove the highlighting of the current focus row.
       *
       * This is used to temporarily remove the highlighting of the currently
       * focused row, and is expected to be used most typically by adding a
       * listener on the "pointerout" event, so that the focus highlighting is
       * suspended when the pointer leaves the table:
       *
       *     table.addListener("pointerout", table.clearFocusedRowHighlight);
       *
       * @param evt {qx.event.type.Pointer} Incoming pointer event
       */
      clearFocusedRowHighlight: function clearFocusedRowHighlight(evt) {
        if (evt) {
          var relatedTarget = evt.getRelatedTarget();
          if (relatedTarget instanceof qx.ui.table.pane.Pane || relatedTarget instanceof qx.ui.table.pane.FocusIndicator) {
            return;
          }
        }

        // Remove focus from any cell that has it
        this.resetCellFocus();

        // Now, for each pane scroller...
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          // ... repaint without focus.
          scrollerArr[i].onFocusChanged();
        }
      },
      /**
       * Moves the focus.
       *
       * @param deltaX {Integer} The delta by which the focus should be moved on the x axis.
       * @param deltaY {Integer} The delta by which the focus should be moved on the y axis.
       */
      moveFocusedCell: function moveFocusedCell(deltaX, deltaY) {
        var col = this.__focusedCol__P_200_2;
        var row = this.__focusedRow__P_200_3;

        // could also be undefined [BUG #4676]. In that case default to first cell focus
        if (col === null || col === undefined || row === null || row === undefined) {
          this.setFocusedCell(0, 0, true);
          return;
        }
        if (deltaX != 0) {
          var columnModel = this.getTableColumnModel();
          var x = columnModel.getVisibleX(col);
          var colCount = columnModel.getVisibleColumnCount();
          x = qx.lang.Number.limit(x + deltaX, 0, colCount - 1);
          col = columnModel.getVisibleColumnAtX(x);
        }
        if (deltaY != 0) {
          var tableModel = this.getTableModel();
          row = qx.lang.Number.limit(row + deltaY, 0, tableModel.getRowCount() - 1);
        }
        this.setFocusedCell(col, row, true);
      },
      /**
       * Scrolls a cell visible.
       *
       * @param col {Integer} the model index of the column the cell belongs to.
       * @param row {Integer} the model index of the row the cell belongs to.
       */
      scrollCellVisible: function scrollCellVisible(col, row) {
        var _this = this;
        // get the dom element
        var elem = this.getContentElement().getDomElement();
        // if the dom element is not available, the table hasn't been rendered
        if (!elem) {
          // postpone the scroll until the table has appeared
          this.addListenerOnce("appear", function () {
            _this.scrollCellVisible(col, row);
          });
        }
        var columnModel = this.getTableColumnModel();
        var x = columnModel.getVisibleX(col);
        var metaColumn = this._getMetaColumnAtColumnX(x);
        if (metaColumn != -1) {
          this.getPaneScroller(metaColumn).scrollCellVisible(col, row);
        }
      },
      /**
       * Returns whether currently a cell is editing.
       *
       * @return {var} whether currently a cell is editing.
       */
      isEditing: function isEditing() {
        if (this.__focusedCol__P_200_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_200_2);
          var metaColumn = this._getMetaColumnAtColumnX(x);
          return this.getPaneScroller(metaColumn).isEditing();
        }
        return false;
      },
      /**
       * Starts editing the currently focused cell. Does nothing if already editing
       * or if the column is not editable.
       *
       * @return {Boolean} whether editing was started
       */
      startEditing: function startEditing() {
        if (this.__focusedCol__P_200_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_200_2);
          var metaColumn = this._getMetaColumnAtColumnX(x);
          var started = this.getPaneScroller(metaColumn).startEditing();
          return started;
        }
        return false;
      },
      /**
       * Stops editing and writes the editor's value to the model.
       */
      stopEditing: function stopEditing() {
        if (this.__focusedCol__P_200_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_200_2);
          var metaColumn = this._getMetaColumnAtColumnX(x);
          this.getPaneScroller(metaColumn).stopEditing();
        }
      },
      /**
       * Stops editing without writing the editor's value to the model.
       */
      cancelEditing: function cancelEditing() {
        if (this.__focusedCol__P_200_2 != null) {
          var x = this.getTableColumnModel().getVisibleX(this.__focusedCol__P_200_2);
          var metaColumn = this._getMetaColumnAtColumnX(x);
          this.getPaneScroller(metaColumn).cancelEditing();
        }
      },
      /**
       * Update the table content of every attached table pane.
       */
      updateContent: function updateContent() {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getTablePane().updateContent(true);
        }
      },
      /**
       * Activates the blocker widgets on all column headers and the
       * column button
       */
      blockHeaderElements: function blockHeaderElements() {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getHeader().getBlocker().blockContent(20);
        }
        this.getChildControl("column-button").getBlocker().blockContent(20);
      },
      /**
       * Deactivates the blocker widgets on all column headers and the
       * column button
       */
      unblockHeaderElements: function unblockHeaderElements() {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          scrollerArr[i].getHeader().getBlocker().unblock();
        }
        this.getChildControl("column-button").getBlocker().unblock();
      },
      /**
       * Gets the meta column at a certain x position in the page. If there is no
       * meta column at this position, -1 is returned.
       *
       * @param pageX {Integer} the position in the page to check (in pixels).
       * @return {Integer} the index of the meta column or -1.
       */
      _getMetaColumnAtPageX: function _getMetaColumnAtPageX(pageX) {
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          var pos = scrollerArr[i].getContentLocation();
          if (pageX >= pos.left && pageX <= pos.right) {
            return i;
          }
        }
        return -1;
      },
      /**
       * Returns the meta column a column is shown in. If the column is not shown at
       * all, -1 is returned.
       *
       * @param visXPos {Integer} the visible x position of the column.
       * @return {Integer} the meta column the column is shown in.
       */
      _getMetaColumnAtColumnX: function _getMetaColumnAtColumnX(visXPos) {
        var metaColumnCounts = this.getMetaColumnCounts();
        var rightXPos = 0;
        for (var i = 0; i < metaColumnCounts.length; i++) {
          var counts = metaColumnCounts[i];
          rightXPos += counts;
          if (counts == -1 || visXPos < rightXPos) {
            return i;
          }
        }
        return -1;
      },
      /**
       * Updates the text shown in the status bar.
       */
      _updateStatusBar: function _updateStatusBar() {
        var tableModel = this.getTableModel();
        if (this.getStatusBarVisible()) {
          var selectedRowCount = this.getSelectionModel().getSelectedCount();
          var rowCount = tableModel.getRowCount();
          var text;
          if (rowCount >= 0) {
            if (selectedRowCount == 0) {
              text = this.trn("one row", "%1 rows", rowCount, rowCount);
            } else {
              text = this.trn("one of one row", "%1 of %2 rows", rowCount, selectedRowCount, rowCount);
            }
          }
          if (this.__additionalStatusBarText__P_200_5) {
            if (text) {
              text += this.__additionalStatusBarText__P_200_5;
            } else {
              text = this.__additionalStatusBarText__P_200_5;
            }
          }
          if (text) {
            this.getChildControl("statusbar").setValue(text);
          }
        }
      },
      /**
       * Updates the widths of all scrollers.
       */
      _updateScrollerWidths: function _updateScrollerWidths() {
        // Give all scrollers except for the last one the wanted width
        // (The last one has a flex with)
        var scrollerArr = this._getPaneScrollerArr();
        for (var i = 0; i < scrollerArr.length; i++) {
          var isLast = i == scrollerArr.length - 1;
          var width = scrollerArr[i].getTablePaneModel().getTotalWidth();
          scrollerArr[i].setPaneWidth(width);
          var flex = isLast ? 1 : 0;
          scrollerArr[i].setLayoutProperties({
            flex: flex
          });
        }
      },
      /**
       * Updates the visibility of the scrollbars in the meta columns.
       */
      _updateScrollBarVisibility: function _updateScrollBarVisibility() {
        if (!this.getBounds()) {
          return;
        }
        var horBar = qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
        var verBar = qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
        var scrollerArr = this._getPaneScrollerArr();

        // Check which scroll bars are needed
        var horNeeded = false;
        var verNeeded = false;
        var excludeScrollerScrollbarsIfNotNeeded;

        // Determine whether we need to render horizontal scrollbars for meta
        // columns that don't themselves actually require it
        excludeScrollerScrollbarsIfNotNeeded = this.getExcludeScrollerScrollbarsIfNotNeeded();
        if (!excludeScrollerScrollbarsIfNotNeeded) {
          for (var i = 0; i < scrollerArr.length; i++) {
            var isLast = i == scrollerArr.length - 1;

            // Only show the last vertical scrollbar
            var bars = scrollerArr[i].getNeededScrollBars(horNeeded, !isLast);
            if (bars & horBar) {
              horNeeded = true;
            }
            if (isLast && bars & verBar) {
              verNeeded = true;
            }
          }
        }

        // Set the needed scrollbars
        for (var i = 0; i < scrollerArr.length; i++) {
          isLast = i == scrollerArr.length - 1;

          // If we don't want to include scrollbars for meta columns that don't
          // require it, find out whether this meta column requires it.
          if (excludeScrollerScrollbarsIfNotNeeded) {
            horNeeded = !!(scrollerArr[i].getNeededScrollBars(false, !isLast) & horBar);

            // Show the horizontal scrollbar if needed. Specify null to indicate
            // that the scrollbar should be hidden rather than excluded.
            scrollerArr[i].setHorizontalScrollBarVisible(horNeeded || null);
          } else {
            // Show the horizontal scrollbar if needed.
            scrollerArr[i].setHorizontalScrollBarVisible(horNeeded);
          }

          // If this is the last meta-column...
          if (isLast) {
            // ... then get the current (old) use of vertical scroll bar
            verNeeded = !!(scrollerArr[i].getNeededScrollBars(false, false) & verBar);
            if (this.__hadVerticalScrollBar__P_200_12 == null) {
              this.__hadVerticalScrollBar__P_200_12 = scrollerArr[i].getVerticalScrollBarVisible();
              this.__timer__P_200_13 = qx.event.Timer.once(function () {
                // reset the last visible state of the vertical scroll bar
                // in a timeout to prevent infinite loops.
                this.__hadVerticalScrollBar__P_200_12 = null;
                this.__timer__P_200_13 = null;
              }, this, 0);
            }
          }
          scrollerArr[i].setVerticalScrollBarVisible(isLast && verNeeded);

          // If this is the last meta-column and the use of a vertical scroll bar
          // has changed...
          if (isLast && verNeeded != this.__hadVerticalScrollBar__P_200_12) {
            // ... then dispatch an event to any awaiting listeners
            this.fireDataEvent("verticalScrollBarChanged", verNeeded);
          }
        }
      },
      /**
       * Initialize the column menu
       */
      _initColumnMenu: function _initColumnMenu() {
        var tableModel = this.getTableModel();
        var columnModel = this.getTableColumnModel();
        var columnButton = this.getChildControl("column-button");

        // Remove all items from the menu. We'll rebuild it here.
        columnButton.empty();

        // Inform listeners who may want to insert menu items at the beginning
        var menu = columnButton.getMenu();
        var data = {
          table: this,
          menu: menu,
          columnButton: columnButton
        };
        this.fireDataEvent("columnVisibilityMenuCreateStart", data);
        this.__columnMenuButtons__P_200_9 = {};
        for (var iCol = 0, l = tableModel.getColumnCount(); iCol < l; iCol++) {
          var col = columnModel.getOverallColumnAtX(iCol);
          var menuButton = columnButton.factory("menu-button", {
            text: tableModel.getColumnName(col),
            column: col,
            bVisible: columnModel.isColumnVisible(col)
          });
          qx.core.Assert.assertInterface(menuButton, qx.ui.table.IColumnMenuItem);
          menuButton.addListener("changeColumnVisible", this._createColumnVisibilityCheckBoxHandler(col), this);
          this.__columnMenuButtons__P_200_9[col] = menuButton;
        }

        // Inform listeners who may want to insert menu items at the end
        data = {
          table: this,
          menu: menu,
          columnButton: columnButton
        };
        this.fireDataEvent("columnVisibilityMenuCreateEnd", data);
      },
      /**
       * Creates a handler for a check box of the column visibility menu.
       *
       * @param col {Integer} the model index of column to create the handler for.
       * @return {Function} The created event handler.
       */
      _createColumnVisibilityCheckBoxHandler: function _createColumnVisibilityCheckBoxHandler(col) {
        return function (evt) {
          var columnModel = this.getTableColumnModel();
          columnModel.setColumnVisible(col, evt.getData());
        };
      },
      /**
       * Sets the width of a column.
       *
       * @param col {Integer} the model index of column.
       * @param width {Integer} the new width in pixels.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.getTableColumnModel().setColumnWidth(col, width);
      },
      /**
       * Resize event handler
       */
      _onResize: function _onResize() {
        this.fireEvent("tableWidthChanged");
        this._updateScrollerWidths();
        this._updateScrollBarVisibility();
      },
      // overridden
      addListener: function addListener(type, listener, self, capture) {
        if (qx.ui.table.Table.__redirectEvents__P_200_4[type]) {
          // start the id with the type (needed for removing)
          var id = [type];
          for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++) {
            id.push(arr[i].addListener.apply(arr[i], arguments));
          }
          // join the id's of every event with "
          return id.join('"');
        } else {
          return qx.ui.table.Table.superclass.prototype.addListener.call(this, type, listener, self, capture);
        }
      },
      // overridden
      removeListener: function removeListener(type, listener, self, capture) {
        if (qx.ui.table.Table.__redirectEvents__P_200_4[type]) {
          for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++) {
            arr[i].removeListener.apply(arr[i], arguments);
          }
        } else {
          qx.ui.table.Table.superclass.prototype.removeListener.call(this, type, listener, self, capture);
        }
      },
      // overridden
      removeListenerById: function removeListenerById(id) {
        var ids = id.split('"');
        // type is the first entry of the connected id
        var type = ids.shift();
        if (qx.ui.table.Table.__redirectEvents__P_200_4[type]) {
          var removed = true;
          for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++) {
            removed = arr[i].removeListenerById.call(arr[i], ids[i]) && removed;
          }
          return removed;
        } else {
          return qx.ui.table.Table.superclass.prototype.removeListenerById.call(this, id);
        }
      },
      destroy: function destroy() {
        this.getChildControl("column-button").getMenu().destroy();
        qx.ui.table.Table.superclass.prototype.destroy.call(this);
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      // remove the event listener which handled the locale change
      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }

      // we allocated these objects on init so we have to clean them up.
      var selectionModel = this.getSelectionModel();
      if (selectionModel) {
        selectionModel.dispose();
      }
      var dataRowRenderer = this.getDataRowRenderer();
      if (dataRowRenderer) {
        dataRowRenderer.dispose();
      }
      if (this.getTableModel() != null) {
        this.getTableModel().removeListener("metaDataChanged", this._onTableModelMetaDataChanged, this);
        this.getTableModel().removeListener("dataChanged", this._onTableModelDataChanged, this);
      }
      this.getTableColumnModel().dispose();
      this._disposeObjects("__selectionManager__P_200_1", "__scrollerParent__P_200_0", "__emptyTableModel__P_200_11", "__emptyTableModel__P_200_11", "__columnModel__P_200_10", "__timer__P_200_13");
      this._disposeMap("__columnMenuButtons__P_200_9");
    }
  });
  qx.ui.table.Table.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * Interface for a row renderer.
   */
  qx.Interface.define("qx.ui.table.IRowRenderer", {
    members: {
      /**
       * Updates a data row.
       *
       * The rowInfo map contains the following properties:
       * <ul>
       * <li>rowData (var): contains the row data for the row.
       *   The kind of this object depends on the table model, see
       *   {@link ITableModel#getRowData()}</li>
       * <li>row (int): the model index of the row.</li>
       * <li>selected (boolean): whether a cell in this row is selected.</li>
       * <li>focusedRow (boolean): whether the focused cell is in this row.</li>
       * <li>table (qx.ui.table.Table): the table the row belongs to.</li>
       * </ul>
       *
       * @abstract
       * @param rowInfo {Map} A map containing the information about the row to
       *      update.
       * @param rowElement {Element} the DOM element that renders the data row.
       */
      updateDataRowElement: function updateDataRowElement(rowInfo, rowElement) {},
      /**
       * Get the row's height CSS style taking the box model into account
       *
       * @param height {Integer} The row's (border-box) height in pixel
       */
      getRowHeightStyle: function getRowHeightStyle(height) {},
      /**
       * Create a style string, which will be set as the style property of the row.
       *
       * @param rowInfo {Map} A map containing the information about the row to
       *      update. See {@link #updateDataRowElement} for more information.
       */
      createRowStyle: function createRowStyle(rowInfo) {},
      /**
       * Create a HTML class string, which will be set as the class property of the row.
       *
       * @param rowInfo {Map} A map containing the information about the row to
       *      update. See {@link #updateDataRowElement} for more information.
       */
      getRowClass: function getRowClass(rowInfo) {}
    }
  });
  qx.ui.table.IRowRenderer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IRowRenderer": {
        "require": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.theme.manager.Font": {},
      "qx.theme.manager.Color": {},
      "qx.bom.element.Style": {},
      "qx.bom.Font": {},
      "qx.bom.client.Css": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxmodel": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2007 Visionet GmbH, http://www.visionet.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132) STZ-IDA
       * Dietrich Streifert (level420) Visionet
  
  ************************************************************************ */

  /**
   * The default data row renderer.
   */
  qx.Class.define("qx.ui.table.rowrenderer.Default", {
    extend: qx.core.Object,
    implement: qx.ui.table.IRowRenderer,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.initThemeValues();

      // dynamic theme switch
      {
        qx.theme.manager.Meta.getInstance().addListener("changeTheme", this.initThemeValues, this);
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** Whether the focused row should be highlighted. */
      highlightFocusRow: {
        check: "Boolean",
        init: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _colors: null,
      _fontStyle: null,
      _fontStyleString: null,
      /**
       * Initializes the colors from the color theme.
       * @internal
       */
      initThemeValues: function initThemeValues() {
        this._fontStyleString = "";
        this._fontStyle = {};
        this._colors = {};

        // link to font theme
        this._renderFont(qx.theme.manager.Font.getInstance().resolve("default"));

        // link to color theme
        var colorMgr = qx.theme.manager.Color.getInstance();
        this._colors.bgcolFocusedSelected = colorMgr.resolve("table-row-background-focused-selected");
        this._colors.bgcolFocused = colorMgr.resolve("table-row-background-focused");
        this._colors.bgcolSelected = colorMgr.resolve("table-row-background-selected");
        this._colors.bgcolEven = colorMgr.resolve("table-row-background-even");
        this._colors.bgcolOdd = colorMgr.resolve("table-row-background-odd");
        this._colors.colSelected = colorMgr.resolve("table-row-selected");
        this._colors.colNormal = colorMgr.resolve("table-row");
        this._colors.horLine = colorMgr.resolve("table-row-line");
      },
      /**
       * the sum of the vertical insets. This is needed to compute the box model
       * independent size
       */
      _insetY: 1,
      // borderBottom
      /**
       * Render the new font and update the table pane content
       * to reflect the font change.
       *
       * @param font {qx.bom.Font} The font to use for the table row
       */
      _renderFont: function _renderFont(font) {
        if (font) {
          this._fontStyle = font.getStyles();
          this._fontStyleString = qx.bom.element.Style.compile(this._fontStyle);
          this._fontStyleString = this._fontStyleString.replace(/"/g, "'");
        } else {
          this._fontStyleString = "";
          this._fontStyle = qx.bom.Font.getDefaultStyles();
        }
      },
      // interface implementation
      updateDataRowElement: function updateDataRowElement(rowInfo, rowElem) {
        var fontStyle = this._fontStyle;
        var style = rowElem.style;

        // set font styles
        qx.bom.element.Style.setStyles(rowElem, fontStyle);
        if (rowInfo.focusedRow && this.getHighlightFocusRow()) {
          style.backgroundColor = rowInfo.selected ? this._colors.bgcolFocusedSelected : this._colors.bgcolFocused;
        } else {
          if (rowInfo.selected) {
            style.backgroundColor = this._colors.bgcolSelected;
          } else {
            style.backgroundColor = rowInfo.row % 2 == 0 ? this._colors.bgcolEven : this._colors.bgcolOdd;
          }
        }
        style.color = rowInfo.selected ? this._colors.colSelected : this._colors.colNormal;
        style.borderBottom = "1px solid " + this._colors.horLine;
      },
      /**
       * Get the row's height CSS style taking the box model into account
       *
       * @param height {Integer} The row's (border-box) height in pixel
       * @return {String} CSS rule for the row height
       */
      getRowHeightStyle: function getRowHeightStyle(height) {
        if (qx.core.Environment.get("css.boxmodel") == "content") {
          height -= this._insetY;
        }
        return "height:" + height + "px;";
      },
      // interface implementation
      createRowStyle: function createRowStyle(rowInfo) {
        var rowStyle = [];
        rowStyle.push(";");
        rowStyle.push(this._fontStyleString);
        rowStyle.push("background-color:");
        if (rowInfo.focusedRow && this.getHighlightFocusRow()) {
          rowStyle.push(rowInfo.selected ? this._colors.bgcolFocusedSelected : this._colors.bgcolFocused);
        } else {
          if (rowInfo.selected) {
            rowStyle.push(this._colors.bgcolSelected);
          } else {
            rowStyle.push(rowInfo.row % 2 == 0 ? this._colors.bgcolEven : this._colors.bgcolOdd);
          }
        }
        rowStyle.push(";color:");
        rowStyle.push(rowInfo.selected ? this._colors.colSelected : this._colors.colNormal);
        rowStyle.push(";border-bottom: 1px solid ", this._colors.horLine);
        return rowStyle.join("");
      },
      getRowClass: function getRowClass(rowInfo) {
        return "";
      },
      /**
       * Add extra attributes to each row.
       *
       * @param rowInfo {Object}
       *   The following members are available in rowInfo:
       *   <dl>
       *     <dt>table {qx.ui.table.Table}</dt>
       *     <dd>The table object</dd>
       *
       *     <dt>styleHeight {Integer}</dt>
       *     <dd>The height of this (and every) row</dd>
       *
       *     <dt>row {Integer}</dt>
       *     <dd>The number of the row being added</dd>
       *
       *     <dt>selected {Boolean}</dt>
       *     <dd>Whether the row being added is currently selected</dd>
       *
       *     <dt>focusedRow {Boolean}</dt>
       *     <dd>Whether the row being added is currently focused</dd>
       *
       *     <dt>rowData {Array}</dt>
       *     <dd>The array row from the data model of the row being added</dd>
       *   </dl>
       *
       * @return {String}
       *   Any additional attributes and their values that should be added to the
       *   div tag for the row.
       */
      getRowAttributes: function getRowAttributes(rowInfo) {
        return "role=row "; // Space important!
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._colors = this._fontStyle = this._fontStyleString = null;

      // remove dynamic theme listener
      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this.initThemeValues, this);
      }
    }
  });
  qx.ui.table.rowrenderer.Default.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-19.js.map?dt=1686138468291
qx.$$packageData['19'] = {
  "locales": {},
  "resources": {},
  "translations": {
    "en": {},
    "ru": {
      "one row": "%1 строка",
      "%1 rows": "%1 строки",
      "one of one row": "%1 из %2 строки",
      "%1 of %2 rows": "%1 из %2 строк"
    }
  }
};
