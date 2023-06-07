(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
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
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This class offers a set of default conversion methods and whole options
   * packs for {@link qx.data.SingleValueBinding}. The binding offers a conversion
   * itself if it can determinate which types should be used. In all other cases,
   * you can you this methods / options for the default conversion.
   */
  qx.Class.define("qx.data.Conversion", {
    statics: {
      /**
       * Converts the given value to a string via <code> + ""</code>.
       *
       * @param value {var} The value to convert.
       * @return {String} The converted value.
       */
      toString: function toString(value) {
        return value + "";
      },
      /**
       * Options for the {@link qx.data.SingleValueBinding}
       * containing the {@link #toString} converter.
       */
      TOSTRINGOPTIONS: {
        converter: null
      },
      /**
       * Converts the given value to a number via <code>parseFloat</code>.
       *
       * @param value {var} The value to convert.
       * @return {Number} The converted value.
       */
      toNumber: function toNumber(value) {
        return parseFloat(value);
      },
      /**
       * Options for the {@link qx.data.SingleValueBinding}
       * containing the {@link #toNumber} converter.
       */
      TONUMBEROPTIONS: {
        converter: null
      },
      /**
       * Converts the given value to a boolean via <code>!!value</code>.
       *
       * @param value {var} The value to convert.
       * @return {Boolean} The converted value.
       */
      toBoolean: function toBoolean(value) {
        return !!value;
      },
      /**
       * Options for the {@link qx.data.SingleValueBinding}
       * containing the {@link #toBoolean} converter.
       */
      TOBOOLEANOPTIONS: {
        converter: null
      }
    },
    defer: function defer() {
      // the converter need to be set in the defer because the reference to
      // the converter function is not available during the class create
      qx.data.Conversion.TOSTRINGOPTIONS.converter = qx.data.Conversion.toString;
      qx.data.Conversion.TONUMBEROPTIONS.converter = qx.data.Conversion.toNumber;
      qx.data.Conversion.TOBOOLEANOPTIONS.converter = qx.data.Conversion.toBoolean;
    }
  });
  qx.data.Conversion.$$dbClassInfo = $$dbClassInfo;
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
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Each object, which should support single selection have to
   * implement this interface.
   */
  qx.Interface.define("qx.ui.core.ISingleSelection", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fires after the selection was modified */
      changeSelection: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {qx.ui.core.Widget[]} List of items.
       */
      getSelection: function getSelection() {
        return true;
      },
      /**
       * Replaces current selection with the given items.
       *
       * @param items {qx.ui.core.Widget[]} Items to select.
       * @throws {Error} if the item is not a child element.
       */
      setSelection: function setSelection(items) {
        return arguments.length == 1;
      },
      /**
       * Clears the whole selection at once.
       */
      resetSelection: function resetSelection() {
        return true;
      },
      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {qx.ui.core.Widget} Any valid selectable item
       * @return {Boolean} Whether the item is selected.
       * @throws {Error} if the item is not a child element.
       */
      isSelected: function isSelected(item) {
        return arguments.length == 1;
      },
      /**
       * Whether the selection is empty.
       *
       * @return {Boolean} Whether the selection is empty.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return true;
      },
      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        return arguments.length == 1;
      }
    }
  });
  qx.ui.core.ISingleSelection.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.ui.core.SingleSelectionManager": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * This mixin links all methods to manage the single selection.
   *
   * The class which includes the mixin has to implements two methods:
   *
   * <ul>
   * <li><code>_getItems</code>, this method has to return a <code>Array</code>
   *    of <code>qx.ui.core.Widget</code> that should be managed from the manager.
   * </li>
   * <li><code>_isAllowEmptySelection</code>, this method has to return a
   *    <code>Boolean</code> value for allowing empty selection or not.
   * </li>
   * </ul>
   */
  qx.Mixin.define("qx.ui.core.MSingleSelectionHandling", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fires after the value was modified */
      changeValue: "qx.event.type.Data",
      /** Fires after the selection was modified */
      changeSelection: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /** @type {qx.ui.core.SingleSelectionManager} the single selection manager */
      __manager__P_149_0: null,
      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */
      /**
       * setValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @param item {null|qx.ui.core.Widget} Item to set as selected value.
       * @returns {null|TypeError} The status of this operation.
       */
      setValue: function setValue(item) {
        if (null === item) {
          this.resetSelection();
          return null;
        }
        if (item instanceof qx.ui.core.Widget) {
          this.__getManager__P_149_1().setSelected(item);
          return null;
        } else {
          return new TypeError("Given argument is not null or a {qx.ui.core.Widget}.");
        }
      },
      /**
       * getValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @returns {null|qx.ui.core.Widget} The currently selected widget or null if there is none.
       */
      getValue: function getValue() {
        return this.__getManager__P_149_1().getSelected() || null;
      },
      /**
       * resetValue implements part of the {@link qx.ui.form.IField} interface.
       */
      resetValue: function resetValue() {
        this.__getManager__P_149_1().resetSelected();
      },
      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {qx.ui.core.Widget[]} List of items.
       */
      getSelection: function getSelection() {
        var selected = this.__getManager__P_149_1().getSelected();
        if (selected) {
          return [selected];
        } else {
          return [];
        }
      },
      /**
       * Replaces current selection with the given items.
       *
       * @param items {qx.ui.core.Widget[]} Items to select.
       * @throws {Error} if one of the items is not a child element and if
       *    items contains more than one elements.
       */
      setSelection: function setSelection(items) {
        switch (items.length) {
          case 0:
            this.resetSelection();
            break;
          case 1:
            this.__getManager__P_149_1().setSelected(items[0]);
            break;
          default:
            throw new Error("Could only select one item, but the selection array contains " + items.length + " items!");
        }
      },
      /**
       * Clears the whole selection at once.
       */
      resetSelection: function resetSelection() {
        this.__getManager__P_149_1().resetSelected();
      },
      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {qx.ui.core.Widget} Any valid selectable item.
       * @return {Boolean} Whether the item is selected.
       * @throws {Error} if one of the items is not a child element.
       */
      isSelected: function isSelected(item) {
        return this.__getManager__P_149_1().isSelected(item);
      },
      /**
       * Whether the selection is empty.
       *
       * @return {Boolean} Whether the selection is empty.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__getManager__P_149_1().isSelectionEmpty();
      },
      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        return this.__getManager__P_149_1().getSelectables(all);
      },
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */
      /**
       * Event listener for <code>changeSelected</code> event on single
       * selection manager.
       *
       * @param e {qx.event.type.Data} Data event.
       */
      _onChangeSelected: function _onChangeSelected(e) {
        var newValue = e.getData();
        var oldValue = e.getOldData();
        this.fireDataEvent("changeValue", newValue, oldValue);
        newValue == null ? newValue = [] : newValue = [newValue];
        oldValue == null ? oldValue = [] : oldValue = [oldValue];
        this.fireDataEvent("changeSelection", newValue, oldValue);
      },
      /**
       * Return the selection manager if it is already exists, otherwise creates
       * the manager.
       *
       * @return {qx.ui.core.SingleSelectionManager} Single selection manager.
       */
      __getManager__P_149_1: function __getManager__P_149_1() {
        if (this.__manager__P_149_0 == null) {
          var that = this;
          this.__manager__P_149_0 = new qx.ui.core.SingleSelectionManager({
            getItems: function getItems() {
              return that._getItems();
            },
            isItemSelectable: function isItemSelectable(item) {
              if (that._isItemSelectable) {
                return that._isItemSelectable(item);
              } else {
                return item.isVisible();
              }
            }
          });
          this.__manager__P_149_0.addListener("changeSelected", this._onChangeSelected, this);
        }
        this.__manager__P_149_0.setAllowEmptySelection(this._isAllowEmptySelection());
        return this.__manager__P_149_0;
      }
    },
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__manager__P_149_0");
    }
  });
  qx.ui.core.MSingleSelectionHandling.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.core.ISingleSelection": {
        "require": true
      },
      "qx.ui.core.MSingleSelectionHandling": {
        "require": true
      },
      "qx.ui.core.MChildrenHandling": {
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
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
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   * The stack container puts its child widgets on top of each other and only the
   * topmost widget is visible.
   *
   * This is used e.g. in the tab view widget. Which widget is visible can be
   * controlled by using the {@link #getSelection} method.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   // create stack container
   *   var stack = new qx.ui.container.Stack();
   *
   *   // add some children
   *   stack.add(new qx.ui.core.Widget().set({
   *    backgroundColor: "red"
   *   }));
   *   stack.add(new qx.ui.core.Widget().set({
   *    backgroundColor: "green"
   *   }));
   *   stack.add(new qx.ui.core.Widget().set({
   *    backgroundColor: "blue"
   *   }));
   *
   *   // select green widget
   *   stack.setSelection([stack.getChildren()[1]]);
   *
   *   this.getRoot().add(stack);
   * </pre>
   *
   * This example creates an stack with three children. Only the selected "green"
   * widget is visible.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/stack.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.container.Stack", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IField, qx.ui.core.ISingleSelection],
    include: [qx.ui.core.MSingleSelectionHandling, qx.ui.core.MChildrenHandling],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this._setLayout(new qx.ui.layout.Grow());
      this.addListener("changeSelection", this.__onChangeSelection__P_113_0, this);
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Whether the size of the widget depends on the selected child. When
       * disabled (default) the size is configured to the largest child.
       */
      dynamic: {
        check: "Boolean",
        init: false,
        apply: "_applyDynamic"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // property apply
      _applyDynamic: function _applyDynamic(value) {
        var children = this._getChildren();
        var selected = this.getSelection()[0];
        var child;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          if (child != selected) {
            if (value) {
              children[i].exclude();
            } else {
              children[i].hide();
            }
          }
        }
      },
      /*
      ---------------------------------------------------------------------------
        HELPER METHODS FOR SELECTION API
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the widget for the selection.
       * @return {qx.ui.core.Widget[]} Widgets to select.
       */
      _getItems: function _getItems() {
        return this.getChildren();
      },
      /**
       * Returns if the selection could be empty or not.
       *
       * @return {Boolean} <code>true</code> If selection could be empty,
       *    <code>false</code> otherwise.
       */
      _isAllowEmptySelection: function _isAllowEmptySelection() {
        return true;
      },
      /**
       * Returns whether the given item is selectable.
       *
       * @param item {qx.ui.core.Widget} The item to be checked
       * @return {Boolean} Whether the given item is selectable
       */
      _isItemSelectable: function _isItemSelectable(item) {
        return true;
      },
      /**
       * Event handler for <code>changeSelection</code>.
       *
       * Shows the new selected widget and hide the old one.
       *
       * @param e {qx.event.type.Data} Data event.
       */
      __onChangeSelection__P_113_0: function __onChangeSelection__P_113_0(e) {
        var old = e.getOldData()[0];
        var value = e.getData()[0];
        if (old) {
          if (this.isDynamic()) {
            old.exclude();
          } else {
            old.hide();
          }
        }
        if (value) {
          value.show();
        }
      },
      //overridden
      _afterAddChild: function _afterAddChild(child) {
        var selected = this.getSelection()[0];
        if (!selected) {
          this.setSelection([child]);
        } else if (selected !== child) {
          if (this.isDynamic()) {
            child.exclude();
          } else {
            child.hide();
          }
        }
      },
      //overridden
      _afterRemoveChild: function _afterRemoveChild(child) {
        if (this.getSelection()[0] === child) {
          var first = this._getChildren()[0];
          if (first) {
            this.setSelection([first]);
          } else {
            this.resetSelection();
          }
        }
      },
      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */
      /**
       * Go to the previous child in the children list.
       */
      previous: function previous() {
        var selected = this.getSelection()[0];
        var go = this._indexOf(selected) - 1;
        var children = this._getChildren();
        if (go < 0) {
          go = children.length - 1;
        }
        var prev = children[go];
        this.setSelection([prev]);
      },
      /**
       * Go to the next child in the children list.
       */
      next: function next() {
        var selected = this.getSelection()[0];
        var go = this._indexOf(selected) + 1;
        var children = this._getChildren();
        var next = children[go] || children[0];
        this.setSelection([next]);
      }
    }
  });
  qx.ui.container.Stack.$$dbClassInfo = $$dbClassInfo;
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
      "qx.lang.String": {},
      "qx.theme.manager.Color": {}
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
       * Fabian Jakobs (fjakobs)
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  /**
   * A wrapper for CSS font styles. Fond objects can be applied to instances
   * of {@link qx.html.Element}.
   */
  qx.Class.define("qx.bom.Font", {
    extend: qx.core.Object,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param size {String?} The font size (Unit: pixel)
     * @param family {String[]?} A sorted list of font families
     */
    construct: function construct(size, family) {
      qx.core.Object.constructor.call(this);
      this.__lookupMap__P_62_0 = {
        fontFamily: "",
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        textDecoration: null,
        lineHeight: null,
        color: null,
        textShadow: null,
        letterSpacing: null
      };
      if (size !== undefined) {
        this.setSize(size);
      }
      if (family !== undefined) {
        this.setFamily(family);
      }
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * Converts a typical CSS font definition string to an font object
       *
       * Example string: <code>bold italic 20px Arial</code>
       *
       * @param str {String} the CSS string
       * @return {qx.bom.Font} the created instance
       */
      fromString: function fromString(str) {
        var font = new qx.bom.Font();
        var parts = str.split(/\s+/);
        var name = [];
        var part;
        for (var i = 0; i < parts.length; i++) {
          switch (part = parts[i]) {
            case "bold":
              font.setBold(true);
              break;
            case "italic":
              font.setItalic(true);
              break;
            case "underline":
              font.setDecoration("underline");
              break;
            default:
              var temp = parseInt(part, 10);
              if (temp == part || qx.lang.String.contains(part, "px")) {
                font.setSize(temp);
              } else {
                name.push(part);
              }
              break;
          }
        }
        if (name.length > 0) {
          font.setFamily(name);
        }
        return font;
      },
      /**
       * Converts a map property definition into a font object.
       *
       * @param config {Map} map of property values
       * @return {qx.bom.Font} the created instance
       */
      fromConfig: function fromConfig(config) {
        var font = new qx.bom.Font();
        font.set(config);
        return font;
      },
      /** @type {Map} Default (empty) CSS styles */
      __defaultStyles__P_62_1: {
        fontFamily: "",
        fontSize: "",
        fontWeight: "",
        fontStyle: "",
        textDecoration: "",
        lineHeight: 1.2,
        color: "",
        textShadow: "",
        letterSpacing: ""
      },
      /**
       * Returns a map of all properties in empty state.
       *
       * This is useful for resetting previously configured
       * font styles.
       *
       * @return {Map} Default styles
       */
      getDefaultStyles: function getDefaultStyles() {
        return this.__defaultStyles__P_62_1;
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The font size (Unit: pixel) */
      size: {
        check: "Integer",
        nullable: true,
        apply: "_applySize"
      },
      /**
       * The line height as scaling factor of the default line height. A value
       * of 1 corresponds to the default line height
       */
      lineHeight: {
        check: "Number",
        nullable: true,
        apply: "_applyLineHeight"
      },
      /**
       * Characters that are used to test if the font has loaded properly. These
       * default to "WEei" in `qx.bom.webfont.Validator` and can be overridden
       * for certain cases like icon fonts that do not provide the predefined
       * characters.
       */
      comparisonString: {
        check: "String",
        init: null,
        nullable: true
      },
      /**
       * Version identifier that is appended to the URL to be loaded. Fonts
       * that are defined thru themes may be managed by the resource manager.
       * In this case updated fonts persist due to aggressive fontface caching
       * of some browsers. To get around this, set the `version` property to
       * the version of your font. It will be appended to the CSS URL and forces
       * the browser to re-validate.
       *
       * The version needs to be URL friendly, so only characters, numbers,
       * dash and dots are allowed here.
       */
      version: {
        check: function check(value) {
          return value === null || typeof value === "string" && /^[a-zA-Z0-9.-]+$/.test(value);
        },
        init: null,
        nullable: true
      },
      /** A sorted list of font families */
      family: {
        check: "Array",
        nullable: true,
        apply: "_applyFamily"
      },
      /** Whether the font is bold */
      bold: {
        check: "Boolean",
        nullable: true,
        apply: "_applyBold"
      },
      /** Whether the font is italic */
      italic: {
        check: "Boolean",
        nullable: true,
        apply: "_applyItalic"
      },
      /** The text decoration for this font */
      decoration: {
        check: ["underline", "line-through", "overline"],
        nullable: true,
        apply: "_applyDecoration"
      },
      /** The text color for this font */
      color: {
        check: "Color",
        nullable: true,
        apply: "_applyColor"
      },
      /** The text shadow for this font */
      textShadow: {
        nullable: true,
        check: "String",
        apply: "_applyTextShadow"
      },
      /** The weight property of the font as opposed to just setting it to 'bold' by setting the bold property to true */
      weight: {
        nullable: true,
        check: "String",
        apply: "_applyWeight"
      },
      /** The Letter Spacing (Unit: pixel) */
      letterSpacing: {
        check: "Integer",
        nullable: true,
        apply: "_applyLetterSpacing"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __lookupMap__P_62_0: null,
      // property apply
      _applySize: function _applySize(value, old) {
        this.__lookupMap__P_62_0.fontSize = value === null ? null : value + "px";
      },
      _applyLineHeight: function _applyLineHeight(value, old) {
        this.__lookupMap__P_62_0.lineHeight = value === null ? null : value;
      },
      // property apply
      _applyFamily: function _applyFamily(value, old) {
        var family = "";
        for (var i = 0, l = value.length; i < l; i++) {
          // in FireFox 2 and WebKit fonts like 'serif' or 'sans-serif' must
          // not be quoted!
          if (value[i].indexOf(" ") > 0) {
            family += '"' + value[i] + '"';
          } else {
            family += value[i];
          }
          if (i !== l - 1) {
            family += ",";
          }
        }

        // font family is a special case. In order to render the labels correctly
        // we have to return a font family - even if it's an empty string to prevent
        // the browser from applying the element style
        this.__lookupMap__P_62_0.fontFamily = family;
      },
      // property apply
      _applyBold: function _applyBold(value, old) {
        this.__lookupMap__P_62_0.fontWeight = value == null ? null : value ? "bold" : "normal";
      },
      // property apply
      _applyItalic: function _applyItalic(value, old) {
        this.__lookupMap__P_62_0.fontStyle = value == null ? null : value ? "italic" : "normal";
      },
      // property apply
      _applyDecoration: function _applyDecoration(value, old) {
        this.__lookupMap__P_62_0.textDecoration = value == null ? null : value;
      },
      // property apply
      _applyColor: function _applyColor(value, old) {
        this.__lookupMap__P_62_0.color = null;
        if (value) {
          this.__lookupMap__P_62_0.color = qx.theme.manager.Color.getInstance().resolve(value);
        }
      },
      // property apply
      _applyWeight: function _applyWeight(value, old) {
        this.__lookupMap__P_62_0.fontWeight = value;
      },
      // property apply
      _applyTextShadow: function _applyTextShadow(value, old) {
        this.__lookupMap__P_62_0.textShadow = value == null ? null : value;
      },
      // property apply
      _applyLetterSpacing: function _applyLetterSpacing(value, old) {
        this.__lookupMap__P_62_0.letterSpacing = value === null ? null : value + "px";
      },
      /**
       * Get a map of all CSS styles, which will be applied to the widget. Only
       * the styles which are set are returned.
       *
       * @return {Map} Map containing the current styles. The keys are property
       * names which can directly be used with the <code>set</code> method of each
       * widget.
       */
      getStyles: function getStyles() {
        return this.__lookupMap__P_62_0;
      }
    }
  });
  qx.bom.Font.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-11.js.map?dt=1686138468091
qx.$$packageData['11'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
