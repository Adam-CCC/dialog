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
      "qx.core.Assert": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.locale.Manager": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Static class, which contains functionality to localize the names of keyboard keys.
   */

  qx.Class.define("qx.locale.Key", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * Return localized name of a key identifier
       * {@link qx.event.type.KeySequence}
       *
       * @param size {String} format of the key identifier.
       *       Possible values: "short", "full"
       * @param keyIdentifier {String} key identifier to translate {@link qx.event.type.KeySequence}
       * @param locale {String} optional locale to be used
       * @return {String} localized key name
       */
      getKeyName: function getKeyName(size, keyIdentifier, locale) {
        {
          qx.core.Assert.assertInArray(size, ["short", "full"]);
        }
        var key = "key_" + size + "_" + keyIdentifier;
        // Control is always named control on a mac and not Strg in German e.g.
        if (qx.core.Environment.get("os.name") == "osx" && keyIdentifier == "Control") {
          key += "_Mac";
        }
        var localizedKey = qx.locale.Manager.getInstance().translate(key, [], locale);
        if (localizedKey == key) {
          return qx.locale.Key._keyNames[key] || keyIdentifier;
        } else {
          return localizedKey;
        }
      }
    },
    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      var keyNames = {};
      var Manager = qx.locale.Manager;

      // TRANSLATION: short representation of key names
      keyNames[Manager.marktr("key_short_Backspace")] = "Backspace";
      keyNames[Manager.marktr("key_short_Tab")] = "Tab";
      keyNames[Manager.marktr("key_short_Space")] = "Space";
      keyNames[Manager.marktr("key_short_Enter")] = "Enter";
      keyNames[Manager.marktr("key_short_Shift")] = "Shift";
      keyNames[Manager.marktr("key_short_Control")] = "Ctrl";
      keyNames[Manager.marktr("key_short_Control_Mac")] = "Ctrl";
      keyNames[Manager.marktr("key_short_Alt")] = "Alt";
      keyNames[Manager.marktr("key_short_CapsLock")] = "Caps";
      keyNames[Manager.marktr("key_short_Meta")] = "Meta";
      keyNames[Manager.marktr("key_short_Escape")] = "Esc";
      keyNames[Manager.marktr("key_short_Left")] = "Left";
      keyNames[Manager.marktr("key_short_Up")] = "Up";
      keyNames[Manager.marktr("key_short_Right")] = "Right";
      keyNames[Manager.marktr("key_short_Down")] = "Down";
      keyNames[Manager.marktr("key_short_PageUp")] = "PgUp";
      keyNames[Manager.marktr("key_short_PageDown")] = "PgDn";
      keyNames[Manager.marktr("key_short_End")] = "End";
      keyNames[Manager.marktr("key_short_Home")] = "Home";
      keyNames[Manager.marktr("key_short_Insert")] = "Ins";
      keyNames[Manager.marktr("key_short_Delete")] = "Del";
      keyNames[Manager.marktr("key_short_NumLock")] = "Num";
      keyNames[Manager.marktr("key_short_PrintScreen")] = "Print";
      keyNames[Manager.marktr("key_short_Scroll")] = "Scroll";
      keyNames[Manager.marktr("key_short_Pause")] = "Pause";
      keyNames[Manager.marktr("key_short_Win")] = "Win";
      keyNames[Manager.marktr("key_short_Apps")] = "Apps";

      // TRANSLATION: full/long representation of key names
      keyNames[Manager.marktr("key_full_Backspace")] = "Backspace";
      keyNames[Manager.marktr("key_full_Tab")] = "Tabulator";
      keyNames[Manager.marktr("key_full_Space")] = "Space";
      keyNames[Manager.marktr("key_full_Enter")] = "Enter";
      keyNames[Manager.marktr("key_full_Shift")] = "Shift";
      keyNames[Manager.marktr("key_full_Control")] = "Control";
      keyNames[Manager.marktr("key_full_Control_Mac")] = "Control";
      keyNames[Manager.marktr("key_full_Alt")] = "Alt";
      keyNames[Manager.marktr("key_full_CapsLock")] = "CapsLock";
      keyNames[Manager.marktr("key_full_Meta")] = "Meta";
      keyNames[Manager.marktr("key_full_Escape")] = "Escape";
      keyNames[Manager.marktr("key_full_Left")] = "Left";
      keyNames[Manager.marktr("key_full_Up")] = "Up";
      keyNames[Manager.marktr("key_full_Right")] = "Right";
      keyNames[Manager.marktr("key_full_Down")] = "Down";
      keyNames[Manager.marktr("key_full_PageUp")] = "PageUp";
      keyNames[Manager.marktr("key_full_PageDown")] = "PageDown";
      keyNames[Manager.marktr("key_full_End")] = "End";
      keyNames[Manager.marktr("key_full_Home")] = "Home";
      keyNames[Manager.marktr("key_full_Insert")] = "Insert";
      keyNames[Manager.marktr("key_full_Delete")] = "Delete";
      keyNames[Manager.marktr("key_full_NumLock")] = "NumLock";
      keyNames[Manager.marktr("key_full_PrintScreen")] = "PrintScreen";
      keyNames[Manager.marktr("key_full_Scroll")] = "Scroll";
      keyNames[Manager.marktr("key_full_Pause")] = "Pause";
      keyNames[Manager.marktr("key_full_Win")] = "Win";
      keyNames[Manager.marktr("key_full_Apps")] = "Apps";

      // Save
      statics._keyNames = keyNames;
    }
  });
  qx.locale.Key.$$dbClassInfo = $$dbClassInfo;
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
      "qx.event.Timer": {},
      "qx.bom.element.Dimension": {},
      "qx.lang.Object": {},
      "qx.bom.element.Style": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * Checks whether a given font is available on the document and fires events
   * accordingly.
   *
   * This class does not need to be disposed, unless you want to abort the validation
   * early
   */
  qx.Class.define("qx.bom.webfonts.Validator", {
    extend: qx.core.Object,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param fontFamily {String} The name of the font to be verified
     * @param comparisonString {String?} String to be used to detect whether a font was loaded or not
     * @param fontWeight {String?} the weight of the font to be verified
     * @param fontStyle {String?} the style of the font to be verified
     * whether the font has loaded properly
     */
    construct: function construct(fontFamily, comparisonString, fontWeight, fontStyle) {
      qx.core.Object.constructor.call(this);
      if (comparisonString) {
        this.setComparisonString(comparisonString);
      }
      if (fontWeight) {
        this.setFontWeight(fontWeight);
      }
      if (fontStyle) {
        this.setFontStyle(fontStyle);
      }
      if (fontFamily) {
        this.setFontFamily(fontFamily);
        this.__requestedHelpers__P_179_0 = this._getRequestedHelpers();
      }
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * Sets of serif and sans-serif fonts to be used for size comparisons.
       * At least one of these fonts should be present on any system.
       */
      COMPARISON_FONTS: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Times New Roman", "Georgia", "serif"]
      },
      /**
       * Map of common CSS attributes to be used for all  size comparison elements
       */
      HELPER_CSS: {
        position: "absolute",
        margin: "0",
        padding: "0",
        top: "-1000px",
        left: "-1000px",
        fontSize: "350px",
        width: "auto",
        height: "auto",
        lineHeight: "normal",
        fontVariant: "normal",
        visibility: "hidden"
      },
      /**
       * The string to be used in the size comparison elements. This is the default string
       * which is used for the {@link #COMPARISON_FONTS} and the font to be validated. It
       * can be overridden for the font to be validated using the {@link #comparisonString}
       * property.
       */
      COMPARISON_STRING: "WEei",
      __defaultSizes__P_179_1: null,
      __defaultHelpers__P_179_2: null,
      /**
       * Removes the two common helper elements used for all size comparisons from
       * the DOM
       */
      removeDefaultHelperElements: function removeDefaultHelperElements() {
        var defaultHelpers = qx.bom.webfonts.Validator.__defaultHelpers__P_179_2;
        if (defaultHelpers) {
          for (var prop in defaultHelpers) {
            document.body.removeChild(defaultHelpers[prop]);
          }
        }
        delete qx.bom.webfonts.Validator.__defaultHelpers__P_179_2;
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * The font-family this validator should check
       */
      fontFamily: {
        nullable: true,
        init: null,
        apply: "_applyFontFamily"
      },
      /** The font weight to check */
      fontWeight: {
        nullable: true,
        check: "String",
        apply: "_applyFontWeight"
      },
      /** The font style to check */
      fontStyle: {
        nullable: true,
        check: "String",
        apply: "_applyFontStyle"
      },
      /**
       * Comparison string used to check whether the font has loaded or not.
       */
      comparisonString: {
        nullable: true,
        init: null
      },
      /**
       * Time in milliseconds from the beginning of the check until it is assumed
       * that a font is not available
       */
      timeout: {
        check: "Integer",
        init: 5000
      }
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Fired when the status of a web font has been determined. The event data
       * is a map with the keys "family" (the font-family name) and "valid"
       * (Boolean).
       */
      changeStatus: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __requestedHelpers__P_179_0: null,
      __checkTimer__P_179_3: null,
      __checkStarted__P_179_4: null,
      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */
      /**
       * Validates the font
       */
      validate: function validate() {
        this.__checkStarted__P_179_4 = new Date().getTime();
        if (this.__checkTimer__P_179_3) {
          this.__checkTimer__P_179_3.restart();
        } else {
          this.__checkTimer__P_179_3 = new qx.event.Timer(100);
          this.__checkTimer__P_179_3.addListener("interval", this.__onTimerInterval__P_179_5, this);
          // Give the browser a chance to render the new elements
          qx.event.Timer.once(function () {
            this.__checkTimer__P_179_3.start();
          }, this, 0);
        }
      },
      /*
      ---------------------------------------------------------------------------
        PROTECTED API
      ---------------------------------------------------------------------------
      */
      /**
       * Removes the helper elements from the DOM
       */
      _reset: function _reset() {
        if (this.__requestedHelpers__P_179_0) {
          for (var prop in this.__requestedHelpers__P_179_0) {
            var elem = this.__requestedHelpers__P_179_0[prop];
            document.body.removeChild(elem);
          }
          this.__requestedHelpers__P_179_0 = null;
        }
      },
      /**
       * Checks if the font is available by comparing the widths of the elements
       * using the generic fonts to the widths of the elements using the font to
       * be validated
       *
       * @return {Boolean} Whether or not the font caused the elements to differ
       * in size
       */
      _isFontValid: function _isFontValid() {
        if (!qx.bom.webfonts.Validator.__defaultSizes__P_179_1) {
          this.__init__P_179_6();
        }
        if (!this.__requestedHelpers__P_179_0) {
          this.__requestedHelpers__P_179_0 = this._getRequestedHelpers();
        }

        // force rerendering for chrome
        this.__requestedHelpers__P_179_0.sans.style.visibility = "visible";
        this.__requestedHelpers__P_179_0.sans.style.visibility = "hidden";
        this.__requestedHelpers__P_179_0.serif.style.visibility = "visible";
        this.__requestedHelpers__P_179_0.serif.style.visibility = "hidden";
        var requestedSans = qx.bom.element.Dimension.getWidth(this.__requestedHelpers__P_179_0.sans);
        var requestedSerif = qx.bom.element.Dimension.getWidth(this.__requestedHelpers__P_179_0.serif);
        var cls = qx.bom.webfonts.Validator;
        if (requestedSans !== cls.__defaultSizes__P_179_1.sans || requestedSerif !== cls.__defaultSizes__P_179_1.serif) {
          return true;
        }
        return false;
      },
      /**
       * Creates the two helper elements styled with the font to be checked
       *
       * @return {Map} A map with the keys <pre>sans</pre> and <pre>serif</pre>
       * and the created span elements as values
       */
      _getRequestedHelpers: function _getRequestedHelpers() {
        var fontsSans = [this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.sans);
        var fontsSerif = [this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.serif);
        return {
          sans: this._getHelperElement(fontsSans, this.getComparisonString()),
          serif: this._getHelperElement(fontsSerif, this.getComparisonString())
        };
      },
      /**
       * Creates a span element with the comparison text (either {@link #COMPARISON_STRING} or
       * {@link #comparisonString}) and styled with the default CSS ({@link #HELPER_CSS}) plus
       * the given font-family value and appends it to the DOM
       *
       * @param fontFamily {String} font-family string
       * @param comparisonString {String?} String to be used to detect whether a font was loaded or not
       * @return {Element} the created DOM element
       */
      _getHelperElement: function _getHelperElement(fontFamily, comparisonString) {
        var styleMap = qx.lang.Object.clone(qx.bom.webfonts.Validator.HELPER_CSS);
        if (fontFamily) {
          if (styleMap.fontFamily) {
            styleMap.fontFamily += "," + fontFamily.join(",");
          } else {
            styleMap.fontFamily = fontFamily.join(",");
          }
        }
        if (this.getFontWeight()) {
          styleMap.fontWeight = this.getFontWeight();
        }
        if (this.getFontStyle()) {
          styleMap.fontStyle = this.getFontStyle();
        }
        var elem = document.createElement("span");
        elem.innerHTML = comparisonString || qx.bom.webfonts.Validator.COMPARISON_STRING;
        qx.bom.element.Style.setStyles(elem, styleMap);
        document.body.appendChild(elem);
        return elem;
      },
      // property apply
      _applyFontFamily: function _applyFontFamily(value, old) {
        if (value !== old) {
          this._reset();
        }
      },
      // property apply
      _applyFontWeight: function _applyFontWeight(value, old) {
        if (value !== old) {
          this._reset();
        }
      },
      // property apply
      _applyFontStyle: function _applyFontStyle(value, old) {
        if (value !== old) {
          this._reset();
        }
      },
      /*
      ---------------------------------------------------------------------------
        PRIVATE API
      ---------------------------------------------------------------------------
      */
      /**
       * Creates the default helper elements and gets their widths
       */
      __init__P_179_6: function __init__P_179_6() {
        var cls = qx.bom.webfonts.Validator;
        if (!cls.__defaultHelpers__P_179_2) {
          cls.__defaultHelpers__P_179_2 = {
            sans: this._getHelperElement(cls.COMPARISON_FONTS.sans),
            serif: this._getHelperElement(cls.COMPARISON_FONTS.serif)
          };
        }
        cls.__defaultSizes__P_179_1 = {
          sans: qx.bom.element.Dimension.getWidth(cls.__defaultHelpers__P_179_2.sans),
          serif: qx.bom.element.Dimension.getWidth(cls.__defaultHelpers__P_179_2.serif)
        };
      },
      /**
       * Triggers helper element size comparison and fires a ({@link #changeStatus})
       * event with the result.
       */
      __onTimerInterval__P_179_5: function __onTimerInterval__P_179_5() {
        if (this._isFontValid()) {
          this.__checkTimer__P_179_3.stop();
          this._reset();
          this.fireDataEvent("changeStatus", {
            family: this.getFontFamily(),
            valid: true
          });
        } else {
          var now = new Date().getTime();
          if (now - this.__checkStarted__P_179_4 >= this.getTimeout()) {
            this.__checkTimer__P_179_3.stop();
            this._reset();
            this.fireDataEvent("changeStatus", {
              family: this.getFontFamily(),
              valid: false
            });
          }
        }
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._reset();
      this.__checkTimer__P_179_3.stop();
      this.__checkTimer__P_179_3.removeListener("interval", this.__onTimerInterval__P_179_5, this);
      this._disposeObjects("__checkTimer__P_179_3");
    }
  });
  qx.bom.webfonts.Validator.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.core.MChildrenHandling": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.util.PropertyUtil": {},
      "qx.ui.core.Spacer": {},
      "qx.ui.toolbar.Separator": {},
      "qx.ui.menubar.Button": {},
      "qx.ui.toolbar.Part": {}
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
       * Martin Wittemann (martinwittemann)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The Toolbar class is the main part of the toolbar widget.
   *
   * It can handle added {@link Button}s, {@link CheckBox}es, {@link RadioButton}s
   * and {@link Separator}s in its {@link #add} method. The {@link #addSpacer} method
   * adds a spacer at the current toolbar position. This means that the widgets
   * added after the method call of {@link #addSpacer} are aligned to the right of
   * the toolbar.
   *
   * For more details on the documentation of the toolbar widget, take a look at the
   * documentation of the {@link qx.ui.toolbar}-Package.
   */
  qx.Class.define("qx.ui.toolbar.ToolBar", {
    extend: qx.ui.core.Widget,
    include: qx.ui.core.MChildrenHandling,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * Constructor
     * @param {qx.ui.layout.Abstract?} layout optional layout, defaults to qx.ui.layout.HBox
     */
    construct: function construct(layout) {
      qx.ui.core.Widget.constructor.call(this);

      // ARIA attrs
      this.getContentElement().setAttribute("role", "toolbar");

      // add needed layout
      this._setLayout(layout || new qx.ui.layout.HBox());

      // initialize the overflow handling
      this.__removedItems__P_180_0 = [];
      this.__removePriority__P_180_1 = [];
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** Appearance of the widget */
      appearance: {
        refine: true,
        init: "toolbar"
      },
      /** Holds the currently open menu (when the toolbar is used for menus) */
      openMenu: {
        check: "qx.ui.menu.Menu",
        event: "changeOpenMenu",
        nullable: true
      },
      /** Whether icons, labels, both or none should be shown. */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        apply: "_applyShow",
        event: "changeShow"
      },
      /** The spacing between every child of the toolbar */
      spacing: {
        nullable: true,
        check: "Integer",
        themeable: true,
        apply: "_applySpacing"
      },
      /**
       * Widget which will be shown if at least one toolbar item is hidden.
       * Keep in mind to add this widget to the toolbar before you set it as
       * indicator!
       */
      overflowIndicator: {
        check: "qx.ui.core.Widget",
        nullable: true,
        apply: "_applyOverflowIndicator"
      },
      /** Enables the overflow handling which automatically removes items.*/
      overflowHandling: {
        init: false,
        check: "Boolean",
        apply: "_applyOverflowHandling"
      }
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired if an item will be hidden by the {@link #overflowHandling}.*/
      hideItem: "qx.event.type.Data",
      /** Fired if an item will be shown by the {@link #overflowHandling}.*/
      showItem: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        OVERFLOW HANDLING
      ---------------------------------------------------------------------------
      */

      __removedItems__P_180_0: null,
      __removePriority__P_180_1: null,
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        // get the original hint
        var hint = qx.ui.toolbar.ToolBar.superclass.prototype._computeSizeHint.call(this);
        if (true && this.getOverflowHandling()) {
          var minWidth = 0;
          // if an overflow widget is given, use its width + spacing as min width
          var overflowWidget = this.getOverflowIndicator();
          if (overflowWidget) {
            minWidth = overflowWidget.getSizeHint().width + this.getSpacing();
          }
          // reset the minWidth because we reduce the count of elements
          hint.minWidth = minWidth;
        }
        return hint;
      },
      /**
       * Resize event handler.
       *
       * @param e {qx.event.type.Data} The resize event.
       */
      _onResize: function _onResize(e) {
        this._recalculateOverflow(e.getData().width);
      },
      /**
       * Responsible for calculation the overflow based on the available width.
       *
       * @param width {Integer?null} The available width.
       * @param requiredWidth {Integer?null} The required width for the widget
       *   if available.
       */
      _recalculateOverflow: function _recalculateOverflow(width, requiredWidth) {
        // do nothing if overflow handling is not enabled
        if (!this.getOverflowHandling()) {
          return;
        }

        // get all required sizes
        requiredWidth = requiredWidth || this.getSizeHint().width;
        var overflowWidget = this.getOverflowIndicator();
        var overflowWidgetWidth = 0;
        if (overflowWidget) {
          overflowWidgetWidth = overflowWidget.getSizeHint().width;
        }
        if (width == undefined && this.getBounds() != null) {
          width = this.getBounds().width;
        }

        // if we still don't have a width, than we are not added to a parent
        if (width == undefined) {
          // we should ignore it in that case
          return;
        }

        // if we have not enough space
        if (width < requiredWidth) {
          do {
            // get the next child
            var childToHide = this._getNextToHide();
            // if there is no child to hide, just do nothing
            if (!childToHide) {
              return;
            }
            // get margins or spacing
            var margins = childToHide.getMarginLeft() + childToHide.getMarginRight();
            margins = Math.max(margins, this.getSpacing());
            var childWidth = childToHide.getSizeHint().width + margins;
            this.__hideChild__P_180_2(childToHide);

            // new width is the requiredWidth - the removed childs width
            requiredWidth -= childWidth;

            // show the overflowWidgetWidth
            if (overflowWidget && overflowWidget.getVisibility() != "visible") {
              overflowWidget.setVisibility("visible");
              // if we need to add the overflow indicator, we need to add its width
              requiredWidth += overflowWidgetWidth;
              // add spacing or margins
              var overflowWidgetMargins = overflowWidget.getMarginLeft() + overflowWidget.getMarginRight();
              requiredWidth += Math.max(overflowWidgetMargins, this.getSpacing());
            }
          } while (requiredWidth > width);

          // if we can possibly show something
        } else if (this.__removedItems__P_180_0.length > 0) {
          do {
            var removedChild = this.__removedItems__P_180_0[0];
            // if we have something we can show
            if (removedChild) {
              // get the margins or spacing
              var margins = removedChild.getMarginLeft() + removedChild.getMarginRight();
              margins = Math.max(margins, this.getSpacing());

              // check if the element has been rendered before [BUG #4542]
              if (removedChild.getContentElement().getDomElement() == null) {
                // if not, apply the decorator element because it can change the
                // width of the child with padding e.g.
                removedChild.syncAppearance();
                // also invalidate the layout cache to trigger size hint
                // recalculation
                removedChild.invalidateLayoutCache();
              }
              var removedChildWidth = removedChild.getSizeHint().width;

              // check if it fits in in case its the last child to replace
              var fits = false;
              // if we can remove the overflow widget if its available

              if (this.__removedItems__P_180_0.length == 1 && overflowWidgetWidth > 0) {
                var addedMargin = margins - this.getSpacing();
                var wouldRequiredWidth = requiredWidth - overflowWidgetWidth + removedChildWidth + addedMargin;
                fits = width > wouldRequiredWidth;
              }

              // if it just fits in || it fits in when we remove the overflow widget
              if (width > requiredWidth + removedChildWidth + margins || fits) {
                this.__showChild__P_180_3(removedChild);
                requiredWidth += removedChildWidth;
                // check if we need to remove the overflow widget
                if (overflowWidget && this.__removedItems__P_180_0.length == 0) {
                  overflowWidget.setVisibility("excluded");
                }
              } else {
                return;
              }
            }
          } while (width >= requiredWidth && this.__removedItems__P_180_0.length > 0);
        }
      },
      /**
       * Helper to show a toolbar item.
       *
       * @param child {qx.ui.core.Widget} The widget to show.
       */
      __showChild__P_180_3: function __showChild__P_180_3(child) {
        child.setVisibility("visible");
        this.__removedItems__P_180_0.shift();
        this.fireDataEvent("showItem", child);
      },
      /**
       * Helper to exclude a toolbar item.
       *
       * @param child {qx.ui.core.Widget} The widget to exclude.
       */
      __hideChild__P_180_2: function __hideChild__P_180_2(child) {
        // ignore the call if no child is given
        if (!child) {
          return;
        }
        this.__removedItems__P_180_0.unshift(child);
        child.setVisibility("excluded");
        this.fireDataEvent("hideItem", child);
      },
      /**
       * Responsible for returning the next item to remove. In It checks the
       * priorities added by {@link #setRemovePriority}. If all priorized widgets
       * already excluded, it takes the widget added at last.
       *
       * @return {qx.ui.core.Widget|null} The widget which should be removed next.
       *   If null is returned, no widget is available to remove.
       */
      _getNextToHide: function _getNextToHide() {
        // get the elements by priority
        for (var i = this.__removePriority__P_180_1.length - 1; i >= 0; i--) {
          var item = this.__removePriority__P_180_1[i];
          // maybe a priority is left out and spacers don't have the visibility
          if (item && item.getVisibility && item.getVisibility() == "visible") {
            return item;
          }
        }

        // if there is non found by priority, check all available widgets
        var children = this._getChildren();
        for (var i = children.length - 1; i >= 0; i--) {
          var child = children[i];
          // ignore the overflow widget
          if (child == this.getOverflowIndicator()) {
            continue;
          }
          // spacer don't have the visibility
          if (child.getVisibility && child.getVisibility() == "visible") {
            return child;
          }
        }
      },
      /**
       * The removal of the toolbar items is priority based. You can change these
       * priorities with this method. The higher a priority, the earlier it will
       * be excluded. Remember to use every priority only once! If you want
       * override an already set priority, use the override parameter.
       * Keep in mind to only use already added items.
       *
       * @param item {qx.ui.core.Widget} The item to give the priority.
       * @param priority {Integer} The priority, higher means removed earlier.
       * @param override {Boolean} true, if the priority should be overridden.
       */
      setRemovePriority: function setRemovePriority(item, priority, override) {
        // security check for overriding priorities
        if (!override && this.__removePriority__P_180_1[priority] != undefined) {
          throw new Error("Priority already in use!");
        }
        this.__removePriority__P_180_1[priority] = item;
      },
      // property apply
      _applyOverflowHandling: function _applyOverflowHandling(value, old) {
        // invalidate the own and the parents layout cache because the size hint changes
        this.invalidateLayoutCache();
        var parent = this.getLayoutParent();
        if (parent) {
          parent.invalidateLayoutCache();
        }

        // recalculate if possible
        var bounds = this.getBounds();
        if (bounds && bounds.width) {
          this._recalculateOverflow(bounds.width);
        }

        // if the handling has been enabled
        if (value) {
          // add the resize listener
          this.addListener("resize", this._onResize, this);

          // if the handles has been disabled
        } else {
          this.removeListener("resize", this._onResize, this);

          // set the overflow indicator to excluded
          var overflowIndicator = this.getOverflowIndicator();
          if (overflowIndicator) {
            overflowIndicator.setVisibility("excluded");
          }

          // set all buttons back to visible
          for (var i = 0; i < this.__removedItems__P_180_0.length; i++) {
            this.__removedItems__P_180_0[i].setVisibility("visible");
          }
          // reset the removed items
          this.__removedItems__P_180_0 = [];
        }
      },
      // property apply
      _applyOverflowIndicator: function _applyOverflowIndicator(value, old) {
        if (old) {
          this._remove(old);
        }
        if (value) {
          // check if its a child of the toolbar
          if (this._indexOf(value) == -1) {
            throw new Error("Widget must be child of the toolbar.");
          }
          // hide the widget
          value.setVisibility("excluded");
        }
      },
      /*
      ---------------------------------------------------------------------------
        MENU OPEN
      ---------------------------------------------------------------------------
      */

      __allowMenuOpenHover__P_180_4: false,
      /**
       * Indicate if a menu could be opened on hover or not.
       *
       * @internal
       * @param value {Boolean} <code>true</code> if a menu could be opened,
       *    <code>false</code> otherwise.
       */
      _setAllowMenuOpenHover: function _setAllowMenuOpenHover(value) {
        this.__allowMenuOpenHover__P_180_4 = value;
      },
      /**
       * Return if a menu could be opened on hover or not.
       *
       * @internal
       * @return {Boolean} <code>true</code> if a menu could be opened,
       *    <code>false</code> otherwise.
       */
      _isAllowMenuOpenHover: function _isAllowMenuOpenHover() {
        return this.__allowMenuOpenHover__P_180_4;
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySpacing: function _applySpacing(value, old) {
        var layout = this._getLayout();
        value == null ? layout.resetSpacing() : layout.setSpacing(value);
      },
      // property apply
      _applyShow: function _applyShow(value) {
        var children = this._getChildren();
        for (var i = 0; i < children.length; i++) {
          if (children[i].setShow) {
            children[i].setShow(value);
          }
        }
      },
      /*
      ---------------------------------------------------------------------------
        CHILD HANDLING
      ---------------------------------------------------------------------------
      */
      // overridden
      _add: function _add(child, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._add.call(this, child, options);
        // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)
        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }
        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();
        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _addAt: function _addAt(child, index, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._addAt.call(this, child, index, options);
        // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)
        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }
        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();
        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _addBefore: function _addBefore(child, before, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._addBefore.call(this, child, before, options);
        // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)
        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }
        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();
        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _addAfter: function _addAfter(child, after, options) {
        qx.ui.toolbar.ToolBar.superclass.prototype._addAfter.call(this, child, after, options);
        // sync the show property (bug #6743) - but only if show wasn't explicitly set for the child (bug #6823)
        if (child.setShow && !qx.util.PropertyUtil.getUserValue(child, "show")) {
          child.setShow(this.getShow());
        }
        var newWidth = this.getSizeHint().width + child.getSizeHint().width + 2 * this.getSpacing();
        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _remove: function _remove(child) {
        qx.ui.toolbar.ToolBar.superclass.prototype._remove.call(this, child);
        var newWidth = this.getSizeHint().width - child.getSizeHint().width - 2 * this.getSpacing();
        this._recalculateOverflow(null, newWidth);
      },
      // overridden
      _removeAt: function _removeAt(index) {
        var child = this._getChildren()[index];
        qx.ui.toolbar.ToolBar.superclass.prototype._removeAt.call(this, index);
        var newWidth = this.getSizeHint().width - child.getSizeHint().width - 2 * this.getSpacing();
        this._recalculateOverflow(null, newWidth);
        return child;
      },
      // overridden
      _removeAll: function _removeAll() {
        var children = qx.ui.toolbar.ToolBar.superclass.prototype._removeAll.call(this);
        this._recalculateOverflow(null, 0);
        return children;
      },
      /*
      ---------------------------------------------------------------------------
        UTILITIES
      ---------------------------------------------------------------------------
      */
      /**
       * Add a spacer to the toolbar. The spacer has a flex
       * value of one and will stretch to the available space.
       *
       * @return {qx.ui.core.Spacer} The newly added spacer object. A reference
       *   to the spacer is needed to remove this spacer from the layout.
       */
      addSpacer: function addSpacer() {
        var spacer = new qx.ui.core.Spacer();
        this._add(spacer, {
          flex: 1
        });
        return spacer;
      },
      /**
       * Adds a separator to the toolbar.
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
          } else if (child instanceof qx.ui.toolbar.Part) {
            buttons.push.apply(buttons, child.getMenuButtons());
          }
        }
        return buttons;
      }
    },
    destruct: function destruct() {
      if (this.hasListener("resize")) {
        this.removeListener("resize", this._onResize, this);
      }
    }
  });
  qx.ui.toolbar.ToolBar.$$dbClassInfo = $$dbClassInfo;
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
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Timer": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Timer, which accelerates after each interval. The initial delay and the
   * interval time can be set using the properties {@link #firstInterval}
   * and {@link #interval}. The {@link #interval} events will be fired with
   * decreasing interval times while the timer is running, until the {@link #minimum}
   * is reached. The {@link #decrease} property sets the amount of milliseconds
   * which will decreased after every firing.
   *
   * This class is e.g. used in the {@link qx.ui.form.RepeatButton} and
   * {@link qx.ui.form.HoverButton} widgets.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.event.AcceleratingTimer", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__timer__P_183_0 = new qx.event.Timer(this.getInterval());
      this.__timer__P_183_0.addListener("interval", this._onInterval, this);
    },
    events: {
      /** This event if fired each time the interval time has elapsed */
      interval: "qx.event.type.Event"
    },
    properties: {
      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 100
      },
      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 500
      },
      /** This configures the minimum value for the timer interval. */
      minimum: {
        check: "Integer",
        init: 20
      },
      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      decrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __timer__P_183_0: null,
      __currentInterval__P_183_1: null,
      /**
       * Reset and start the timer.
       */
      start: function start() {
        this.__timer__P_183_0.setInterval(this.getFirstInterval());
        this.__timer__P_183_0.start();
      },
      /**
       * Stop the timer
       */
      stop: function stop() {
        this.__timer__P_183_0.stop();
        this.__currentInterval__P_183_1 = null;
      },
      /**
       * Interval event handler
       */
      _onInterval: function _onInterval() {
        this.__timer__P_183_0.stop();
        if (this.__currentInterval__P_183_1 == null) {
          this.__currentInterval__P_183_1 = this.getInterval();
        }
        this.__currentInterval__P_183_1 = Math.max(this.getMinimum(), this.__currentInterval__P_183_1 - this.getDecrease());
        this.__timer__P_183_0.setInterval(this.__currentInterval__P_183_1);
        this.__timer__P_183_0.start();
        this.fireEvent("interval");
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__timer__P_183_0");
    }
  });
  qx.event.AcceleratingTimer.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-17.js.map?dt=1686138468272
qx.$$packageData['17'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
