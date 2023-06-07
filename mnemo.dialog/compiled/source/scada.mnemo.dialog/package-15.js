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
       2008 Dihedrals.com, http://www.dihedrals.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Chris Banford (zermattchris)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class iterates over the lines in a flow layout.
   *
   * @internal
   */
  qx.Class.define("qx.ui.layout.LineSizeIterator", {
    extend: Object,
    /**
     * @param children {qx.ui.core.Widget[]} The children of the flow layout to
     *    compute the lines from
     * @param spacing {Integer} The horizontal spacing between the children
     */
    construct: function construct(children, spacing) {
      this.__children__P_65_0 = children;
      this.__spacing__P_65_1 = spacing;
      this.__hasMoreLines__P_65_2 = children.length > 0;
      this.__childIndex__P_65_3 = 0;
    },
    members: {
      __children__P_65_0: null,
      __spacing__P_65_1: null,
      __hasMoreLines__P_65_2: null,
      __childIndex__P_65_3: null,
      /**
       * Computes the properties of the next line taking the available width into
       * account
       *
       * @param availWidth {Integer} The available width for the next line
       * @return {Map} A map containing the line's properties.
       */
      computeNextLine: function computeNextLine(availWidth) {
        var availWidth = availWidth || Infinity;
        if (!this.__hasMoreLines__P_65_2) {
          throw new Error("No more lines to compute");
        }
        var children = this.__children__P_65_0;
        var lineHeight = 0;
        var lineWidth = 0;
        var lineChildren = [];
        var gapsBefore = [];
        for (var i = this.__childIndex__P_65_3; i < children.length; i++) {
          var child = children[i];
          var size = child.getSizeHint();
          var gapBefore = this.__computeGapBeforeChild__P_65_4(i);
          var childWidth = size.width + gapBefore;
          var isFirstChild = i == this.__childIndex__P_65_3;
          if (!isFirstChild && lineWidth + childWidth > availWidth) {
            this.__childIndex__P_65_3 = i;
            break;
          }
          var childHeight = size.height + child.getMarginTop() + child.getMarginBottom();
          lineChildren.push(child);
          gapsBefore.push(gapBefore);
          lineWidth += childWidth;
          lineHeight = Math.max(lineHeight, childHeight);
          if (child.getLayoutProperties().lineBreak) {
            this.__childIndex__P_65_3 = i + 1;
            break;
          }
        }
        if (i >= children.length) {
          this.__hasMoreLines__P_65_2 = false;
        }
        return {
          height: lineHeight,
          width: lineWidth,
          children: lineChildren,
          gapsBefore: gapsBefore
        };
      },
      /**
       * Computes the gap before the child at the given index
       *
       * @param childIndex {Integer} The index of the child widget
       * @return {Integer} The gap before the given child
       */
      __computeGapBeforeChild__P_65_4: function __computeGapBeforeChild__P_65_4(childIndex) {
        var isFirstInLine = childIndex == this.__childIndex__P_65_3;
        if (isFirstInLine) {
          return this.__children__P_65_0[childIndex].getMarginLeft();
        } else {
          return Math.max(this.__children__P_65_0[childIndex - 1].getMarginRight(), this.__children__P_65_0[childIndex].getMarginLeft(), this.__spacing__P_65_1);
        }
      },
      /**
       * Whether there are more lines
       *
       * @return {Boolean} Whether there are more lines
       */
      hasMoreLines: function hasMoreLines() {
        return this.__hasMoreLines__P_65_2;
      }
    }
  });
  qx.ui.layout.LineSizeIterator.$$dbClassInfo = $$dbClassInfo;
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
      "qx.event.Registration": {},
      "qx.event.util.Keyboard": {},
      "qx.lang.String": {},
      "qx.locale.Key": {}
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
   * Shortcuts can be used to globally define keyboard shortcuts.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.bom.Shortcut", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * Create a new instance of Command
     *
     * @param shortcut {String} shortcuts can be composed of optional modifier
     *    keys Control, Alt, Shift, Meta and a non modifier key.
     *    If no non modifier key is specified, the second parameter is evaluated.
     *    The key must be separated by a <code>+</code> or <code>-</code> character.
     *    Examples: Alt+F1, Control+C, Control+Alt+Delete
     */
    construct: function construct(shortcut) {
      qx.core.Object.constructor.call(this);
      this.__modifier__P_142_0 = {};
      this.__key__P_142_1 = null;
      if (shortcut != null) {
        this.setShortcut(shortcut);
      }
      this.initEnabled();
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Fired when the command is executed. Sets the "data" property of the event to
       * the object that issued the command.
       */
      execute: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** whether the command should be respected/enabled */
      enabled: {
        init: true,
        check: "Boolean",
        event: "changeEnabled",
        apply: "_applyEnabled"
      },
      /** The command shortcut */
      shortcut: {
        check: "String",
        apply: "_applyShortcut",
        nullable: true
      },
      /**
       * Whether the execute event should be fired repeatedly if the user keep
       * the keys pressed.
       */
      autoRepeat: {
        check: "Boolean",
        init: false
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __modifier__P_142_0: "",
      __key__P_142_1: "",
      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Fire the "execute" event on this shortcut.
       *
       * @param target {Object} Object which issued the execute event
       */
      execute: function execute(target) {
        this.fireDataEvent("execute", target);
      },
      /**
       * Key down event handler.
       *
       * @param event {qx.event.type.KeySequence} The key event object
       */
      __onKeyDown__P_142_2: function __onKeyDown__P_142_2(event) {
        if (this.getEnabled() && this.__matchesKeyEvent__P_142_3(event)) {
          if (!this.isAutoRepeat()) {
            this.execute(event.getTarget());
          }
          event.stop();
        }
      },
      /**
       * Key press event handler.
       *
       * @param event {qx.event.type.KeySequence} The key event object
       */
      __onKeyPress__P_142_4: function __onKeyPress__P_142_4(event) {
        if (this.getEnabled() && this.__matchesKeyEvent__P_142_3(event)) {
          if (this.isAutoRepeat()) {
            this.execute(event.getTarget());
          }
          event.stop();
        }
      },
      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyEnabled: function _applyEnabled(value, old) {
        if (value) {
          qx.event.Registration.addListener(document.documentElement, "keydown", this.__onKeyDown__P_142_2, this);
          qx.event.Registration.addListener(document.documentElement, "keypress", this.__onKeyPress__P_142_4, this);
        } else {
          qx.event.Registration.removeListener(document.documentElement, "keydown", this.__onKeyDown__P_142_2, this);
          qx.event.Registration.removeListener(document.documentElement, "keypress", this.__onKeyPress__P_142_4, this);
        }
      },
      // property apply
      _applyShortcut: function _applyShortcut(value, old) {
        if (value) {
          // do not allow whitespaces within shortcuts
          if (value.search(/[\s]+/) != -1) {
            var msg = "Whitespaces are not allowed within shortcuts";
            this.error(msg);
            throw new Error(msg);
          }
          this.__modifier__P_142_0 = {
            Control: false,
            Shift: false,
            Meta: false,
            Alt: false
          };
          this.__key__P_142_1 = null;

          // To support shortcuts with "+" and "-" as keys it is necessary
          // to split the given value in a different way to determine the
          // several keyIdentifiers
          var index;
          var a = [];
          while (value.length > 0 && index != -1) {
            // search for delimiters "+" and "-"
            index = value.search(/[-+]+/);

            // add identifiers - take value if no separator was found or
            // only one char is left (second part of shortcut)
            a.push(value.length == 1 || index == -1 ? value : value.substring(0, index));

            // extract the already detected identifier
            value = value.substring(index + 1);
          }
          var al = a.length;
          for (var i = 0; i < al; i++) {
            var identifier = this.__normalizeKeyIdentifier__P_142_5(a[i]);
            switch (identifier) {
              case "Control":
              case "Shift":
              case "Meta":
              case "Alt":
                this.__modifier__P_142_0[identifier] = true;
                break;
              case "Unidentified":
                var msg = "Not a valid key name for a shortcut: " + a[i];
                this.error(msg);
                throw msg;
              default:
                if (this.__key__P_142_1) {
                  var msg = "You can only specify one non modifier key!";
                  this.error(msg);
                  throw msg;
                }
                this.__key__P_142_1 = identifier;
            }
          }
        }
        return true;
      },
      /*
      --------------------------------------------------------------------------
        INTERNAL MATCHING LOGIC
      ---------------------------------------------------------------------------
      */
      /**
       * Checks whether the given key event matches the shortcut's shortcut
       *
       * @param e {qx.event.type.KeySequence} the key event object
       * @return {Boolean} whether the shortcuts shortcut matches the key event
       */
      __matchesKeyEvent__P_142_3: function __matchesKeyEvent__P_142_3(e) {
        var key = this.__key__P_142_1;
        if (!key) {
          // no shortcut defined.
          return false;
        }

        // for check special keys
        // and check if a shortcut is a single char and special keys are pressed
        if (!this.__modifier__P_142_0.Shift && e.isShiftPressed() || this.__modifier__P_142_0.Shift && !e.isShiftPressed() || !this.__modifier__P_142_0.Control && e.isCtrlPressed() || this.__modifier__P_142_0.Control && !e.isCtrlPressed() || !this.__modifier__P_142_0.Meta && e.isMetaPressed() || this.__modifier__P_142_0.Meta && !e.isMetaPressed() || !this.__modifier__P_142_0.Alt && e.isAltPressed() || this.__modifier__P_142_0.Alt && !e.isAltPressed()) {
          return false;
        }
        if (key == e.getKeyIdentifier()) {
          return true;
        }
        return false;
      },
      /*
      ---------------------------------------------------------------------------
        COMPATIBILITY TO COMMAND
      ---------------------------------------------------------------------------
      */

      /**
       * @lint ignoreReferenceField(__oldKeyNameToKeyIdentifierMap)
       */
      __oldKeyNameToKeyIdentifierMap__P_142_6: {
        // all other keys are converted by converting the first letter to uppercase
        esc: "Escape",
        ctrl: "Control",
        print: "PrintScreen",
        del: "Delete",
        pageup: "PageUp",
        pagedown: "PageDown",
        numlock: "NumLock",
        numpad_0: "0",
        numpad_1: "1",
        numpad_2: "2",
        numpad_3: "3",
        numpad_4: "4",
        numpad_5: "5",
        numpad_6: "6",
        numpad_7: "7",
        numpad_8: "8",
        numpad_9: "9",
        numpad_divide: "/",
        numpad_multiply: "*",
        numpad_minus: "-",
        numpad_plus: "+"
      },
      /**
       * Checks and normalizes the key identifier.
       *
       * @param keyName {String} name of the key.
       * @return {String} normalized keyIdentifier or "Unidentified" if a conversion was not possible
       */
      __normalizeKeyIdentifier__P_142_5: function __normalizeKeyIdentifier__P_142_5(keyName) {
        var kbUtil = qx.event.util.Keyboard;
        var keyIdentifier = "Unidentified";
        if (kbUtil.isValidKeyIdentifier(keyName)) {
          return keyName;
        }
        if (keyName.length == 1 && keyName >= "a" && keyName <= "z") {
          return keyName.toUpperCase();
        }
        keyName = keyName.toLowerCase();
        var keyIdentifier = this.__oldKeyNameToKeyIdentifierMap__P_142_6[keyName] || qx.lang.String.firstUp(keyName);
        if (kbUtil.isValidKeyIdentifier(keyIdentifier)) {
          return keyIdentifier;
        } else {
          return "Unidentified";
        }
      },
      /*
      ---------------------------------------------------------------------------
        STRING CONVERSION
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the shortcut as string using the currently selected locale.
       *
       * @return {String} shortcut
       */
      toString: function toString() {
        var key = this.__key__P_142_1;
        var str = [];
        for (var modifier in this.__modifier__P_142_0) {
          // this.__modifier holds a map with shortcut combination keys
          // like "Control", "Alt", "Meta" and "Shift" as keys with
          // Boolean values
          if (this.__modifier__P_142_0[modifier]) {
            str.push(qx.locale.Key.getKeyName("short", modifier));
          }
        }
        if (key) {
          str.push(qx.locale.Key.getKeyName("short", key));
        }
        return str.join("+");
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      // this will remove the event listener
      this.setEnabled(false);
      this.__modifier__P_142_0 = this.__key__P_142_1 = null;
    }
  });
  qx.bom.Shortcut.$$dbClassInfo = $$dbClassInfo;
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
      "qx.util.ResourceManager": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.event.Timer": {},
      "qx.lang.Array": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.bom.Stylesheet": {},
      "qx.bom.webfonts.Validator": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * Manages font-face definitions, making sure that each rule is only applied
   * once. It supports adding fonts of the same family but with different style
   * and weight. For instance, the following declaration uses 4 different source
   * files and combine them in a single font family.
   *
   * <pre class='javascript'>
   *   sources: [
   *     {
   *       family: "Sansation",
   *       source: [
   *         "fonts/Sansation-Regular.ttf"
   *       ]
   *     },
   *     {
   *       family: "Sansation",
   *       fontWeight: "bold",
   *       source: [
   *         "fonts/Sansation-Bold.ttf",
   *       ]
   *     },
   *     {
   *       family: "Sansation",
   *       fontStyle: "italic",
   *       source: [
   *         "fonts/Sansation-Italic.ttf",
   *       ]
   *     },
   *     {
   *       family: "Sansation",
   *       fontWeight: "bold",
   *       fontStyle: "italic",
   *       source: [
   *         "fonts/Sansation-BoldItalic.ttf",
   *       ]
   *     }
   *   ]
   * </pre>
   *
   * This class does not need to be disposed, except when you want to abort the loading
   * and validation process.
   */
  qx.Class.define("qx.bom.webfonts.Manager", {
    extend: qx.core.Object,
    type: "singleton",
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__createdStyles__P_152_0 = [];
      this.__validators__P_152_1 = {};
      this.__queue__P_152_2 = [];
      this.__preferredFormats__P_152_3 = this.getPreferredFormats();
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * List of known font definition formats (i.e. file extensions). Used to
       * identify the type of each font file configured for a web font.
       */
      FONT_FORMATS: ["eot", "woff2", "woff", "ttf", "svg"],
      /**
       * Timeout (in ms) to wait before deciding that a web font was not loaded.
       */
      VALIDATION_TIMEOUT: 5000
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __createdStyles__P_152_0: null,
      __styleSheet__P_152_4: null,
      __validators__P_152_1: null,
      __preferredFormats__P_152_3: null,
      __queue__P_152_2: null,
      __queueInterval__P_152_5: null,
      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */
      /**
       * Adds the necessary font-face rule for a web font to the document. Also
       * creates a web font Validator ({@link qx.bom.webfonts.Validator}) that
       * checks if the webFont was applied correctly.
       *
       * @param familyName {String} Name of the web font
       * @param sourcesList {Object} List of source URLs along with their style
       * (e.g. fontStyle: "italic") and weight (e.g. fontWeight: "bold").
       * For maximum compatibility, this should include EOT, WOFF and TTF versions
       * of the font.
       * @param callback {Function?} Optional event listener callback that will be
       * executed once the validator has determined whether the webFont was
       * applied correctly.
       * See {@link qx.bom.webfonts.Validator#changeStatus}
       * @param context {Object?} Optional context for the callback function
       */
      require: function require(familyName, sourcesList, callback, context) {
        var sourceUrls = sourcesList.source;
        var comparisonString = sourcesList.comparisonString;
        var version = sourcesList.version;
        var fontWeight = sourcesList.fontWeight;
        var fontStyle = sourcesList.fontStyle;
        var sources = [];
        for (var i = 0, l = sourceUrls.length; i < l; i++) {
          var split = sourceUrls[i].split("#");
          var src = qx.util.ResourceManager.getInstance().toUri(split[0]);
          if (split.length > 1) {
            src = src + "#" + split[1];
          }
          sources.push(src);
        }

        // old IEs need a break in between adding @font-face rules
        if (qx.core.Environment.get("engine.name") == "mshtml" && (parseInt(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9)) {
          if (!this.__queueInterval__P_152_5) {
            this.__queueInterval__P_152_5 = new qx.event.Timer(100);
            this.__queueInterval__P_152_5.addListener("interval", this.__flushQueue__P_152_6, this);
          }
          if (!this.__queueInterval__P_152_5.isEnabled()) {
            this.__queueInterval__P_152_5.start();
          }
          this.__queue__P_152_2.push([familyName, sources, fontWeight, fontStyle, comparisonString, version, callback, context]);
        } else {
          this.__require__P_152_7(familyName, sources, fontWeight, fontStyle, comparisonString, version, callback, context);
        }
      },
      /**
       * Removes a font's font-face definition from the style sheet. This means
       * the font will no longer be available and any elements using it will
       * fall back to the their regular font-families.
       *
       * @param familyName {String} font-family name
       * @param fontWeight {String} the font-weight.
       * @param fontStyle {String} the font-style.
       */
      remove: function remove(familyName, fontWeight, fontStyle) {
        var fontLookupKey = this.__createFontLookupKey__P_152_8(familyName, fontWeight, fontStyle);
        var index = null;
        for (var i = 0, l = this.__createdStyles__P_152_0.length; i < l; i++) {
          if (this.__createdStyles__P_152_0[i] == fontLookupKey) {
            index = i;
            this.__removeRule__P_152_9(familyName, fontWeight, fontStyle);
            break;
          }
        }
        if (index !== null) {
          qx.lang.Array.removeAt(this.__createdStyles__P_152_0, index);
        }
        if (fontLookupKey in this.__validators__P_152_1) {
          this.__validators__P_152_1[fontLookupKey].dispose();
          delete this.__validators__P_152_1[fontLookupKey];
        }
      },
      /**
       * Returns the preferred font format(s) for the currently used browser. Some
       * browsers support multiple formats, e.g. WOFF and TTF or WOFF and EOT. In
       * those cases, WOFF is considered the preferred format.
       *
       * @return {String[]} List of supported font formats ordered by preference
       * or empty Array if none could be determined
       */
      getPreferredFormats: function getPreferredFormats() {
        var preferredFormats = [];
        var browser = qx.core.Environment.get("browser.name");
        var browserVersion = qx.core.Environment.get("browser.version");
        var os = qx.core.Environment.get("os.name");
        var osVersion = qx.core.Environment.get("os.version");
        if (browser == "edge" && browserVersion >= 14 || browser == "firefox" && browserVersion >= 69 || browser == "chrome" && browserVersion >= 36) {
          preferredFormats.push("woff2");
        }
        if (browser == "ie" && qx.core.Environment.get("browser.documentmode") >= 9 || browser == "edge" && browserVersion >= 12 || browser == "firefox" && browserVersion >= 3.6 || browser == "chrome" && browserVersion >= 6) {
          preferredFormats.push("woff");
        }
        if (browser == "edge" && browserVersion >= 12 || browser == "opera" && browserVersion >= 10 || browser == "safari" && browserVersion >= 3.1 || browser == "firefox" && browserVersion >= 3.5 || browser == "chrome" && browserVersion >= 4 || browser == "mobile safari" && os == "ios" && osVersion >= 4.2) {
          preferredFormats.push("ttf");
        }
        if (browser == "ie" && browserVersion >= 4) {
          preferredFormats.push("eot");
        }
        if (browser == "mobileSafari" && os == "ios" && osVersion >= 4.1) {
          preferredFormats.push("svg");
        }
        return preferredFormats;
      },
      /**
       * Removes the styleSheet element used for all web font definitions from the
       * document. This means all web fonts declared by the manager will no longer
       * be available and elements using them will fall back to their regular
       * font-families
       */
      removeStyleSheet: function removeStyleSheet() {
        this.__createdStyles__P_152_0 = [];
        if (this.__styleSheet__P_152_4) {
          qx.bom.Stylesheet.removeSheet(this.__styleSheet__P_152_4);
        }
        this.__styleSheet__P_152_4 = null;
      },
      /*
      ---------------------------------------------------------------------------
        PRIVATE API
      ---------------------------------------------------------------------------
      */
      /**
       * Creates a lookup key to index the created fonts.
       * @param familyName {String} font-family name
       * @param fontWeight {String} the font-weight.
       * @param fontStyle {String} the font-style.
       * @return {string} the font lookup key
       */
      __createFontLookupKey__P_152_8: function __createFontLookupKey__P_152_8(familyName, fontWeight, fontStyle) {
        var lookupKey = familyName + "_" + (fontWeight ? fontWeight : "normal") + "_" + (fontStyle ? fontStyle : "normal");
        return lookupKey;
      },
      /**
       * Does the actual work of adding stylesheet rules and triggering font
       * validation
       *
       * @param familyName {String} Name of the web font
       * @param sources {String[]} List of source URLs. For maximum compatibility,
       * this should include EOT, WOFF and TTF versions of the font.
       * @param fontWeight {String} the web font should be registered using a
       * fontWeight font weight.
       * @param fontStyle {String} the web font should be registered using an
       * fontStyle font style.
       * @param comparisonString {String} String to check whether the font has loaded or not
       * @param version {String?} Optional version that is appended to the font URL to be able to override caching
       * @param callback {Function?} Optional event listener callback that will be
       * executed once the validator has determined whether the webFont was
       * applied correctly.
       * @param context {Object?} Optional context for the callback function
       */
      __require__P_152_7: function __require__P_152_7(familyName, sources, fontWeight, fontStyle, comparisonString, version, callback, context) {
        var fontLookupKey = this.__createFontLookupKey__P_152_8(familyName, fontWeight, fontStyle);
        if (!this.__createdStyles__P_152_0.includes(fontLookupKey)) {
          var sourcesMap = this.__getSourcesMap__P_152_10(sources);
          var rule = this.__getRule__P_152_11(familyName, fontWeight, fontStyle, sourcesMap, version);
          if (!rule) {
            throw new Error("Couldn't create @font-face rule for WebFont " + familyName + "!");
          }
          if (!this.__styleSheet__P_152_4) {
            this.__styleSheet__P_152_4 = qx.bom.Stylesheet.createElement();
          }
          try {
            this.__addRule__P_152_12(rule);
          } catch (ex) {
            {
              this.warn("Error while adding @font-face rule:", ex.message);
              return;
            }
          }
          this.__createdStyles__P_152_0.push(fontLookupKey);
        }
        if (!this.__validators__P_152_1[fontLookupKey]) {
          this.__validators__P_152_1[fontLookupKey] = new qx.bom.webfonts.Validator(familyName, comparisonString, fontWeight, fontStyle);
          this.__validators__P_152_1[fontLookupKey].setTimeout(qx.bom.webfonts.Manager.VALIDATION_TIMEOUT);
          this.__validators__P_152_1[fontLookupKey].addListenerOnce("changeStatus", this.__onFontChangeStatus__P_152_13, this);
        }
        if (callback) {
          var cbContext = context || window;
          this.__validators__P_152_1[fontLookupKey].addListenerOnce("changeStatus", callback, cbContext);
        }
        this.__validators__P_152_1[fontLookupKey].validate();
      },
      /**
       * Processes the next item in the queue
       */
      __flushQueue__P_152_6: function __flushQueue__P_152_6() {
        if (this.__queue__P_152_2.length == 0) {
          this.__queueInterval__P_152_5.stop();
          return;
        }
        var next = this.__queue__P_152_2.shift();
        this.__require__P_152_7.apply(this, next);
      },
      /**
       * Removes the font-face declaration if a font could not be validated
       *
       * @param ev {qx.event.type.Data} qx.bom.webfonts.Validator#changeStatus
       */
      __onFontChangeStatus__P_152_13: function __onFontChangeStatus__P_152_13(ev) {
        var result = ev.getData();
        if (result.valid === false) {
          qx.event.Timer.once(function () {
            this.remove(result.family);
          }, this, 250);
        }
      },
      /**
       * Uses a naive regExp match to determine the format of each defined source
       * file for a webFont. Returns a map with the format names as keys and the
       * corresponding source URLs as values.
       *
       * @param sources {String[]} Array of source URLs
       * @return {Map} Map of formats and URLs
       */
      __getSourcesMap__P_152_10: function __getSourcesMap__P_152_10(sources) {
        var formats = qx.bom.webfonts.Manager.FONT_FORMATS;
        var sourcesMap = {};
        var reg = new RegExp(".(" + formats.join("|") + ")");
        for (var i = 0, l = sources.length; i < l; i++) {
          var match = reg.exec(sources[i]);
          if (match) {
            var type = match[1];
            sourcesMap[type] = sources[i];
          }
        }
        return sourcesMap;
      },
      /**
       * Assembles the body of a font-face rule for a single webFont.
       *
       * @param familyName {String} Font-family name
       * @param fontWeight {String} the web font should be registered using a
       * fontWeight font weight.
       * @param fontStyle {String} the web font should be registered using an
       * fontStyle font style.
       * @param sourcesMap {Map} Map of font formats and sources
       * @param version {String?} Optional version to be appended to the URL
       * @return {String} The computed CSS rule
       */
      __getRule__P_152_11: function __getRule__P_152_11(familyName, fontWeight, fontStyle, sourcesMap, version) {
        var rules = [];
        var formatList = this.__preferredFormats__P_152_3.length > 0 ? this.__preferredFormats__P_152_3 : qx.bom.webfonts.Manager.FONT_FORMATS;
        for (var i = 0, l = formatList.length; i < l; i++) {
          var format = formatList[i];
          if (sourcesMap[format]) {
            rules.push(this.__getSourceForFormat__P_152_14(format, sourcesMap[format], version));
          }
        }
        var rule = "src: " + rules.join(",\n") + ";";
        rule = "font-family: " + familyName + ";\n" + rule;
        rule = rule + "\nfont-style: " + (fontStyle ? fontStyle : "normal") + ";";
        rule = rule + "\nfont-weight: " + (fontWeight ? fontWeight : "normal") + ";";
        return rule;
      },
      /**
       * Returns the full src value for a given font URL depending on the type
       * @param format {String} The font format, one of eot, woff2, woff, ttf, svg
       * @param url {String} The font file's URL
       * @param version {String?} Optional version to be appended to the URL
       * @return {String} The src directive
       */
      __getSourceForFormat__P_152_14: function __getSourceForFormat__P_152_14(format, url, version) {
        if (version) {
          url += "?" + version;
        }
        switch (format) {
          case "eot":
            return "url('" + url + "');" + "src: url('" + url + "?#iefix') format('embedded-opentype')";
          case "woff2":
            return "url('" + url + "') format('woff2')";
          case "woff":
            return "url('" + url + "') format('woff')";
          case "ttf":
            return "url('" + url + "') format('truetype')";
          case "svg":
            return "url('" + url + "') format('svg')";
          default:
            return null;
        }
      },
      /**
       * Adds a font-face rule to the document
       *
       * @param rule {String} The body of the CSS rule
       */
      __addRule__P_152_12: function __addRule__P_152_12(rule) {
        var completeRule = "@font-face {" + rule + "}\n";
        if (qx.core.Environment.get("browser.name") == "ie" && qx.core.Environment.get("browser.documentmode") < 9) {
          var cssText = this.__fixCssText__P_152_15(this.__styleSheet__P_152_4.cssText);
          cssText += completeRule;
          this.__styleSheet__P_152_4.cssText = cssText;
        } else {
          this.__styleSheet__P_152_4.insertRule(completeRule, this.__styleSheet__P_152_4.cssRules.length);
        }
      },
      /**
       * Removes the font-face declaration for the given font-family from the
       * stylesheet
       *
       * @param familyName {String} The font-family name
       * @param fontWeight {String} fontWeight font-weight.
       * @param fontStyle {String} fontStyle font-style.
       */
      __removeRule__P_152_9: function __removeRule__P_152_9(familyName, fontWeight, fontStyle) {
        // In IE and edge even if the rule was added with font-style first
        // and font-weight second, it is not guaranteed that the attributes
        // remain in that order. Therefore we check for both version,
        // style first, weight second and weight first, style second.
        // Without this fix the rule isn't found and removed reliable.
        var regtext = "@font-face.*?" + familyName + "(.*font-style: *" + (fontStyle ? fontStyle : "normal") + ".*font-weight: *" + (fontWeight ? fontWeight : "normal") + ")|" + "(.*font-weight: *" + (fontWeight ? fontWeight : "normal") + ".*font-style: *" + (fontStyle ? fontStyle : "normal") + ")";
        var reg = new RegExp(regtext, "m");
        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.cssText) {
            var cssText = sheet.cssText.replace(/\n/g, "").replace(/\r/g, "");
            cssText = this.__fixCssText__P_152_15(cssText);
            if (reg.exec(cssText)) {
              cssText = cssText.replace(reg, "");
            }
            sheet.cssText = cssText;
          } else {
            var cssRules = null;
            try {
              cssRules = sheet.cssRules;
            } catch (ex) {
              // Exception is thrown if there are no rules (eg a `<link>` tag inserted by the user)
            }
            if (cssRules) {
              for (var j = 0, m = cssRules.length; j < m; j++) {
                var cssText = cssRules[j].cssText.replace(/\n/g, "").replace(/\r/g, "");
                if (reg.exec(cssText)) {
                  this.__styleSheet__P_152_4.deleteRule(j);
                  return;
                }
              }
            }
          }
        }
      },
      /**
       * IE 6 and 7 omit the trailing quote after the format name when
       * querying cssText. This needs to be fixed before cssText is replaced
       * or all rules will be invalid and no web fonts will work any more.
       *
       * @param cssText {String} CSS text
       * @return {String} Fixed CSS text
       */
      __fixCssText__P_152_15: function __fixCssText__P_152_15(cssText) {
        return cssText.replace("'eot)", "'eot')").replace("('embedded-opentype)", "('embedded-opentype')");
      }
    },
    /*
    *****************************************************************************
      DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__queueInterval__P_152_5) {
        this.__queueInterval__P_152_5.stop();
        this.__queueInterval__P_152_5.dispose();
      }
      delete this.__createdStyles__P_152_0;
      this.removeStyleSheet();
      for (var prop in this.__validators__P_152_1) {
        this.__validators__P_152_1[prop].dispose();
      }
      qx.bom.webfonts.Validator.removeDefaultHelperElements();
    }
  });
  qx.bom.webfonts.Manager.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {
        "require": true
      },
      "qx.bom.client.CssAnimation": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.animation": {
          "construct": true,
          "className": "qx.bom.client.CssAnimation"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This is a simple handle, which will be returned when an animation is
   * started using the {@link qx.bom.element.Animation#animate} method. It
   * basically controls the animation.
   *
   * @ignore(qx.bom.element.AnimationJs)
   */
  qx.Bootstrap.define("qx.bom.element.AnimationHandle", {
    extend: qx.event.Emitter,
    construct: function construct() {
      var css = qx.core.Environment.get("css.animation");
      this.__playState__P_195_0 = css && css["play-state"];
      this.__playing__P_195_1 = true;
      this.addListenerOnce("end", this.__setEnded__P_195_2, this);
    },
    events: {
      /** Fired when the animation started via {@link qx.bom.element.Animation}. */
      start: "Element",
      /**
       * Fired when the animation started via {@link qx.bom.element.Animation} has
       * ended.
       */
      end: "Element",
      /** Fired on every iteration of the animation. */
      iteration: "Element"
    },
    members: {
      __playState__P_195_0: null,
      __playing__P_195_1: false,
      __ended__P_195_3: false,
      /**
       * Accessor of the playing state.
       * @return {Boolean} <code>true</code>, if the animations is playing.
       */
      isPlaying: function isPlaying() {
        return this.__playing__P_195_1;
      },
      /**
       * Accessor of the ended state.
       * @return {Boolean} <code>true</code>, if the animations has ended.
       */
      isEnded: function isEnded() {
        return this.__ended__P_195_3;
      },
      /**
       * Accessor of the paused state.
       * @return {Boolean} <code>true</code>, if the animations is paused.
       */
      isPaused: function isPaused() {
        return this.el.style[this.__playState__P_195_0] == "paused";
      },
      /**
       * Pauses the animation, if running. If not running, it will be ignored.
       */
      pause: function pause() {
        if (this.el) {
          this.el.style[this.__playState__P_195_0] = "paused";
          this.el.$$animation.__playing__P_195_1 = false;
          // in case the animation is based on JS
          if (this.animationId && qx.bom.element.AnimationJs) {
            qx.bom.element.AnimationJs.pause(this);
          }
        }
      },
      /**
       * Resumes an animation. This does not start the animation once it has ended.
       * In this case you need to start a new Animation.
       */
      play: function play() {
        if (this.el) {
          this.el.style[this.__playState__P_195_0] = "running";
          this.el.$$animation.__playing__P_195_1 = true;
          // in case the animation is based on JS
          if (this.i != undefined && qx.bom.element.AnimationJs) {
            qx.bom.element.AnimationJs.play(this);
          }
        }
      },
      /**
       * Stops the animation if running.
       */
      stop: function stop() {
        if (this.el && qx.core.Environment.get("css.animation") && !this.jsAnimation) {
          this.el.style[this.__playState__P_195_0] = "";
          this.el.style[qx.core.Environment.get("css.animation").name] = "";
          this.el.$$animation.__playing__P_195_1 = false;
          this.el.$$animation.__ended__P_195_3 = true;
        }
        // in case the animation is based on JS
        else if (this.jsAnimation) {
          this.stopped = true;
          qx.bom.element.AnimationJs.stop(this);
        }
      },
      /**
       * Set the animation state to ended
       */
      __setEnded__P_195_2: function __setEnded__P_195_2() {
        this.__playing__P_195_1 = false;
        this.__ended__P_195_3 = true;
      }
    }
  });
  qx.bom.element.AnimationHandle.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Style": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["css.transform", "css.transform.3d"],
      "required": {}
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
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * Responsible for checking all relevant CSS transform properties.
   *
   * Specs:
   * http://www.w3.org/TR/css3-2d-transforms/
   * http://www.w3.org/TR/css3-3d-transforms/
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.CssTransform", {
    statics: {
      /**
       * Main check method which returns an object if CSS animations are
       * supported. This object contains all necessary keys to work with CSS
       * animations.
       * <ul>
       *  <li><code>name</code> The name of the css transform style</li>
       *  <li><code>style</code> The name of the css transform-style style</li>
       *  <li><code>origin</code> The name of the transform-origin style</li>
       *  <li><code>3d</code> Whether 3d transforms are supported</li>
       *  <li><code>perspective</code> The name of the perspective style</li>
       *  <li><code>perspective-origin</code> The name of the perspective-origin style</li>
       *  <li><code>backface-visibility</code> The name of the backface-visibility style</li>
       * </ul>
       *
       * @internal
       * @return {Object|null} The described object or null, if animations are
       *   not supported.
       */
      getSupport: function getSupport() {
        var name = qx.bom.client.CssTransform.getName();
        if (name != null) {
          return {
            name: name,
            style: qx.bom.client.CssTransform.getStyle(),
            origin: qx.bom.client.CssTransform.getOrigin(),
            "3d": qx.bom.client.CssTransform.get3D(),
            perspective: qx.bom.client.CssTransform.getPerspective(),
            "perspective-origin": qx.bom.client.CssTransform.getPerspectiveOrigin(),
            "backface-visibility": qx.bom.client.CssTransform.getBackFaceVisibility()
          };
        }
        return null;
      },
      /**
       * Checks for the style name used to set the transform origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getStyle: function getStyle() {
        return qx.bom.Style.getPropertyName("transformStyle");
      },
      /**
       * Checks for the style name used to set the transform origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getPerspective: function getPerspective() {
        return qx.bom.Style.getPropertyName("perspective");
      },
      /**
       * Checks for the style name used to set the perspective origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getPerspectiveOrigin: function getPerspectiveOrigin() {
        return qx.bom.Style.getPropertyName("perspectiveOrigin");
      },
      /**
       * Checks for the style name used to set the backface visibility.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getBackFaceVisibility: function getBackFaceVisibility() {
        return qx.bom.Style.getPropertyName("backfaceVisibility");
      },
      /**
       * Checks for the style name used to set the transform origin.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getOrigin: function getOrigin() {
        return qx.bom.Style.getPropertyName("transformOrigin");
      },
      /**
       * Checks for the style name used for transforms.
       * @internal
       * @return {String|null} The name of the style or null, if the style is
       *   not supported.
       */
      getName: function getName() {
        return qx.bom.Style.getPropertyName("transform");
      },
      /**
       * Checks if 3D transforms are supported.
       * @internal
       * @return {Boolean} <code>true</code>, if 3D transformations are supported
       */
      get3D: function get3D() {
        return qx.bom.client.CssTransform.getPerspective() != null;
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("css.transform", statics.getSupport);
      qx.core.Environment.add("css.transform.3d", statics.get3D);
    }
  });
  qx.bom.client.CssTransform.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.CssTransform": {
        "require": true
      },
      "qx.bom.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.transform": {
          "load": true,
          "className": "qx.bom.client.CssTransform"
        },
        "css.transform.3d": {
          "className": "qx.bom.client.CssTransform"
        }
      }
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
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This class is responsible for applying CSS3 transforms to plain DOM elements.
   * The implementation is mostly a cross browser wrapper for applying the
   * transforms.
   * The API is keep to the spec as close as possible.
   *
   * http://www.w3.org/TR/css3-3d-transforms/
   */
  qx.Bootstrap.define("qx.bom.element.Transform", {
    statics: {
      /** Internal storage of the CSS names */
      __cssKeys__P_196_0: qx.core.Environment.get("css.transform"),
      /**
       * Method to apply multiple transforms at once to the given element. It
       * takes a map containing the transforms you want to apply plus the values
       * e.g.<code>{scale: 2, rotate: "5deg"}</code>.
       * The values can be either singular, which means a single value will
       * be added to the CSS. If you give an array, the values will be split up
       * and each array entry will be used for the X, Y or Z dimension in that
       * order e.g. <code>{scale: [2, 0.5]}</code> will result in a element
       * double the size in X direction and half the size in Y direction.
       * The values can be either singular, which means a single value will
       * be added to the CSS. If you give an array, the values will be join to
       * a string.
       * 3d suffixed properties will be taken for translate and scale if they are
       * available and an array with three values is given.
       * Make sure your browser supports all transformations you apply.
       *
       * @param el {Element} The element to apply the transformation.
       * @param transforms {Map} The map containing the transforms and value.
       */
      transform: function transform(el, transforms) {
        var transformCss = this.getTransformValue(transforms);
        if (this.__cssKeys__P_196_0 != null) {
          var style = this.__cssKeys__P_196_0["name"];
          el.style[style] = transformCss;
        }
      },
      /**
       * Translates the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
       */
      translate: function translate(el, value) {
        this.transform(el, {
          translate: value
        });
      },
      /**
       * Scales the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {Number|Array} The value to scale.
       */
      scale: function scale(el, value) {
        this.transform(el, {
          scale: value
        });
      },
      /**
       * Rotates the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {String|Array} The value to rotate e.g. <code>"90deg"</code>.
       */
      rotate: function rotate(el, value) {
        this.transform(el, {
          rotate: value
        });
      },
      /**
       * Skews the given element by the given value. For further details, take
       * a look at the {@link #transform} method.
       * @param el {Element} The element to apply the transformation.
       * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
       */
      skew: function skew(el, value) {
        this.transform(el, {
          skew: value
        });
      },
      /**
       * Converts the given map to a string which could be added to a css
       * stylesheet.
       * @param transforms {Map} The transforms map. For a detailed description,
       * take a look at the {@link #transform} method.
       * @return {String} The CSS value.
       */
      getCss: function getCss(transforms) {
        var transformCss = this.getTransformValue(transforms);
        if (this.__cssKeys__P_196_0 != null) {
          var style = this.__cssKeys__P_196_0["name"];
          return qx.bom.Style.getCssName(style) + ":" + transformCss + ";";
        }
        return "";
      },
      /**
       * Sets the transform-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
       * @param el {Element} The dom element to set the property.
       * @param value {String} CSS position values like <code>50% 50%</code> or
       *   <code>left top</code>.
       */
      setOrigin: function setOrigin(el, value) {
        if (this.__cssKeys__P_196_0 != null) {
          el.style[this.__cssKeys__P_196_0["origin"]] = value;
        }
      },
      /**
       * Returns the transform-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, e.g. <code>50% 50%</code>
       */
      getOrigin: function getOrigin(el) {
        if (this.__cssKeys__P_196_0 != null) {
          return el.style[this.__cssKeys__P_196_0["origin"]];
        }
        return "";
      },
      /**
       * Sets the transform-style property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
       * @param el {Element} The dom element to set the property.
       * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
       */
      setStyle: function setStyle(el, value) {
        if (this.__cssKeys__P_196_0 != null) {
          el.style[this.__cssKeys__P_196_0["style"]] = value;
        }
      },
      /**
       * Returns the transform-style property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, either <code>flat</code> or
       *   <code>preserve-3d</code>.
       */
      getStyle: function getStyle(el) {
        if (this.__cssKeys__P_196_0 != null) {
          return el.style[this.__cssKeys__P_196_0["style"]];
        }
        return "";
      },
      /**
       * Sets the perspective property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
       * @param el {Element} The dom element to set the property.
       * @param value {Number} The perspective layer. Numbers between 100
       *   and 5000 give the best results.
       */
      setPerspective: function setPerspective(el, value) {
        if (this.__cssKeys__P_196_0 != null) {
          el.style[this.__cssKeys__P_196_0["perspective"]] = value + "px";
        }
      },
      /**
       * Returns the perspective property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, e.g. <code>500</code>
       */
      getPerspective: function getPerspective(el) {
        if (this.__cssKeys__P_196_0 != null) {
          return el.style[this.__cssKeys__P_196_0["perspective"]];
        }
        return "";
      },
      /**
       * Sets the perspective-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
       * @param el {Element} The dom element to set the property.
       * @param value {String} CSS position values like <code>50% 50%</code> or
       *   <code>left top</code>.
       */
      setPerspectiveOrigin: function setPerspectiveOrigin(el, value) {
        if (this.__cssKeys__P_196_0 != null) {
          el.style[this.__cssKeys__P_196_0["perspective-origin"]] = value;
        }
      },
      /**
       * Returns the perspective-origin property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
       * @param el {Element} The dom element to read the property.
       * @return {String} The set property, e.g. <code>50% 50%</code>
       */
      getPerspectiveOrigin: function getPerspectiveOrigin(el) {
        if (this.__cssKeys__P_196_0 != null) {
          var value = el.style[this.__cssKeys__P_196_0["perspective-origin"]];
          if (value != "") {
            return value;
          } else {
            var valueX = el.style[this.__cssKeys__P_196_0["perspective-origin"] + "X"];
            var valueY = el.style[this.__cssKeys__P_196_0["perspective-origin"] + "Y"];
            if (valueX != "") {
              return valueX + " " + valueY;
            }
          }
        }
        return "";
      },
      /**
       * Sets the backface-visibility property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
       * @param el {Element} The dom element to set the property.
       * @param value {Boolean} <code>true</code> if the backface should be visible.
       */
      setBackfaceVisibility: function setBackfaceVisibility(el, value) {
        if (this.__cssKeys__P_196_0 != null) {
          el.style[this.__cssKeys__P_196_0["backface-visibility"]] = value ? "visible" : "hidden";
        }
      },
      /**
       * Returns the backface-visibility property of the given element.
       *
       * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
       * @param el {Element} The dom element to read the property.
       * @return {Boolean} <code>true</code>, if the backface is visible.
       */
      getBackfaceVisibility: function getBackfaceVisibility(el) {
        if (this.__cssKeys__P_196_0 != null) {
          return el.style[this.__cssKeys__P_196_0["backface-visibility"]] == "visible";
        }
        return true;
      },
      /**
       * Converts the given transforms map to a valid CSS string.
       *
       * @param transforms {Map} A map containing the transforms.
       * @return {String} The CSS transforms.
       */
      getTransformValue: function getTransformValue(transforms) {
        var value = "";
        var properties3d = ["translate", "scale"];
        for (var property in transforms) {
          var params = transforms[property];

          // if an array is given
          if (qx.Bootstrap.isArray(params)) {
            // use 3d properties for translate and scale if all 3 parameter are given
            if (params.length === 3 && properties3d.indexOf(property) > -1 && qx.core.Environment.get("css.transform.3d")) {
              value += this._compute3dProperty(property, params);
            }

            // use axis related properties
            else {
              value += this._computeAxisProperties(property, params);
            }

            // case for single values given
          } else {
            // single value case
            value += property + "(" + params + ") ";
          }
        }
        return value.trim();
      },
      /**
       * Helper function to create 3d property.
       *
       * @param property {String} Property of transform, e.g. translate
       * @param params {Array} Array with three values, each one stands for an axis.
       *
       * @return {String} Computed property and its value
       */
      _compute3dProperty: function _compute3dProperty(property, params) {
        var cssValue = "";
        property += "3d";
        for (var i = 0; i < params.length; i++) {
          if (params[i] == null) {
            params[i] = 0;
          }
        }
        cssValue += property + "(" + params.join(", ") + ") ";
        return cssValue;
      },
      /**
       * Helper function to create axis related properties.
       *
       * @param property {String} Property of transform, e.g. rotate
       * @param params {Array} Array with values, each one stands for an axis.
       *
       * @return {String} Computed property and its value
       */
      _computeAxisProperties: function _computeAxisProperties(property, params) {
        var value = "";
        var dimensions = ["X", "Y", "Z"];
        for (var i = 0; i < params.length; i++) {
          if (params[i] == null || i == 2 && !qx.core.Environment.get("css.transform.3d")) {
            continue;
          }
          value += property + dimensions[i] + "(";
          value += params[i];
          value += ") ";
        }
        return value;
      }
    }
  });
  qx.bom.element.Transform.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Iframe": {},
      "qx.event.type.Data": {}
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
   * This handler provides a "load" event for iframes
   */
  qx.Class.define("qx.event.handler.Iframe", {
    extend: qx.core.Object,
    implement: qx.event.IEventHandler,
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,
      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        load: 1,
        navigate: 1
      },
      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE,
      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: false,
      /**
       * Internal function called by iframes created using {@link qx.bom.Iframe}.
       *
       * @signature function(target)
       * @internal
       * @param target {Element} DOM element which is the target of this event
       */
      onevent: qx.event.GlobalError.observeMethod(function (target) {
        // Fire navigate event when actual URL diverges from stored URL
        var currentUrl = qx.bom.Iframe.queryCurrentUrl(target);
        if (currentUrl !== target.$$url) {
          qx.event.Registration.fireEvent(target, "navigate", qx.event.type.Data, [currentUrl]);
          target.$$url = currentUrl;
        }

        // Always fire load event
        qx.event.Registration.fireEvent(target, "load");
      })
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {
        return target.tagName.toLowerCase() === "iframe";
      },
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {
        // Nothing needs to be done here
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {
        // Nothing needs to be done here
      }
    },
    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addHandler(statics);
    }
  });
  qx.event.handler.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Iframe": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Object": {},
      "qx.dom.Element": {},
      "qx.dom.Hierarchy": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.log.Logger": {},
      "qx.bom.Event": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
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
       * Jonathan Weiß (jonathan_rass)
       * Christian Hagendorn (Chris_schmidt)
  
  ************************************************************************ */

  /**
   * Cross browser abstractions to work with iframes.
   *
   * @require(qx.event.handler.Iframe)
   */
  qx.Class.define("qx.bom.Iframe", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * @type {Map} Default attributes for creation {@link #create}.
       */
      DEFAULT_ATTRIBUTES: {
        frameBorder: 0,
        frameSpacing: 0,
        marginWidth: 0,
        marginHeight: 0,
        hspace: 0,
        vspace: 0,
        border: 0,
        allowTransparency: true
      },
      /**
       * Creates an DOM element.
       *
       * Attributes may be given directly with this call. This is critical
       * for some attributes e.g. name, type, ... in many clients.
       *
       * @param attributes {Map?null} Map of attributes to apply
       * @param win {Window?null} Window to create the element for
       * @return {Element} The created iframe node
       */
      create: function create(attributes, win) {
        // Work on a copy to not modify given attributes map
        var attributes = attributes ? qx.lang.Object.clone(attributes) : {};
        var initValues = qx.bom.Iframe.DEFAULT_ATTRIBUTES;
        for (var key in initValues) {
          if (!(key in attributes)) {
            attributes[key] = initValues[key];
          }
        }
        var elem = qx.dom.Element.create("iframe", attributes, win);
        if (!("onload" in attributes)) {
          elem.onload = function () {
            qx.event.handler.Iframe.onevent(elem);
          };
        }
        return elem;
      },
      /**
       * Get the DOM window object of an iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {Window?null} The DOM window object of the iframe or null.
       * @signature function(iframe)
       */
      getWindow: function getWindow(iframe) {
        try {
          return iframe.contentWindow;
        } catch (ex) {
          return null;
        }
      },
      /**
       * Get the DOM document object of an iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {Document} The DOM document object of the iframe.
       */
      getDocument: function getDocument(iframe) {
        if ("contentDocument" in iframe) {
          try {
            return iframe.contentDocument;
          } catch (ex) {
            return null;
          }
        }
        try {
          var win = this.getWindow(iframe);
          return win ? win.document : null;
        } catch (ex) {
          return null;
        }
      },
      /**
       * Get the HTML body element of the iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {Element} The DOM node of the <code>body</code> element of the iframe.
       */
      getBody: function getBody(iframe) {
        try {
          var doc = this.getDocument(iframe);
          return doc ? doc.getElementsByTagName("body")[0] : null;
        } catch (ex) {
          return null;
        }
      },
      /**
       * Sets iframe's source attribute to given value
       *
       * @param iframe {Element} DOM element of the iframe.
       * @param source {String} URL to be set.
       * @signature function(iframe, source)
       */
      setSource: function setSource(iframe, source) {
        try {
          // the guru says ...
          // it is better to use 'replace' than 'src'-attribute, since 'replace'
          // does not interfere with the history (which is taken care of by the
          // history manager), but there has to be a loaded document
          if (this.getWindow(iframe) && qx.dom.Hierarchy.isRendered(iframe)) {
            /*
              Some gecko users might have an exception here:
              Exception... "Component returned failure code: 0x805e000a
              [nsIDOMLocation.replace]"  nsresult: "0x805e000a (<unknown>)"
            */
            try {
              // Webkit on Mac can't set the source when the iframe is still
              // loading its current page
              if (qx.core.Environment.get("engine.name") == "webkit" && qx.core.Environment.get("os.name") == "osx") {
                var contentWindow = this.getWindow(iframe);
                if (contentWindow) {
                  contentWindow.stop();
                }
              }
              this.getWindow(iframe).location.replace(source);
            } catch (ex) {
              iframe.src = source;
            }
          } else {
            iframe.src = source;
          }

          // This is a programmer provided source. Remember URL for this source
          // for later comparison with current URL. The current URL can diverge
          // if the end-user navigates in the Iframe.
          this.__rememberUrl__P_197_0(iframe);
        } catch (ex) {
          qx.log.Logger.warn("Iframe source could not be set!");
        }
      },
      /**
       * Returns the current (served) URL inside the iframe
       *
       * @param iframe {Element} DOM element of the iframe.
       * @return {String} Returns the location href or null (if a query is not possible/allowed)
       */
      queryCurrentUrl: function queryCurrentUrl(iframe) {
        var doc = this.getDocument(iframe);
        try {
          if (doc && doc.location) {
            return doc.location.href;
          }
        } catch (ex) {}
        return "";
      },
      /**
       * Remember actual URL of iframe.
       *
       * @param iframe {Element} DOM element of the iframe.
       */
      __rememberUrl__P_197_0: function __rememberUrl__P_197_0(iframe) {
        // URL can only be detected after load. Retrieve and store URL once.
        var callback = function callback() {
          qx.bom.Event.removeNativeListener(iframe, "load", callback);
          iframe.$$url = qx.bom.Iframe.queryCurrentUrl(iframe);
        };
        qx.bom.Event.addNativeListener(iframe, "load", callback);
      }
    }
  });
  qx.bom.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Assert": {},
      "qx.lang.Object": {},
      "qx.dom.Element": {},
      "qx.lang.Type": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine",
          "load": true
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
  
     ======================================================================
  
     This class contains code based on the following work:
  
     * jQuery
       http://jquery.com
       Version 1.3.1
  
       Copyright:
         2009 John Resig
  
       License:
         MIT: http://www.opensource.org/licenses/mit-license.php
  
  ************************************************************************ */

  /**
   * Cross browser abstractions to work with input elements.
   */
  qx.Bootstrap.define("qx.bom.Input", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {Map} Internal data structures with all supported input types */
      __types__P_198_0: {
        text: 1,
        textarea: 1,
        select: 1,
        checkbox: 1,
        radio: 1,
        password: 1,
        hidden: 1,
        submit: 1,
        image: 1,
        file: 1,
        search: 1,
        reset: 1,
        button: 1
      },
      /**
       * Creates an DOM input/textarea/select element.
       *
       * Attributes may be given directly with this call. This is critical
       * for some attributes e.g. name, type, ... in many clients.
       *
       * Note: <code>select</code> and <code>textarea</code> elements are created
       * using the identically named <code>type</code>.
       *
       * @param type {String} Any valid type for HTML, <code>select</code>
       *   and <code>textarea</code>
       * @param attributes {Map} Map of attributes to apply
       * @param win {Window} Window to create the element for
       * @return {Element} The created input node
       */
      create: function create(type, attributes, win) {
        {
          qx.core.Assert.assertKeyInMap(type, this.__types__P_198_0, "Unsupported input type.");
        }

        // Work on a copy to not modify given attributes map
        var attributes = attributes ? qx.lang.Object.clone(attributes) : {};
        var tag;
        if (type === "textarea" || type === "select") {
          tag = type;
        } else {
          tag = "input";
          attributes.type = type;
        }
        return qx.dom.Element.create(tag, attributes, win);
      },
      /**
       * Applies the given value to the element.
       *
       * Normally the value is given as a string/number value and applied
       * to the field content (textfield, textarea) or used to
       * detect whether the field is checked (checkbox, radiobutton).
       *
       * Supports array values for selectboxes (multiple-selection)
       * and checkboxes or radiobuttons (for convenience).
       *
       * Please note: To modify the value attribute of a checkbox or
       * radiobutton use {@link qx.bom.element.Attribute#set} instead.
       *
       * @param element {Element} element to update
       * @param value {String|Number|Array} the value to apply
       */
      setValue: function setValue(element, value) {
        var tag = element.nodeName.toLowerCase();
        var type = element.type;
        var Type = qx.lang.Type;
        if (typeof value === "number") {
          value += "";
        }
        if (type === "checkbox" || type === "radio") {
          if (Type.isArray(value)) {
            element.checked = value.includes(element.value);
          } else {
            element.checked = element.value == value;
          }
        } else if (tag === "select") {
          var isArray = Type.isArray(value);
          var options = element.options;
          var subel, subval;
          for (var i = 0, l = options.length; i < l; i++) {
            subel = options[i];
            subval = subel.getAttribute("value");
            if (subval == null) {
              subval = subel.text;
            }
            subel.selected = isArray ? value.includes(subval) : value == subval;
          }
          if (isArray && value.length == 0) {
            element.selectedIndex = -1;
          }
        } else if ((type === "text" || type === "textarea") && qx.core.Environment.get("engine.name") == "mshtml") {
          // These flags are required to detect self-made property-change
          // events during value modification. They are used by the Input
          // event handler to filter events.
          element.$$inValueSet = true;
          element.value = value;
          element.$$inValueSet = null;
        } else {
          element.value = value;
        }
      },
      /**
       * Returns the currently configured value.
       *
       * Works with simple input fields as well as with
       * select boxes or option elements.
       *
       * Returns an array in cases of multi-selection in
       * select boxes but in all other cases a string.
       *
       * @param element {Element} DOM element to query
       * @return {String|Array} The value of the given element
       */
      getValue: function getValue(element) {
        var tag = element.nodeName.toLowerCase();
        if (tag === "option") {
          return (element.attributes.value || {}).specified ? element.value : element.text;
        }
        if (tag === "select") {
          var index = element.selectedIndex;

          // Nothing was selected
          if (index < 0) {
            return null;
          }
          var values = [];
          var options = element.options;
          var one = element.type == "select-one";
          var clazz = qx.bom.Input;
          var value;

          // Loop through all the selected options
          for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
            var option = options[i];
            if (option.selected) {
              // Get the specific value for the option
              value = clazz.getValue(option);

              // We don't need an array for one selects
              if (one) {
                return value;
              }

              // Multi-Selects return an array
              values.push(value);
            }
          }
          return values;
        } else {
          return (element.value || "").replace(/\r/g, "");
        }
      },
      /**
       * Sets the text wrap behaviour of a text area element.
       * This property uses the attribute "wrap" respectively
       * the style property "whiteSpace"
       *
       * @signature function(element, wrap)
       * @param element {Element} DOM element to modify
       * @param wrap {Boolean} Whether to turn text wrap on or off.
       */
      setWrap: qx.core.Environment.select("engine.name", {
        mshtml: function mshtml(element, wrap) {
          var wrapValue = wrap ? "soft" : "off";

          // Explicitly set overflow-y CSS property to auto when wrapped,
          // allowing the vertical scroll-bar to appear if necessary
          var styleValue = wrap ? "auto" : "";
          element.wrap = wrapValue;
          element.style.overflowY = styleValue;
        },
        gecko: function gecko(element, wrap) {
          var wrapValue = wrap ? "soft" : "off";
          var styleValue = wrap ? "" : "auto";
          element.setAttribute("wrap", wrapValue);
          element.style.overflow = styleValue;
        },
        webkit: function webkit(element, wrap) {
          var wrapValue = wrap ? "soft" : "off";
          var styleValue = wrap ? "" : "auto";
          element.setAttribute("wrap", wrapValue);
          element.style.overflow = styleValue;
        },
        "default": function _default(element, wrap) {
          element.style.whiteSpace = wrap ? "normal" : "nowrap";
        }
      })
    }
  });
  qx.bom.Input.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "construct": true,
        "require": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.core.FocusHandler": {},
      "qx.ui.menu.Manager": {}
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
   * A button which opens the connected menu when tapping on it.
   */
  qx.Class.define("qx.ui.form.MenuButton", {
    extend: qx.ui.form.Button,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param label {String} Initial label
     * @param icon {String?null} Initial icon
     * @param menu {qx.ui.menu.Menu} Connect to menu instance
     */
    construct: function construct(label, icon, menu) {
      qx.ui.form.Button.constructor.call(this, label, icon);

      // Initialize properties
      if (menu != null) {
        this.setMenu(menu);
      }

      // ARIA attrs
      this.getContentElement().setAttribute("role", "button");
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The menu instance to show when tapping on the button */
      menu: {
        check: "qx.ui.menu.Menu",
        nullable: true,
        apply: "_applyMenu",
        event: "changeMenu"
      },
      // overridden
      appearance: {
        refine: true,
        init: "menubutton"
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
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyVisibility: function _applyVisibility(value, old) {
        qx.ui.form.MenuButton.superclass.prototype._applyVisibility.call(this, value, old);

        // hide the menu too
        var menu = this.getMenu();
        if (value != "visible" && menu) {
          menu.hide();
        }
      },
      // property apply
      _applyMenu: function _applyMenu(value, old) {
        if (old) {
          old.removeListener("changeVisibility", this._onMenuChange, this);
          old.resetOpener();
        }
        if (value) {
          value.addListener("changeVisibility", this._onMenuChange, this);
          value.setOpener(this);
          value.removeState("submenu");
          value.removeState("contextmenu");
        }

        // ARIA attrs
        var contentEl = this.getContentElement();
        if (!contentEl) {
          return;
        }
        if (value) {
          contentEl.setAttribute("aria-haspopup", "menu");
          contentEl.setAttribute("aria-expanded", value.isVisible());
          contentEl.setAttribute("aria-controls", value.getContentElement().getAttribute("id"));
        } else {
          contentEl.removeAttribute("aria-haspopup");
          contentEl.removeAttribute("aria-expanded");
          contentEl.removeAttribute("aria-controls");
        }
      },
      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Positions and shows the attached menu widget.
       *
       * @param selectFirst {Boolean?false} Whether the first menu button should be selected
       */
      open: function open(selectFirst) {
        var menu = this.getMenu();
        if (menu) {
          // Focus this button when the menu opens
          if (this.isFocusable() && !qx.ui.core.FocusHandler.getInstance().isFocused(this)) {
            this.focus();
          }
          // Hide all menus first
          qx.ui.menu.Manager.getInstance().hideAll();

          // Open the attached menu
          menu.setOpener(this);
          menu.open();

          // Select first item
          if (selectFirst) {
            var first = menu.getSelectables()[0];
            if (first) {
              menu.setSelectedButton(first);
            }
          }
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      /**
       * Listener for visibility property changes of the attached menu
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onMenuChange: function _onMenuChange(e) {
        var menu = this.getMenu();
        var menuVisible = menu.isVisible();
        if (menuVisible) {
          this.addState("pressed");
        } else {
          this.removeState("pressed");
        }

        // ARIA attrs
        this.getContentElement().setAttribute("aria-expanded", menuVisible);
      },
      // overridden
      _onPointerDown: function _onPointerDown(e) {
        // call the base function to get into the capture phase [BUG #4340]
        qx.ui.form.MenuButton.superclass.prototype._onPointerDown.call(this, e);

        // only open on left clicks [BUG #5125]
        if (e.getButton() != "left") {
          return;
        }
        var menu = this.getMenu();
        if (menu) {
          // Toggle sub menu visibility
          if (!menu.isVisible()) {
            this.open();
          } else {
            menu.exclude();
          }

          // Event is processed, stop it for others
          e.stopPropagation();
        }
      },
      // overridden
      _onPointerUp: function _onPointerUp(e) {
        // call base for firing the execute event
        qx.ui.form.MenuButton.superclass.prototype._onPointerUp.call(this, e);

        // Just stop propagation to stop menu manager
        // from getting the event
        e.stopPropagation();
      },
      // overridden
      _onPointerOver: function _onPointerOver(e) {
        // Add hovered state
        this.addState("hovered");
      },
      // overridden
      _onPointerOut: function _onPointerOut(e) {
        // Just remove the hover state
        this.removeState("hovered");
      },
      // overridden
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Space":
          case "Enter":
            this.removeState("abandoned");
            this.addState("pressed");
            var menu = this.getMenu();
            if (menu) {
              // Toggle sub menu visibility
              if (!menu.isVisible()) {
                this.open();
              } else {
                menu.exclude();
              }
            }
            e.stopPropagation();
        }
      },
      // overridden
      _onKeyUp: function _onKeyUp(e) {
        // no action required here
      }
    }
  });
  qx.ui.form.MenuButton.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.MenuButton": {
        "require": true
      },
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.menu.Manager": {}
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
   * A menubar button
   */
  qx.Class.define("qx.ui.menubar.Button", {
    extend: qx.ui.form.MenuButton,
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "menubar-button"
      },
      show: {
        refine: true,
        init: "inherit"
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
        HELPER METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Inspects the parent chain to find the MenuBar
       *
       * @return {qx.ui.menubar.MenuBar} MenuBar instance or <code>null</code>.
       */
      getMenuBar: function getMenuBar() {
        var parent = this;
        while (parent) {
          /* this method is also used by toolbar.MenuButton, so we need to check
             for a ToolBar instance. */
          if (parent instanceof qx.ui.toolbar.ToolBar) {
            return parent;
          }
          parent = parent.getLayoutParent();
        }
        return null;
      },
      // overridden
      open: function open(selectFirst) {
        qx.ui.menubar.Button.superclass.prototype.open.call(this, selectFirst);
        var menubar = this.getMenuBar();
        if (menubar) {
          menubar._setAllowMenuOpenHover(true);
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      /**
       * Listener for visibility property changes of the attached menu
       *
       * @param e {qx.event.type.Data} Property change event
       */
      _onMenuChange: function _onMenuChange(e) {
        var menu = this.getMenu();
        var menubar = this.getMenuBar();
        if (menu.isVisible()) {
          this.addState("pressed");

          // Sync with open menu property
          if (menubar) {
            menubar.setOpenMenu(menu);
          }
        } else {
          this.removeState("pressed");

          // Sync with open menu property
          if (menubar && menubar.getOpenMenu() == menu) {
            menubar.resetOpenMenu();
            menubar._setAllowMenuOpenHover(false);
          }
        }
      },
      // overridden
      _onPointerUp: function _onPointerUp(e) {
        qx.ui.menubar.Button.superclass.prototype._onPointerUp.call(this, e);

        // Set state 'pressed' to visualize that the menu is open.
        var menu = this.getMenu();
        if (menu && menu.isVisible() && !this.hasState("pressed")) {
          this.addState("pressed");
        }
      },
      /**
       * Event listener for pointerover event
       *
       * @param e {qx.event.type.Pointer} pointerover event object
       */
      _onPointerOver: function _onPointerOver(e) {
        // Add hovered state
        this.addState("hovered");

        // Open submenu
        if (this.getMenu() && e.getPointerType() == "mouse") {
          var menubar = this.getMenuBar();
          if (menubar && menubar._isAllowMenuOpenHover()) {
            // Hide all open menus
            qx.ui.menu.Manager.getInstance().hideAll();

            // Set it again, because hideAll remove it.
            menubar._setAllowMenuOpenHover(true);

            // Then show the attached menu
            if (this.isEnabled()) {
              this.open();
            }
          }
        }
      }
    }
  });
  qx.ui.menubar.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "require": true
      },
      "qx.lang.Array": {},
      "qx.ui.layout.Util": {},
      "qx.ui.menu.Menu": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
          "load": true
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Layout used for the menu buttons which may contain four elements. A icon,
   * a label, a shortcut text and an arrow (for a sub menu)
   *
   * @internal
   */
  qx.Class.define("qx.ui.menu.ButtonLayout", {
    extend: qx.ui.layout.Abstract,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          this.assert(name == "column", "The property '" + name + "' is not supported by the MenuButton layout!");
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();
        var child;
        var column;
        var columnChildren = [];
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          column = child.getLayoutProperties().column;
          columnChildren[column] = child;
        }
        var menu = this.__getMenu__P_157_0(children[0]);
        var columns = menu.getColumnSizes();
        var spacing = menu.getSpacingX();

        // stretch label column
        var neededWidth = qx.lang.Array.sum(columns) + spacing * (columns.length - 1);
        if (neededWidth < availWidth) {
          columns[1] += availWidth - neededWidth;
        }
        var left = padding.left,
          top = padding.top;
        var Util = qx.ui.layout.Util;
        for (var i = 0, l = columns.length; i < l; i++) {
          child = columnChildren[i];
          if (child) {
            var hint = child.getSizeHint();
            var childTop = top + Util.computeVerticalAlignOffset(child.getAlignY() || "middle", hint.height, availHeight, 0, 0);
            var offsetLeft = Util.computeHorizontalAlignOffset(child.getAlignX() || "left", hint.width, columns[i], child.getMarginLeft(), child.getMarginRight());
            child.renderLayout(left + offsetLeft, childTop, hint.width, hint.height);
          }
          if (columns[i] > 0) {
            left += columns[i] + spacing;
          }
        }
      },
      /**
       * Get the widget's menu
       *
       * @param widget {qx.ui.core.Widget} the widget to get the menu for
       * @return {qx.ui.menu.Menu} the menu
       */
      __getMenu__P_157_0: function __getMenu__P_157_0(widget) {
        while (!(widget instanceof qx.ui.menu.Menu)) {
          widget = widget.getLayoutParent();
        }
        return widget;
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();
        var neededHeight = 0;
        var neededWidth = 0;
        for (var i = 0, l = children.length; i < l; i++) {
          var hint = children[i].getSizeHint();
          neededWidth += hint.width;
          neededHeight = Math.max(neededHeight, hint.height);
        }
        return {
          width: neededWidth,
          height: neededHeight
        };
      }
    }
  });
  qx.ui.menu.ButtonLayout.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.AbstractButton": {
        "construct": true,
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The real menu button class which supports a command and an icon. All
   * other features are inherited from the {@link qx.ui.menu.AbstractButton}
   * class.
   */
  qx.Class.define("qx.ui.menu.Button", {
    extend: qx.ui.menu.AbstractButton,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param label {String} Initial label
     * @param icon {String} Initial icon
     * @param command {qx.ui.command.Command} Initial command (shortcut)
     * @param menu {qx.ui.menu.Menu} Initial sub menu
     */
    construct: function construct(label, icon, command, menu) {
      qx.ui.menu.AbstractButton.constructor.call(this);

      // ARIA attrs
      this.getContentElement().setAttribute("role", "button");

      // Initialize with incoming arguments
      if (label != null) {
        this.setLabel(label);
      }
      if (icon != null) {
        this.setIcon(icon);
      }
      if (command != null) {
        this.setCommand(command);
      }
      if (menu != null) {
        this.setMenu(menu);
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "menu-button"
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
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */
      // overridden
      _onTap: function _onTap(e) {
        if (e.isLeftPressed() && this.getMenu()) {
          this.execute();
          // don't close menus if the button is a sub menu button
          this.getMenu().open();
          return;
        }
        qx.ui.menu.Button.superclass.prototype._onTap.call(this, e);
      }
    }
  });
  qx.ui.menu.Button.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "construct": true,
        "require": true
      },
      "qx.event.AcceleratingTimer": {
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
       * Andreas Ecker (ecker)
       * Martin Wittemann (martinwittemann)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The RepeatButton is a special button, which fires repeatedly {@link #execute}
   * events, while a button is pressed on the button. The initial delay
   * and the interval time can be set using the properties {@link #firstInterval}
   * and {@link #interval}. The {@link #execute} events will be fired in a shorter
   * amount of time if a button is hold, until the min {@link #minTimer}
   * is reached. The {@link #timerDecrease} property sets the amount of milliseconds
   * which will decreased after every firing.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.form.RepeatButton("Hello World");
   *
   *   button.addListener("execute", function(e) {
   *     alert("Button is executed");
   *   }, this);
   *
   *   this.getRoot.add(button);
   * </pre>
   *
   * This example creates a button with the label "Hello World" and attaches an
   * event listener to the {@link #execute} event.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/repeatbutton.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.form.RepeatButton", {
    extend: qx.ui.form.Button,
    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      qx.ui.form.Button.constructor.call(this, label, icon);

      // create the timer and add the listener
      this.__timer__P_181_0 = new qx.event.AcceleratingTimer();
      this.__timer__P_181_0.addListener("interval", this._onInterval, this);
    },
    events: {
      /**
       * This event gets dispatched with every interval. The timer gets executed
       * as long as the user holds down a button.
       */
      execute: "qx.event.type.Event",
      /**
       * This event gets dispatched when the button is pressed.
       */
      press: "qx.event.type.Event",
      /**
       * This event gets dispatched when the button is released.
       */
      release: "qx.event.type.Event"
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
      minTimer: {
        check: "Integer",
        init: 20
      },
      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      timerDecrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __executed__P_181_1: null,
      __timer__P_181_0: null,
      /**
       * Calling this function is like a tap from the user on the
       * button with all consequences.
       * <span style='color: red'>Be sure to call the {@link #release} function.</span>
       *
       */
      press: function press() {
        // only if the button is enabled
        if (this.isEnabled()) {
          // if the state pressed must be applied (first call)
          if (!this.hasState("pressed")) {
            // start the timer
            this.__startInternalTimer__P_181_2();
          }

          // set the states
          this.removeState("abandoned");
          this.addState("pressed");
        }
      },
      /**
       * Calling this function is like a release from the user on the
       * button with all consequences.
       * Usually the {@link #release} function will be called before the call of
       * this function.
       *
       * @param fireExecuteEvent {Boolean?true} flag which signals, if an event should be fired
       */
      release: function release(fireExecuteEvent) {
        // only if the button is enabled
        if (!this.isEnabled()) {
          return;
        }

        // only if the button is pressed
        if (this.hasState("pressed")) {
          // if the button has not been executed
          if (!this.__executed__P_181_1) {
            this.execute();
          }
        }

        // remove button states
        this.removeState("pressed");
        this.removeState("abandoned");

        // stop the repeat timer and therefore the execution
        this.__stopInternalTimer__P_181_3();
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.form.RepeatButton.superclass.prototype._applyEnabled.call(this, value, old);
        if (!value) {
          if (this.isCapturing()) {
            // also release capture because out event is missing on iOS
            this.releaseCapture();
          }

          // remove button states
          this.removeState("pressed");
          this.removeState("abandoned");

          // stop the repeat timer and therefore the execution
          this.__stopInternalTimer__P_181_3();
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */
      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
          this.__timer__P_181_0.start();
        }
        this.addState("hovered");
      },
      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        this.removeState("hovered");
        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
          this.__timer__P_181_0.stop();
        }
      },
      /**
       * Callback method for the "pointerdown" method.
       *
       * Sets the interval of the timer (value of firstInterval property) and
       * starts the timer. Additionally removes the state "abandoned" and adds the
       * state "pressed".
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDown: function _onPointerDown(e) {
        if (!e.isLeftPressed()) {
          return;
        }

        // Activate capturing if the button get a pointerout while
        // the button is pressed.
        this.capture();
        this.__startInternalTimer__P_181_2();
        e.stopPropagation();
      },
      /**
       * Callback method for the "pointerup" event.
       *
       * Handles the case that the user is releasing a button
       * before the timer interval method got executed. This way the
       * "execute" method get executed at least one time.
       *
       * @param e {qx.event.type.Pointer} pointerup event
       */
      _onPointerUp: function _onPointerUp(e) {
        this.releaseCapture();
        if (!this.hasState("abandoned")) {
          this.addState("hovered");
          if (this.hasState("pressed") && !this.__executed__P_181_1) {
            this.execute();
          }
        }
        this.__stopInternalTimer__P_181_3();
        e.stopPropagation();
      },
      // Nothing to do, 'execute' is already fired by _onPointerUp.
      _onTap: function _onTap(e) {},
      /**
       * Listener method for "keyup" event.
       *
       * Removes "abandoned" and "pressed" state (if "pressed" state is set)
       * for the keys "Enter" or "Space" and stops the internal timer
       * (same like pointer up).
       *
       * @param e {Event} Key event
       */
      _onKeyUp: function _onKeyUp(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            if (this.hasState("pressed")) {
              if (!this.__executed__P_181_1) {
                this.execute();
              }
              this.removeState("pressed");
              this.removeState("abandoned");
              e.stopPropagation();
              this.__stopInternalTimer__P_181_3();
            }
        }
      },
      /**
       * Listener method for "keydown" event.
       *
       * Removes "abandoned" and adds "pressed" state
       * for the keys "Enter" or "Space". It also starts
       * the internal timer (same like pointerdown).
       *
       * @param e {Event} Key event
       */
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            this.removeState("abandoned");
            this.addState("pressed");
            e.stopPropagation();
            this.__startInternalTimer__P_181_2();
        }
      },
      /**
       * Callback for the interval event.
       *
       * Stops the timer and starts it with a new interval
       * (value of the "interval" property - value of the "timerDecrease" property).
       * Dispatches the "execute" event.
       *
       * @param e {qx.event.type.Event} interval event
       */
      _onInterval: function _onInterval(e) {
        this.__executed__P_181_1 = true;
        this.fireEvent("execute");
      },
      /*
      ---------------------------------------------------------------------------
        INTERNAL TIMER
      ---------------------------------------------------------------------------
      */
      /**
       * Starts the internal timer which causes firing of execution
       * events in an interval. It also presses the button.
       *
       */
      __startInternalTimer__P_181_2: function __startInternalTimer__P_181_2() {
        this.fireEvent("press");
        this.__executed__P_181_1 = false;
        this.__timer__P_181_0.set({
          interval: this.getInterval(),
          firstInterval: this.getFirstInterval(),
          minimum: this.getMinTimer(),
          decrease: this.getTimerDecrease()
        }).start();
        this.removeState("abandoned");
        this.addState("pressed");
      },
      /**
       * Stops the internal timer and releases the button.
       *
       */
      __stopInternalTimer__P_181_3: function __stopInternalTimer__P_181_3() {
        this.fireEvent("release");
        this.__timer__P_181_0.stop();
        this.removeState("abandoned");
        this.removeState("pressed");
      }
    },
    /*
      *****************************************************************************
         DESTRUCTOR
      *****************************************************************************
      */
    destruct: function destruct() {
      this._disposeObjects("__timer__P_181_0");
    }
  });
  qx.ui.form.RepeatButton.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.bom.AnimationFrame": {}
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
   * This class represents a scroll able pane. This means that this widget
   * may contain content which is bigger than the available (inner)
   * dimensions of this widget. The widget also offer methods to control
   * the scrolling position. It can only have exactly one child.
   */
  qx.Class.define("qx.ui.core.scroll.ScrollPane", {
    extend: qx.ui.core.Widget,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this.set({
        minWidth: 0,
        minHeight: 0
      });

      // Automatically configure a "fixed" grow layout.
      this._setLayout(new qx.ui.layout.Grow());

      // Add resize listener to "translate" event
      this.addListener("resize", this._onUpdate);
      var contentEl = this.getContentElement();

      // Synchronizes the DOM scroll position with the properties
      contentEl.addListener("scroll", this._onScroll, this);

      // Fixed some browser quirks e.g. correcting scroll position
      // to the previous value on re-display of a pane
      contentEl.addListener("appear", this._onAppear, this);
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired on resize of both the container or the content. */
      update: "qx.event.type.Event",
      /** Fired on scroll animation end invoked by 'scroll*' methods. */
      scrollAnimationEnd: "qx.event.type.Event"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The horizontal scroll position */
      scrollX: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",
        apply: "_applyScrollX",
        transform: "_transformScrollX",
        event: "scrollX",
        init: 0
      },
      /** The vertical scroll position */
      scrollY: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",
        apply: "_applyScrollY",
        transform: "_transformScrollY",
        event: "scrollY",
        init: 0
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __frame__P_182_0: null,
      /*
      ---------------------------------------------------------------------------
        CONTENT MANAGEMENT
      ---------------------------------------------------------------------------
      */
      /**
       * Configures the content of the scroll pane. Replaces any existing child
       * with the newly given one.
       *
       * @param widget {qx.ui.core.Widget?null} The content widget of the pane
       */
      add: function add(widget) {
        var old = this._getChildren()[0];
        if (old) {
          this._remove(old);
          old.removeListener("resize", this._onUpdate, this);
        }
        if (widget) {
          this._add(widget);
          widget.addListener("resize", this._onUpdate, this);
        }
      },
      /**
       * Removes the given widget from the content. The pane is empty
       * afterwards as only one child is supported by the pane.
       *
       * @param widget {qx.ui.core.Widget?null} The content widget of the pane
       */
      remove: function remove(widget) {
        if (widget) {
          this._remove(widget);
          widget.removeListener("resize", this._onUpdate, this);
        }
      },
      /**
       * Returns an array containing the current content.
       *
       * @return {Object[]} The content array
       */
      getChildren: function getChildren() {
        return this._getChildren();
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */
      /**
       * Event listener for resize event of content and container
       *
       * @param e {Event} Resize event object
       */
      _onUpdate: function _onUpdate(e) {
        this.fireEvent("update");
      },
      /**
       * Event listener for scroll event of content
       *
       * @param e {qx.event.type.Event} Scroll event object
       */
      _onScroll: function _onScroll(e) {
        var contentEl = this.getContentElement();
        this.setScrollX(contentEl.getScrollX());
        this.setScrollY(contentEl.getScrollY());
      },
      /**
       * Event listener for appear event of content
       *
       * @param e {qx.event.type.Event} Appear event object
       */
      _onAppear: function _onAppear(e) {
        var contentEl = this.getContentElement();
        var internalX = this.getScrollX();
        var domX = contentEl.getScrollX();
        if (internalX != domX) {
          contentEl.scrollToX(internalX);
        }
        var internalY = this.getScrollY();
        var domY = contentEl.getScrollY();
        if (internalY != domY) {
          contentEl.scrollToY(internalY);
        }
      },
      /*
      ---------------------------------------------------------------------------
        ITEM LOCATION SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the top offset of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemTop: function getItemTop(item) {
        var top = 0;
        do {
          top += item.getBounds().top;
          item = item.getLayoutParent();
        } while (item && item !== this);
        return top;
      },
      /**
       * Returns the top offset of the end of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemBottom: function getItemBottom(item) {
        return this.getItemTop(item) + item.getBounds().height;
      },
      /**
       * Returns the left offset of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemLeft: function getItemLeft(item) {
        var left = 0;
        var parent;
        do {
          left += item.getBounds().left;
          parent = item.getLayoutParent();
          if (parent) {
            left += parent.getInsets().left;
          }
          item = parent;
        } while (item && item !== this);
        return left;
      },
      /**
       * Returns the left offset of the end of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Right offset
       */
      getItemRight: function getItemRight(item) {
        return this.getItemLeft(item) + item.getBounds().width;
      },
      /*
      ---------------------------------------------------------------------------
        DIMENSIONS
      ---------------------------------------------------------------------------
      */
      /**
       * The size (identical with the preferred size) of the content.
       *
       * @return {Map} Size of the content (keys: <code>width</code> and <code>height</code>)
       */
      getScrollSize: function getScrollSize() {
        return this.getChildren()[0].getBounds();
      },
      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * The maximum horizontal scroll position.
       *
       * @return {Integer} Maximum horizontal scroll position.
       */
      getScrollMaxX: function getScrollMaxX() {
        var paneSize = this.getInnerSize();
        var scrollSize = this.getScrollSize();
        if (paneSize && scrollSize) {
          return Math.max(0, scrollSize.width - paneSize.width);
        }
        return 0;
      },
      /**
       * The maximum vertical scroll position.
       *
       * @return {Integer} Maximum vertical scroll position.
       */
      getScrollMaxY: function getScrollMaxY() {
        var paneSize = this.getInnerSize();
        var scrollSize = this.getScrollSize();
        if (paneSize && scrollSize) {
          return Math.max(0, scrollSize.height - paneSize.height);
        }
        return 0;
      },
      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToX: function scrollToX(value, duration) {
        var max = this.getScrollMaxX();
        if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }
        this.stopScrollAnimation();
        if (duration) {
          var from = this.getScrollX();
          this.__frame__P_182_0 = new qx.bom.AnimationFrame();
          this.__frame__P_182_0.on("end", function () {
            this.setScrollX(value);
            this.__frame__P_182_0 = null;
            this.fireEvent("scrollAnimationEnd");
          }, this);
          this.__frame__P_182_0.on("frame", function (timePassed) {
            var newX = parseInt(timePassed / duration * (value - from) + from);
            this.setScrollX(newX);
          }, this);
          this.__frame__P_182_0.startSequence(duration);
        } else {
          this.setScrollX(value);
        }
      },
      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToY: function scrollToY(value, duration) {
        var max = this.getScrollMaxY();
        if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }
        this.stopScrollAnimation();
        if (duration) {
          var from = this.getScrollY();
          this.__frame__P_182_0 = new qx.bom.AnimationFrame();
          this.__frame__P_182_0.on("end", function () {
            this.setScrollY(value);
            this.__frame__P_182_0 = null;
            this.fireEvent("scrollAnimationEnd");
          }, this);
          this.__frame__P_182_0.on("frame", function (timePassed) {
            var newY = parseInt(timePassed / duration * (value - from) + from);
            this.setScrollY(newY);
          }, this);
          this.__frame__P_182_0.startSequence(duration);
        } else {
          this.setScrollY(value);
        }
      },
      /**
       * Scrolls the element's content horizontally by the given amount.
       *
       * @param x {Integer?0} Amount to scroll
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByX: function scrollByX(x, duration) {
        this.scrollToX(this.getScrollX() + x, duration);
      },
      /**
       * Scrolls the element's content vertically by the given amount.
       *
       * @param y {Integer?0} Amount to scroll
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByY: function scrollByY(y, duration) {
        this.scrollToY(this.getScrollY() + y, duration);
      },
      /**
       * If an scroll animation is running, it will be stopped with that method.
       */
      stopScrollAnimation: function stopScrollAnimation() {
        if (this.__frame__P_182_0) {
          this.__frame__P_182_0.cancelSequence();
          this.__frame__P_182_0 = null;
        }
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyScrollX: function _applyScrollX(value) {
        this.getContentElement().scrollToX(value);
      },
      /**
       * Transform property
       *
       * @param value {Number} Value to transform
       * @return {Number} Rounded value
       */
      _transformScrollX: function _transformScrollX(value) {
        return Math.round(value);
      },
      // property apply
      _applyScrollY: function _applyScrollY(value) {
        this.getContentElement().scrollToY(value);
      },
      /**
       * Transform property
       *
       * @param value {Number} Value to transform
       * @return {Number} Rounded value
       */
      _transformScrollY: function _transformScrollY(value) {
        return Math.round(value);
      }
    }
  });
  qx.ui.core.scroll.ScrollPane.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MExecutable": {
        "require": true
      },
      "qx.ui.form.IExecutable": {
        "require": true
      },
      "qx.event.AcceleratingTimer": {
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
   * The HoverButton is an {@link qx.ui.basic.Atom}, which fires repeatedly
   * execute events while the pointer is over the widget.
   *
   * The rate at which the execute event is fired accelerates is the pointer keeps
   * inside of the widget. The initial delay and the interval time can be set using
   * the properties {@link #firstInterval} and {@link #interval}. The
   * {@link #execute} events will be fired in a shorter amount of time if the pointer
   * remains over the widget, until the min {@link #minTimer} is reached.
   * The {@link #timerDecrease} property sets the amount of milliseconds which will
   * decreased after every firing.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.form.HoverButton("Hello World");
   *
   *   button.addListener("execute", function(e) {
   *     alert("Button is hovered");
   *   }, this);
   *
   *   this.getRoot.add(button);
   * </pre>
   *
   * This example creates a button with the label "Hello World" and attaches an
   * event listener to the {@link #execute} event.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/hoverbutton.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.form.HoverButton", {
    extend: qx.ui.basic.Atom,
    include: [qx.ui.core.MExecutable],
    implement: [qx.ui.form.IExecutable],
    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      qx.ui.basic.Atom.constructor.call(this, label, icon);
      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
      this.__timer__P_158_0 = new qx.event.AcceleratingTimer();
      this.__timer__P_158_0.addListener("interval", this._onInterval, this);
    },
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "hover-button"
      },
      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 80
      },
      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 200
      },
      /** This configures the minimum value for the timer interval. */
      minTimer: {
        check: "Integer",
        init: 20
      },
      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      timerDecrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __timer__P_158_0: null,
      /**
       * Start timer on pointer over
       *
       * @param e {qx.event.type.Pointer} The pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        this.__timer__P_158_0.set({
          interval: this.getInterval(),
          firstInterval: this.getFirstInterval(),
          minimum: this.getMinTimer(),
          decrease: this.getTimerDecrease()
        }).start();
        this.addState("hovered");
      },
      /**
       * Stop timer on pointer out
       *
       * @param e {qx.event.type.Pointer} The pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        this.__timer__P_158_0.stop();
        this.removeState("hovered");
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
      },
      /**
       * Fire execute event on timer interval event
       */
      _onInterval: function _onInterval() {
        if (this.isEnabled()) {
          this.execute();
        } else {
          this.__timer__P_158_0.stop();
        }
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__timer__P_158_0");
    }
  });
  qx.ui.form.HoverButton.$$dbClassInfo = $$dbClassInfo;
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
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.util.ResourceManager": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
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
       * Fabian Jakobs (fjakobs)
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * The background class contains methods to compute and set the background image
   * of a DOM element.
   *
   * It fixes a background position issue in Firefox 2.
   */
  qx.Class.define("qx.bom.element.Background", {
    statics: {
      /** @type {Array} Internal helper to improve compile performance */
      __tmpl__P_171_0: ["background-image:url(", null, ");", "background-position:", null, ";", "background-repeat:", null, ";"],
      /** @type {Map} Empty styles when no image is given */
      __emptyStyles__P_171_1: {
        backgroundImage: null,
        backgroundPosition: null,
        backgroundRepeat: null
      },
      /**
       * Computes the background position CSS value
       *
       * @param left {Integer|String} either an integer pixel value or a CSS
       *    string value
       * @param top {Integer|String} either an integer pixel value or a CSS
       *    string value
       * @return {String} The background position CSS value
       */
      __computePosition__P_171_2: function __computePosition__P_171_2(left, top) {
        // Correcting buggy Firefox background-position implementation
        // Have problems with identical values
        var engine = qx.core.Environment.get("engine.name");
        var version = qx.core.Environment.get("engine.version");
        if (engine == "gecko" && version < 1.9 && left == top && typeof left == "number") {
          top += 0.01;
        }
        if (left) {
          var leftCss = typeof left == "number" ? left + "px" : left;
        } else {
          leftCss = "0";
        }
        if (top) {
          var topCss = typeof top == "number" ? top + "px" : top;
        } else {
          topCss = "0";
        }
        return leftCss + " " + topCss;
      },
      /**
       * Compiles the background into a CSS compatible string.
       *
       * @param source {String?null} The URL of the background image
       * @param repeat {String?null} The background repeat property. valid values
       *     are <code>repeat</code>, <code>repeat-x</code>,
       *     <code>repeat-y</code>, <code>no-repeat</code>
       * @param left {Integer|String?null} The horizontal offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "center", "left" and "right"
       * @param top {Integer|String?null} The vertical offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "top", "bottom" and "center"
       * @return {String} CSS string
       */
      compile: function compile(source, repeat, left, top) {
        var position = this.__computePosition__P_171_2(left, top);
        var backgroundImageUrl = qx.util.ResourceManager.getInstance().toUri(source);

        // Updating template
        var tmpl = this.__tmpl__P_171_0;
        tmpl[1] = "'" + backgroundImageUrl + "'"; // Put in quotes so spaces work
        tmpl[4] = position;
        tmpl[7] = repeat;
        return tmpl.join("");
      },
      /**
       * Get standard css background styles
       *
       * @param source {String} The URL of the background image
       * @param repeat {String?null} The background repeat property. valid values
       *     are <code>repeat</code>, <code>repeat-x</code>,
       *     <code>repeat-y</code>, <code>no-repeat</code>
       * @param left {Integer|String?null} The horizontal offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "center", "left" and "right"
       * @param top {Integer|String?null} The vertical offset of the image
       *      inside of the image element. If the value is an integer it is
       *      interpreted as pixel value otherwise the value is taken as CSS value.
       *      CSS the values are "top", "bottom" and "center"
       * @return {Map} A map of CSS styles
       */
      getStyles: function getStyles(source, repeat, left, top) {
        if (!source) {
          return this.__emptyStyles__P_171_1;
        }
        var position = this.__computePosition__P_171_2(left, top);
        var backgroundImageUrl = qx.util.ResourceManager.getInstance().toUri(source);
        var backgroundImageCssString = "url('" + backgroundImageUrl + "')"; // Put in quotes so spaces work
        var map = {
          backgroundPosition: position,
          backgroundImage: backgroundImageCssString
        };
        if (repeat != null) {
          map.backgroundRepeat = repeat;
        }
        return map;
      },
      /**
       * Set the background on the given DOM element
       *
       * @param element {Element} The element to modify
       * @param source {String?null} The URL of the background image
       * @param repeat {String?null} The background repeat property. valid values
       *     are <code>repeat</code>, <code>repeat-x</code>,
       *     <code>repeat-y</code>, <code>no-repeat</code>
       * @param left {Integer?null} The horizontal offset of the image inside of
       *     the image element.
       * @param top {Integer?null} The vertical offset of the image inside of
       *     the image element.
       */
      set: function set(element, source, repeat, left, top) {
        var styles = this.getStyles(source, repeat, left, top);
        for (var prop in styles) {
          element.style[prop] = styles[prop];
        }
      }
    }
  });
  qx.bom.element.Background.$$dbClassInfo = $$dbClassInfo;
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
  
  ************************************************************************ */
  /**
   * Defines the callback for the single selection manager.
   *
   * @internal
   */
  qx.Interface.define("qx.ui.core.ISingleSelectionProvider", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Returns the elements which are part of the selection.
       *
       * @return {qx.ui.core.Widget[]} The widgets for the selection.
       */
      getItems: function getItems() {},
      /**
       * Returns whether the given item is selectable.
       *
       * @param item {qx.ui.core.Widget} The item to be checked
       * @return {Boolean} Whether the given item is selectable
       */
      isItemSelectable: function isItemSelectable(item) {}
    }
  });
  qx.ui.core.ISingleSelectionProvider.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-15.js.map?dt=1686138468234
qx.$$packageData['15'] = {
  "locales": {},
  "resources": {},
  "translations": {}
};
