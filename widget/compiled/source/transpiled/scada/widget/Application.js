(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "require": true
      },
      "qx.log.appender.Native": {},
      "qx.log.appender.Console": {},
      "qx.ui.form.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     Copyright: 2020 undefined
  
     License: MIT license
  
     Authors: undefined
  
  ************************************************************************ */

  /**
   * This is the main application class of "Scada Widgets"
   *
   * @asset(scada/widget/*)
   */
  qx.Class.define("scada.widget.Application", {
    extend: qx.application.Standalone,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * This method contains the initial application code and gets called 
       * during startup of the application
       * 
       * @lint ignoreDeprecated(alert)
       */
      main: function main() {
        // Call super class
        scada.widget.Application.superclass.prototype.main.call(this);

        // Enable logging in debug variant

        {
          // support native logging capabilities, e.g. Firebug for Firefox
          qx.log.appender.Native;
          // support additional cross-browser console. Press F7 to toggle visibility
          qx.log.appender.Console;
        }

        /*
        -------------------------------------------------------------------------
          Below is your actual application code...
        -------------------------------------------------------------------------
        */

        // Create a button
        var button1 = new qx.ui.form.Button("Click me", "scada/widget/test.png");

        // Document is the application root
        var doc = this.getRoot();

        // Add button to document at fixed coordinates
        doc.add(button1, {
          left: 100,
          top: 50
        });

        // Add an event listener
        button1.addListener("execute", function () {
          /* eslint no-alert: "off" */
          alert("Hello World!");
        });
      }
    }
  });
  scada.widget.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1685967360473