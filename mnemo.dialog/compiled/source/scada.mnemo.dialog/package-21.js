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
      "qx.ui.layout.HBox": {
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The container used by {@link Part} to insert the buttons.
   *
   * @internal
   */
  qx.Class.define("qx.ui.toolbar.PartContainer", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      this._setLayout(new qx.ui.layout.HBox());
    },
    events: {
      /** Fired if a child has been added or removed */
      changeChildren: "qx.event.type.Event"
    },
    properties: {
      appearance: {
        refine: true,
        init: "toolbar/part/container"
      },
      /** Whether icons, labels, both or none should be shown. */
      show: {
        init: "both",
        check: ["both", "label", "icon"],
        inheritable: true,
        event: "changeShow"
      }
    },
    members: {
      // overridden
      _afterAddChild: function _afterAddChild(child) {
        this.fireEvent("changeChildren");
      },
      // overridden
      _afterRemoveChild: function _afterRemoveChild(child) {
        this.fireEvent("changeChildren");
      }
    }
  });
  qx.ui.toolbar.PartContainer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.ScrollBar": {}
    },
    "environment": {
      "provided": ["qx.nativeScrollBars"],
      "required": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.core.Environment.add("qx.nativeScrollBars", false);

  /**
   * Include this widget if you want to create scrollbars depending on the global
   * "qx.nativeScrollBars" setting.
   */
  qx.Mixin.define("qx.ui.core.scroll.MScrollBarFactory", {
    members: {
      /**
       * Creates a new scrollbar. This can either be a styled qooxdoo scrollbar
       * or a native browser scrollbar.
       *
       * @param orientation {String?"horizontal"} The initial scroll bar orientation
       * @return {qx.ui.core.scroll.IScrollBar} The scrollbar instance
       */
      _createScrollBar: function _createScrollBar(orientation) {
        {
          return new qx.ui.core.scroll.ScrollBar(orientation);
        }
      }
    }
  });
  qx.ui.core.scroll.MScrollBarFactory.$$dbClassInfo = $$dbClassInfo;
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
       * David Perez Carmona (david-perez)
  
  ************************************************************************ */

  /**
   * A selection model.
   */
  qx.Class.define("qx.ui.table.selection.Model", {
    extend: qx.core.Object,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__selectedRangeArr__P_204_0 = [];
      this.__anchorSelectionIndex__P_204_1 = -1;
      this.__leadSelectionIndex__P_204_2 = -1;
      this.hasBatchModeRefCount = 0;
      this.__hadChangeEventInBatchMode__P_204_3 = false;
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired when the selection has changed. */
      changeSelection: "qx.event.type.Event"
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {int} The selection mode "none". Nothing can ever be selected. */
      NO_SELECTION: 1,
      /** @type {int} The selection mode "single". This mode only allows one selected item. */
      SINGLE_SELECTION: 2,
      /**
       * @type {int} The selection mode "single interval". This mode only allows one
       * continuous interval of selected items.
       */
      SINGLE_INTERVAL_SELECTION: 3,
      /**
       * @type {int} The selection mode "multiple interval". This mode only allows any
       * selection.
       */
      MULTIPLE_INTERVAL_SELECTION: 4,
      /**
       * @type {int} The selection mode "multiple interval". This mode only allows any
       * selection. The difference with the previous one, is that multiple
       * selection is eased. A tap on an item, toggles its selection state.
       * On the other hand, MULTIPLE_INTERVAL_SELECTION does this behavior only
       * when Ctrl-tapping an item.
       */
      MULTIPLE_INTERVAL_SELECTION_TOGGLE: 5
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Set the selection mode. Valid values are {@link #NO_SELECTION},
       * {@link #SINGLE_SELECTION}, {@link #SINGLE_INTERVAL_SELECTION},
       * {@link #MULTIPLE_INTERVAL_SELECTION} and
       * {@link #MULTIPLE_INTERVAL_SELECTION_TOGGLE}.
       */
      selectionMode: {
        init: 2,
        //SINGLE_SELECTION,
        check: [1, 2, 3, 4, 5],
        //[ NO_SELECTION, SINGLE_SELECTION, SINGLE_INTERVAL_SELECTION, MULTIPLE_INTERVAL_SELECTION, MULTIPLE_INTERVAL_SELECTION_TOGGLE ],
        apply: "_applySelectionMode"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __hadChangeEventInBatchMode__P_204_3: null,
      __anchorSelectionIndex__P_204_1: null,
      __leadSelectionIndex__P_204_2: null,
      __selectedRangeArr__P_204_0: null,
      // selectionMode property modifier
      _applySelectionMode: function _applySelectionMode(selectionMode) {
        this.resetSelection();
      },
      /**
       *
       * Activates / Deactivates batch mode. In batch mode, no change events will be thrown but
       * will be collected instead. When batch mode is turned off again and any events have
       * been collected, one event is thrown to inform the listeners.
       *
       * This method supports nested calling, i. e. batch mode can be turned more than once.
       * In this case, batch mode will not end until it has been turned off once for each
       * turning on.
       *
       * @param batchMode {Boolean} true to activate batch mode, false to deactivate
       * @return {Boolean} true if batch mode is active, false otherwise
       * @throws {Error} if batch mode is turned off once more than it has been turned on
       */
      setBatchMode: function setBatchMode(batchMode) {
        if (batchMode) {
          this.hasBatchModeRefCount += 1;
        } else {
          if (this.hasBatchModeRefCount == 0) {
            throw new Error("Try to turn off batch mode althoug it was not turned on.");
          }
          this.hasBatchModeRefCount -= 1;
          if (this.__hadChangeEventInBatchMode__P_204_3) {
            this.__hadChangeEventInBatchMode__P_204_3 = false;
            this._fireChangeSelection();
          }
        }
        return this.hasBatchMode();
      },
      /**
       *
       * Returns whether batch mode is active. See setter for a description of batch mode.
       *
       * @return {Boolean} true if batch mode is active, false otherwise
       */
      hasBatchMode: function hasBatchMode() {
        return this.hasBatchModeRefCount > 0;
      },
      /**
       * Returns the first argument of the last call to {@link #setSelectionInterval()},
       * {@link #addSelectionInterval()} or {@link #removeSelectionInterval()}.
       *
       * @return {Integer} the anchor selection index.
       */
      getAnchorSelectionIndex: function getAnchorSelectionIndex() {
        return this.__anchorSelectionIndex__P_204_1;
      },
      /**
       * Sets the anchor selection index. Only use this function, if you want manipulate
       * the selection manually.
       *
       * @param index {Integer} the index to set.
       */
      _setAnchorSelectionIndex: function _setAnchorSelectionIndex(index) {
        this.__anchorSelectionIndex__P_204_1 = index;
      },
      /**
       * Returns the second argument of the last call to {@link #setSelectionInterval()},
       * {@link #addSelectionInterval()} or {@link #removeSelectionInterval()}.
       *
       * @return {Integer} the lead selection index.
       */
      getLeadSelectionIndex: function getLeadSelectionIndex() {
        return this.__leadSelectionIndex__P_204_2;
      },
      /**
       * Sets the lead selection index. Only use this function, if you want manipulate
       * the selection manually.
       *
       * @param index {Integer} the index to set.
       */
      _setLeadSelectionIndex: function _setLeadSelectionIndex(index) {
        this.__leadSelectionIndex__P_204_2 = index;
      },
      /**
       * Returns an array that holds all the selected ranges of the table. Each
       * entry is a map holding information about the "minIndex" and "maxIndex" of the
       * selection range.
       *
       * @return {Map[]} array with all the selected ranges.
       */
      _getSelectedRangeArr: function _getSelectedRangeArr() {
        return this.__selectedRangeArr__P_204_0;
      },
      /**
       * Resets (clears) the selection.
       */
      resetSelection: function resetSelection() {
        if (!this.isSelectionEmpty()) {
          this._resetSelection();
          this._fireChangeSelection();
        }
      },
      /**
       * Returns whether the selection is empty.
       *
       * @return {Boolean} whether the selection is empty.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__selectedRangeArr__P_204_0.length == 0;
      },
      /**
       * Returns the number of selected items.
       *
       * @return {Integer} the number of selected items.
       */
      getSelectedCount: function getSelectedCount() {
        var selectedCount = 0;
        for (var i = 0; i < this.__selectedRangeArr__P_204_0.length; i++) {
          var range = this.__selectedRangeArr__P_204_0[i];
          selectedCount += range.maxIndex - range.minIndex + 1;
        }
        return selectedCount;
      },
      /**
       * Returns whether an index is selected.
       *
       * @param index {Integer} the index to check.
       * @return {Boolean} whether the index is selected.
       */
      isSelectedIndex: function isSelectedIndex(index) {
        for (var i = 0; i < this.__selectedRangeArr__P_204_0.length; i++) {
          var range = this.__selectedRangeArr__P_204_0[i];
          if (index >= range.minIndex && index <= range.maxIndex) {
            return true;
          }
        }
        return false;
      },
      /**
       * Returns the selected ranges as an array. Each array element has a
       * <code>minIndex</code> and a <code>maxIndex</code> property.
       *
       * @return {Map[]} the selected ranges.
       */
      getSelectedRanges: function getSelectedRanges() {
        // clone the selection array and the individual elements - this prevents the
        // caller from messing with the internal model
        var retVal = [];
        for (var i = 0; i < this.__selectedRangeArr__P_204_0.length; i++) {
          retVal.push({
            minIndex: this.__selectedRangeArr__P_204_0[i].minIndex,
            maxIndex: this.__selectedRangeArr__P_204_0[i].maxIndex
          });
        }
        return retVal;
      },
      /**
       * Calls an iterator function for each selected index.
       *
       * Usage Example:
       * <pre class='javascript'>
       * var selectedRowData = [];
       * mySelectionModel.iterateSelection(function(index) {
       *   selectedRowData.push(myTableModel.getRowData(index));
       * });
       * </pre>
       *
       * @param iterator {Function} the function to call for each selected index.
       *          Gets the current index as parameter.
       * @param object {var ? null} the object to use when calling the handler.
       *          (this object will be available via "this" in the iterator)
       */
      iterateSelection: function iterateSelection(iterator, object) {
        for (var i = 0; i < this.__selectedRangeArr__P_204_0.length; i++) {
          for (var j = this.__selectedRangeArr__P_204_0[i].minIndex; j <= this.__selectedRangeArr__P_204_0[i].maxIndex; j++) {
            iterator.call(object, j);
          }
        }
      },
      /**
       * Sets the selected interval. This will clear the former selection.
       *
       * @param fromIndex {Integer} the first index of the selection (including).
       * @param toIndex {Integer} the last index of the selection (including).
       */
      setSelectionInterval: function setSelectionInterval(fromIndex, toIndex) {
        var me = qx.ui.table.selection.Model;
        switch (this.getSelectionMode()) {
          case me.NO_SELECTION:
            return;
          case me.SINGLE_SELECTION:
            // Ensure there is actually a change of selection
            if (this.isSelectedIndex(toIndex)) {
              return;
            }
            fromIndex = toIndex;
            break;
          case me.MULTIPLE_INTERVAL_SELECTION_TOGGLE:
            this.setBatchMode(true);
            try {
              for (var i = fromIndex; i <= toIndex; i++) {
                if (!this.isSelectedIndex(i)) {
                  this._addSelectionInterval(i, i);
                } else {
                  this.removeSelectionInterval(i, i);
                }
              }
            } catch (e) {
              throw e;
            } finally {
              this.setBatchMode(false);
            }
            this._fireChangeSelection();
            return;
        }
        this._resetSelection();
        this._addSelectionInterval(fromIndex, toIndex);
        this._fireChangeSelection();
      },
      /**
       * Adds a selection interval to the current selection.
       *
       * @param fromIndex {Integer} the first index of the selection (including).
       * @param toIndex {Integer} the last index of the selection (including).
       */
      addSelectionInterval: function addSelectionInterval(fromIndex, toIndex) {
        var SelectionModel = qx.ui.table.selection.Model;
        switch (this.getSelectionMode()) {
          case SelectionModel.NO_SELECTION:
            return;
          case SelectionModel.MULTIPLE_INTERVAL_SELECTION:
          case SelectionModel.MULTIPLE_INTERVAL_SELECTION_TOGGLE:
            this._addSelectionInterval(fromIndex, toIndex);
            this._fireChangeSelection();
            break;
          default:
            this.setSelectionInterval(fromIndex, toIndex);
            break;
        }
      },
      /**
       * Removes an interval from the current selection.
       *
       * @param fromIndex {Integer} the first index of the interval (including).
       * @param toIndex {Integer} the last index of the interval (including).
       * @param rowsRemoved {Boolean?} rows were removed that caused this selection to change.
       *   If rows were removed, move the selections over so the same rows are selected as before.
       */
      removeSelectionInterval: function removeSelectionInterval(fromIndex, toIndex, rowsRemoved) {
        this.__anchorSelectionIndex__P_204_1 = fromIndex;
        this.__leadSelectionIndex__P_204_2 = toIndex;
        var minIndex = Math.min(fromIndex, toIndex);
        var maxIndex = Math.max(fromIndex, toIndex);
        var removeCount = maxIndex + 1 - minIndex;

        // Crop the affected ranges
        var newRanges = [];
        var extraRange = null;
        for (var i = 0; i < this.__selectedRangeArr__P_204_0.length; i++) {
          var range = this.__selectedRangeArr__P_204_0[i];
          if (range.minIndex > maxIndex) {
            if (rowsRemoved) {
              // Move whole selection up.
              range.minIndex -= removeCount;
              range.maxIndex -= removeCount;
            }
          } else if (range.maxIndex >= minIndex) {
            // This range is affected
            var minIsIn = range.minIndex >= minIndex;
            var maxIsIn = range.maxIndex >= minIndex && range.maxIndex <= maxIndex;
            if (minIsIn && maxIsIn) {
              // This range is removed completely
              range = null;
            } else if (minIsIn) {
              if (rowsRemoved) {
                range.minIndex = minIndex;
                range.maxIndex -= removeCount;
              } else {
                // The range is cropped from the left
                range.minIndex = maxIndex + 1;
              }
            } else if (maxIsIn) {
              // The range is cropped from the right
              range.maxIndex = minIndex - 1;
            } else {
              if (rowsRemoved) {
                range.maxIndex -= removeCount;
              } else {
                // The range is split
                extraRange = {
                  minIndex: maxIndex + 1,
                  maxIndex: range.maxIndex
                };
                range.maxIndex = minIndex - 1;
              }
            }
          }
          if (range) {
            newRanges.push(range);
            range = null;
          }
          if (extraRange) {
            newRanges.push(extraRange);
            extraRange = null;
          }
        }
        this.__selectedRangeArr__P_204_0 = newRanges;
        this._fireChangeSelection();
      },
      /**
       * Resets (clears) the selection, but doesn't inform the listeners.
       */
      _resetSelection: function _resetSelection() {
        this.__selectedRangeArr__P_204_0 = [];
        this.__anchorSelectionIndex__P_204_1 = -1;
        this.__leadSelectionIndex__P_204_2 = -1;
      },
      /**
       * Adds a selection interval to the current selection, but doesn't inform
       * the listeners.
       *
       * @param fromIndex {Integer} the first index of the selection (including).
       * @param toIndex {Integer} the last index of the selection (including).
       */
      _addSelectionInterval: function _addSelectionInterval(fromIndex, toIndex) {
        this.__anchorSelectionIndex__P_204_1 = fromIndex;
        this.__leadSelectionIndex__P_204_2 = toIndex;
        var minIndex = Math.min(fromIndex, toIndex);
        var maxIndex = Math.max(fromIndex, toIndex);

        // Find the index where the new range should be inserted
        var newRangeIndex = 0;
        for (; newRangeIndex < this.__selectedRangeArr__P_204_0.length; newRangeIndex++) {
          var range = this.__selectedRangeArr__P_204_0[newRangeIndex];
          if (range.minIndex > minIndex) {
            break;
          }
        }

        // Add the new range
        this.__selectedRangeArr__P_204_0.splice(newRangeIndex, 0, {
          minIndex: minIndex,
          maxIndex: maxIndex
        });

        // Merge overlapping ranges
        var lastRange = this.__selectedRangeArr__P_204_0[0];
        for (var i = 1; i < this.__selectedRangeArr__P_204_0.length; i++) {
          var range = this.__selectedRangeArr__P_204_0[i];
          if (lastRange.maxIndex + 1 >= range.minIndex) {
            // The ranges are overlapping -> merge them
            lastRange.maxIndex = Math.max(lastRange.maxIndex, range.maxIndex);

            // Remove the current range
            this.__selectedRangeArr__P_204_0.splice(i, 1);

            // Check this index another time
            i--;
          } else {
            lastRange = range;
          }
        }
      },
      // this._dumpRanges();
      /**
       * Logs the current ranges for debug purposes.
       *
       */
      _dumpRanges: function _dumpRanges() {
        var text = "Ranges:";
        for (var i = 0; i < this.__selectedRangeArr__P_204_0.length; i++) {
          var range = this.__selectedRangeArr__P_204_0[i];
          text += " [" + range.minIndex + ".." + range.maxIndex + "]";
        }
        this.debug(text);
      },
      /**
       * Fires the "changeSelection" event to all registered listeners. If the selection model
       * currently is in batch mode, only one event will be thrown when batch mode is ended.
       *
       */
      _fireChangeSelection: function _fireChangeSelection() {
        if (this.hasBatchMode()) {
          // In batch mode, remember event but do not throw (yet)
          this.__hadChangeEventInBatchMode__P_204_3 = true;
        } else {
          // If not in batch mode, throw event
          this.fireEvent("changeSelection");
        }
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__selectedRangeArr__P_204_0 = null;
    }
  });
  qx.ui.table.selection.Model.$$dbClassInfo = $$dbClassInfo;
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
   * The data model of a table.
   */
  qx.Interface.define("qx.ui.table.ITableModel", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Fired when the table data changed (the stuff shown in the table body).
       * The data property of the event may be null or a map having the following attributes:
       * <ul>
       *   <li>firstRow: The index of the first row that has changed.</li>
       *   <li>lastRow: The index of the last row that has changed.</li>
       *   <li>firstColumn: The model index of the first column that has changed.</li>
       *   <li>lastColumn: The model index of the last column that has changed.</li>
       * </ul>
       */
      dataChanged: "qx.event.type.Data",
      /**
       * Fired when the meta data changed (the stuff shown in the table header).
       */
      metaDataChanged: "qx.event.type.Event",
      /**
       * Fired after the table is sorted (but before the metaDataChanged event)
       */
      sorted: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Returns the number of rows in the model.
       *
       * @abstract
       * @return {Integer} the number of rows.
       */
      getRowCount: function getRowCount() {},
      /**
       *
       * Returns the data of one row. This function may be overridden by models which hold
       * all data of a row in one object. By using this function, clients have a way of
       * quickly retrieving the entire row data.
       *
       * <b>Important:</b>Models which do not have their row data accessible in one object
       * may return null.
       *
       * @param rowIndex {Integer} the model index of the row.
       * @return {Object} the row data as an object or null if the model does not support row data
       *                    objects. The details on the object returned are determined by the model
       *                    implementation only.
       */
      getRowData: function getRowData(rowIndex) {},
      /**
       * Returns the number of columns in the model.
       *
       * @abstract
       * @return {Integer} the number of columns.
       */
      getColumnCount: function getColumnCount() {},
      /**
       * Returns the ID of column. The ID may be used to identify columns
       * independent from their index in the model. E.g. for being aware of added
       * columns when saving the width of a column.
       *
       * @abstract
       * @param columnIndex {Integer} the index of the column.
       * @return {String} the ID of the column.
       */
      getColumnId: function getColumnId(columnIndex) {},
      /**
       * Returns the index of a column.
       *
       * @abstract
       * @param columnId {String} the ID of the column.
       * @return {Integer} the index of the column.
       */
      getColumnIndexById: function getColumnIndexById(columnId) {},
      /**
       * Returns the name of a column. This name will be shown to the user in the
       * table header.
       *
       * @abstract
       * @param columnIndex {Integer} the index of the column.
       * @return {String} the name of the column.
       */
      getColumnName: function getColumnName(columnIndex) {},
      /**
       * Returns whether a column is editable.
       *
       * @param columnIndex {Integer} the column to check.
       * @return {Boolean} whether the column is editable.
       */
      isColumnEditable: function isColumnEditable(columnIndex) {},
      /**
       * Returns whether a column is sortable.
       *
       * @param columnIndex {Integer} the column to check.
       * @return {Boolean} whether the column is sortable.
       */
      isColumnSortable: function isColumnSortable(columnIndex) {},
      /**
       * Sorts the model by a column.
       *
       * @param columnIndex {Integer} the column to sort by.
       * @param ascending {Boolean} whether to sort ascending.
       */
      sortByColumn: function sortByColumn(columnIndex, ascending) {},
      /**
       * Returns the column index the model is sorted by. If the model is not sorted
       * -1 is returned.
       *
       * @return {Integer} the column index the model is sorted by.
       */
      getSortColumnIndex: function getSortColumnIndex() {},
      /**
       * Returns whether the model is sorted ascending.
       *
       * @return {Boolean} whether the model is sorted ascending.
       */
      isSortAscending: function isSortAscending() {},
      /**
       * Prefetches some rows. This is a hint to the model that the specified rows
       * will be read soon.
       *
       * @param firstRowIndex {Integer} the index of first row.
       * @param lastRowIndex {Integer} the index of last row.
       */
      prefetchRows: function prefetchRows(firstRowIndex, lastRowIndex) {},
      /**
       * Returns a cell value by column index.
       *
       * @abstract
       * @param columnIndex {Integer} the index of the column.
       * @param rowIndex {Integer} the index of the row.
       * @return {var} The value of the cell.
       * @see #getValueById
       */
      getValue: function getValue(columnIndex, rowIndex) {},
      /**
       * Returns a cell value by column ID.
       *
       * Whenever you have the choice, use {@link #getValue()} instead,
       * because this should be faster.
       *
       * @param columnId {String} the ID of the column.
       * @param rowIndex {Integer} the index of the row.
       * @return {var} the value of the cell.
       */
      getValueById: function getValueById(columnId, rowIndex) {},
      /**
       * Sets a cell value by column index.
       *
       * @abstract
       * @param columnIndex {Integer} The index of the column.
       * @param rowIndex {Integer} the index of the row.
       * @param value {var} The new value.
       * @see #setValueById
       */
      setValue: function setValue(columnIndex, rowIndex, value) {},
      /**
       * Sets a cell value by column ID.
       *
       * Whenever you have the choice, use {@link #setValue()} instead,
       * because this should be faster.
       *
       * @param columnId {String} The ID of the column.
       * @param rowIndex {Integer} The index of the row.
       * @param value {var} The new value.
       */
      setValueById: function setValueById(columnId, rowIndex, value) {}
    }
  });
  qx.ui.table.ITableModel.$$dbClassInfo = $$dbClassInfo;
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
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Interface for creating the column visibility menu
   */
  qx.Interface.define("qx.ui.table.IColumnMenuButton", {
    properties: {
      /**
       * The menu which is displayed when this button is pressed.
       */
      menu: {}
    },
    members: {
      /**
       * Instantiate a sub-widget.
       *
       * @param item {String}
       *   One of the following strings, indicating what type of
       *   column-menu-specific object to instantiate:
       *   <dl>
       *     <dt>menu</dt>
       *     <dd>
       *       Instantiate a menu which will appear when the column visibility
       *       button is pressed. No options are provided in this case.
       *     </dd>
       *     <dt>menu-button</dt>
       *     <dd>
       *       Instantiate a button to correspond to a column within the
       *       table. The options are a map containing <i>text</i>, the name of
       *       the column; <i>column</i>, the column number; and
       *       <i>bVisible</i>, a boolean indicating whether this column is
       *       currently visible. The instantiated return object must implement
       *       interface {@link qx.ui.table.IColumnMenuItem}
       *     </dd>
       *     <dt>user-button</dt>
       *     <dd>
       *       Instantiate a button for other than a column name. This is used,
       *       for example, to add the "Reset column widths" button when the
       *       Resize column model is requested. The options is a map containing
       *       <i>text</i>, the text to present in the button.
       *     </dd>
       *     <dt>separator</dt>
       *     <dd>
       *       Instantiate a separator object to added to the menu. This is
       *       used, for example, to separate the table column name list from
       *       the "Reset column widths" button when the Resize column model is
       *       requested. No options are provided in this case.
       *     </dd>
       *   </dl>
       *
       * @param options {Map}
       *   Options specific to the <i>item</i> being requested.
       *
       * @return {qx.ui.core.Widget}
       *   The instantiated object as specified by <i>item</i>.
       */
      factory: function factory(item, options) {
        return true;
      },
      /**
       * Empty the menu of all items, in preparation for building a new column
       * visibility menu.
       *
       */
      empty: function empty() {
        return true;
      }
    }
  });
  qx.ui.table.IColumnMenuButton.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.MenuButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IColumnMenuButton": {
        "require": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.table.columnmenu.MenuItem": {},
      "qx.ui.menu.Button": {},
      "qx.ui.menu.Separator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The traditional qx.ui.menu.MenuButton to access the column visibility menu.
   */
  qx.Class.define("qx.ui.table.columnmenu.Button", {
    extend: qx.ui.form.MenuButton,
    implement: qx.ui.table.IColumnMenuButton,
    /**
     * Create a new instance of a column visibility menu button. This button
     * also contains the factory for creating each of the sub-widgets.
     */
    construct: function construct() {
      qx.ui.form.MenuButton.constructor.call(this);

      // add blocker
      this.__blocker__P_205_0 = new qx.ui.core.Blocker(this);
    },
    members: {
      __columnMenuButtons__P_205_1: null,
      __blocker__P_205_0: null,
      // Documented in qx.ui.table.IColumnMenu
      factory: function factory(item, options) {
        switch (item) {
          case "menu":
            var menu = new qx.ui.menu.Menu();
            this.setMenu(menu);
            return menu;
          case "menu-button":
            var menuButton = new qx.ui.table.columnmenu.MenuItem(options.text);
            menuButton.setColumnVisible(options.bVisible);
            this.getMenu().add(menuButton);
            return menuButton;
          case "user-button":
            var button = new qx.ui.menu.Button(options.text);
            button.set({
              appearance: "table-column-reset-button"
            });
            return button;
          case "separator":
            return new qx.ui.menu.Separator();
          default:
            throw new Error("Unrecognized factory request: " + item);
        }
      },
      /**
       * Returns the blocker of the columnmenu button.
       *
       * @return {qx.ui.core.Blocker} the blocker.
       */
      getBlocker: function getBlocker() {
        return this.__blocker__P_205_0;
      },
      // Documented in qx.ui.table.IColumnMenu
      empty: function empty() {
        var menu = this.getMenu();
        var entries = menu.getChildren();
        for (var i = 0, l = entries.length; i < l; i++) {
          entries[0].destroy();
        }
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__blocker__P_205_0.dispose();
    }
  });
  qx.ui.table.columnmenu.Button.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.selection.Model": {},
      "qx.event.type.Dom": {}
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
   * A selection manager. This is a helper class that handles all selection
   * related events and updates a SelectionModel.
   * <p>
   * Widgets that support selection should use this manager. This way the only
   * thing the widget has to do is mapping pointer or key events to indexes and
   * call the corresponding handler method.
   *
   * @see SelectionModel
   */
  qx.Class.define("qx.ui.table.selection.Manager", {
    extend: qx.core.Object,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * The selection model where to set the selection changes.
       */
      selectionModel: {
        check: "qx.ui.table.selection.Model"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __lastPointerDownHandled__P_206_0: null,
      /**
       * Handles the tap event.
       *
       * @param index {Integer} the index the pointer is pointing at.
       * @param evt {qx.event.type.Tap} the pointer event.
       */
      handleTap: function handleTap(index, evt) {
        if (evt.isLeftPressed()) {
          var selectionModel = this.getSelectionModel();
          if (!selectionModel.isSelectedIndex(index)) {
            // This index is not selected -> We react when the pointer is pressed (because of drag and drop)
            this._handleSelectEvent(index, evt);
            this.__lastPointerDownHandled__P_206_0 = true;
          } else {
            // This index is already selected -> We react when the pointer is released (because of drag and drop)
            this.__lastPointerDownHandled__P_206_0 = false;
          }
        } else if (evt.isRightPressed() && evt.getModifiers() == 0) {
          var selectionModel = this.getSelectionModel();
          if (!selectionModel.isSelectedIndex(index)) {
            // This index is not selected -> Set the selection to this index
            selectionModel.setSelectionInterval(index, index);
          }
        }
        if (evt.isLeftPressed() && !this.__lastPointerDownHandled__P_206_0) {
          this._handleSelectEvent(index, evt);
        }
      },
      /**
       * Handles the key down event that is used as replacement for pointer taps
       * (Normally space).
       *
       * @param index {Integer} the index that is currently focused.
       * @param evt {Map} the key event.
       */
      handleSelectKeyDown: function handleSelectKeyDown(index, evt) {
        this._handleSelectEvent(index, evt);
      },
      /**
       * Handles a key down event that moved the focus (E.g. up, down, home, end, ...).
       *
       * @param index {Integer} the index that is currently focused.
       * @param evt {Map} the key event.
       */
      handleMoveKeyDown: function handleMoveKeyDown(index, evt) {
        var selectionModel = this.getSelectionModel();
        switch (evt.getModifiers()) {
          case 0:
            selectionModel.setSelectionInterval(index, index);
            break;
          case qx.event.type.Dom.SHIFT_MASK:
            var anchor = selectionModel.getAnchorSelectionIndex();
            if (anchor == -1) {
              selectionModel.setSelectionInterval(index, index);
            } else {
              selectionModel.setSelectionInterval(anchor, index);
            }
            break;
        }
      },
      /**
       * Handles a select event.
       *
       * @param index {Integer} the index the event is pointing at.
       * @param evt {Map} the pointer event.
       */
      _handleSelectEvent: function _handleSelectEvent(index, evt) {
        var selectionModel = this.getSelectionModel();
        var leadIndex = selectionModel.getLeadSelectionIndex();
        var anchorIndex = selectionModel.getAnchorSelectionIndex();
        if (evt.isShiftPressed()) {
          if (index != leadIndex || selectionModel.isSelectionEmpty()) {
            // The lead selection index was changed
            if (anchorIndex == -1) {
              anchorIndex = index;
            }
            if (evt.isCtrlOrCommandPressed()) {
              selectionModel.addSelectionInterval(anchorIndex, index);
            } else {
              selectionModel.setSelectionInterval(anchorIndex, index);
            }
          }
        } else if (evt.isCtrlOrCommandPressed()) {
          if (selectionModel.isSelectedIndex(index)) {
            selectionModel.removeSelectionInterval(index, index);
          } else {
            selectionModel.addSelectionInterval(index, index);
          }
        } else {
          // setSelectionInterval checks to see if the change is really necessary
          selectionModel.setSelectionInterval(index, index);
        }
      }
    }
  });
  qx.ui.table.selection.Manager.$$dbClassInfo = $$dbClassInfo;
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
   * A cell renderer for header cells.
   */
  qx.Interface.define("qx.ui.table.IHeaderRenderer", {
    members: {
      /**
       * Creates a header cell.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>col (int): the model index of the column.</li>
       * <li>xPos (int): the x position of the column in the table pane.</li>
       * <li>name (string): the name of the column.</li>
       * <li>editable (boolean): whether the column is editable.</li>
       * <li>sorted (boolean): whether the column is sorted.</li>
       * <li>sortedAscending (boolean): whether sorting is ascending.</li>
       * </ul>
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create.
       * @return {qx.ui.core.Widget} the widget that renders the header cell.
       */
      createHeaderCell: function createHeaderCell(cellInfo) {
        return true;
      },
      /**
       * Updates a header cell.
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create. This map has the same structure as in {@link #createHeaderCell}.
       * @param cellWidget {qx.ui.core.Widget} the widget that renders the header cell. This is
       *      the same widget formally created by {@link #createHeaderCell}.
       */
      updateHeaderCell: function updateHeaderCell(cellInfo, cellWidget) {
        return true;
      }
    }
  });
  qx.ui.table.IHeaderRenderer.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.IHeaderRenderer": {
        "require": true
      },
      "qx.ui.table.headerrenderer.HeaderCell": {},
      "qx.ui.tooltip.ToolTip": {},
      "qx.util.DisposeUtil": {}
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
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * The default header cell renderer.
   */
  qx.Class.define("qx.ui.table.headerrenderer.Default", {
    extend: qx.core.Object,
    implement: qx.ui.table.IHeaderRenderer,
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * @type {String} The state which will be set for header cells of sorted columns.
       */
      STATE_SORTED: "sorted",
      /**
       * @type {String} The state which will be set when sorting is ascending.
       */
      STATE_SORTED_ASCENDING: "sortedAscending"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * ToolTip to show if the pointer hovers of the icon
       */
      toolTip: {
        check: "String",
        init: null,
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      createHeaderCell: function createHeaderCell(cellInfo) {
        var widget = new qx.ui.table.headerrenderer.HeaderCell();
        this.updateHeaderCell(cellInfo, widget);
        return widget;
      },
      // overridden
      updateHeaderCell: function updateHeaderCell(cellInfo, cellWidget) {
        var DefaultHeaderCellRenderer = qx.ui.table.headerrenderer.Default;

        // check for localization [BUG #2699]
        if (cellInfo.name && cellInfo.name.translate) {
          cellWidget.setLabel(cellInfo.name.translate());
        } else {
          cellWidget.setLabel(cellInfo.name);
        }

        // Set image tooltip if given
        var widgetToolTip = cellWidget.getToolTip();
        if (this.getToolTip() != null) {
          if (widgetToolTip == null) {
            // We have no tooltip yet -> Create one
            widgetToolTip = new qx.ui.tooltip.ToolTip(this.getToolTip());
            cellWidget.setToolTip(widgetToolTip);
            // Link disposer to cellwidget to prevent memory leak
            qx.util.DisposeUtil.disposeTriggeredBy(widgetToolTip, cellWidget);
          } else {
            // Update tooltip text
            widgetToolTip.setLabel(this.getToolTip());
          }
        }
        cellInfo.sorted ? cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED) : cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED);
        cellInfo.sortedAscending ? cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING) : cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING);
      }
    }
  });
  qx.ui.table.headerrenderer.Default.$$dbClassInfo = $$dbClassInfo;
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
   * A cell renderer for data cells.
   */
  qx.Interface.define("qx.ui.table.ICellRenderer", {
    members: {
      /**
       * Creates the HTML for a data cell.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>value (var): the cell's value.</li>
       * <li>rowData (var): contains the row data for the row, the cell belongs to.
       *   The kind of this object depends on the table model, see
       *   {@link qx.ui.table.ITableModel#getRowData}</li>
       * <li>row (int): the model index of the row the cell belongs to.</li>
       * <li>col (int): the model index of the column the cell belongs to.</li>
       * <li>table (qx.ui.table.Table): the table the cell belongs to.</li>
       * <li>xPos (int): the x position of the cell in the table pane.</li>
       * <li>selected (boolean): whether the cell is selected.</li>
       * <li>focusedRow (boolean): whether the cell is in the same row as the
       *   focused cell.</li>
       * <li>editable (boolean): whether the cell is editable.</li>
       * <li>style (string): The CSS styles that should be applied to the outer HTML
       *   element.</li>
       * <li>styleLeft (string): The left position of the cell.</li>
       * <li>styleWidth (string): The cell's width (pixel).</li>
       * <li>styleHeight (string): The cell's height (pixel).</li>
       * </ul>
       *
       * @param cellInfo {Map} A map containing the information about the cell to
       *     create.
       * @param htmlArr {String[]} Target string container. The HTML of the data
       *     cell should be appended to this array.
       *
       * @return {Boolean|undefined}
       *   A return value of <i>true</i> specifies that no additional cells in
       *   the row shall be rendered. This may be used, for example, for
       *   separator rows or for other special rendering purposes. Traditional
       *   cell renderers had no defined return value, so returned nothing
       *   (undefined). If this method returns either false or nothing, then
       *   rendering continues with the next cell in the row, which the normal
       *   mode of operation.
       */
      createDataCellHtml: function createDataCellHtml(cellInfo, htmlArr) {
        return true;
      }
    }
  });
  qx.ui.table.ICellRenderer.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.Stylesheet": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.ICellRenderer": {
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.theme.manager.Color": {},
      "qx.bom.element.Style": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.element.BoxSizing": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.dyntheme": {
          "load": true
        },
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
        },
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
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * An abstract data cell renderer that does the basic coloring
   * (borders, selected look, ...).
   *
   * @require(qx.bom.Stylesheet)
   */
  qx.Class.define("qx.ui.table.cellrenderer.Abstract", {
    type: "abstract",
    implement: qx.ui.table.ICellRenderer,
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      var cr = qx.ui.table.cellrenderer.Abstract;
      if (!cr.__clazz__P_217_0) {
        cr.__clazz__P_217_0 = qx.ui.table.cellrenderer.Abstract;
        this._createStyleSheet();

        // add dynamic theme listener
        {
          qx.theme.manager.Meta.getInstance().addListener("changeTheme", this._onChangeTheme, this);
        }
      }
    },
    properties: {
      /**
       * The default cell style. The value of this property will be provided
       * to the cell renderer as cellInfo.style.
       */
      defaultCellStyle: {
        init: null,
        check: "String",
        nullable: true
      }
    },
    members: {
      /**
       * Handler for the theme change.
       * @signature function()
       */
      _onChangeTheme: qx.core.Environment.select("qx.dyntheme", {
        "true": function _true() {
          qx.bom.Stylesheet.removeAllRules(qx.ui.table.cellrenderer.Abstract.__clazz__P_217_0.stylesheet);
          this._createStyleSheet();
        },
        "false": null
      }),
      /**
       * the sum of the horizontal insets. This is needed to compute the box model
       * independent size
       */
      _insetX: 13,
      // paddingLeft + paddingRight + borderRight

      /**
       * the sum of the vertical insets. This is needed to compute the box model
       * independent size
       */
      _insetY: 0,
      /**
       * Creates the style sheet used for the table cells.
       */
      _createStyleSheet: function _createStyleSheet() {
        var colorMgr = qx.theme.manager.Color.getInstance();
        var stylesheet = ".qooxdoo-table-cell {" + qx.bom.element.Style.compile({
          position: "absolute",
          top: "0px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderRight: "1px solid " + colorMgr.resolve("table-column-line"),
          padding: "0px 6px",
          cursor: "default",
          textOverflow: "ellipsis",
          userSelect: "none"
        }) + "} " + ".qooxdoo-table-cell-right { text-align:right } " + ".qooxdoo-table-cell-italic { font-style:italic} " + ".qooxdoo-table-cell-bold { font-weight:bold } ";
        if (qx.core.Environment.get("css.boxsizing")) {
          stylesheet += ".qooxdoo-table-cell {" + qx.bom.element.BoxSizing.compile("content-box") + "}";
        }
        qx.ui.table.cellrenderer.Abstract.__clazz__P_217_0.stylesheet = qx.bom.Stylesheet.createElement(stylesheet);
      },
      /**
       * Get a string of the cell element's HTML classes.
       *
       * This method may be overridden by sub classes.
       *
       * @param cellInfo {Map} cellInfo of the cell
       * @return {String} The table cell HTML classes as string.
       */
      _getCellClass: function _getCellClass(cellInfo) {
        return "qooxdoo-table-cell";
      },
      /**
       * Returns the CSS styles that should be applied to the main div of this
       * cell.
       *
       * This method may be overridden by sub classes.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {var} the CSS styles of the main div.
       */
      _getCellStyle: function _getCellStyle(cellInfo) {
        return cellInfo.style || "";
      },
      /**
       * Retrieve any extra attributes the cell renderer wants applied to this
       * cell.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       *
       * @return {String}
       *   The extra attributes to be applied to this cell.
       */
      _getCellAttributes: function _getCellAttributes(cellInfo) {
        var cellId = "qooxdoo-table-cell-" + cellInfo.table.toHashCode() + "-" + cellInfo.row + "-" + cellInfo.col;
        var readOnly = cellInfo.editable !== null && cellInfo.editable !== undefined ? !cellInfo.editable : true;
        return "id=" + cellId + " role=gridcell aria-readonly=" + readOnly;
      },
      /**
       * Returns the HTML that should be used inside the main div of this cell.
       *
       * This method may be overridden by sub classes.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {String} the inner HTML of the cell.
       */
      _getContentHtml: function _getContentHtml(cellInfo) {
        return cellInfo.value || "";
      },
      /**
       * Get the cell size taking the box model into account
       *
       * @param width {Integer} The cell's (border-box) width in pixel
       * @param height {Integer} The cell's (border-box) height in pixel
       * @param insetX {Integer} The cell's horizontal insets, i.e. the sum of
       *    horizontal paddings and borders
       * @param insetY {Integer} The cell's vertical insets, i.e. the sum of
       *    vertical paddings and borders
       * @return {String} The CSS style string for the cell size
       */
      _getCellSizeStyle: function _getCellSizeStyle(width, height, insetX, insetY) {
        var style = "";
        if (qx.core.Environment.get("css.boxmodel") == "content") {
          width -= insetX;
          height -= insetY;
        }
        style += "width:" + Math.max(width, 0) + "px;";
        style += "height:" + Math.max(height, 0) + "px;";
        return style;
      },
      // interface implementation
      createDataCellHtml: function createDataCellHtml(cellInfo, htmlArr) {
        htmlArr.push('<div class="', this._getCellClass(cellInfo), '" style="', "left:", cellInfo.styleLeft, "px;", this._getCellSizeStyle(cellInfo.styleWidth, cellInfo.styleHeight, this._insetX, this._insetY), this._getCellStyle(cellInfo), '" ', 'data-qx-table-cell-row="', cellInfo.row, '" ', 'data-qx-table-cell-col="', cellInfo.col, '" ', this._getCellAttributes(cellInfo), ">" + this._getContentHtml(cellInfo), "</div>");
      }
    },
    destruct: function destruct() {
      // remove dynamic theme listener
      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this._onChangeTheme, this);
      }
    }
  });
  qx.ui.table.cellrenderer.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Abstract": {
        "require": true
      },
      "qx.bom.String": {},
      "qx.util.format.NumberFormat": {},
      "qx.util.format.DateFormat": {}
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
   * The default data cell renderer.
   */
  qx.Class.define("qx.ui.table.cellrenderer.Default", {
    extend: qx.ui.table.cellrenderer.Abstract,
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      STYLEFLAG_ALIGN_RIGHT: 1,
      STYLEFLAG_BOLD: 2,
      STYLEFLAG_ITALIC: 4,
      _numberFormat: null
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Whether the alignment should automatically be set according to the cell value.
       * If true numbers will be right-aligned.
       */
      useAutoAlign: {
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
      /**
       * Determines the styles to apply to the cell
       *
       * @param cellInfo {Map} cellInfo of the cell
       *     See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {Integer} the sum of any of the STYLEFLAGS defined below
       */
      _getStyleFlags: function _getStyleFlags(cellInfo) {
        if (this.getUseAutoAlign()) {
          if (typeof cellInfo.value == "number") {
            return qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT;
          }
        }
        return 0;
      },
      // overridden
      _getCellClass: function _getCellClass(cellInfo) {
        var cellClass = qx.ui.table.cellrenderer.Default.superclass.prototype._getCellClass.call(this, cellInfo);
        if (!cellClass) {
          return "";
        }
        var stylesToApply = this._getStyleFlags(cellInfo);
        if (stylesToApply & qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT) {
          cellClass += " qooxdoo-table-cell-right";
        }
        if (stylesToApply & qx.ui.table.cellrenderer.Default.STYLEFLAG_BOLD) {
          cellClass += " qooxdoo-table-cell-bold";
        }
        if (stylesToApply & qx.ui.table.cellrenderer.Default.STYLEFLAG_ITALIC) {
          cellClass += " qooxdoo-table-cell-italic";
        }
        return cellClass;
      },
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        return qx.bom.String.escape(this._formatValue(cellInfo));
      },
      /**
       * Formats a value.
       *
       * @param cellInfo {Map} A map containing the information about the cell to
       *          create. This map has the same structure as in
       *          {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {String} the formatted value.
       */
      _formatValue: function _formatValue(cellInfo) {
        var value = cellInfo.value;
        var res;
        if (value == null) {
          return "";
        }
        if (typeof value == "string") {
          return value;
        } else if (typeof value == "number") {
          if (!qx.ui.table.cellrenderer.Default._numberFormat) {
            qx.ui.table.cellrenderer.Default._numberFormat = new qx.util.format.NumberFormat();
            qx.ui.table.cellrenderer.Default._numberFormat.setMaximumFractionDigits(2);
          }
          res = qx.ui.table.cellrenderer.Default._numberFormat.format(value);
        } else if (value instanceof Date) {
          res = qx.util.format.DateFormat.getDateInstance().format(value);
        } else {
          res = value.toString();
        }
        return res;
      }
    }
  });
  qx.ui.table.cellrenderer.Default.$$dbClassInfo = $$dbClassInfo;
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
   * A factory creating widgets to use for editing table cells.
   */
  qx.Interface.define("qx.ui.table.ICellEditorFactory", {
    members: {
      /**
       * Creates a cell editor.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>value (var): the cell's value.</li>
       * <li>row (int): the model index of the row the cell belongs to.</li>
       * <li>col (int): the model index of the column the cell belongs to.</li>
       * <li>xPos (int): the x position of the cell in the table pane.</li>
       * <li>table (qx.ui.table.Table) reference to the table, the cell belongs to. </li>
       * </ul>
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create.
       * @return {qx.ui.core.Widget} the widget that should be used as cell editor.
       */
      createCellEditor: function createCellEditor(cellInfo) {
        return true;
      },
      /**
       * Returns the current value of a cell editor.
       *
       * @abstract
       * @param cellEditor {qx.ui.core.Widget} The cell editor formally created by
       *      {@link #createCellEditor}.
       * @return {var} the current value from the editor.
       */
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        return true;
      }
    }
  });
  qx.ui.table.ICellEditorFactory.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.ICellEditorFactory": {
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * An abstract cell editor factory creating text/password/spinner/... fields.
   */
  qx.Class.define("qx.ui.table.celleditor.AbstractField", {
    extend: qx.core.Object,
    implement: qx.ui.table.ICellEditorFactory,
    type: "abstract",
    properties: {
      /**
       * function that validates the result
       * the function will be called with the new value and the old value and is
       * supposed to return the value that is set as the table value.
       **/
      validationFunction: {
        check: "Function",
        nullable: true,
        init: null
      }
    },
    members: {
      /**
       * Factory to create the editor widget
       *
       * @return {qx.ui.core.Widget} The editor widget
       */
      _createEditor: function _createEditor() {
        throw new Error("Abstract method call!");
      },
      // interface implementation
      createCellEditor: function createCellEditor(cellInfo) {
        var cellEditor = this._createEditor();
        cellEditor.originalValue = cellInfo.value;
        if (cellInfo.value === null || cellInfo.value === undefined) {
          cellInfo.value = "";
        }
        cellEditor.setValue("" + cellInfo.value);
        cellEditor.addListener("appear", function () {
          cellEditor.selectAllText();
        });
        return cellEditor;
      },
      // interface implementation
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        var value = cellEditor.getValue();

        // validation function will be called with new and old value
        var validationFunc = this.getValidationFunction();
        if (validationFunc) {
          value = validationFunc(value, cellEditor.originalValue);
        }
        if (typeof cellEditor.originalValue == "number") {
          value = parseFloat(value);
        }
        return value;
      }
    }
  });
  qx.ui.table.celleditor.AbstractField.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.celleditor.AbstractField": {
        "require": true
      },
      "qx.ui.form.TextField": {}
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
  
  ************************************************************************ */

  /**
   * A cell editor factory creating text fields.
   */
  qx.Class.define("qx.ui.table.celleditor.TextField", {
    extend: qx.ui.table.celleditor.AbstractField,
    members: {
      // overridden
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        var value = cellEditor.getValue();

        // validation function will be called with new and old value
        var validationFunc = this.getValidationFunction();
        if (validationFunc) {
          value = validationFunc(value, cellEditor.originalValue);
        }
        if (typeof cellEditor.originalValue == "number") {
          // Correct problem of NaN displaying when value is null string.
          //if (value != null) {
          if (value != null && value != "") {
            value = parseFloat(value);
          }
        }
        return value;
      },
      _createEditor: function _createEditor() {
        var cellEditor = new qx.ui.form.TextField();
        cellEditor.setAppearance("table-editor-textfield");
        return cellEditor;
      }
    }
  });
  qx.ui.table.celleditor.TextField.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.headerrenderer.Default": {
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
        "require": true
      },
      "qx.ui.table.celleditor.TextField": {
        "require": true
      },
      "qx.ui.table.IHeaderRenderer": {},
      "qx.ui.table.ICellRenderer": {},
      "qx.ui.table.ICellEditorFactory": {},
      "qx.lang.Array": {}
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
   * A model that contains all meta data about columns, such as width, renderer,
   * visibility and order.
   *
   * @see qx.ui.table.ITableModel
   */
  qx.Class.define("qx.ui.table.columnmodel.Basic", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__overallColumnArr__P_207_0 = [];
      this.__visibleColumnArr__P_207_1 = [];
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Fired when the width of a column has changed. The data property of the event is
       * a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column the width of which has changed.</li>
       *   <li>newWidth: The new width of the column in pixels.</li>
       *   <li>oldWidth: The old width of the column in pixels.</li>
       * </ul>
       */
      widthChanged: "qx.event.type.Data",
      /**
       * Fired when the visibility of a column has changed. This event is equal to
       * "visibilityChanged", but is fired right before.
       */
      visibilityChangedPre: "qx.event.type.Data",
      /**
       * Fired when the visibility of a column has changed. The data property of the
       * event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column the visibility of which has changed.</li>
       *   <li>visible: Whether the column is now visible.</li>
       * </ul>
       */
      visibilityChanged: "qx.event.type.Data",
      /**
       * Fired when the column order has changed. The data property of the
       * event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column that was moved.</li>
       *   <li>fromOverXPos: The old overall x position of the column.</li>
       *   <li>toOverXPos: The new overall x position of the column.</li>
       * </ul>
       */
      orderChanged: "qx.event.type.Data",
      /**
       * Fired when the cell renderer of a column has changed.
       * The data property of the event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column that was moved.</li>
       * </ul>
       */
      headerCellRendererChanged: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {Integer} the default width of a column in pixels. */
      DEFAULT_WIDTH: 100,
      /** @type {qx.ui.table.headerrenderer.Default} the default header cell renderer. */
      DEFAULT_HEADER_RENDERER: qx.ui.table.headerrenderer.Default,
      /** @type {qx.ui.table.cellrenderer.Default} the default data cell renderer. */
      DEFAULT_DATA_RENDERER: qx.ui.table.cellrenderer.Default,
      /** @type {qx.ui.table.celleditor.TextField} the default editor factory. */
      DEFAULT_EDITOR_FACTORY: qx.ui.table.celleditor.TextField
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __internalChange__P_207_2: null,
      __colToXPosMap__P_207_3: null,
      __visibleColumnArr__P_207_1: null,
      __overallColumnArr__P_207_0: null,
      __columnDataArr__P_207_4: null,
      __headerRenderer__P_207_5: null,
      __dataRenderer__P_207_6: null,
      __editorFactory__P_207_7: null,
      /**
       * Initializes the column model.
       *
       * @param colCount {Integer}
       *   The number of columns the model should have.
       *
       * @param table {qx.ui.table.Table}
       *   The table to which this column model is attached.
       */
      init: function init(colCount, table) {
        {
          this.assertInteger(colCount, "Invalid argument 'colCount'.");
        }
        this.__columnDataArr__P_207_4 = [];
        var width = qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
        var headerRenderer = this.__headerRenderer__P_207_5 || (this.__headerRenderer__P_207_5 = new qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER());
        var dataRenderer = this.__dataRenderer__P_207_6 || (this.__dataRenderer__P_207_6 = new qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER());
        var editorFactory = this.__editorFactory__P_207_7 || (this.__editorFactory__P_207_7 = new qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY());
        this.__overallColumnArr__P_207_0 = [];
        this.__visibleColumnArr__P_207_1 = [];

        // Get the initially hidden column array, if one was provided. Older
        // subclasses may not provide the 'table' argument, so we treat them
        // traditionally with no initially hidden columns.
        var initiallyHiddenColumns;

        // Was a table provided to us?
        if (table) {
          // Yup. Get its list of initially hidden columns, if the user provided
          // such a list.
          initiallyHiddenColumns = table.getInitiallyHiddenColumns();
        }

        // If no table was specified, or if the user didn't provide a list of
        // initially hidden columns, use an empty list.
        initiallyHiddenColumns = initiallyHiddenColumns || [];
        for (var col = 0; col < colCount; col++) {
          this.__columnDataArr__P_207_4[col] = {
            width: width,
            headerRenderer: headerRenderer,
            dataRenderer: dataRenderer,
            editorFactory: editorFactory
          };
          this.__overallColumnArr__P_207_0[col] = col;
          this.__visibleColumnArr__P_207_1[col] = col;
        }
        this.__colToXPosMap__P_207_3 = null;

        // If any columns are initially hidden, hide them now. Make it an
        // internal change so that events are not generated.
        this.__internalChange__P_207_2 = true;
        for (var hidden = 0; hidden < initiallyHiddenColumns.length; hidden++) {
          this.setColumnVisible(initiallyHiddenColumns[hidden], false);
        }
        this.__internalChange__P_207_2 = false;
        for (col = 0; col < colCount; col++) {
          var data = {
            col: col,
            visible: this.isColumnVisible(col)
          };
          this.fireDataEvent("visibilityChangedPre", data);
          this.fireDataEvent("visibilityChanged", data);
        }
      },
      /**
       * Return the array of visible columns
       *
       * @return {Array} List of all visible columns
       */
      getVisibleColumns: function getVisibleColumns() {
        return this.__visibleColumnArr__P_207_1 != null ? this.__visibleColumnArr__P_207_1 : [];
      },
      /**
       * Sets the width of a column.
       *
       * @param col {Integer}
       *   The model index of the column.
       *
       * @param width {Integer}
       *   The new width the column should get in pixels.
       *
       * @param isPointerAction {Boolean}
       *   <i>true</i> if the column width is being changed as a result of a
       *   pointer drag in the header; false or undefined otherwise.
       *
       */
      setColumnWidth: function setColumnWidth(col, width, isPointerAction) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInteger(width, "Invalid argument 'width'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        var oldWidth = this.__columnDataArr__P_207_4[col].width;
        if (oldWidth != width) {
          this.__columnDataArr__P_207_4[col].width = width;
          var data = {
            col: col,
            newWidth: width,
            oldWidth: oldWidth,
            isPointerAction: isPointerAction || false
          };
          this.fireDataEvent("widthChanged", data);
        }
      },
      /**
       * Returns the width of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the width of the column in pixels.
       */
      getColumnWidth: function getColumnWidth(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_207_4[col].width;
      },
      /**
       * Sets the header renderer of a column. Use setHeaderCellRenderers
       * instead of this method if you want to set the header renderer of many
       * columns.
       *
       * @param col {Integer} the model index of the column.
       * @param renderer {qx.ui.table.IHeaderRenderer} the new header renderer the column
       *      should get.
       */
      setHeaderCellRenderer: function setHeaderCellRenderer(col, renderer) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInterface(renderer, qx.ui.table.IHeaderRenderer, "Invalid argument 'renderer'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        var oldRenderer = this.__columnDataArr__P_207_4[col].headerRenderer;
        if (oldRenderer !== this.__headerRenderer__P_207_5) {
          oldRenderer.dispose();
        }
        this.__columnDataArr__P_207_4[col].headerRenderer = renderer;
        if (!this.__internalChange__P_207_2) {
          this.fireDataEvent("headerCellRendererChanged", {
            col: col
          });
        }
      },
      /**
       * Sets the header renderer of one or more columns. Use this method, in
       * favor of setHeaderCellRenderer, if you want to set the header renderer
       * of many columns. This method fires the "headerCellRendererChanged"
       * event only once, after setting all renderers, whereas
       * setHeaderCellRenderer fires it for each changed renderer which can be
       * slow with many columns.
       *
       * @param renderers {Map}
       *   Map, where the keys are column numbers and values are the renderers,
       *   implementing qx.ui.table.IHeaderRenderer, of the the new header
       *   renderers for that column
       */
      setHeaderCellRenderers: function setHeaderCellRenderers(renderers) {
        var col;

        // Prevent firing "headerCellRendererChanged" for each column. Instead,
        // we'll fire it once at the end.
        this.__internalChange__P_207_2 = true;

        // For each listed column...
        for (col in renderers) {
          // ... set that column's renderer
          this.setHeaderCellRenderer(+col, renderers[col]);
        }

        // Turn off the internal-change flag so operation returns to normal
        this.__internalChange__P_207_2 = false;

        // Now we can fire the event once. The data indicates which columns
        // changed. Internally to qooxdoo, nothing cares about the event data.
        this.fireDataEvent("headerCellRendererChanged", {
          cols: Object.keys(renderers)
        });
      },
      /**
       * Returns the header renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.IHeaderRenderer} the header renderer of the column.
       */
      getHeaderCellRenderer: function getHeaderCellRenderer(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_207_4[col].headerRenderer;
      },
      /**
       * Sets the data renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @param renderer {qx.ui.table.ICellRenderer} the new data renderer
       *   the column should get.
       * @return {qx.ui.table.ICellRenderer?null} If an old renderer was set and
       *   it was not the default renderer, the old renderer is returned for
       *   pooling or disposing.
       */
      setDataCellRenderer: function setDataCellRenderer(col, renderer) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInterface(renderer, qx.ui.table.ICellRenderer, "Invalid argument 'renderer'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        var oldRenderer = this.__columnDataArr__P_207_4[col].dataRenderer;
        this.__columnDataArr__P_207_4[col].dataRenderer = renderer;
        if (oldRenderer !== this.__dataRenderer__P_207_6) {
          return oldRenderer;
        }
        return null;
      },
      /**
       * Returns the data renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.ICellRenderer} the data renderer of the column.
       */
      getDataCellRenderer: function getDataCellRenderer(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_207_4[col].dataRenderer;
      },
      /**
       * Sets the cell editor factory of a column.
       *
       * @param col {Integer} the model index of the column.
       * @param factory {qx.ui.table.ICellEditorFactory} the new cell editor factory the column should get.
       */
      setCellEditorFactory: function setCellEditorFactory(col, factory) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertInterface(factory, qx.ui.table.ICellEditorFactory, "Invalid argument 'factory'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        var oldFactory = this.__columnDataArr__P_207_4[col].editorFactory;
        if (oldFactory === factory) {
          return;
        }
        if (oldFactory !== this.__editorFactory__P_207_7) {
          oldFactory.dispose();
        }
        this.__columnDataArr__P_207_4[col].editorFactory = factory;
      },
      /**
       * Returns the cell editor factory of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.ICellEditorFactory} the cell editor factory of the column.
       */
      getCellEditorFactory: function getCellEditorFactory(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertNotUndefined(this.__columnDataArr__P_207_4[col], "Column not found in table model");
        }
        return this.__columnDataArr__P_207_4[col].editorFactory;
      },
      /**
       * Returns the map that translates model indexes to x positions.
       *
       * The returned map contains for a model index (int) a map having two
       * properties: overX (the overall x position of the column, int) and
       * visX (the visible x position of the column, int). visX is missing for
       * hidden columns.
       *
       * @return {Map} the "column to x position" map.
       */
      _getColToXPosMap: function _getColToXPosMap() {
        if (this.__colToXPosMap__P_207_3 == null) {
          this.__colToXPosMap__P_207_3 = {};
          for (var overX = 0; overX < this.__overallColumnArr__P_207_0.length; overX++) {
            var col = this.__overallColumnArr__P_207_0[overX];
            this.__colToXPosMap__P_207_3[col] = {
              overX: overX
            };
          }
          for (var visX = 0; visX < this.__visibleColumnArr__P_207_1.length; visX++) {
            var col = this.__visibleColumnArr__P_207_1[visX];
            this.__colToXPosMap__P_207_3[col].visX = visX;
          }
        }
        return this.__colToXPosMap__P_207_3;
      },
      /**
       * Returns the number of visible columns.
       *
       * @return {Integer} the number of visible columns.
       */
      getVisibleColumnCount: function getVisibleColumnCount() {
        return this.__visibleColumnArr__P_207_1 != null ? this.__visibleColumnArr__P_207_1.length : 0;
      },
      /**
       * Returns the model index of a column at a certain visible x position.
       *
       * @param visXPos {Integer} the visible x position of the column.
       * @return {Integer} the model index of the column.
       */
      getVisibleColumnAtX: function getVisibleColumnAtX(visXPos) {
        {
          this.assertInteger(visXPos, "Invalid argument 'visXPos'.");
        }
        return this.__visibleColumnArr__P_207_1[visXPos];
      },
      /**
       * Returns the visible x position of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the visible x position of the column.
       */
      getVisibleX: function getVisibleX(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
        }
        return this._getColToXPosMap()[col].visX;
      },
      /**
       * Returns the overall number of columns (including hidden columns).
       *
       * @return {Integer} the overall number of columns.
       */
      getOverallColumnCount: function getOverallColumnCount() {
        return this.__overallColumnArr__P_207_0.length;
      },
      /**
       * Returns the model index of a column at a certain overall x position.
       *
       * @param overXPos {Integer} the overall x position of the column.
       * @return {Integer} the model index of the column.
       */
      getOverallColumnAtX: function getOverallColumnAtX(overXPos) {
        {
          this.assertInteger(overXPos, "Invalid argument 'overXPos'.");
        }
        return this.__overallColumnArr__P_207_0[overXPos];
      },
      /**
       * Returns the overall x position of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the overall x position of the column.
       */
      getOverallX: function getOverallX(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
        }
        return this._getColToXPosMap()[col].overX;
      },
      /**
       * Returns whether a certain column is visible.
       *
       * @param col {Integer} the model index of the column.
       * @return {Boolean} whether the column is visible.
       */
      isColumnVisible: function isColumnVisible(col) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
        }
        return this._getColToXPosMap()[col].visX != null;
      },
      /**
       * Sets whether a certain column is visible.
       *
       * @param col {Integer} the model index of the column.
       * @param visible {Boolean} whether the column should be visible.
       */
      setColumnVisible: function setColumnVisible(col, visible) {
        {
          this.assertInteger(col, "Invalid argument 'col'.");
          this.assertBoolean(visible, "Invalid argument 'visible'.");
        }
        if (visible != this.isColumnVisible(col)) {
          if (visible) {
            var colToXPosMap = this._getColToXPosMap();
            var overX = colToXPosMap[col].overX;
            if (overX == null) {
              throw new Error("Showing column failed: " + col + ". The column is not added to this TablePaneModel.");
            }

            // get the visX of the next visible column after the column to show
            var nextVisX;
            for (var x = overX + 1; x < this.__overallColumnArr__P_207_0.length; x++) {
              var currCol = this.__overallColumnArr__P_207_0[x];
              var currVisX = colToXPosMap[currCol].visX;
              if (currVisX != null) {
                nextVisX = currVisX;
                break;
              }
            }

            // If there comes no visible column any more, then show the column
            // at the end
            if (nextVisX == null) {
              nextVisX = this.__visibleColumnArr__P_207_1.length;
            }

            // Add the column to the visible columns
            this.__visibleColumnArr__P_207_1.splice(nextVisX, 0, col);
          } else {
            var visX = this.getVisibleX(col);
            this.__visibleColumnArr__P_207_1.splice(visX, 1);
          }

          // Invalidate the __colToXPosMap
          this.__colToXPosMap__P_207_3 = null;

          // Inform the listeners
          if (!this.__internalChange__P_207_2) {
            var data = {
              col: col,
              visible: visible
            };
            this.fireDataEvent("visibilityChangedPre", data);
            this.fireDataEvent("visibilityChanged", data);
          }
        }
      },
      /**
       * Moves a column.
       *
       * @param fromOverXPos {Integer} the overall x position of the column to move.
       * @param toOverXPos {Integer} the overall x position of where the column should be
       *      moved to.
       */
      moveColumn: function moveColumn(fromOverXPos, toOverXPos) {
        {
          this.assertInteger(fromOverXPos, "Invalid argument 'fromOverXPos'.");
          this.assertInteger(toOverXPos, "Invalid argument 'toOverXPos'.");
        }
        this.__internalChange__P_207_2 = true;
        var col = this.__overallColumnArr__P_207_0[fromOverXPos];
        var visible = this.isColumnVisible(col);
        if (visible) {
          this.setColumnVisible(col, false);
        }
        this.__overallColumnArr__P_207_0.splice(fromOverXPos, 1);
        this.__overallColumnArr__P_207_0.splice(toOverXPos, 0, col);

        // Invalidate the __colToXPosMap
        this.__colToXPosMap__P_207_3 = null;
        if (visible) {
          this.setColumnVisible(col, true);
        }
        this.__internalChange__P_207_2 = false;

        // Inform the listeners
        var data = {
          col: col,
          fromOverXPos: fromOverXPos,
          toOverXPos: toOverXPos
        };
        this.fireDataEvent("orderChanged", data);
      },
      /**
       * Reorders all columns to new overall positions. Will fire one "orderChanged" event
       * without data afterwards
       *
       * @param newPositions {Integer[]} Array mapping the index of a column in table model to its wanted overall
       *                            position on screen (both zero based). If the table models holds
       *                            col0, col1, col2 and col3 and you give [1,3,2,0], the new column order
       *                            will be col1, col3, col2, col0
       */
      setColumnsOrder: function setColumnsOrder(newPositions) {
        {
          this.assertArray(newPositions, "Invalid argument 'newPositions'.");
        }
        if (newPositions.length == this.__overallColumnArr__P_207_0.length) {
          this.__internalChange__P_207_2 = true;

          // Go through each column an switch visible ones to invisible. Reason is unknown,
          // this just mimicks the behaviour of moveColumn. Possibly useful because setting
          // a column visible later updates a map with its screen coords.
          var isVisible = new Array(newPositions.length);
          for (var colIdx = 0; colIdx < this.__overallColumnArr__P_207_0.length; colIdx++) {
            var visible = this.isColumnVisible(colIdx);
            isVisible[colIdx] = visible; //Remember, as this relies on this.__colToXPosMap which is cleared below
            if (visible) {
              this.setColumnVisible(colIdx, false);
            }
          }

          // Store new position values
          this.__overallColumnArr__P_207_0 = qx.lang.Array.clone(newPositions);

          // Invalidate the __colToXPosMap
          this.__colToXPosMap__P_207_3 = null;

          // Go through each column an switch invisible ones back to visible
          for (var colIdx = 0; colIdx < this.__overallColumnArr__P_207_0.length; colIdx++) {
            if (isVisible[colIdx]) {
              this.setColumnVisible(colIdx, true);
            }
          }
          this.__internalChange__P_207_2 = false;

          // Inform the listeners. Do not add data as all known listeners in qooxdoo
          // only take this event to mean "total repaint necesscary". Fabian will look
          // after deprecating the data part of the orderChanged - event
          this.fireDataEvent("orderChanged");
        } else {
          throw new Error("setColumnsOrder: Invalid number of column positions given, expected " + this.__overallColumnArr__P_207_0.length + ", got " + newPositions.length);
        }
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      for (var i = 0; i < this.__columnDataArr__P_207_4.length; i++) {
        this.__columnDataArr__P_207_4[i].headerRenderer.dispose();
        this.__columnDataArr__P_207_4[i].dataRenderer.dispose();
        this.__columnDataArr__P_207_4[i].editorFactory.dispose();
      }
      this.__overallColumnArr__P_207_0 = this.__visibleColumnArr__P_207_1 = this.__columnDataArr__P_207_4 = this.__colToXPosMap__P_207_3 = null;
      this._disposeObjects("__headerRenderer__P_207_5", "__dataRenderer__P_207_6", "__editorFactory__P_207_7");
    }
  });
  qx.ui.table.columnmodel.Basic.$$dbClassInfo = $$dbClassInfo;
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The table pane that shows a certain section from a table. This class handles
   * the display of the data part of a table and is therefore the base for virtual
   * scrolling.
   */
  qx.Class.define("qx.ui.table.pane.Pane", {
    extend: qx.ui.core.Widget,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param paneScroller {qx.ui.table.pane.Scroller} the TablePaneScroller the header belongs to.
     */
    construct: function construct(paneScroller) {
      qx.ui.core.Widget.constructor.call(this);
      this.__paneScroller__P_208_0 = paneScroller;
      this.__lastColCount__P_208_1 = 0;
      this.__lastRowCount__P_208_2 = 0;
      this.__rowCache__P_208_3 = [];
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Whether the current view port of the pane has not loaded data.
       * The data object of the event indicates if the table pane has to reload
       * data or not. Can be used to give the user feedback of the loading state
       * of the rows.
       */
      paneReloadsData: "qx.event.type.Data",
      /**
       * Whenever the content of the table pane has been updated (rendered)
       * trigger a paneUpdated event. This allows the canvas cellrenderer to act
       * once the new cells have been integrated in the dom.
       */
      paneUpdated: "qx.event.type.Event"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The index of the first row to show. */
      firstVisibleRow: {
        check: "Number",
        init: 0,
        apply: "_applyFirstVisibleRow"
      },
      /** The number of rows to show. */
      visibleRowCount: {
        check: "Number",
        init: 0,
        apply: "_applyVisibleRowCount"
      },
      /**
       * Maximum number of cached rows. If the value is <code>-1</code> the cache
       * size is unlimited
       */
      maxCacheLines: {
        check: "Number",
        init: 1000,
        apply: "_applyMaxCacheLines"
      },
      // overridden
      allowShrinkX: {
        refine: true,
        init: false
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __lastRowCount__P_208_2: null,
      __lastColCount__P_208_1: null,
      __paneScroller__P_208_0: null,
      __tableContainer__P_208_4: null,
      __focusedRow__P_208_5: null,
      __focusedCol__P_208_6: null,
      // sparse array to cache rendered rows
      __rowCache__P_208_3: null,
      __rowCacheCount__P_208_7: 0,
      // property modifier
      _applyFirstVisibleRow: function _applyFirstVisibleRow(value, old) {
        this.updateContent(false, value - old);
      },
      // property modifier
      _applyVisibleRowCount: function _applyVisibleRowCount(value, old) {
        this.updateContent(true);
      },
      // overridden
      _getContentHint: function _getContentHint() {
        // the preferred height is 400 pixel. We don't use rowCount * rowHeight
        // because this is typically too large.
        return {
          width: this.getPaneScroller().getTablePaneModel().getTotalWidth(),
          height: 400
        };
      },
      /**
       * Returns the TablePaneScroller this pane belongs to.
       *
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller.
       */
      getPaneScroller: function getPaneScroller() {
        return this.__paneScroller__P_208_0;
      },
      /**
       * Returns the table this pane belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__paneScroller__P_208_0.getTable();
      },
      /**
       * Sets the currently focused cell.
       *
       * @param col {Integer?null} the model index of the focused cell's column.
       * @param row {Integer?null} the model index of the focused cell's row.
       * @param massUpdate {Boolean ? false} Whether other updates are planned as well.
       *          If true, no repaint will be done.
       */
      setFocusedCell: function setFocusedCell(col, row, massUpdate) {
        if (col != this.__focusedCol__P_208_6 || row != this.__focusedRow__P_208_5) {
          var oldRow = this.__focusedRow__P_208_5;
          this.__focusedCol__P_208_6 = col;
          this.__focusedRow__P_208_5 = row;

          // Update the focused row background
          if (row != oldRow && !massUpdate) {
            if (oldRow !== null) {
              this.updateContent(false, null, oldRow, true);
            }
            if (row !== null) {
              this.updateContent(false, null, row, true);
            }
          }
        }
      },
      /**
       * Event handler. Called when the selection has changed.
       */
      onSelectionChanged: function onSelectionChanged() {
        this.updateContent(false, null, null, true);
      },
      /**
       * Event handler. Called when the table gets or looses the focus.
       */
      onFocusChanged: function onFocusChanged() {
        this.updateContent(false, null, null, true);
      },
      /**
       * Sets the column width.
       *
       * @param col {Integer} the column to change the width for.
       * @param width {Integer} the new width.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.updateContent(true);
      },
      /**
       * Event handler. Called the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this.updateContent(true);
      },
      /**
       * Event handler. Called when the pane model has changed.
       */
      onPaneModelChanged: function onPaneModelChanged() {
        this.updateContent(true);
      },
      /**
       * Event handler. Called when the table model data has changed.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       */
      onTableModelDataChanged: function onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn) {
        this.__rowCacheClear__P_208_8();
        var paneFirstRow = this.getFirstVisibleRow();
        var rowCount = this.getVisibleRowCount();
        if (lastRow == -1 || lastRow >= paneFirstRow && firstRow < paneFirstRow + rowCount) {
          // The change intersects this pane, check if a full or partial update is required
          if (firstRow === lastRow && this.getTable().getTableModel().getRowCount() > 1) {
            this.updateContent(false, null, firstRow, false);
          } else {
            this.updateContent();
          }
        }
      },
      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this.updateContent(true);
      },
      // property apply method
      _applyMaxCacheLines: function _applyMaxCacheLines(value, old) {
        if (this.__rowCacheCount__P_208_7 >= value && value !== -1) {
          this.__rowCacheClear__P_208_8();
        }
      },
      /**
       * Clear the row cache
       */
      __rowCacheClear__P_208_8: function __rowCacheClear__P_208_8() {
        this.__rowCache__P_208_3 = [];
        this.__rowCacheCount__P_208_7 = 0;
      },
      /**
       * Get a line from the row cache.
       *
       * @param row {Integer} Row index to get
       * @param selected {Boolean} Whether the row is currently selected
       * @param focused {Boolean} Whether the row is currently focused
       * @return {String|null} The cached row or null if a row with the given
       *     index is not cached.
       */
      __rowCacheGet__P_208_9: function __rowCacheGet__P_208_9(row, selected, focused) {
        if (!selected && !focused && this.__rowCache__P_208_3[row]) {
          return this.__rowCache__P_208_3[row];
        } else {
          return null;
        }
      },
      /**
       * Add a line to the row cache.
       *
       * @param row {Integer} Row index to set
       * @param rowString {String} computed row string to cache
       * @param selected {Boolean} Whether the row is currently selected
       * @param focused {Boolean} Whether the row is currently focused
       */
      __rowCacheSet__P_208_10: function __rowCacheSet__P_208_10(row, rowString, selected, focused) {
        var maxCacheLines = this.getMaxCacheLines();
        if (!selected && !focused && !this.__rowCache__P_208_3[row] && maxCacheLines > 0) {
          this._applyMaxCacheLines(maxCacheLines);
          this.__rowCache__P_208_3[row] = rowString;
          this.__rowCacheCount__P_208_7 += 1;
        }
      },
      /**
       * Updates the content of the pane.
       *
       * @param completeUpdate {Boolean ? false} if true a complete update is performed.
       *      On a complete update all cell widgets are recreated.
       * @param scrollOffset {Integer ? null} If set specifies how many rows to scroll.
       * @param onlyRow {Integer ? null} if set only the specified row will be updated.
       * @param onlySelectionOrFocusChanged {Boolean ? false} if true, cell values won't
       *          be updated. Only the row background will.
       */
      updateContent: function updateContent(completeUpdate, scrollOffset, onlyRow, onlySelectionOrFocusChanged) {
        if (completeUpdate) {
          this.__rowCacheClear__P_208_8();
        }
        if (scrollOffset && Math.abs(scrollOffset) <= Math.min(10, this.getVisibleRowCount())) {
          this._scrollContent(scrollOffset);
        } else if (onlySelectionOrFocusChanged && !this.getTable().getAlwaysUpdateCells()) {
          this._updateRowStyles(onlyRow);
        } else if (typeof onlyRow == "number" && onlyRow >= 0) {
          this._updateSingleRow(onlyRow);
        } else {
          this._updateAllRows();
        }
      },
      /**
       * If only focus or selection changes it is sufficient to only update the
       * row styles. This method updates the row styles of all visible rows or
       * of just one row.
       *
       * @param onlyRow {Integer|null ? null} If this parameter is set only the row
       *     with this index is updated.
       */
      _updateRowStyles: function _updateRowStyles(onlyRow) {
        var elem = this.getContentElement().getDomElement();
        if (!elem || !elem.firstChild) {
          this._updateAllRows();
          return;
        }
        var table = this.getTable();
        var selectionModel = table.getSelectionModel();
        var tableModel = table.getTableModel();
        var rowRenderer = table.getDataRowRenderer();
        var rowNodes = elem.firstChild.childNodes;
        var cellInfo = {
          table: table
        };

        // We don't want to execute the row loop below more than necessary. If
        // onlyRow is not null, we want to do the loop only for that row.
        // In that case, we start at (set the "row" variable to) that row, and
        // stop at (set the "end" variable to the offset of) the next row.
        var row = this.getFirstVisibleRow();
        var y = 0;

        // How many rows do we need to update?
        var end = rowNodes.length;
        if (onlyRow != null) {
          // How many rows are we skipping?
          var offset = onlyRow - row;
          if (offset >= 0 && offset < end) {
            row = onlyRow;
            y = offset;
            end = offset + 1;
          } else {
            return;
          }
        }
        for (; y < end; y++, row++) {
          cellInfo.row = row;
          cellInfo.selected = selectionModel.isSelectedIndex(row);
          cellInfo.focusedRow = this.__focusedRow__P_208_5 == row;
          cellInfo.rowData = tableModel.getRowData(row);
          rowRenderer.updateDataRowElement(cellInfo, rowNodes[y]);
        }
      },
      /**
       * Get the HTML table fragment for the given row range.
       *
       * @param firstRow {Integer} Index of the first row
       * @param rowCount {Integer} Number of rows
       * @return {String} The HTML table fragment for the given row range.
       */
      _getRowsHtml: function _getRowsHtml(firstRow, rowCount) {
        var table = this.getTable();
        var selectionModel = table.getSelectionModel();
        var tableModel = table.getTableModel();
        var columnModel = table.getTableColumnModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var rowRenderer = table.getDataRowRenderer();
        tableModel.prefetchRows(firstRow, firstRow + rowCount - 1);
        var rowHeight = table.getRowHeight();
        var colCount = paneModel.getColumnCount();
        var left = 0;
        var cols = [];

        // precompute column properties
        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);
          var cellWidth = columnModel.getColumnWidth(col);
          cols.push({
            col: col,
            xPos: x,
            editable: tableModel.isColumnEditable(col),
            focusedCol: this.__focusedCol__P_208_6 == col,
            styleLeft: left,
            styleWidth: cellWidth
          });
          left += cellWidth;
        }
        var rowsArr = [];
        var paneReloadsData = false;
        for (var row = firstRow; row < firstRow + rowCount; row++) {
          var selected = selectionModel.isSelectedIndex(row);
          var focusedRow = this.__focusedRow__P_208_5 == row;
          var cachedRow = this.__rowCacheGet__P_208_9(row, selected, focusedRow);
          if (cachedRow) {
            rowsArr.push(cachedRow);
            continue;
          }
          var rowHtml = [];
          var cellInfo = {
            table: table
          };
          cellInfo.styleHeight = rowHeight;
          cellInfo.row = row;
          cellInfo.selected = selected;
          cellInfo.focusedRow = focusedRow;
          cellInfo.rowData = tableModel.getRowData(row);
          if (!cellInfo.rowData) {
            paneReloadsData = true;
          }
          rowHtml.push("<div ");
          var rowAttributes = rowRenderer.getRowAttributes(cellInfo);
          if (rowAttributes) {
            rowHtml.push(rowAttributes);
          }
          var rowClass = rowRenderer.getRowClass(cellInfo);
          if (rowClass) {
            rowHtml.push('class="', rowClass, '" ');
          }
          var rowStyle = rowRenderer.createRowStyle(cellInfo);
          rowStyle += ";position:relative;" + rowRenderer.getRowHeightStyle(rowHeight) + "width:100%;";
          if (rowStyle) {
            rowHtml.push('style="', rowStyle, '" ');
          }
          rowHtml.push(">");
          var stopLoop = false;
          for (x = 0; x < colCount && !stopLoop; x++) {
            var col_def = cols[x];
            for (var attr in col_def) {
              cellInfo[attr] = col_def[attr];
            }
            var col = cellInfo.col;

            // Use the "getValue" method of the tableModel to get the cell's
            // value working directly on the "rowData" object
            // (-> cellInfo.rowData[col];) is not a solution because you can't
            // work with the columnIndex -> you have to use the columnId of the
            // columnIndex This is exactly what the method "getValue" does
            cellInfo.value = tableModel.getValue(col, row);
            var cellRenderer = columnModel.getDataCellRenderer(col);

            // Retrieve the current default cell style for this column.
            cellInfo.style = cellRenderer.getDefaultCellStyle();

            // Allow a cell renderer to tell us not to draw any further cells in
            // the row. Older, or traditional cell renderers don't return a
            // value, however, from createDataCellHtml, so assume those are
            // returning false.
            //
            // Tested with http://tinyurl.com/333hyhv
            stopLoop = cellRenderer.createDataCellHtml(cellInfo, rowHtml) || false;
          }
          rowHtml.push("</div>");
          var rowString = rowHtml.join("");
          this.__rowCacheSet__P_208_10(row, rowString, selected, focusedRow);
          rowsArr.push(rowString);
        }
        this.fireDataEvent("paneReloadsData", paneReloadsData);
        return rowsArr.join("");
      },
      /**
       * Scrolls the pane's contents by the given offset.
       *
       * @param rowOffset {Integer} Number of lines to scroll. Scrolling up is
       *     represented by a negative offset.
       */
      _scrollContent: function _scrollContent(rowOffset) {
        var el = this.getContentElement().getDomElement();
        if (!(el && el.firstChild)) {
          this._updateAllRows();
          return;
        }
        var tableBody = el.firstChild;
        var tableChildNodes = tableBody.childNodes;
        var rowCount = this.getVisibleRowCount();
        var firstRow = this.getFirstVisibleRow();
        var tabelModel = this.getTable().getTableModel();
        var modelRowCount = 0;
        modelRowCount = tabelModel.getRowCount();

        // don't handle this special case here
        if (firstRow + rowCount > modelRowCount) {
          this._updateAllRows();
          return;
        }

        // remove old lines
        var removeRowBase = rowOffset < 0 ? rowCount + rowOffset : 0;
        var addRowBase = rowOffset < 0 ? 0 : rowCount - rowOffset;
        for (var i = Math.abs(rowOffset) - 1; i >= 0; i--) {
          var rowElem = tableChildNodes[removeRowBase];
          try {
            tableBody.removeChild(rowElem);
          } catch (exp) {
            break;
          }
        }

        // render new lines
        if (!this.__tableContainer__P_208_4) {
          this.__tableContainer__P_208_4 = document.createElement("div");
        }
        var tableDummy = "<div>";
        tableDummy += this._getRowsHtml(firstRow + addRowBase, Math.abs(rowOffset));
        tableDummy += "</div>";
        this.__tableContainer__P_208_4.innerHTML = tableDummy;
        var newTableRows = this.__tableContainer__P_208_4.firstChild.childNodes;

        // append new lines
        if (rowOffset > 0) {
          for (var i = newTableRows.length - 1; i >= 0; i--) {
            var rowElem = newTableRows[0];
            tableBody.appendChild(rowElem);
          }
        } else {
          for (var i = newTableRows.length - 1; i >= 0; i--) {
            var rowElem = newTableRows[newTableRows.length - 1];
            tableBody.insertBefore(rowElem, tableBody.firstChild);
          }
        }

        // update focus indicator
        if (this.__focusedRow__P_208_5 !== null) {
          this._updateRowStyles(this.__focusedRow__P_208_5 - rowOffset);
          this._updateRowStyles(this.__focusedRow__P_208_5);
        }
        this.fireEvent("paneUpdated");
      },
      _updateSingleRow: function _updateSingleRow(row) {
        var elem = this.getContentElement().getDomElement();
        if (!elem || !elem.firstChild) {
          // pane has not yet been rendered, just exit
          return;
        }
        var visibleRowCount = this.getVisibleRowCount();
        var firstRow = this.getFirstVisibleRow();
        if (row < firstRow || row > firstRow + visibleRowCount) {
          // No need to redraw it
          return;
        }
        var modelRowCount = this.getTable().getTableModel().getRowCount();
        var tableBody = elem.firstChild;
        var tableChildNodes = tableBody.childNodes;
        var offset = row - firstRow;
        var rowElem = tableChildNodes[offset];

        // `row` can be too big if rows were deleted. In that case, we
        // can't update the current single row
        if (row >= modelRowCount || typeof rowElem == "undefined") {
          this._updateAllRows();
          return;
        }

        // render new lines
        if (!this.__tableContainer__P_208_4) {
          this.__tableContainer__P_208_4 = document.createElement("div");
        }
        this.__tableContainer__P_208_4.innerHTML = "<div>" + this._getRowsHtml(row, 1) + "</div>";
        var newTableRows = this.__tableContainer__P_208_4.firstChild.childNodes;
        tableBody.replaceChild(newTableRows[0], rowElem);

        // update focus indicator
        this._updateRowStyles(null);
        this.fireEvent("paneUpdated");
      },
      /**
       * Updates the content of the pane (implemented using array joins).
       */
      _updateAllRows: function _updateAllRows() {
        var elem = this.getContentElement().getDomElement();
        if (!elem) {
          // pane has not yet been rendered
          this.addListenerOnce("appear", this._updateAllRows, this);
          return;
        }
        var table = this.getTable();
        var tableModel = table.getTableModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var colCount = paneModel.getColumnCount();
        var rowHeight = table.getRowHeight();
        var firstRow = this.getFirstVisibleRow();
        var rowCount = this.getVisibleRowCount();
        var modelRowCount = tableModel.getRowCount();
        if (firstRow + rowCount > modelRowCount) {
          rowCount = Math.max(0, modelRowCount - firstRow);
        }
        var rowWidth = paneModel.getTotalWidth();
        var htmlArr;

        // If there are any rows...
        if (rowCount > 0) {
          // ... then create a div for them and add the rows to it.
          htmlArr = ["<div style='", "width: 100%;", table.getForceLineHeight() ? "line-height: " + rowHeight + "px;" : "", "overflow: hidden;", "'>", this._getRowsHtml(firstRow, rowCount), "</div>"];
        } else {
          // Otherwise, don't create the div, as even an empty div creates a
          // white row in IE.
          htmlArr = [];
        }
        var data = htmlArr.join("");
        elem.innerHTML = data;
        this.setWidth(rowWidth);
        this.__lastColCount__P_208_1 = colCount;
        this.__lastRowCount__P_208_2 = rowCount;
        this.fireEvent("paneUpdated");
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__tableContainer__P_208_4 = this.__paneScroller__P_208_0 = this.__rowCache__P_208_3 = null;
      this.removeListener("track", this._onTrack, this);
    }
  });
  qx.ui.table.pane.Pane.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
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
   * Shows the header of a table.
   */
  qx.Class.define("qx.ui.table.pane.Header", {
    extend: qx.ui.core.Widget,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param paneScroller {qx.ui.table.pane.Scroller} the TablePaneScroller the header belongs to.
     */
    construct: function construct(paneScroller) {
      qx.ui.core.Widget.constructor.call(this);
      this._setLayout(new qx.ui.layout.HBox());

      // add blocker
      this.__blocker__P_209_0 = new qx.ui.core.Blocker(this);
      this.__paneScroller__P_209_1 = paneScroller;

      // ARIA attrs
      this.getContentElement().setAttribute("role", "row");
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __paneScroller__P_209_1: null,
      __moveFeedback__P_209_2: null,
      __lastPointerOverColumn__P_209_3: null,
      __blocker__P_209_0: null,
      /**
       * Returns the TablePaneScroller this header belongs to.
       *
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller.
       */
      getPaneScroller: function getPaneScroller() {
        return this.__paneScroller__P_209_1;
      },
      /**
       * Returns the table this header belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__paneScroller__P_209_1.getTable();
      },
      /**
       * Returns the blocker of the header.
       *
       * @return {qx.ui.core.Blocker} the blocker.
       */
      getBlocker: function getBlocker() {
        return this.__blocker__P_209_0;
      },
      /**
       * Event handler. Called the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this._updateContent(true);
      },
      /**
       * Event handler. Called when the pane model has changed.
       */
      onPaneModelChanged: function onPaneModelChanged() {
        this._updateContent(true);
      },
      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this._updateContent();
      },
      /**
       * Sets the column width. This overrides the width from the column model.
       *
       * @param col {Integer}
       *   The column to change the width for.
       *
       * @param width {Integer}
       *   The new width.
       *
       * @param isPointerAction {Boolean}
       *   <i>true</i> if the column width is being changed as a result of a
       *   pointer drag in the header; false or undefined otherwise.
       *
       */
      setColumnWidth: function setColumnWidth(col, width, isPointerAction) {
        var child = this.getHeaderWidgetAtColumn(col);
        if (child != null) {
          child.setWidth(width);
        }
      },
      /**
       * Sets the column the pointer is currently over.
       *
       * @param col {Integer} the model index of the column the pointer is currently over or
       *      null if the pointer is over no column.
       */
      setPointerOverColumn: function setPointerOverColumn(col) {
        if (col != this.__lastPointerOverColumn__P_209_3) {
          if (this.__lastPointerOverColumn__P_209_3 != null) {
            var widget = this.getHeaderWidgetAtColumn(this.__lastPointerOverColumn__P_209_3);
            if (widget != null) {
              widget.removeState("hovered");
            }
          }
          if (col != null) {
            this.getHeaderWidgetAtColumn(col).addState("hovered");
          }
          this.__lastPointerOverColumn__P_209_3 = col;
        }
      },
      /**
       * Get the header widget for the given column
       *
       * @param col {Integer} The column number
       * @return {qx.ui.table.headerrenderer.HeaderCell} The header cell widget
       */
      getHeaderWidgetAtColumn: function getHeaderWidgetAtColumn(col) {
        var xPos = this.getPaneScroller().getTablePaneModel().getX(col);
        return this._getChildren()[xPos];
      },
      /**
       * Shows the feedback shown while a column is moved by the user.
       *
       * @param col {Integer} the model index of the column to show the move feedback for.
       * @param x {Integer} the x position the left side of the feedback should have
       *      (in pixels, relative to the left side of the header).
       */
      showColumnMoveFeedback: function showColumnMoveFeedback(col, x) {
        var pos = this.getContentLocation();
        if (this.__moveFeedback__P_209_2 == null) {
          var table = this.getTable();
          var xPos = this.getPaneScroller().getTablePaneModel().getX(col);
          var cellWidget = this._getChildren()[xPos];
          var tableModel = table.getTableModel();
          var columnModel = table.getTableColumnModel();
          var cellInfo = {
            xPos: xPos,
            col: col,
            name: tableModel.getColumnName(col),
            table: table
          };
          var cellRenderer = columnModel.getHeaderCellRenderer(col);
          var feedback = cellRenderer.createHeaderCell(cellInfo);
          var size = cellWidget.getBounds();

          // Configure the feedback
          feedback.setWidth(size.width);
          feedback.setHeight(size.height);
          feedback.setZIndex(1000000);
          feedback.setOpacity(0.8);
          feedback.setLayoutProperties({
            top: pos.top
          });
          this.getApplicationRoot().add(feedback);
          this.__moveFeedback__P_209_2 = feedback;
        }
        this.__moveFeedback__P_209_2.setLayoutProperties({
          left: pos.left + x
        });
        this.__moveFeedback__P_209_2.show();
      },
      /**
       * Hides the feedback shown while a column is moved by the user.
       */
      hideColumnMoveFeedback: function hideColumnMoveFeedback() {
        if (this.__moveFeedback__P_209_2 != null) {
          this.__moveFeedback__P_209_2.destroy();
          this.__moveFeedback__P_209_2 = null;
        }
      },
      /**
       * Returns whether the column move feedback is currently shown.
       *
       * @return {Boolean} <code>true</code> whether the column move feedback is
       *    currently shown, <code>false</code> otherwise.
       */
      isShowingColumnMoveFeedback: function isShowingColumnMoveFeedback() {
        return this.__moveFeedback__P_209_2 != null;
      },
      /**
       * Updates the content of the header.
       *
       * @param completeUpdate {Boolean} if true a complete update is performed. On a
       *      complete update all header widgets are recreated.
       */
      _updateContent: function _updateContent(completeUpdate) {
        var table = this.getTable();
        var tableModel = table.getTableModel();
        var columnModel = table.getTableColumnModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var children = this._getChildren();
        var colCount = paneModel.getColumnCount();
        var sortedColumn = tableModel.getSortColumnIndex();

        // Remove all widgets on the complete update
        if (completeUpdate) {
          this._cleanUpCells();
        }

        // Update the header
        var cellInfo = {};
        cellInfo.sortedAscending = tableModel.isSortAscending();
        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);
          if (col === undefined) {
            continue;
          }
          var colWidth = columnModel.getColumnWidth(col);
          var cellRenderer = columnModel.getHeaderCellRenderer(col);
          cellInfo.xPos = x;
          cellInfo.col = col;
          cellInfo.name = tableModel.getColumnName(col);
          cellInfo.editable = tableModel.isColumnEditable(col);
          cellInfo.sorted = col == sortedColumn;
          cellInfo.table = table;

          // Get the cached widget
          var cachedWidget = children[x];

          // Create or update the widget
          if (cachedWidget == null) {
            // We have no cached widget -> create it
            cachedWidget = cellRenderer.createHeaderCell(cellInfo);
            cachedWidget.set({
              width: colWidth
            });
            this._add(cachedWidget);
          } else {
            // This widget already created before -> recycle it
            cellRenderer.updateHeaderCell(cellInfo, cachedWidget);
          }

          // set the states
          if (x === 0) {
            cachedWidget.addState("first");
            cachedWidget.removeState("last");
          } else if (x === colCount - 1) {
            cachedWidget.removeState("first");
            cachedWidget.addState("last");
          } else {
            cachedWidget.removeState("first");
            cachedWidget.removeState("last");
          }
        }
      },
      /**
       * Cleans up all header cells.
       *
       */
      _cleanUpCells: function _cleanUpCells() {
        var children = this._getChildren();
        for (var x = children.length - 1; x >= 0; x--) {
          var cellWidget = children[x];
          cellWidget.destroy();
        }
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__blocker__P_209_0.dispose();
      this._disposeObjects("__paneScroller__P_209_1");
    }
  });
  qx.ui.table.pane.Header.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.element.Scroll": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Event": {
        "require": true
      }
    },
    "environment": {
      "provided": ["os.scrollBarOverlayed", "qx.mobile.nativescroll"],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "event.mspointer": {
          "className": "qx.bom.client.Event"
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  /**
   * This class is responsible for checking the scrolling behavior of the client.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Scroll", {
    statics: {
      /**
       * Check if the scrollbars should be positioned on top of the content. This
       * is true of OSX Lion when the scrollbars disappear automatically.
       *
       * @internal
       *
       * @return {Boolean} <code>true</code> if the scrollbars should be
       *   positioned on top of the content.
       */
      scrollBarOverlayed: function scrollBarOverlayed() {
        var scrollBarWidth = qx.bom.element.Scroll.getScrollbarWidth();
        var osx = qx.bom.client.OperatingSystem.getName() === "osx";
        var nativeScrollBars = false;
        return scrollBarWidth === 0 && osx && nativeScrollBars;
      },
      /**
       * Checks if native scroll can be used for the current mobile device.
       *
       * @internal
       *
       * @return {Boolean} <code>true</code> if the current device is capable to
       * use native scroll.
       */
      getNativeScroll: function getNativeScroll() {
        // iOS 8+
        if (qx.core.Environment.get("os.name") == "ios" && parseInt(qx.core.Environment.get("browser.version"), 10) > 7) {
          return true;
        }

        // Firefox
        if (qx.core.Environment.get("browser.name") == "firefox") {
          return true;
        }

        // Android 4.4+
        if (qx.core.Environment.get("os.name") == "android") {
          var osVersion = qx.core.Environment.get("os.version");
          var splitVersion = osVersion.split(".");
          if (splitVersion[0] > 4 || splitVersion.length > 1 && splitVersion[0] > 3 && splitVersion[1] > 3) {
            return true;
          }
        }

        // IE 10+
        if (qx.core.Environment.get("event.mspointer")) {
          return true;
        }
        return false;
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("os.scrollBarOverlayed", statics.scrollBarOverlayed);
      qx.core.Environment.add("qx.mobile.nativescroll", statics.getNativeScroll);
    }
  });
  qx.bom.client.Scroll.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.scroll.MScrollBarFactory": {
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.bom.client.Device": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.ui.table.pane.Model": {},
      "qx.ui.table.pane.FocusIndicator": {},
      "qx.ui.core.scroll.AbstractScrollArea": {},
      "qx.ui.table.pane.Clipper": {},
      "qx.ui.table.pane.CellEvent": {},
      "qx.lang.Number": {},
      "qx.ui.window.Window": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "device.type": {
          "construct": true,
          "className": "qx.bom.client.Device"
        },
        "os.scrollBarOverlayed": {
          "construct": true,
          "className": "qx.bom.client.Scroll"
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
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Shows a whole meta column. This includes a {@link Header},
   * a {@link Pane} and the needed scroll bars. This class handles the
   * virtual scrolling and does all the pointer event handling.
   *
   * @childControl header {qx.ui.table.pane.Header} header pane
   * @childControl pane {qx.ui.table.pane.Pane} table pane to show the data
   * @childControl focus-indicator {qx.ui.table.pane.FocusIndicator} shows the current focused cell
   * @childControl resize-line {qx.ui.core.Widget} resize line widget
   * @childControl scrollbar-x {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar}
   *               horizontal scrollbar widget (depends on the "qx.nativeScrollBars" setting which implementation is used)
   * @childControl scrollbar-y {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar}
   *               vertical scrollbar widget (depends on the "qx.nativeScrollBars" setting which implementation is used)
   */
  qx.Class.define("qx.ui.table.pane.Scroller", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.scroll.MScrollBarFactory],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param table {qx.ui.table.Table} the table the scroller belongs to.
     */
    construct: function construct(table) {
      qx.ui.core.Widget.constructor.call(this);
      this.__table__P_210_0 = table;

      // init layout
      var grid = new qx.ui.layout.Grid();
      grid.setColumnFlex(0, 1);
      grid.setRowFlex(1, 1);
      this._setLayout(grid);

      // init child controls
      this.__header__P_210_1 = this._showChildControl("header");
      this.__tablePane__P_210_2 = this._showChildControl("pane");

      // the top line containing the header clipper and the top right widget
      this.__top__P_210_3 = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
        minWidth: 0
      });
      this._add(this.__top__P_210_3, {
        row: 0,
        column: 0,
        colSpan: 2
      });

      // embed header into a scrollable container
      this._headerClipper = this._createHeaderClipper();
      this._headerClipper.add(this.__header__P_210_1);
      this._headerClipper.addListener("losecapture", this._onChangeCaptureHeader, this);
      this._headerClipper.addListener("pointermove", this._onPointermoveHeader, this);
      this._headerClipper.addListener("pointerdown", this._onPointerdownHeader, this);
      this._headerClipper.addListener("pointerup", this._onPointerupHeader, this);
      this._headerClipper.addListener("tap", this._onTapHeader, this);
      this.__top__P_210_3.add(this._headerClipper, {
        flex: 1
      });

      // embed pane into a scrollable container
      this._paneClipper = this._createPaneClipper();
      this._paneClipper.add(this.__tablePane__P_210_2);
      this._paneClipper.addListener("roll", this._onRoll, this);
      this._paneClipper.addListener("pointermove", this._onPointermovePane, this);
      this._paneClipper.addListener("pointerdown", this._onPointerdownPane, this);
      this._paneClipper.addListener("tap", this._onTapPane, this);
      this._paneClipper.addListener("contextmenu", this._onTapPane, this);
      this._paneClipper.addListener("contextmenu", this._onContextMenu, this);
      if (qx.core.Environment.get("device.type") === "desktop") {
        this._paneClipper.addListener("dblclick", this._onDbltapPane, this);
      } else {
        this._paneClipper.addListener("dbltap", this._onDbltapPane, this);
      }
      this._paneClipper.addListener("resize", this._onResizePane, this);

      // if we have overlayed scroll bars, we should use a separate container
      if (qx.core.Environment.get("os.scrollBarOverlayed")) {
        this.__clipperContainer__P_210_4 = new qx.ui.container.Composite();
        this.__clipperContainer__P_210_4.setLayout(new qx.ui.layout.Canvas());
        this.__clipperContainer__P_210_4.add(this._paneClipper, {
          edge: 0
        });
        this._add(this.__clipperContainer__P_210_4, {
          row: 1,
          column: 0
        });
      } else {
        this._add(this._paneClipper, {
          row: 1,
          column: 0
        });
      }

      // init scroll bars
      this.__horScrollBar__P_210_5 = this._showChildControl("scrollbar-x");
      this.__verScrollBar__P_210_6 = this._showChildControl("scrollbar-y");

      // init focus indicator
      this.__focusIndicator__P_210_7 = this.getChildControl("focus-indicator");
      // need to run the apply method at least once [BUG #4057]
      this.initShowCellFocusIndicator();

      // force creation of the resize line
      this.getChildControl("resize-line").hide();
      this.addListener("pointerout", this._onPointerout, this);
      this.addListener("appear", this._onAppear, this);
      this.addListener("disappear", this._onDisappear, this);
      this.__timer__P_210_8 = new qx.event.Timer();
      this.__timer__P_210_8.addListener("interval", this._oninterval, this);
      this.initScrollTimeout();
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {int} The minimum width a column could get in pixels. */
      MIN_COLUMN_WIDTH: 10,
      /** @type {int} The radius of the resize region in pixels. */
      RESIZE_REGION_RADIUS: 5,
      /**
       * (int) The number of pixels the pointer may move between pointer down and pointer up
       * in order to count as a tap.
       */
      TAP_TOLERANCE: 5,
      /**
       * (int) The mask for the horizontal scroll bar.
       * May be combined with {@link #VERTICAL_SCROLLBAR}.
       *
       * @see #getNeededScrollBars
       */
      HORIZONTAL_SCROLLBAR: 1,
      /**
       * (int) The mask for the vertical scroll bar.
       * May be combined with {@link #HORIZONTAL_SCROLLBAR}.
       *
       * @see #getNeededScrollBars
       */
      VERTICAL_SCROLLBAR: 2
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Dispatched if the pane is scrolled horizontally */
      changeScrollY: "qx.event.type.Data",
      /** Dispatched if the pane is scrolled vertically */
      changeScrollX: "qx.event.type.Data",
      /**See {@link qx.ui.table.Table#cellTap}.*/
      cellTap: "qx.ui.table.pane.CellEvent",
      /*** See {@link qx.ui.table.Table#cellDbltap}.*/
      cellDbltap: "qx.ui.table.pane.CellEvent",
      /**See {@link qx.ui.table.Table#cellContextmenu}.*/
      cellContextmenu: "qx.ui.table.pane.CellEvent",
      /** Dispatched when a sortable header was tapped */
      beforeSort: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Whether to show the horizontal scroll bar. This is a tri-state
       * value. `true` means show the scroll bar; `false` means exclude it; null
       * means hide it so it retains its space but doesn't show a scroll bar.
       */
      horizontalScrollBarVisible: {
        check: "Boolean",
        init: false,
        apply: "_applyHorizontalScrollBarVisible",
        event: "changeHorizontalScrollBarVisible",
        nullable: true
      },
      /** Whether to show the vertical scroll bar */
      verticalScrollBarVisible: {
        check: "Boolean",
        init: false,
        apply: "_applyVerticalScrollBarVisible",
        event: "changeVerticalScrollBarVisible"
      },
      /** The table pane model. */
      tablePaneModel: {
        check: "qx.ui.table.pane.Model",
        apply: "_applyTablePaneModel",
        event: "changeTablePaneModel"
      },
      /**
       * Whether column resize should be live. If false, during resize only a line is
       * shown and the real resize happens when the user releases the pointer button.
       */
      liveResize: {
        check: "Boolean",
        init: false
      },
      /**
       * Whether the focus should moved when the pointer is moved over a cell. If false
       * the focus is only moved on pointer taps.
       */
      focusCellOnPointerMove: {
        check: "Boolean",
        init: false
      },
      /**
       * Whether to handle selections via the selection manager before setting the
       * focus.  The traditional behavior is to handle selections after setting the
       * focus, but setting the focus means redrawing portions of the table, and
       * some subclasses may want to modify the data to be displayed based on the
       * selection.
       */
      selectBeforeFocus: {
        check: "Boolean",
        init: false
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
        init: true
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
        init: true
      },
      /**
       * Whether to reset the selection when the unpopulated table area is tapped.
       * The default is false which keeps the behaviour as before
       */
      resetSelectionOnTapBelowRows: {
        check: "Boolean",
        init: false
      },
      /**
       * Interval time (in milliseconds) for the table update timer.
       * Setting this to 0 clears the timer.
       */
      scrollTimeout: {
        check: "Integer",
        init: 100,
        apply: "_applyScrollTimeout"
      },
      appearance: {
        refine: true,
        init: "table-scroller"
      },
      /**
       * If set then defines the minimum height of the focus indicator when editing
       */
      minCellEditHeight: {
        check: "Integer",
        init: null,
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __lastRowCount__P_210_9: null,
      __table__P_210_0: null,
      __updateInterval__P_210_10: null,
      __updateContentPlanned__P_210_11: null,
      __onintervalWrapper__P_210_12: null,
      _moveColumn: null,
      __lastMoveColPos__P_210_13: null,
      _lastMoveTargetX: null,
      _lastMoveTargetScroller: null,
      __lastMovePointerPageX__P_210_14: null,
      __resizeColumn__P_210_15: null,
      __lastResizePointerPageX__P_210_16: null,
      __lastResizeWidth__P_210_17: null,
      __lastPointerDownCell__P_210_18: null,
      __firedTapEvent__P_210_19: false,
      __ignoreTap__P_210_20: null,
      __lastPointerPageX__P_210_21: null,
      __lastPointerPageY__P_210_22: null,
      __focusedCol__P_210_23: null,
      __focusedRow__P_210_24: null,
      _cellEditor: null,
      __cellEditorFactory__P_210_25: null,
      __topRightWidget__P_210_26: null,
      __horScrollBar__P_210_5: null,
      __verScrollBar__P_210_6: null,
      __header__P_210_1: null,
      _headerClipper: null,
      __tablePane__P_210_2: null,
      _paneClipper: null,
      __clipperContainer__P_210_4: null,
      __focusIndicator__P_210_7: null,
      __top__P_210_3: null,
      __timer__P_210_8: null,
      __focusIndicatorPointerDownListener__P_210_27: null,
      /**
       * The right inset of the pane. The right inset is the maximum of the
       * top right widget width and the scrollbar width (if visible).
       *
       * @return {Integer} The right inset of the pane
       */
      getPaneInsetRight: function getPaneInsetRight() {
        var topRight = this.getTopRightWidget();
        var topRightWidth = topRight && topRight.isVisible() && topRight.getBounds() ? topRight.getBounds().width + topRight.getMarginLeft() + topRight.getMarginRight() : 0;
        var scrollBar = this.__verScrollBar__P_210_6;
        var scrollBarWidth = this.getVerticalScrollBarVisible() ? this.getVerticalScrollBarWidth() + scrollBar.getMarginLeft() + scrollBar.getMarginRight() : 0;
        return Math.max(topRightWidth, scrollBarWidth);
      },
      /**
       * Set the pane's width
       *
       * @param width {Integer} The pane's width
       */
      setPaneWidth: function setPaneWidth(width) {
        if (this.isVerticalScrollBarVisible()) {
          width += this.getPaneInsetRight();
        }
        this.setWidth(width);
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "header":
            control = this.getTable().getNewTablePaneHeader()(this);
            break;
          case "pane":
            control = this.getTable().getNewTablePane()(this);
            break;
          case "focus-indicator":
            control = new qx.ui.table.pane.FocusIndicator(this);
            control.setUserBounds(0, 0, 0, 0);
            control.setZIndex(1000);
            control.addListener("pointerup", this._onPointerupFocusIndicator, this);
            this._paneClipper.add(control);
            control.show(); // must be active for editor to operate
            control.setDecorator(null); // it can be initially invisible, though.
            break;
          case "resize-line":
            control = new qx.ui.core.Widget();
            control.setUserBounds(0, 0, 0, 0);
            control.setZIndex(1000);
            this._paneClipper.add(control);
            break;
          case "scrollbar-x":
            control = this._createScrollBar("horizontal").set({
              alignY: "bottom"
            });
            control.addListener("scroll", this._onScrollX, this);
            if (this.__clipperContainer__P_210_4 != null) {
              control.setMinHeight(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);
              this.__clipperContainer__P_210_4.add(control, {
                bottom: 0,
                right: 0,
                left: 0
              });
            } else {
              this._add(control, {
                row: 2,
                column: 0
              });
            }
            break;
          case "scrollbar-y":
            control = this._createScrollBar("vertical");
            control.addListener("scroll", this._onScrollY, this);
            if (this.__clipperContainer__P_210_4 != null) {
              this.__clipperContainer__P_210_4.add(control, {
                right: 0,
                bottom: 0,
                top: 0
              });
            } else {
              this._add(control, {
                row: 1,
                column: 1
              });
            }
            break;
        }
        return control || qx.ui.table.pane.Scroller.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // property modifier
      _applyHorizontalScrollBarVisible: function _applyHorizontalScrollBarVisible(value, old) {
        if (value === null) {
          this.__horScrollBar__P_210_5.setVisibility("hidden");
        } else {
          this.__horScrollBar__P_210_5.setVisibility(value ? "visible" : "excluded");
        }
      },
      // property modifier
      _applyVerticalScrollBarVisible: function _applyVerticalScrollBarVisible(value, old) {
        this.__verScrollBar__P_210_6.setVisibility(value ? "visible" : "excluded");
      },
      // property modifier
      _applyTablePaneModel: function _applyTablePaneModel(value, old) {
        if (old != null) {
          old.removeListener("modelChanged", this._onPaneModelChanged, this);
        }
        value.addListener("modelChanged", this._onPaneModelChanged, this);
      },
      // property modifier
      _applyShowCellFocusIndicator: function _applyShowCellFocusIndicator(value, old) {
        if (value) {
          this.__focusIndicator__P_210_7.setDecorator("table-scroller-focus-indicator");
          this._updateFocusIndicator();
        } else {
          if (this.__focusIndicator__P_210_7) {
            this.__focusIndicator__P_210_7.setDecorator(null);
          }
        }
      },
      /**
       * Get the current position of the vertical scroll bar.
       *
       * @return {Integer} The current scroll position.
       */
      getScrollY: function getScrollY() {
        return this.__verScrollBar__P_210_6.getPosition();
      },
      /**
       * Set the current position of the vertical scroll bar.
       *
       * @param scrollY {Integer} The new scroll position.
       * @param renderSync {Boolean?false} Whether the table update should be
       *     performed synchronously.
       */
      setScrollY: function setScrollY(scrollY, renderSync) {
        this.__verScrollBar__P_210_6.scrollTo(scrollY);
        if (renderSync) {
          this._updateContent();
        }
      },
      /**
       * Get the current position of the vertical scroll bar.
       *
       * @return {Integer} The current scroll position.
       */
      getScrollX: function getScrollX() {
        return this.__horScrollBar__P_210_5.getPosition();
      },
      /**
       * Set the current position of the vertical scroll bar.
       *
       * @param scrollX {Integer} The new scroll position.
       */
      setScrollX: function setScrollX(scrollX) {
        this.__horScrollBar__P_210_5.scrollTo(scrollX);
      },
      /**
       * Returns the table this scroller belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__table__P_210_0;
      },
      /**
       * Creates and returns an instance of pane clipper.
       *
       * @return {qx.ui.table.pane.Clipper} pane clipper.
       */
      _createPaneClipper: function _createPaneClipper() {
        return new qx.ui.table.pane.Clipper();
      },
      /**
       * Creates and returns an instance of header clipper.
       *
       * @return {qx.ui.table.pane.Clipper} pane clipper.
       */
      _createHeaderClipper: function _createHeaderClipper() {
        return new qx.ui.table.pane.Clipper();
      },
      /**
       * Event handler. Called when the visibility of a column has changed.
       */
      onColVisibilityChanged: function onColVisibilityChanged() {
        this.updateHorScrollBarMaximum();
        this._updateFocusIndicator();
      },
      /**
       * Sets the column width.
       *
       * @param col {Integer} the column to change the width for.
       * @param width {Integer} the new width.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.__header__P_210_1.setColumnWidth(col, width);
        this.__tablePane__P_210_2.setColumnWidth(col, width);
        var paneModel = this.getTablePaneModel();
        var x = paneModel.getX(col);
        if (x != -1) {
          // The change was in this scroller
          this.updateHorScrollBarMaximum();
          this._updateFocusIndicator();
        }
      },
      /**
       * Event handler. Called when the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this.__header__P_210_1.onColOrderChanged();
        this.__tablePane__P_210_2.onColOrderChanged();
        this.updateHorScrollBarMaximum();
      },
      /**
       * Event handler. Called when the table model has changed.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       */
      onTableModelDataChanged: function onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn) {
        this.__tablePane__P_210_2.onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn);
        var rowCount = this.getTable().getTableModel().getRowCount();
        if (rowCount != this.__lastRowCount__P_210_9) {
          this.updateVerScrollBarMaximum();
          var focusedRow = this.getFocusedRow();
          if (focusedRow !== null && focusedRow >= rowCount) {
            if (rowCount == 0) {
              this.setFocusedCell(null, null);
            } else {
              this.setFocusedCell(this.getFocusedColumn(), rowCount - 1);
            }
          }
          this.__lastRowCount__P_210_9 = rowCount;
        }
      },
      /**
       * Event handler. Called when the selection has changed.
       */
      onSelectionChanged: function onSelectionChanged() {
        this.__tablePane__P_210_2.onSelectionChanged();
      },
      /**
       * Event handler. Called when the table gets or looses the focus.
       */
      onFocusChanged: function onFocusChanged() {
        this.__tablePane__P_210_2.onFocusChanged();
      },
      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this.__header__P_210_1.onTableModelMetaDataChanged();
        this.__tablePane__P_210_2.onTableModelMetaDataChanged();
      },
      /**
       * Event handler. Called when the pane model has changed.
       */
      _onPaneModelChanged: function _onPaneModelChanged() {
        this.__header__P_210_1.onPaneModelChanged();
        this.__tablePane__P_210_2.onPaneModelChanged();
      },
      /**
       * Event listener for the pane clipper's resize event
       */
      _onResizePane: function _onResizePane() {
        this.updateHorScrollBarMaximum();
        this.updateVerScrollBarMaximum();

        // The height has changed -> Update content
        this._updateContent();
        this.__header__P_210_1._updateContent();
        this.__table__P_210_0._updateScrollBarVisibility();
      },
      /**
       * Updates the maximum of the horizontal scroll bar, so it corresponds to the
       * total width of the columns in the table pane.
       */
      updateHorScrollBarMaximum: function updateHorScrollBarMaximum() {
        var paneSize = this._paneClipper.getInnerSize();
        if (!paneSize) {
          // will be called on the next resize event again
          return;
        }
        var scrollSize = this.getTablePaneModel().getTotalWidth();
        var scrollBar = this.__horScrollBar__P_210_5;
        if (paneSize.width < scrollSize) {
          var max = Math.max(0, scrollSize - paneSize.width);
          scrollBar.setMaximum(max);
          scrollBar.setKnobFactor(paneSize.width / scrollSize);
          var pos = scrollBar.getPosition();
          scrollBar.setPosition(Math.min(pos, max));
        } else {
          scrollBar.setMaximum(0);
          scrollBar.setKnobFactor(1);
          scrollBar.setPosition(0);
        }
      },
      /**
       * Updates the maximum of the vertical scroll bar, so it corresponds to the
       * number of rows in the table.
       */
      updateVerScrollBarMaximum: function updateVerScrollBarMaximum() {
        var paneSize = this._paneClipper.getInnerSize();
        if (!paneSize) {
          // will be called on the next resize event again
          return;
        }
        var tableModel = this.getTable().getTableModel();
        var rowCount = tableModel.getRowCount();
        if (this.getTable().getKeepFirstVisibleRowComplete()) {
          rowCount += 1;
        }
        var rowHeight = this.getTable().getRowHeight();
        var scrollSize = rowCount * rowHeight;
        var scrollBar = this.__verScrollBar__P_210_6;
        if (paneSize.height < scrollSize) {
          var max = Math.max(0, scrollSize - paneSize.height);
          scrollBar.setMaximum(max);
          scrollBar.setKnobFactor(paneSize.height / scrollSize);
          var pos = scrollBar.getPosition();
          scrollBar.setPosition(Math.min(pos, max));
        } else {
          scrollBar.setMaximum(0);
          scrollBar.setKnobFactor(1);
          scrollBar.setPosition(0);
        }
      },
      /**
       * Event handler. Called when the table property "keepFirstVisibleRowComplete"
       * changed.
       */
      onKeepFirstVisibleRowCompleteChanged: function onKeepFirstVisibleRowCompleteChanged() {
        this.updateVerScrollBarMaximum();
        this._updateContent();
      },
      /**
       * Event handler for the scroller's appear event
       */
      _onAppear: function _onAppear() {
        // after the Scroller appears we start the interval again
        this._startInterval(this.getScrollTimeout());
      },
      /**
       * Event handler for the disappear event
       */
      _onDisappear: function _onDisappear() {
        // before the scroller disappears we need to stop it
        this._stopInterval();
      },
      /**
       * Event handler. Called when the horizontal scroll bar moved.
       *
       * @param e {Map} the event.
       */
      _onScrollX: function _onScrollX(e) {
        var scrollLeft = e.getData();
        this.fireDataEvent("changeScrollX", scrollLeft, e.getOldData());
        this._headerClipper.scrollToX(scrollLeft);
        this._paneClipper.scrollToX(scrollLeft);
      },
      /**
       * Event handler. Called when the vertical scroll bar moved.
       *
       * @param e {Map} the event.
       */
      __inOnScrollY__P_210_28: false,
      _onScrollY: function _onScrollY(e) {
        if (this.__inOnScrollY__P_210_28) {
          return;
        }
        var scrollbar = this.__verScrollBar__P_210_6;
        this.__inOnScrollY__P_210_28 = true;
        // calculate delta so that one row is scrolled at an minimum
        var rowHeight = this.getTable().getRowHeight();
        var delta = e.getData() - e.getOldData();
        if (Math.abs(delta) > 1 && Math.abs(delta) < rowHeight) {
          delta = delta < 0 ? e.getOldData() - rowHeight : e.getOldData() + rowHeight;
          if (delta >= 0 && delta <= scrollbar.getMaximum()) {
            scrollbar.setPosition(delta);
          }
        }
        this.__inOnScrollY__P_210_28 = false;
        this.fireDataEvent("changeScrollY", scrollbar.getPosition(), e.getOldData());
        this._postponedUpdateContent();
      },
      /**
       * Event handler. Called when the user moved the mouse wheel.
       *
       * @param e {qx.event.type.Roll} the event.
       */
      _onRoll: function _onRoll(e) {
        var table = this.getTable();
        if (e.getPointerType() == "mouse" || !table.getEnabled()) {
          return;
        }

        // vertical scrolling
        var delta = e.getDelta();
        // normalize that at least one step is scrolled at a time
        if (delta.y > 0 && delta.y < 1) {
          delta.y = 1;
        } else if (delta.y < 0 && delta.y > -1) {
          delta.y = -1;
        }
        this.__verScrollBar__P_210_6.scrollBy(parseInt(delta.y, 10));
        var scrolled = delta.y != 0 && !this.__isAtEdge__P_210_29(this.__verScrollBar__P_210_6, delta.y);

        // horizontal scrolling
        // normalize that at least one step is scrolled at a time
        if (delta.x > 0 && delta.x < 1) {
          delta.x = 1;
        } else if (delta.x < 0 && delta.x > -1) {
          delta.x = -1;
        }
        this.__horScrollBar__P_210_5.scrollBy(parseInt(delta.x, 10));

        // Update the focus
        if (this.__lastPointerPageX__P_210_21 && this.getFocusCellOnPointerMove()) {
          this._focusCellAtPagePos(this.__lastPointerPageX__P_210_21, this.__lastPointerPageY__P_210_22);
        }
        scrolled = scrolled || delta.x != 0 && !this.__isAtEdge__P_210_29(this.__horScrollBar__P_210_5, delta.x);

        // pass the event to the parent if the scrollbar is at an edge
        if (scrolled) {
          e.stop();
        } else {
          e.stopMomentum();
        }
      },
      /**
       * Checks if the table has been scrolled.
       * @param scrollBar {qx.ui.core.scroll.IScrollBar} The scrollbar to check
       * @param delta {Number} The scroll delta.
       * @return {Boolean} <code>true</code>, if the scrolling is a the edge
       */
      __isAtEdge__P_210_29: function __isAtEdge__P_210_29(scrollBar, delta) {
        var position = scrollBar.getPosition();
        return delta < 0 && position <= 0 || delta > 0 && position >= scrollBar.getMaximum();
      },
      /**
       * Common column resize logic.
       *
       * @param pageX {Integer} the current pointer x position.
       */
      __handleResizeColumn__P_210_30: function __handleResizeColumn__P_210_30(pageX) {
        var table = this.getTable();
        // We are currently resizing -> Update the position
        var headerCell = this.__header__P_210_1.getHeaderWidgetAtColumn(this.__resizeColumn__P_210_15);
        var minColumnWidth = headerCell.getSizeHint().minWidth;
        var newWidth = Math.max(minColumnWidth, this.__lastResizeWidth__P_210_17 + pageX - this.__lastResizePointerPageX__P_210_16);
        if (this.getLiveResize()) {
          var columnModel = table.getTableColumnModel();
          columnModel.setColumnWidth(this.__resizeColumn__P_210_15, newWidth, true);
        } else {
          var paneModel = this.getTablePaneModel();
          this._showResizeLine(paneModel.getColumnLeft(this.__resizeColumn__P_210_15) + newWidth);
        }
        this.__lastResizePointerPageX__P_210_16 += newWidth - this.__lastResizeWidth__P_210_17;
        this.__lastResizeWidth__P_210_17 = newWidth;
      },
      /**
       * Common column move logic.
       *
       * @param pageX {Integer} the current pointer x position.
       *
       */
      __handleMoveColumn__P_210_31: function __handleMoveColumn__P_210_31(pageX) {
        // We are moving a column

        // Check whether we moved outside the tap tolerance so we can start
        // showing the column move feedback
        // (showing the column move feedback prevents the ontap event)
        var tapTolerance = qx.ui.table.pane.Scroller.TAP_TOLERANCE;
        if (this.__header__P_210_1.isShowingColumnMoveFeedback() || pageX > this.__lastMovePointerPageX__P_210_14 + tapTolerance || pageX < this.__lastMovePointerPageX__P_210_14 - tapTolerance) {
          this.__lastMoveColPos__P_210_13 += pageX - this.__lastMovePointerPageX__P_210_14;
          this.__header__P_210_1.showColumnMoveFeedback(this._moveColumn, this.__lastMoveColPos__P_210_13);

          // Get the responsible scroller
          var targetScroller = this.__table__P_210_0.getTablePaneScrollerAtPageX(pageX);
          if (this._lastMoveTargetScroller && this._lastMoveTargetScroller != targetScroller) {
            this._lastMoveTargetScroller.hideColumnMoveFeedback();
          }
          if (targetScroller != null) {
            this._lastMoveTargetX = targetScroller.showColumnMoveFeedback(pageX);
          } else {
            this._lastMoveTargetX = null;
          }
          this._lastMoveTargetScroller = targetScroller;
          this.__lastMovePointerPageX__P_210_14 = pageX;
        }
      },
      /**
       * Event handler. Called when the user moved the pointer over the header.
       *
       * @param e {Map} the event.
       */
      _onPointermoveHeader: function _onPointermoveHeader(e) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }
        var useResizeCursor = false;
        var pointerOverColumn = null;
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();

        // Workaround: In onmousewheel the event has wrong coordinates for pageX
        //       and pageY. So we remember the last move event.
        this.__lastPointerPageX__P_210_21 = pageX;
        this.__lastPointerPageY__P_210_22 = pageY;
        if (this.__resizeColumn__P_210_15 != null) {
          // We are currently resizing -> Update the position
          this.__handleResizeColumn__P_210_30(pageX);
          useResizeCursor = true;
          e.stopPropagation();
        } else if (this._moveColumn != null) {
          // We are moving a column
          this.__handleMoveColumn__P_210_31(pageX);
          e.stopPropagation();
        } else {
          var resizeCol = this._getResizeColumnForPageX(pageX);
          if (resizeCol != -1) {
            // The pointer is over a resize region -> Show the right cursor
            useResizeCursor = true;
          } else {
            var tableModel = table.getTableModel();
            var col = this._getColumnForPageX(pageX);
            if (col != null && tableModel.isColumnSortable(col)) {
              pointerOverColumn = col;
            }
          }
        }
        var cursor = useResizeCursor ? "col-resize" : null;
        this.getApplicationRoot().setGlobalCursor(cursor);
        this.setCursor(cursor);
        this.__header__P_210_1.setPointerOverColumn(pointerOverColumn);
      },
      /**
       * Event handler. Called when the user moved the pointer over the pane.
       *
       * @param e {Map} the event.
       */
      _onPointermovePane: function _onPointermovePane(e) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }

        //var useResizeCursor = false;

        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();

        // Workaround: In onpointerwheel the event has wrong coordinates for pageX
        //       and pageY. So we remember the last move event.
        this.__lastPointerPageX__P_210_21 = pageX;
        this.__lastPointerPageY__P_210_22 = pageY;
        var useResizeCursor = false;
        var resizeCol = this._getResizeColumnForPageX(pageX);
        if (resizeCol != -1) {
          // The pointer is over a resize region -> Show the right cursor
          useResizeCursor = true;
        }
        var cursor = useResizeCursor ? "col-resize" : null;
        this.getApplicationRoot().setGlobalCursor(cursor);
        this.setCursor(cursor);
        var row = this._getRowForPagePos(pageX, pageY);
        if (row != null && this._getColumnForPageX(pageX) != null) {
          // The pointer is over the data -> update the focus
          if (this.getFocusCellOnPointerMove()) {
            this._focusCellAtPagePos(pageX, pageY);
          }
        }
        this.__header__P_210_1.setPointerOverColumn(null);
      },
      /**
       * Event handler. Called when the user pressed a pointer button over the header.
       *
       * @param e {Map} the event.
       */
      _onPointerdownHeader: function _onPointerdownHeader(e) {
        if (!this.getTable().getEnabled()) {
          return;
        }
        var pageX = e.getDocumentLeft();

        // pointer is in header
        var resizeCol = this._getResizeColumnForPageX(pageX);
        if (resizeCol != -1) {
          // The pointer is over a resize region -> Start resizing
          this._startResizeHeader(resizeCol, pageX);
          e.stop();
        } else {
          // The pointer is not in a resize region
          var moveCol = this._getColumnForPageX(pageX);
          if (moveCol != null) {
            this._startMoveHeader(moveCol, pageX);
            e.stop();
          }
        }
      },
      /**
       * Start a resize session of the header.
       *
       * @param resizeCol {Integer} the column index
       * @param pageX {Integer} x coordinate of the pointer event
       */
      _startResizeHeader: function _startResizeHeader(resizeCol, pageX) {
        var columnModel = this.getTable().getTableColumnModel();

        // The pointer is over a resize region -> Start resizing
        this.__resizeColumn__P_210_15 = resizeCol;
        this.__lastResizePointerPageX__P_210_16 = pageX;
        this.__lastResizeWidth__P_210_17 = columnModel.getColumnWidth(this.__resizeColumn__P_210_15);
        this._headerClipper.capture();
      },
      /**
       * Start a move session of the header.
       *
       * @param moveCol {Integer} the column index
       * @param pageX {Integer} x coordinate of the pointer event
       */
      _startMoveHeader: function _startMoveHeader(moveCol, pageX) {
        // Prepare column moving
        this._moveColumn = moveCol;
        this.__lastMovePointerPageX__P_210_14 = pageX;
        this.__lastMoveColPos__P_210_13 = this.getTablePaneModel().getColumnLeft(moveCol);
        this._headerClipper.capture();
      },
      /**
       * Event handler. Called when the user pressed a pointer button over the pane.
       *
       * @param e {Map} the event.
       */
      _onPointerdownPane: function _onPointerdownPane(e) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }
        if (table.isEditing()) {
          table.stopEditing();
        }
        var pageX = e.getDocumentLeft();

        // pointer is in header
        var resizeCol = this._getResizeColumnForPageX(pageX);
        if (resizeCol != -1) {
          // The pointer is over a resize region -> Start resizing
          this._startResizeHeader(resizeCol, pageX);
          e.stop();
          return;
        }
        var pageY = e.getDocumentTop();
        var row = this._getRowForPagePos(pageX, pageY);
        var col = this._getColumnForPageX(pageX);
        if (row !== null) {
          // The focus indicator blocks the tap event on the scroller so we
          // store the current cell and listen for the pointerup event on the
          // focus indicator
          //
          // INVARIANT:
          //  The members of this object always contain the last position of
          //  the cell on which the pointerdown event occurred.
          //  *** These values are never cleared! ***.
          //  Different browsers/OS combinations issue events in different
          //  orders, and the context menu event, in particular, can be issued
          //  early or late (Firefox on Linux issues it early; Firefox on
          //  Windows issues it late) so no one may clear these values.
          //
          this.__lastPointerDownCell__P_210_18 = {
            row: row,
            col: col
          };

          // On the other hand, we need to know if we've issued the tap event
          // so we don't issue it twice, both from pointer-up on the focus
          // indicator, and from the tap even on the pane. Both possibilities
          // are necessary, however, to maintain the qooxdoo order of events.
          this.__firedTapEvent__P_210_19 = false;
        }
      },
      /**
       * Event handler for the focus indicator's pointerup event
       *
       * @param e {qx.event.type.Pointer} The pointer event
       */
      _onPointerupFocusIndicator: function _onPointerupFocusIndicator(e) {
        if (this.__lastPointerDownCell__P_210_18 && !this.__firedTapEvent__P_210_19 && !this.isEditing() && this.__focusIndicator__P_210_7.getRow() == this.__lastPointerDownCell__P_210_18.row && this.__focusIndicator__P_210_7.getColumn() == this.__lastPointerDownCell__P_210_18.col) {
          this.fireEvent("cellTap", qx.ui.table.pane.CellEvent, [this, e, this.__lastPointerDownCell__P_210_18.row, this.__lastPointerDownCell__P_210_18.col], true);
          this.__firedTapEvent__P_210_19 = true;
        } else if (!this.isEditing()) {
          // if no cellTap event should be fired, act like a pointerdown which
          // invokes the change of the selection e.g. [BUG #1632]
          this._onPointerdownPane(e);
        }
      },
      /**
       * Event handler. Called when the event capturing of the header changed.
       * Stops/finishes an active header resize/move session if it lost capturing
       * during the session to stay in a stable state.
       *
       * @param e {qx.event.type.Data} The data event
       */
      _onChangeCaptureHeader: function _onChangeCaptureHeader(e) {
        if (this.__resizeColumn__P_210_15 != null) {
          this._stopResizeHeader();
        }
        if (this._moveColumn != null) {
          this._stopMoveHeader();
        }
      },
      /**
       * Stop a resize session of the header.
       *
       */
      _stopResizeHeader: function _stopResizeHeader() {
        var columnModel = this.getTable().getTableColumnModel();

        // We are currently resizing -> Finish resizing
        if (!this.getLiveResize()) {
          this._hideResizeLine();
          columnModel.setColumnWidth(this.__resizeColumn__P_210_15, this.__lastResizeWidth__P_210_17, true);
        }
        this.__resizeColumn__P_210_15 = null;
        this._headerClipper.releaseCapture();
        this.getApplicationRoot().setGlobalCursor(null);
        this.setCursor(null);
      },
      /**
       * Stop a move session of the header.
       *
       */
      _stopMoveHeader: function _stopMoveHeader() {
        var columnModel = this.getTable().getTableColumnModel();
        var paneModel = this.getTablePaneModel();

        // We are moving a column -> Drop the column
        this.__header__P_210_1.hideColumnMoveFeedback();
        if (this._lastMoveTargetScroller) {
          this._lastMoveTargetScroller.hideColumnMoveFeedback();
        }
        if (this._lastMoveTargetX != null) {
          var fromVisXPos = paneModel.getFirstColumnX() + paneModel.getX(this._moveColumn);
          var toVisXPos = this._lastMoveTargetX;
          if (toVisXPos != fromVisXPos && toVisXPos != fromVisXPos + 1) {
            // The column was really moved to another position
            // (and not moved before or after itself, which is a noop)

            // Translate visible positions to overall positions
            var fromCol = columnModel.getVisibleColumnAtX(fromVisXPos);
            var toCol = columnModel.getVisibleColumnAtX(toVisXPos);
            var fromOverXPos = columnModel.getOverallX(fromCol);
            var toOverXPos = toCol != null ? columnModel.getOverallX(toCol) : columnModel.getOverallColumnCount();
            if (toOverXPos > fromOverXPos) {
              // Don't count the column itself
              toOverXPos--;
            }

            // Move the column
            columnModel.moveColumn(fromOverXPos, toOverXPos);

            // update the focus indicator including the editor
            this._updateFocusIndicator();
          }
        }
        this._moveColumn = null;
        this._lastMoveTargetX = null;
        this._headerClipper.releaseCapture();
      },
      /**
       * Event handler. Called when the user released a pointer button over the header.
       *
       * @param e {Map} the event.
       */
      _onPointerupHeader: function _onPointerupHeader(e) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }
        if (this.__resizeColumn__P_210_15 != null) {
          this._stopResizeHeader();
          this.__ignoreTap__P_210_20 = true;
          e.stop();
        } else if (this._moveColumn != null) {
          this._stopMoveHeader();
          e.stop();
        }
      },
      /**
       * Event handler. Called when the user tapped a pointer button over the header.
       *
       * @param e {Map} the event.
       */
      _onTapHeader: function _onTapHeader(e) {
        if (this.__ignoreTap__P_210_20) {
          this.__ignoreTap__P_210_20 = false;
          return;
        }
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }
        var tableModel = table.getTableModel();
        var pageX = e.getDocumentLeft();
        var resizeCol = this._getResizeColumnForPageX(pageX);
        if (resizeCol == -1) {
          // pointer is not in a resize region
          var col = this._getColumnForPageX(pageX);
          if (col != null && tableModel.isColumnSortable(col)) {
            // Sort that column
            var sortCol = tableModel.getSortColumnIndex();
            var ascending = col != sortCol ? true : !tableModel.isSortAscending();
            var data = {
              column: col,
              ascending: ascending,
              tapEvent: e
            };
            if (this.fireDataEvent("beforeSort", data, null, true)) {
              // Stop cell editing
              if (table.isEditing()) {
                table.stopEditing();
              }
              tableModel.sortByColumn(col, ascending);
              if (this.getResetSelectionOnHeaderTap()) {
                table.getSelectionModel().resetSelection();
              }
            }
          }
        }
        e.stop();
      },
      /**
       * Event handler. Called when the user tapped a pointer button over the pane.
       *
       * @param e {Map} the event.
       */
      _onTapPane: function _onTapPane(e) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();
        var row = this._getRowForPagePos(pageX, pageY);
        var col = this._getColumnForPageX(pageX);
        if (row != null && col != null) {
          var selectBeforeFocus = this.getSelectBeforeFocus();
          if (selectBeforeFocus) {
            table.getSelectionManager().handleTap(row, e);
          }

          // The pointer is over the data -> update the focus
          if (!this.getFocusCellOnPointerMove()) {
            this._focusCellAtPagePos(pageX, pageY);
          }
          if (!selectBeforeFocus) {
            table.getSelectionManager().handleTap(row, e);
          }
          if (this.__focusIndicator__P_210_7.isHidden() || this.__lastPointerDownCell__P_210_18 && !this.__firedTapEvent__P_210_19 && !this.isEditing() && row == this.__lastPointerDownCell__P_210_18.row && col == this.__lastPointerDownCell__P_210_18.col) {
            this.fireEvent("cellTap", qx.ui.table.pane.CellEvent, [this, e, row, col], true);
            this.__firedTapEvent__P_210_19 = true;
          }
        } else {
          if (row == null && this.getResetSelectionOnTapBelowRows()) {
            table.getSelectionModel().resetSelection();
          }
        }
      },
      /**
       * Event handler. Called when a context menu is invoked in a cell.
       *
       * @param e {qx.event.type.Pointer} the event.
       */
      _onContextMenu: function _onContextMenu(e) {
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();
        var row = this._getRowForPagePos(pageX, pageY);
        var col = this._getColumnForPageX(pageX);

        /*
         * The 'row' value will be null if the right-click was in the blank
         * area below the last data row. Some applications desire to receive
         * the context menu event anyway, and can set the property value of
         * contextMenuFromDataCellsOnly to false to achieve that.
         */
        if (row === null && this.getContextMenuFromDataCellsOnly()) {
          return;
        }
        if (!this.getShowCellFocusIndicator() || row === null || this.__lastPointerDownCell__P_210_18 && row == this.__lastPointerDownCell__P_210_18.row && col == this.__lastPointerDownCell__P_210_18.col) {
          this.fireEvent("cellContextmenu", qx.ui.table.pane.CellEvent, [this, e, row, col], true);

          // Now that the cellContextmenu handler has had a chance to build
          // the menu for this cell, display it (if there is one).
          var menu = this.getTable().getContextMenu();
          if (menu) {
            // A menu with no children means don't display any context menu
            // including the default context menu even if the default context
            // menu is allowed to be displayed normally. There's no need to
            // actually show an empty menu, though.
            if (menu.getChildren().length > 0) {
              menu.openAtPointer(e);
            } else {
              menu.exclude();
            }

            // Do not show native menu
            e.preventDefault();
          }
        }
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
       * Event handler. Called when the user double tapped a pointer button over the pane.
       *
       * @param e {Map} the event.
       */
      _onDbltapPane: function _onDbltapPane(e) {
        var pageX = e.getDocumentLeft();
        var pageY = e.getDocumentTop();
        var col = this._getColumnForPageX(pageX);
        if (col !== null) {
          this._focusCellAtPagePos(pageX, pageY);
          this.startEditing();
          var row = this._getRowForPagePos(pageX, pageY);
          if (row != -1 && row != null) {
            this.fireEvent("cellDbltap", qx.ui.table.pane.CellEvent, [this, e, row], true);
          }
        }
      },
      /**
       * Event handler. Called when the pointer moved out.
       *
       * @param e {Map} the event.
       */
      _onPointerout: function _onPointerout(e) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }

        // Reset the resize cursor when the pointer leaves the header
        // If currently a column is resized then do nothing
        // (the cursor will be reset on pointerup)
        if (this.__resizeColumn__P_210_15 == null) {
          this.setCursor(null);
          this.getApplicationRoot().setGlobalCursor(null);
        }
        this.__header__P_210_1.setPointerOverColumn(null);

        // in case the focus follows the pointer, it should be remove on pointerout
        if (this.getFocusCellOnPointerMove()) {
          this.__table__P_210_0.setFocusedCell();
        }
      },
      /**
       * Shows the resize line.
       *
       * @param x {Integer} the position where to show the line (in pixels, relative to
       *      the left side of the pane).
       */
      _showResizeLine: function _showResizeLine(x) {
        var resizeLine = this._showChildControl("resize-line");
        var width = resizeLine.getWidth();
        var paneBounds = this._paneClipper.getBounds();
        resizeLine.setUserBounds(x - Math.round(width / 2), 0, width, paneBounds.height);
      },
      /**
       * Hides the resize line.
       */
      _hideResizeLine: function _hideResizeLine() {
        this._excludeChildControl("resize-line");
      },
      /**
       * Shows the feedback shown while a column is moved by the user.
       *
       * @param pageX {Integer} the x position of the pointer in the page (in pixels).
       * @return {Integer} the visible x position of the column in the whole table.
       */
      showColumnMoveFeedback: function showColumnMoveFeedback(pageX) {
        var paneModel = this.getTablePaneModel();
        var columnModel = this.getTable().getTableColumnModel();
        var paneLeft = this.__tablePane__P_210_2.getContentLocation().left;
        var colCount = paneModel.getColumnCount();
        var targetXPos = 0;
        var targetX = 0;
        var currX = paneLeft;
        for (var xPos = 0; xPos < colCount; xPos++) {
          var col = paneModel.getColumnAtX(xPos);
          var colWidth = columnModel.getColumnWidth(col);
          if (pageX < currX + colWidth / 2) {
            break;
          }
          currX += colWidth;
          targetXPos = xPos + 1;
          targetX = currX - paneLeft;
        }

        // Ensure targetX is visible
        var scrollerLeft = this._paneClipper.getContentLocation().left;
        var scrollerWidth = this._paneClipper.getBounds().width;
        var scrollX = scrollerLeft - paneLeft;

        // NOTE: +2/-1 because of feedback width
        targetX = qx.lang.Number.limit(targetX, scrollX + 2, scrollX + scrollerWidth - 1);
        this._showResizeLine(targetX);

        // Return the overall target x position
        return paneModel.getFirstColumnX() + targetXPos;
      },
      /**
       * Hides the feedback shown while a column is moved by the user.
       */
      hideColumnMoveFeedback: function hideColumnMoveFeedback() {
        this._hideResizeLine();
      },
      /**
       * Sets the focus to the cell that's located at the page position
       * <code>pageX</code>/<code>pageY</code>. If there is no cell at that position,
       * nothing happens.
       *
       * @param pageX {Integer} the x position in the page (in pixels).
       * @param pageY {Integer} the y position in the page (in pixels).
       */
      _focusCellAtPagePos: function _focusCellAtPagePos(pageX, pageY) {
        var row = this._getRowForPagePos(pageX, pageY);
        if (row != -1 && row != null) {
          // The pointer is over the data -> update the focus
          var col = this._getColumnForPageX(pageX);
          this.__table__P_210_0.setFocusedCell(col, row);
        }
      },
      /**
       * Sets the currently focused cell.
       *
       * @param col {Integer} the model index of the focused cell's column.
       * @param row {Integer} the model index of the focused cell's row.
       */
      setFocusedCell: function setFocusedCell(col, row) {
        if (!this.isEditing()) {
          this.__tablePane__P_210_2.setFocusedCell(col, row, this.__updateContentPlanned__P_210_11);
          this.__focusedCol__P_210_23 = col;
          this.__focusedRow__P_210_24 = row;
          this._updateFocusIndicator();
        }
      },
      /**
       * Returns the column of currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedColumn: function getFocusedColumn() {
        return this.__focusedCol__P_210_23;
      },
      /**
       * Returns the row of currently focused cell.
       *
       * @return {Integer} the model index of the focused cell's column.
       */
      getFocusedRow: function getFocusedRow() {
        return this.__focusedRow__P_210_24;
      },
      /**
       * Scrolls a cell visible.
       *
       * @param col {Integer} the model index of the column the cell belongs to.
       * @param row {Integer} the model index of the row the cell belongs to.
       */
      scrollCellVisible: function scrollCellVisible(col, row) {
        var paneModel = this.getTablePaneModel();
        var xPos = paneModel.getX(col);
        if (xPos != -1) {
          var clipperSize = this._paneClipper.getInnerSize();
          if (!clipperSize) {
            return;
          }
          var columnModel = this.getTable().getTableColumnModel();
          var colLeft = paneModel.getColumnLeft(col);
          var colWidth = columnModel.getColumnWidth(col);
          var rowHeight = this.getTable().getRowHeight();
          var rowTop = row * rowHeight;
          var scrollX = this.getScrollX();
          var scrollY = this.getScrollY();

          // NOTE: We don't use qx.lang.Number.limit, because min should win if max < min
          var minScrollX = Math.min(colLeft, colLeft + colWidth - clipperSize.width);
          var maxScrollX = colLeft;
          this.setScrollX(Math.max(minScrollX, Math.min(maxScrollX, scrollX)));
          var minScrollY = rowTop + rowHeight - clipperSize.height;
          if (this.getTable().getKeepFirstVisibleRowComplete()) {
            minScrollY += rowHeight;
          }
          var maxScrollY = rowTop;
          this.setScrollY(Math.max(minScrollY, Math.min(maxScrollY, scrollY)), true);
        }
      },
      /**
       * Returns whether currently a cell is editing.
       *
       * @return {var} whether currently a cell is editing.
       */
      isEditing: function isEditing() {
        return this._cellEditor != null;
      },
      /**
       * Starts editing the currently focused cell. Does nothing if already
       * editing, if the column is not editable, or if the cell editor for the
       * column ascertains that the particular cell is not editable.
       *
       * @return {Boolean} whether editing was started
       */
      startEditing: function startEditing() {
        var _this = this;
        var table = this.getTable();
        var tableModel = table.getTableModel();
        var col = this.__focusedCol__P_210_23;
        if (!this.isEditing() && col != null && tableModel.isColumnEditable(col)) {
          var row = this.__focusedRow__P_210_24;
          var xPos = this.getTablePaneModel().getX(col);
          var value = tableModel.getValue(col, row);

          // scroll cell into view
          this.scrollCellVisible(col, row);
          this.__cellEditorFactory__P_210_25 = table.getTableColumnModel().getCellEditorFactory(col);
          var cellInfo = {
            col: col,
            row: row,
            xPos: xPos,
            value: value,
            table: table
          };

          // Get a cell editor
          this._cellEditor = this.__cellEditorFactory__P_210_25.createCellEditor(cellInfo);

          // We handle two types of cell editors: the traditional in-place
          // editor, where the cell editor returned by the factory must fit in
          // the space of the table cell; and a modal window in which the
          // editing takes place.  Additionally, if the cell editor determines
          // that it does not want to edit the particular cell being requested,
          // it may return null to indicate that that cell is not editable.
          if (this._cellEditor === null) {
            // This cell is not editable even though its column is.
            return false;
          } else if (this._cellEditor instanceof qx.ui.window.Window) {
            // It's a window.  Ensure that it's modal.
            this._cellEditor.setModal(true);

            // At least for the time being, we disallow the close button.  It
            // acts differently than a cellEditor.close(), and invokes a bug
            // someplace.  Modal window cell editors should provide their own
            // buttons or means to activate a cellEditor.close() or equivalently
            // cellEditor.hide().
            this._cellEditor.setShowClose(false);

            // Arrange to be notified when it is closed.
            this._cellEditor.addListener("close", this._onCellEditorModalWindowClose, this);

            // If there's a pre-open function defined for the table...
            var f = table.getModalCellEditorPreOpenFunction();
            if (f != null) {
              f(this._cellEditor, cellInfo);
            }

            // Open it now.
            this._cellEditor.open();
          } else {
            // prevent tap event from bubbling up to the table
            this.__focusIndicatorPointerDownListener__P_210_27 = this.__focusIndicator__P_210_7.addListener("pointerdown", function (e) {
              _this.__lastPointerDownCell__P_210_18 = {
                row: _this.__focusedRow__P_210_24,
                col: _this.__focusedCol__P_210_23
              };
              e.stopPropagation();
            });
            this._updateFocusIndicator(true);
            this.__focusIndicator__P_210_7.add(this._cellEditor);
            this.__focusIndicator__P_210_7.addState("editing");
            this.__focusIndicator__P_210_7.setKeepActive(false);

            // Make the focus indicator visible during editing
            this.__focusIndicator__P_210_7.setDecorator("table-scroller-focus-indicator");
            this._cellEditor.focus();
            this._cellEditor.activate();
          }
          return true;
        }
        return false;
      },
      /**
       * Stops editing and writes the editor's value to the model.
       */
      stopEditing: function stopEditing() {
        // If the focus indicator is not being shown normally...
        if (!this.getShowCellFocusIndicator()) {
          // ... then hide it again
          this.__focusIndicator__P_210_7.setDecorator(null);
        }
        this.flushEditor(true);
      },
      /**
       * Writes the editor's value to the model
       *
       * @param cancel {Boolean ? false} Whether to also cancel
       *      editing before firing the 'dateEdited' event.
       */
      flushEditor: function flushEditor(cancel) {
        if (this.isEditing()) {
          var value = this.__cellEditorFactory__P_210_25.getCellEditorValue(this._cellEditor);
          var oldValue = this.getTable().getTableModel().getValue(this.__focusedCol__P_210_23, this.__focusedRow__P_210_24);
          this.getTable().getTableModel().setValue(this.__focusedCol__P_210_23, this.__focusedRow__P_210_24, value);
          this.__table__P_210_0.focus();
          if (cancel) {
            this.cancelEditing();
          }

          // Fire an event containing the value change.
          this.__table__P_210_0.fireDataEvent("dataEdited", {
            row: this.__focusedRow__P_210_24,
            col: this.__focusedCol__P_210_23,
            oldValue: oldValue,
            value: value
          });
        }
      },
      /**
       * Stops editing without writing the editor's value to the model.
       */
      cancelEditing: function cancelEditing() {
        if (this.isEditing()) {
          if (!(this._cellEditor instanceof qx.ui.window.Window)) {
            this.__focusIndicator__P_210_7.removeState("editing");
            this.__focusIndicator__P_210_7.setKeepActive(true);
            if (this.__focusIndicatorPointerDownListener__P_210_27 !== null) {
              this.__focusIndicator__P_210_7.removeListenerById(this.__focusIndicatorPointerDownListener__P_210_27);
              this.__focusIndicatorPointerDownListener__P_210_27 = null;
            }
            this._updateFocusIndicator();
          }
          this._cellEditor.destroy();
          this._cellEditor = null;
          this.__cellEditorFactory__P_210_25 = null;
        }
      },
      /**
       * Event handler. Called when the modal window of the cell editor closes.
       *
       * @param e {Map} the event.
       */
      _onCellEditorModalWindowClose: function _onCellEditorModalWindowClose(e) {
        this.stopEditing();
      },
      /**
       * Returns the model index of the column the pointer is over or null if the pointer
       * is not over a column.
       *
       * @param pageX {Integer} the x position of the pointer in the page (in pixels).
       * @return {Integer} the model index of the column the pointer is over.
       */
      _getColumnForPageX: function _getColumnForPageX(pageX) {
        var columnModel = this.getTable().getTableColumnModel();
        var paneModel = this.getTablePaneModel();
        var colCount = paneModel.getColumnCount();
        var currX = this.__tablePane__P_210_2.getContentLocation().left;
        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);
          var colWidth = columnModel.getColumnWidth(col);
          currX += colWidth;
          if (pageX < currX) {
            return col;
          }
        }
        return null;
      },
      /**
       * Returns the model index of the column that should be resized when dragging
       * starts here. Returns -1 if the pointer is in no resize region of any column.
       *
       * @param pageX {Integer} the x position of the pointer in the page (in pixels).
       * @return {Integer} the column index.
       */
      _getResizeColumnForPageX: function _getResizeColumnForPageX(pageX) {
        var contentLocation = this.__header__P_210_1.getContentLocation() || this.__tablePane__P_210_2.getContentLocation();
        if (contentLocation) {
          var currX = contentLocation.left;
          var columnModel = this.getTable().getTableColumnModel();
          var paneModel = this.getTablePaneModel();
          var colCount = paneModel.getColumnCount();
          var regionRadius = qx.ui.table.pane.Scroller.RESIZE_REGION_RADIUS;
          for (var x = 0; x < colCount; x++) {
            var col = paneModel.getColumnAtX(x);
            var colWidth = columnModel.getColumnWidth(col);
            currX += colWidth;
            if (pageX >= currX - regionRadius && pageX <= currX + regionRadius) {
              return col;
            }
          }
        }
        return -1;
      },
      /**
       * Returns the model index of the row the pointer is currently over. Returns -1 if
       * the pointer is over the header. Returns null if the pointer is not over any
       * column.
       *
       * @param pageX {Integer} the pointer x position in the page.
       * @param pageY {Integer} the pointer y position in the page.
       * @return {Integer} the model index of the row the pointer is currently over.
       */
      _getRowForPagePos: function _getRowForPagePos(pageX, pageY) {
        var panePos = this.__tablePane__P_210_2.getContentLocation();
        if (panePos === null || pageX < panePos.left || pageX > panePos.right) {
          // There was no cell or header cell hit
          return null;
        }
        if (pageY >= panePos.top && pageY <= panePos.bottom) {
          // This event is in the pane -> Get the row
          var rowHeight = this.getTable().getRowHeight();
          var scrollY = this.__verScrollBar__P_210_6.getPosition();
          if (this.getTable().getKeepFirstVisibleRowComplete()) {
            scrollY = Math.floor(scrollY / rowHeight) * rowHeight;
          }
          var tableY = scrollY + pageY - panePos.top;
          var row = Math.floor(tableY / rowHeight);
          var tableModel = this.getTable().getTableModel();
          var rowCount = tableModel.getRowCount();
          return row < rowCount ? row : null;
        }
        var headerPos = this.__header__P_210_1.getContentLocation();
        if (headerPos !== null && pageY >= headerPos.top && pageY <= headerPos.bottom && pageX <= headerPos.right) {
          // This event is in the pane -> Return -1 for the header
          return -1;
        }
        return null;
      },
      /**
       * Sets the widget that should be shown in the top right corner.
       *
       * The widget will not be disposed, when this table scroller is disposed. So the
       * caller has to dispose it.
       *
       * @param widget {qx.ui.core.Widget} The widget to set. May be null.
       */
      setTopRightWidget: function setTopRightWidget(widget) {
        var oldWidget = this.__topRightWidget__P_210_26;
        if (oldWidget != null) {
          this.__top__P_210_3.remove(oldWidget);
        }
        if (widget != null) {
          this.__top__P_210_3.add(widget);
        }
        this.__topRightWidget__P_210_26 = widget;
      },
      /**
       * Get the top right widget
       *
       * @return {qx.ui.core.Widget} The top right widget.
       */
      getTopRightWidget: function getTopRightWidget() {
        return this.__topRightWidget__P_210_26;
      },
      /**
       * Returns the header.
       *
       * @return {qx.ui.table.pane.Header} the header.
       */
      getHeader: function getHeader() {
        return this.__header__P_210_1;
      },
      /**
       * Returns the table pane.
       *
       * @return {qx.ui.table.pane.Pane} the table pane.
       */
      getTablePane: function getTablePane() {
        return this.__tablePane__P_210_2;
      },
      /**
       * Get the rendered width of the vertical scroll bar. The return value is
       * <code>0</code> if the scroll bar is invisible or not yet rendered.
       *
       * @internal
       * @return {Integer} The width of the vertical scroll bar
       */
      getVerticalScrollBarWidth: function getVerticalScrollBarWidth() {
        var scrollBar = this.__verScrollBar__P_210_6;
        return scrollBar.isVisible() ? scrollBar.getSizeHint().width || 0 : 0;
      },
      /**
       * Returns which scrollbars are needed.
       *
       * @param forceHorizontal {Boolean ? false} Whether to show the horizontal
       *      scrollbar always.
       * @param preventVertical {Boolean ? false} Whether to show the vertical scrollbar
       *      never.
       * @return {Integer} which scrollbars are needed. This may be any combination of
       *      {@link #HORIZONTAL_SCROLLBAR} or {@link #VERTICAL_SCROLLBAR}
       *      (combined by OR).
       */
      getNeededScrollBars: function getNeededScrollBars(forceHorizontal, preventVertical) {
        var verScrollBar = this.__verScrollBar__P_210_6;
        var verBarWidth = verScrollBar.getSizeHint().width + verScrollBar.getMarginLeft() + verScrollBar.getMarginRight();
        var horScrollBar = this.__horScrollBar__P_210_5;
        var horBarHeight = horScrollBar.getSizeHint().height + horScrollBar.getMarginTop() + horScrollBar.getMarginBottom();

        // Get the width and height of the view (without scroll bars)
        var clipperSize = this._paneClipper.getInnerSize();
        var viewWidth = clipperSize ? clipperSize.width : 0;
        if (this.getVerticalScrollBarVisible()) {
          viewWidth += verBarWidth;
        }
        var viewHeight = clipperSize ? clipperSize.height : 0;
        if (this.getHorizontalScrollBarVisible()) {
          viewHeight += horBarHeight;
        }
        var tableModel = this.getTable().getTableModel();
        var rowCount = tableModel.getRowCount();

        // Get the (virtual) width and height of the pane
        var paneWidth = this.getTablePaneModel().getTotalWidth();
        var paneHeight = this.getTable().getRowHeight() * rowCount;

        // Check which scrollbars are needed
        var horNeeded = false;
        var verNeeded = false;
        if (paneWidth > viewWidth) {
          horNeeded = true;
          if (paneHeight > viewHeight - horBarHeight) {
            verNeeded = true;
          }
        } else if (paneHeight > viewHeight) {
          verNeeded = true;
          if (!preventVertical && paneWidth > viewWidth - verBarWidth) {
            horNeeded = true;
          }
        }

        // Create the mask
        var horBar = qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
        var verBar = qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
        return (forceHorizontal || horNeeded ? horBar : 0) | (preventVertical || !verNeeded ? 0 : verBar);
      },
      /**
       * Return the pane clipper. It is sometimes required for special activities
       * such as tracking events for drag&drop.
       *
       * @return {qx.ui.table.pane.Clipper}
       *   The pane clipper for this scroller.
       */
      getPaneClipper: function getPaneClipper() {
        return this._paneClipper;
      },
      /**
       * Returns the scroll area container widget (which enables more precise
       * operations e.g. bounds retrieval for drag session scrolling).
       *
       * @see qx.ui.core.MDragDropScrolling#_getBounds
       * @return {qx.ui.table.pane.Clipper}
       *   The pane clipper for this scroller.
       */
      getScrollAreaContainer: function getScrollAreaContainer() {
        return this.getPaneClipper();
      },
      // property apply method
      _applyScrollTimeout: function _applyScrollTimeout(value, old) {
        this._startInterval(value);
      },
      /**
       * Starts the current running interval
       *
       * @param timeout {Integer} The timeout between two table updates
       */
      _startInterval: function _startInterval(timeout) {
        this.__timer__P_210_8.setInterval(timeout);
        this.__timer__P_210_8.start();
      },
      /**
       * stops the current running interval
       */
      _stopInterval: function _stopInterval() {
        this.__timer__P_210_8.stop();
      },
      /**
       * Does a postponed update of the content.
       *
       * @see #_updateContent
       */
      _postponedUpdateContent: function _postponedUpdateContent() {
        //this.__updateContentPlanned = true;
        this._updateContent();
      },
      /**
       * Timer event handler. Periodically checks whether a table update is
       * required. The update interval is controlled by the {@link #scrollTimeout}
       * property.
       *
       * @signature function()
       */
      _oninterval: qx.event.GlobalError.observeMethod(function () {
        if (this.__updateContentPlanned__P_210_11 && !this.__tablePane__P_210_2._layoutPending) {
          this.__updateContentPlanned__P_210_11 = false;
          this._updateContent();
        }
      }),
      /**
       * Updates the content. Sets the right section the table pane should show and
       * does the scrolling.
       */
      _updateContent: function _updateContent() {
        var paneSize = this._paneClipper.getInnerSize();
        if (!paneSize) {
          return;
        }
        var paneHeight = paneSize.height;
        var scrollX = this.__horScrollBar__P_210_5.getPosition();
        var scrollY = this.__verScrollBar__P_210_6.getPosition();
        var rowHeight = this.getTable().getRowHeight();
        var firstRow = Math.floor(scrollY / rowHeight);
        var oldFirstRow = this.__tablePane__P_210_2.getFirstVisibleRow();
        this.__tablePane__P_210_2.setFirstVisibleRow(firstRow);
        var visibleRowCount = Math.ceil(paneHeight / rowHeight);
        var paneOffset = 0;
        var firstVisibleRowComplete = this.getTable().getKeepFirstVisibleRowComplete();
        if (!firstVisibleRowComplete) {
          // NOTE: We don't consider paneOffset, because this may cause alternating
          //       adding and deleting of one row when scrolling. Instead we add one row
          //       in every case.
          visibleRowCount++;
          paneOffset = scrollY % rowHeight;
        }
        this.__tablePane__P_210_2.setVisibleRowCount(visibleRowCount);
        if (firstRow != oldFirstRow) {
          this._updateFocusIndicator();
        }
        this._paneClipper.scrollToX(scrollX);

        // Avoid expensive calls to setScrollTop if
        // scrolling is not needed
        if (!firstVisibleRowComplete) {
          this._paneClipper.scrollToY(paneOffset);
        }
      },
      /**
       * Updates the location and the visibility of the focus indicator.
       *
       * @param editing {Boolean ? false} True if editing the cell
       */
      _updateFocusIndicator: function _updateFocusIndicator(editing) {
        var table = this.getTable();
        if (!table.getEnabled()) {
          return;
        }
        this.__focusIndicator__P_210_7.moveToCell(this.__focusedCol__P_210_23, this.__focusedRow__P_210_24, editing);
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._stopInterval();

      // this object was created by the table on init so we have to clean it up.
      var tablePaneModel = this.getTablePaneModel();
      if (tablePaneModel) {
        tablePaneModel.dispose();
      }
      this.__lastPointerDownCell__P_210_18 = this.__topRightWidget__P_210_26 = this.__table__P_210_0 = null;
      this._disposeObjects("__horScrollBar__P_210_5", "__verScrollBar__P_210_6", "_headerClipper", "_paneClipper", "__focusIndicator__P_210_7", "__header__P_210_1", "__tablePane__P_210_2", "__top__P_210_3", "__timer__P_210_8", "__clipperContainer__P_210_4");
    }
  });
  qx.ui.table.pane.Scroller.$$dbClassInfo = $$dbClassInfo;
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
      "qx.util.DeferredCall": {
        "construct": true
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
   * The model of a table pane. This model works as proxy to a
   * {@link qx.ui.table.columnmodel.Basic} and manages the visual order of the columns shown in
   * a {@link Pane}.
   */
  qx.Class.define("qx.ui.table.pane.Model", {
    extend: qx.core.Object,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     *
     * @param tableColumnModel {qx.ui.table.columnmodel.Basic} The TableColumnModel of which this
     *    model is the proxy.
     */
    construct: function construct(tableColumnModel) {
      qx.core.Object.constructor.call(this);
      this.setTableColumnModel(tableColumnModel);
      this.__defferedEventDispatcher__P_211_0 = new qx.util.DeferredCall(function () {
        this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
      }, this);
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired when the model changed. */
      modelChanged: "qx.event.type.Event"
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {string} The type of the event fired when the model changed. */
      EVENT_TYPE_MODEL_CHANGED: "modelChanged"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The visible x position of the first column this model should contain. */
      firstColumnX: {
        check: "Integer",
        init: 0,
        apply: "_applyFirstColumnX"
      },
      /**
       * The maximum number of columns this model should contain. If -1 this model will
       * contain all remaining columns.
       */
      maxColumnCount: {
        check: "Number",
        init: -1,
        apply: "_applyMaxColumnCount"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __columnCount__P_211_1: null,
      __tableColumnModel__P_211_2: null,
      __defferedEventDispatcher__P_211_0: null,
      // property modifier
      _applyFirstColumnX: function _applyFirstColumnX(value, old) {
        this.__columnCount__P_211_1 = null;
        this.__defferedEventDispatcher__P_211_0.schedule();
      },
      // property modifier
      _applyMaxColumnCount: function _applyMaxColumnCount(value, old) {
        this.__columnCount__P_211_1 = null;
        this.__defferedEventDispatcher__P_211_0.schedule();
      },
      /**
       * Connects the table model to the column model
       *
       * @param tableColumnModel {qx.ui.table.columnmodel.Basic} the column model
       */
      setTableColumnModel: function setTableColumnModel(tableColumnModel) {
        if (this.__tableColumnModel__P_211_2) {
          this.__tableColumnModel__P_211_2.removeListener("visibilityChangedPre", this._onColVisibilityChanged, this);
          this.__tableColumnModel__P_211_2.removeListener("headerCellRendererChanged", this._onHeaderCellRendererChanged, this);
        }
        this.__tableColumnModel__P_211_2 = tableColumnModel;
        this.__tableColumnModel__P_211_2.addListener("visibilityChangedPre", this._onColVisibilityChanged, this);
        this.__tableColumnModel__P_211_2.addListener("headerCellRendererChanged", this._onHeaderCellRendererChanged, this);
        this.__columnCount__P_211_1 = null;
      },
      /**
       * Event handler. Called when the visibility of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onColVisibilityChanged: function _onColVisibilityChanged(evt) {
        this.__columnCount__P_211_1 = null;
        this.__defferedEventDispatcher__P_211_0.schedule();
      },
      /**
       * Event handler. Called when the cell renderer of a column has changed.
       *
       * @param evt {Map} the event.
       */
      _onHeaderCellRendererChanged: function _onHeaderCellRendererChanged(evt) {
        this.__defferedEventDispatcher__P_211_0.schedule();
      },
      /**
       * Returns the number of columns in this model.
       *
       * @return {Integer} the number of columns in this model.
       */
      getColumnCount: function getColumnCount() {
        if (this.__columnCount__P_211_1 == null) {
          var firstX = this.getFirstColumnX();
          var maxColCount = this.getMaxColumnCount();
          var totalColCount = this.__tableColumnModel__P_211_2.getVisibleColumnCount();
          if (maxColCount == -1 || firstX + maxColCount > totalColCount) {
            this.__columnCount__P_211_1 = totalColCount - firstX;
          } else {
            this.__columnCount__P_211_1 = maxColCount;
          }
        }
        return this.__columnCount__P_211_1;
      },
      /**
       * Returns the model index of the column at the position <code>xPos</code>.
       *
       * @param xPos {Integer} the x position in the table pane of the column.
       * @return {Integer} the model index of the column.
       */
      getColumnAtX: function getColumnAtX(xPos) {
        var firstX = this.getFirstColumnX();
        return this.__tableColumnModel__P_211_2.getVisibleColumnAtX(firstX + xPos);
      },
      /**
       * Returns the x position of the column <code>col</code>.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the x position in the table pane of the column.
       */
      getX: function getX(col) {
        var firstX = this.getFirstColumnX();
        var maxColCount = this.getMaxColumnCount();
        var x = this.__tableColumnModel__P_211_2.getVisibleX(col) - firstX;
        if (x >= 0 && (maxColCount == -1 || x < maxColCount)) {
          return x;
        } else {
          return -1;
        }
      },
      /**
       * Gets the position of the left side of a column (in pixels, relative to the
       * left side of the table pane).
       *
       * This value corresponds to the sum of the widths of all columns left of the
       * column.
       *
       * @param col {Integer} the model index of the column.
       * @return {var} the position of the left side of the column.
       */
      getColumnLeft: function getColumnLeft(col) {
        var left = 0;
        var colCount = this.getColumnCount();
        for (var x = 0; x < colCount; x++) {
          var currCol = this.getColumnAtX(x);
          if (currCol == col) {
            return left;
          }
          left += this.__tableColumnModel__P_211_2.getColumnWidth(currCol);
        }
        return -1;
      },
      /**
       * Returns the total width of all columns in the model.
       *
       * @return {Integer} the total width of all columns in the model.
       */
      getTotalWidth: function getTotalWidth() {
        var totalWidth = 0;
        var colCount = this.getColumnCount();
        for (var x = 0; x < colCount; x++) {
          var col = this.getColumnAtX(x);
          totalWidth += this.__tableColumnModel__P_211_2.getColumnWidth(col);
        }
        return totalWidth;
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__tableColumnModel__P_211_2) {
        this.__tableColumnModel__P_211_2.removeListener("visibilityChangedPre", this._onColVisibilityChanged, this);
        this.__tableColumnModel__P_211_2.removeListener("headerCellRendererChanged", this._onHeaderCellRendererChanged, this);
      }
      this.__tableColumnModel__P_211_2 = null;
      this._disposeObjects("__defferedEventDispatcher__P_211_0");
    }
  });
  qx.ui.table.pane.Model.$$dbClassInfo = $$dbClassInfo;
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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.ITableModel": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.version": {
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
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
  
  ************************************************************************ */

  /**
   * An abstract table model that performs the column handling, so subclasses only
   * need to care for row handling.
   */
  qx.Class.define("qx.ui.table.model.Abstract", {
    type: "abstract",
    extend: qx.core.Object,
    implement: qx.ui.table.ITableModel,
    events: {
      /**
       * Fired when the table data changed (the stuff shown in the table body).
       * The data property of the event will be a map having the following
       * attributes:
       * <ul>
       *   <li>firstRow: The index of the first row that has changed.</li>
       *   <li>lastRow: The index of the last row that has changed.</li>
       *   <li>firstColumn: The model index of the first column that has changed.</li>
       *   <li>lastColumn: The model index of the last column that has changed.</li>
       * </ul>
       *
       * Additionally, if the data changed as a result of rows being removed
       * from the data model, then these additional attributes will be in the
       * data:
       * <ul>
       *   <li>removeStart: The model index of the first row that was removed.</li>
       *   <li>removeCount: The number of rows that were removed.</li>
       * </ul>
       */
      dataChanged: "qx.event.type.Data",
      /**
       * Fired when the meta data changed (the stuff shown in the table header).
       */
      metaDataChanged: "qx.event.type.Event",
      /**
       * Fired after the table is sorted (but before the metaDataChanged event)
       */
      sorted: "qx.event.type.Data"
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__columnIdArr__P_214_0 = [];
      this.__columnNameArr__P_214_1 = [];
      this.__columnIndexMap__P_214_2 = {};
    },
    statics: {
      /**
       * Member to control if a table should throw an error when you try to change the
       * data model data whilst there is an incomplete edit. It could possibly break
       * current implementations so only introduce the change from QX v8.
       * Ref: https://github.com/qooxdoo/qooxdoo/pull/10377#discussion_r818697343
       */
      THROW_ON_MODEL_CHANGE_DURING_EDIT: parseInt(qx.core.Environment.get("qx.version"), 10) >= 8
    },
    members: {
      __columnIdArr__P_214_0: null,
      __columnNameArr__P_214_1: null,
      __columnIndexMap__P_214_2: null,
      __internalChange__P_214_3: null,
      __table__P_214_4: null,
      /**
       * Initialize the table model <--> table interaction. The table model is
       * passed to the table constructor, but the table model doesn't otherwise
       * know anything about the table nor can it operate on table
       * properties. This function provides the capability for the table model
       * to specify characteristics of the table. It is called when the table
       * model is applied to the table.
       *
       * @param table {qx.ui.table.Table}
       *   The table to which this model is attached
       */
      init: function init(table) {
        // store a reference back to the table
        this.__table__P_214_4 = table;
      },
      /**
       *
       *
       * @returns table {qx.ui.table.Table}
       */
      getTable: function getTable() {
        return this.__table__P_214_4;
      },
      /**
       * Abstract method
       * @throws {Error} An error if this method is called.
       */
      getRowCount: function getRowCount() {
        throw new Error("getRowCount is abstract");
      },
      getRowData: function getRowData(rowIndex) {
        return null;
      },
      isColumnEditable: function isColumnEditable(columnIndex) {
        return false;
      },
      isColumnSortable: function isColumnSortable(columnIndex) {
        return false;
      },
      sortByColumn: function sortByColumn(columnIndex, ascending) {},
      getSortColumnIndex: function getSortColumnIndex() {
        return -1;
      },
      isSortAscending: function isSortAscending() {
        return true;
      },
      prefetchRows: function prefetchRows(firstRowIndex, lastRowIndex) {},
      /**
       * Abstract method
       *
       * @param columnIndex {Integer} the index of the column
       * @param rowIndex {Integer} the index of the row
       *
       * @throws {Error} An error if this method is called.
       */
      getValue: function getValue(columnIndex, rowIndex) {
        throw new Error("getValue is abstract");
      },
      getValueById: function getValueById(columnId, rowIndex) {
        return this.getValue(this.getColumnIndexById(columnId), rowIndex);
      },
      /**
       * Abstract method
       *
       * @param columnIndex {Integer} index of the column
       * @param rowIndex {Integer} index of the row
       * @param value {var} Value to be set
       *
       * @throws {Error} An error if this method is called.
       */
      setValue: function setValue(columnIndex, rowIndex, value) {
        throw new Error("setValue is abstract");
      },
      setValueById: function setValueById(columnId, rowIndex, value) {
        this.setValue(this.getColumnIndexById(columnId), rowIndex, value);
      },
      // overridden
      getColumnCount: function getColumnCount() {
        return this.__columnIdArr__P_214_0.length;
      },
      // overridden
      getColumnIndexById: function getColumnIndexById(columnId) {
        return this.__columnIndexMap__P_214_2[columnId];
      },
      // overridden
      getColumnId: function getColumnId(columnIndex) {
        return this.__columnIdArr__P_214_0[columnIndex];
      },
      // overridden
      getColumnName: function getColumnName(columnIndex) {
        return this.__columnNameArr__P_214_1[columnIndex];
      },
      /**
       * Sets the column IDs. These IDs may be used internally to identify a
       * column.
       *
       * Note: This will clear previously set column names.
       *
       *
       * @param columnIdArr {String[]} the IDs of the columns.
       * @see #setColumns
       */
      setColumnIds: function setColumnIds(columnIdArr) {
        this.__columnIdArr__P_214_0 = columnIdArr;

        // Create the reverse map
        this.__columnIndexMap__P_214_2 = {};
        for (var i = 0; i < columnIdArr.length; i++) {
          this.__columnIndexMap__P_214_2[columnIdArr[i]] = i;
        }
        this.__columnNameArr__P_214_1 = new Array(columnIdArr.length);

        // Inform the listeners
        if (!this.__internalChange__P_214_3) {
          this.fireEvent("metaDataChanged");
        }
      },
      /**
       * Sets the column names. These names will be shown to the user.
       *
       * Note: The column IDs have to be defined before.
       *
       *
       * @param columnNameArr {String[]} the names of the columns.
       * @throws {Error} If the amount of given columns is different from the table.
       * @see #setColumnIds
       */
      setColumnNamesByIndex: function setColumnNamesByIndex(columnNameArr) {
        if (this.__columnIdArr__P_214_0.length != columnNameArr.length) {
          throw new Error("this.__columnIdArr and columnNameArr have different length: " + this.__columnIdArr__P_214_0.length + " != " + columnNameArr.length);
        }
        this.__columnNameArr__P_214_1 = columnNameArr;

        // Inform the listeners
        this.fireEvent("metaDataChanged");
      },
      /**
       * Sets the column names. These names will be shown to the user.
       *
       * Note: The column IDs have to be defined before.
       *
       *
       * @param columnNameMap {Map} a map containing the column IDs as keys and the
       *          column name as values.
       * @see #setColumnIds
       */
      setColumnNamesById: function setColumnNamesById(columnNameMap) {
        this.__columnNameArr__P_214_1 = new Array(this.__columnIdArr__P_214_0.length);
        for (var i = 0; i < this.__columnIdArr__P_214_0.length; ++i) {
          this.__columnNameArr__P_214_1[i] = columnNameMap[this.__columnIdArr__P_214_0[i]];
        }
      },
      /**
       * Sets the column names (and optionally IDs)
       *
       * Note: You can not change the _number_ of columns this way.  The number
       *       of columns is highly intertwined in the entire table operation,
       *       and dynamically changing it would require as much work as just
       *       recreating your table.  If you must change the number of columns
       *       in a table then you should remove the table and add a new one.
       *
       * @param columnNameArr {String[]}
       *   The column names. These names will be shown to the user.
       *
       * @param columnIdArr {String[] ? null}
       *   The column IDs. These IDs may be used internally to identify a
       *   column. If null, the column names are used as IDs unless ID values
       *   have already been set. If ID values have already been set, they will
       *   continue to be used if no ID values are explicitly provided here.
       *
       * @throws {Error} If the amount of given columns is different from the table.
       *
       */
      setColumns: function setColumns(columnNameArr, columnIdArr) {
        var bSetIds = this.__columnIdArr__P_214_0.length == 0 || columnIdArr;
        if (columnIdArr == null) {
          if (this.__columnIdArr__P_214_0.length == 0) {
            columnIdArr = columnNameArr;
          } else {
            columnIdArr = this.__columnIdArr__P_214_0;
          }
        }
        if (columnIdArr.length != columnNameArr.length) {
          throw new Error("columnIdArr and columnNameArr have different length: " + columnIdArr.length + " != " + columnNameArr.length);
        }
        if (bSetIds) {
          this.__internalChange__P_214_3 = true;
          this.setColumnIds(columnIdArr);
          this.__internalChange__P_214_3 = false;
        }
        this.setColumnNamesByIndex(columnNameArr);
      },
      _checkEditing: function _checkEditing() {
        if (!qx.ui.table.model.Abstract.THROW_ON_MODEL_CHANGE_DURING_EDIT) {
          return;
        }
        if (this.getTable() && this.getTable().isEditing()) {
          throw new Error("A cell is currently being edited. Commit or cancel the edit before setting the table data");
        }
      }
    },
    destruct: function destruct() {
      this.__columnIdArr__P_214_0 = this.__columnNameArr__P_214_1 = this.__columnIndexMap__P_214_2 = null;
    }
  });
  qx.ui.table.model.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.model.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {}
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
   * A simple table model that provides an API for changing the model data.
   */
  qx.Class.define("qx.ui.table.model.Simple", {
    extend: qx.ui.table.model.Abstract,
    construct: function construct() {
      qx.ui.table.model.Abstract.constructor.call(this);
      this._rowArr = [];
      this.__sortColumnIndex__P_202_0 = -1;

      // Array of objects, each with property "ascending" and "descending"
      this.__sortMethods__P_202_1 = [];
      this.__editableColArr__P_202_2 = null;
    },
    properties: {
      /**
       * Whether sorting should be case sensitive
       */
      caseSensitiveSorting: {
        check: "Boolean",
        init: true
      }
    },
    statics: {
      /**
       * Default ascending sort method to use if no custom method has been
       * provided.
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorAscending: function _defaultSortComparatorAscending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex];
        var obj2 = row2[columnIndex];
        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;
          if (result != null) {
            return result;
          }
        }
        if (obj1 == null && obj2 !== null) {
          return -1;
        } else if (obj2 == null && obj1 !== null) {
          return 1;
        }
        return obj1 > obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      },
      /**
       * Same as the Default ascending sort method but using case insensitivity
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorInsensitiveAscending: function _defaultSortComparatorInsensitiveAscending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex].toLowerCase ? row1[columnIndex].toLowerCase() : row1[columnIndex];
        var obj2 = row2[columnIndex].toLowerCase ? row2[columnIndex].toLowerCase() : row2[columnIndex];
        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;
          if (result != null) {
            return result;
          }
        }
        if (obj1 == null && obj2 !== null) {
          return -1;
        } else if (obj2 == null && obj1 !== null) {
          return 1;
        }
        return obj1 > obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      },
      /**
       * Default descending sort method to use if no custom method has been
       * provided.
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorDescending: function _defaultSortComparatorDescending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex];
        var obj2 = row2[columnIndex];
        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;
          if (result != null) {
            return result;
          }
        }
        if (obj1 == null && obj2 !== null) {
          return 1;
        } else if (obj2 == null && obj1 !== null) {
          return -1;
        }
        return obj1 < obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      },
      /**
       * Same as the Default descending sort method but using case insensitivity
       *
       * @param row1 {var} first row
       * @param row2 {var} second row
       * @param columnIndex {Integer} the column to be sorted
       * @return {Integer} 1 of row1 is > row2, -1 if row1 is < row2, 0 if row1 == row2
       */
      _defaultSortComparatorInsensitiveDescending: function _defaultSortComparatorInsensitiveDescending(row1, row2, columnIndex) {
        var obj1 = row1[columnIndex].toLowerCase ? row1[columnIndex].toLowerCase() : row1[columnIndex];
        var obj2 = row2[columnIndex].toLowerCase ? row2[columnIndex].toLowerCase() : row2[columnIndex];
        if (qx.lang.Type.isNumber(obj1) && qx.lang.Type.isNumber(obj2)) {
          var result = isNaN(obj1) ? isNaN(obj2) ? 0 : 1 : isNaN(obj2) ? -1 : null;
          if (result != null) {
            return result;
          }
        }
        if (obj1 == null && obj2 !== null) {
          return 1;
        } else if (obj2 == null && obj1 !== null) {
          return -1;
        }
        return obj1 < obj2 ? 1 : obj1 == obj2 ? 0 : -1;
      }
    },
    members: {
      _rowArr: null,
      __editableColArr__P_202_2: null,
      __sortableColArr__P_202_3: null,
      __sortMethods__P_202_1: null,
      __sortColumnIndex__P_202_0: null,
      __sortAscending__P_202_4: null,
      // overridden
      getRowData: function getRowData(rowIndex) {
        var rowData = this._rowArr[rowIndex];
        if (rowData == null || rowData.originalData == null) {
          return rowData;
        } else {
          return rowData.originalData;
        }
      },
      /**
       * Returns the data of one row as map containing the column IDs as key and
       * the cell values as value. Also the meta data is included.
       *
       * @param rowIndex {Integer} the model index of the row.
       * @return {Map} a Map containing the column values.
       */
      getRowDataAsMap: function getRowDataAsMap(rowIndex) {
        var rowData = this._rowArr[rowIndex];
        if (rowData != null) {
          var map = {};
          // get the current set data
          for (var col = 0; col < this.getColumnCount(); col++) {
            map[this.getColumnId(col)] = rowData[col];
          }
          if (rowData.originalData != null) {
            // merge in the meta data
            for (var key in rowData.originalData) {
              if (map[key] == undefined) {
                map[key] = rowData.originalData[key];
              }
            }
          }
          return map;
        }
        // may be null, which is ok
        return rowData && rowData.originalData ? rowData.originalData : null;
      },
      /**
       * Gets the whole data as an array of maps.
       *
       * Note: Individual items are retrieved by {@link #getRowDataAsMap}.
       * @return {Map[]} Array of row data maps
       */
      getDataAsMapArray: function getDataAsMapArray() {
        var len = this.getRowCount();
        var data = [];
        for (var i = 0; i < len; i++) {
          data.push(this.getRowDataAsMap(i));
        }
        return data;
      },
      /**
       * Sets all columns editable or not editable.
       *
       * @param editable {Boolean} whether all columns are editable.
       */
      setEditable: function setEditable(editable) {
        this.__editableColArr__P_202_2 = [];
        for (var col = 0; col < this.getColumnCount(); col++) {
          this.__editableColArr__P_202_2[col] = editable;
        }
        this.fireEvent("metaDataChanged");
      },
      /**
       * Sets whether a column is editable.
       *
       * @param columnIndex {Integer} the column of which to set the editable state.
       * @param editable {Boolean} whether the column should be editable.
       */
      setColumnEditable: function setColumnEditable(columnIndex, editable) {
        if (editable != this.isColumnEditable(columnIndex)) {
          if (this.__editableColArr__P_202_2 == null) {
            this.__editableColArr__P_202_2 = [];
          }
          this.__editableColArr__P_202_2[columnIndex] = editable;
          this.fireEvent("metaDataChanged");
        }
      },
      // overridden
      isColumnEditable: function isColumnEditable(columnIndex) {
        return this.__editableColArr__P_202_2 ? this.__editableColArr__P_202_2[columnIndex] == true : false;
      },
      /**
       * Sets whether a column is sortable.
       *
       * @param columnIndex {Integer} the column of which to set the sortable state.
       * @param sortable {Boolean} whether the column should be sortable.
       */
      setColumnSortable: function setColumnSortable(columnIndex, sortable) {
        if (sortable != this.isColumnSortable(columnIndex)) {
          if (this.__sortableColArr__P_202_3 == null) {
            this.__sortableColArr__P_202_3 = [];
          }
          this.__sortableColArr__P_202_3[columnIndex] = sortable;
          this.fireEvent("metaDataChanged");
        }
      },
      // overridden
      isColumnSortable: function isColumnSortable(columnIndex) {
        return this.__sortableColArr__P_202_3 ? this.__sortableColArr__P_202_3[columnIndex] !== false : true;
      },
      // overridden
      sortByColumn: function sortByColumn(columnIndex, ascending) {
        // NOTE: We use different comparators for ascending and descending,
        //     because comparators should be really fast.
        var comparator;
        var sortMethods = this.__sortMethods__P_202_1[columnIndex];
        if (sortMethods) {
          comparator = ascending ? sortMethods.ascending : sortMethods.descending;
        } else {
          if (this.getCaseSensitiveSorting()) {
            comparator = ascending ? qx.ui.table.model.Simple._defaultSortComparatorAscending : qx.ui.table.model.Simple._defaultSortComparatorDescending;
          } else {
            comparator = ascending ? qx.ui.table.model.Simple._defaultSortComparatorInsensitiveAscending : qx.ui.table.model.Simple._defaultSortComparatorInsensitiveDescending;
          }
        }
        comparator.columnIndex = columnIndex;
        this._rowArr.sort(function (row1, row2) {
          return comparator(row1, row2, columnIndex);
        });
        this.__sortColumnIndex__P_202_0 = columnIndex;
        this.__sortAscending__P_202_4 = ascending;
        var data = {
          columnIndex: columnIndex,
          ascending: ascending
        };
        this.fireDataEvent("sorted", data);
        this.fireEvent("metaDataChanged");
      },
      /**
       * Specify the methods to use for ascending and descending sorts of a
       * particular column.
       *
       * @param columnIndex {Integer}
       *   The index of the column for which the sort methods are being
       *   provided.
       *
       * @param compare {Function|Map}
       *   If provided as a Function, this is the comparator function to sort in
       *   ascending order. It takes three parameters: the two arrays of row data,
       *   row1 and row2, being compared and the column index sorting was requested
       *   for.
       *
       *   For backwards compatability, user-supplied compare functions may still
       *   take only two parameters, the two arrays of row data, row1 and row2,
       *   being compared and obtain the column index as arguments.callee.columnIndex.
       *   This is deprecated, however, as arguments.callee is disallowed in ES5 strict
       *   mode and ES6.
       *
       *   The comparator function must return 1, 0 or -1, when the column in row1
       *   is greater than, equal to, or less than, respectively, the column in
       *   row2.
       *
       *   If this parameter is a Map, it shall have two properties: "ascending"
       *   and "descending". The property value of each is a comparator
       *   function, as described above.
       *
       *   If only the "ascending" function is provided (i.e. this parameter is
       *   a Function, not a Map), then the "descending" function is built
       *   dynamically by passing the two parameters to the "ascending" function
       *   in reversed order. <i>Use of a dynamically-built "descending" function
       *   generates at least one extra function call for each row in the table,
       *   and possibly many more. If the table is expected to have more than
       *   about 1000 rows, you will likely want to provide a map with a custom
       *   "descending" sort function as well as the "ascending" one.</i>
       *
       */
      setSortMethods: function setSortMethods(columnIndex, compare) {
        var methods;
        if (qx.lang.Type.isFunction(compare)) {
          methods = {
            ascending: compare,
            descending: function descending(row1, row2, columnIndex) {
              /* assure backwards compatibility for sort functions using
               * arguments.callee.columnIndex and fix a bug where retreiveing
               * column index via this way did not work for the case where a
               * single comparator function was used.
               * Note that arguments.callee is not available in ES5 strict mode and ES6.
               * See discussion in
               * https://github.com/qooxdoo/qooxdoo/pull/9499#pullrequestreview-99655182
               */
              compare.columnIndex = columnIndex;
              return compare(row2, row1, columnIndex);
            }
          };
        } else {
          methods = compare;
        }
        this.__sortMethods__P_202_1[columnIndex] = methods;
      },
      /**
       * Returns the sortMethod(s) for a table column.
       *
       * @param columnIndex {Integer} The index of the column for which the sort
       *   methods are being  provided.
       *
       * @return {Map} a map with the two properties "ascending"
       *   and "descending" for the specified column.
       *   The property value of each is a comparator function, as described
       *   in {@link #setSortMethods}.
       */
      getSortMethods: function getSortMethods(columnIndex) {
        return this.__sortMethods__P_202_1[columnIndex];
      },
      /**
       * Clears the sorting.
       */
      clearSorting: function clearSorting() {
        if (this.__sortColumnIndex__P_202_0 != -1) {
          this.__sortColumnIndex__P_202_0 = -1;
          this.__sortAscending__P_202_4 = true;
          this.fireEvent("metaDataChanged");
        }
      },
      // overridden
      getSortColumnIndex: function getSortColumnIndex() {
        return this.__sortColumnIndex__P_202_0;
      },
      /**
       * Set the sort column index
       *
       * WARNING: This should be called only by subclasses with intimate
       *          knowledge of what they are doing!
       *
       * @param columnIndex {Integer} index of the column
       */
      _setSortColumnIndex: function _setSortColumnIndex(columnIndex) {
        this.__sortColumnIndex__P_202_0 = columnIndex;
      },
      // overridden
      isSortAscending: function isSortAscending() {
        return this.__sortAscending__P_202_4;
      },
      /**
       * Set whether to sort in ascending order or not.
       *
       * WARNING: This should be called only by subclasses with intimate
       *          knowledge of what they are doing!
       *
       * @param ascending {Boolean}
       *   <i>true</i> for an ascending sort;
       *   <i> false</i> for a descending sort.
       */
      _setSortAscending: function _setSortAscending(ascending) {
        this.__sortAscending__P_202_4 = ascending;
      },
      // overridden
      getRowCount: function getRowCount() {
        return this._rowArr.length;
      },
      // overridden
      getValue: function getValue(columnIndex, rowIndex) {
        if (rowIndex < 0 || rowIndex >= this._rowArr.length) {
          throw new Error("this._rowArr out of bounds: " + rowIndex + " (0.." + this._rowArr.length + ")");
        }
        return this._rowArr[rowIndex][columnIndex];
      },
      // overridden
      setValue: function setValue(columnIndex, rowIndex, value) {
        if (this._rowArr[rowIndex][columnIndex] != value) {
          this._rowArr[rowIndex][columnIndex] = value;

          // Inform the listeners
          if (this.hasListener("dataChanged")) {
            var data = {
              firstRow: rowIndex,
              lastRow: rowIndex,
              firstColumn: columnIndex,
              lastColumn: columnIndex
            };
            this.fireDataEvent("dataChanged", data);
          }
          if (columnIndex == this.__sortColumnIndex__P_202_0) {
            this.clearSorting();
          }
        }
      },
      /**
       * Sets the whole data in a bulk.
       *
       * @param rowArr {var[][]} An array containing an array for each row. Each
       *          row-array contains the values in that row in the order of the columns
       *          in this model.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setData: function setData(rowArr, clearSorting) {
        this._checkEditing();
        this._rowArr = rowArr;

        // Inform the listeners
        if (this.hasListener("dataChanged")) {
          var data = {
            firstRow: 0,
            lastRow: rowArr.length - 1,
            firstColumn: 0,
            lastColumn: this.getColumnCount() - 1
          };
          this.fireDataEvent("dataChanged", data);
        }
        if (clearSorting !== false) {
          this.clearSorting();
        }
      },
      /**
       * Returns the data of this model.
       *
       * Warning: Do not alter this array! If you want to change the data use
       * {@link #setData}, {@link #setDataAsMapArray} or {@link #setValue} instead.
       *
       * @return {var[][]} An array containing an array for each row. Each
       *           row-array contains the values in that row in the order of the columns
       *           in this model.
       */
      getData: function getData() {
        return this._rowArr;
      },
      /**
       * Sets the whole data in a bulk.
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *        row-map contains the column IDs as key and the cell values as value.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setDataAsMapArray: function setDataAsMapArray(mapArr, rememberMaps, clearSorting) {
        this.setData(this._mapArray2RowArr(mapArr, rememberMaps), clearSorting);
      },
      /**
       * Adds some rows to the model.
       *
       * Warning: The given array will be altered!
       *
       * @param rowArr {var[][]} An array containing an array for each row. Each
       *          row-array contains the values in that row in the order of the columns
       *          in this model.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *          the rows are appended to the end.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      addRows: function addRows(rowArr, startIndex, clearSorting) {
        if (startIndex == null) {
          startIndex = this._rowArr.length;
        }

        // Prepare the rowArr so it can be used for apply
        rowArr.splice(0, 0, startIndex, 0);

        // Insert the new rows
        Array.prototype.splice.apply(this._rowArr, rowArr);

        // Inform the listeners
        var data = {
          firstRow: startIndex,
          lastRow: this._rowArr.length - 1,
          firstColumn: 0,
          lastColumn: this.getColumnCount() - 1
        };
        this.fireDataEvent("dataChanged", data);
        if (clearSorting !== false) {
          this.clearSorting();
        }
      },
      /**
       * Adds some rows to the model.
       *
       * Warning: The given array (mapArr) will be altered!
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *        row-map contains the column IDs as key and the cell values as value.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *        the rows are appended to the end.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      addRowsAsMapArray: function addRowsAsMapArray(mapArr, startIndex, rememberMaps, clearSorting) {
        this.addRows(this._mapArray2RowArr(mapArr, rememberMaps), startIndex, clearSorting);
      },
      /**
       * Sets rows in the model. The rows overwrite the old rows starting at
       * <code>startIndex</code> to <code>startIndex+rowArr.length</code>.
       *
       * Warning: The given array will be altered!
       *
       * @param rowArr {var[][]} An array containing an array for each row. Each
       *          row-array contains the values in that row in the order of the columns
       *          in this model.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *          the rows are set from the beginning (0).
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setRows: function setRows(rowArr, startIndex, clearSorting) {
        this._checkEditing();
        if (startIndex == null) {
          startIndex = 0;
        }

        // store the original length before we alter rowArr for use in splice.apply
        var rowArrLength = rowArr.length;

        // Prepare the rowArr so it can be used for apply
        rowArr.splice(0, 0, startIndex, rowArr.length);

        // Replace rows
        Array.prototype.splice.apply(this._rowArr, rowArr);

        // Inform the listeners
        var data = {
          firstRow: startIndex,
          lastRow: startIndex + rowArrLength - 1,
          firstColumn: 0,
          lastColumn: this.getColumnCount() - 1
        };
        this.fireDataEvent("dataChanged", data);
        if (clearSorting !== false) {
          this.clearSorting();
        }
      },
      /**
       * Set rows in the model. The rows overwrite the old rows starting at
       * <code>startIndex</code> to <code>startIndex+rowArr.length</code>.
       *
       * Warning: The given array (mapArr) will be altered!
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *        row-map contains the column IDs as key and the cell values as value.
       * @param startIndex {Integer ? null} The index where to insert the new rows. If null,
       *        the rows are appended to the end.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      setRowsAsMapArray: function setRowsAsMapArray(mapArr, startIndex, rememberMaps, clearSorting) {
        this.setRows(this._mapArray2RowArr(mapArr, rememberMaps), startIndex, clearSorting);
      },
      /**
       * Removes some rows from the model.
       *
       * @param startIndex {Integer} the index of the first row to remove.
       * @param howMany {Integer} the number of rows to remove.
       * @param clearSorting {Boolean ? true} Whether to clear the sort state.
       */
      removeRows: function removeRows(startIndex, howMany, clearSorting) {
        this._checkEditing();
        // In the case of `removeRows`, specifically, we must create the
        // listeners' event data before actually removing the rows from
        // the row data, so that the `lastRow` calculation is correct.
        // If we do the delete operation first, as is done in other
        // methods, the final rows of the table can escape being
        // updated, thus leaving hanging old data on the rendered table.
        // This reordering (deleting after creating event data) fixes #10365.
        var data = {
          firstRow: startIndex,
          lastRow: this._rowArr.length - 1,
          firstColumn: 0,
          lastColumn: this.getColumnCount() - 1,
          removeStart: startIndex,
          removeCount: howMany
        };
        this._rowArr.splice(startIndex, howMany);

        // Inform the listeners
        this.fireDataEvent("dataChanged", data);
        if (clearSorting !== false) {
          this.clearSorting();
        }
      },
      /**
       * Creates an array of maps to an array of arrays.
       *
       * @param mapArr {Map[]} An array containing a map for each row. Each
       *          row-map contains the column IDs as key and the cell values as value.
       * @param rememberMaps {Boolean ? false} Whether to remember the original maps.
       *        If true {@link #getRowData} will return the original map.
       * @return {var[][]} An array containing an array for each row. Each
       *           row-array contains the values in that row in the order of the columns
       *           in this model.
       */
      _mapArray2RowArr: function _mapArray2RowArr(mapArr, rememberMaps) {
        var rowCount = mapArr.length;
        var columnCount = this.getColumnCount();
        var dataArr = new Array(rowCount);
        var columnArr;
        for (var i = 0; i < rowCount; ++i) {
          columnArr = [];
          if (rememberMaps) {
            columnArr.originalData = mapArr[i];
          }
          for (var j = 0; j < columnCount; ++j) {
            columnArr[j] = mapArr[i][this.getColumnId(j)];
          }
          dataArr[i] = columnArr;
        }
        return dataArr;
      }
    },
    destruct: function destruct() {
      this._rowArr = this.__editableColArr__P_202_2 = this.__sortMethods__P_202_1 = this.__sortableColArr__P_202_3 = null;
    }
  });
  qx.ui.table.model.Simple.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.theme.manager.Decoration": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The focus indicator widget
   */
  qx.Class.define("qx.ui.table.pane.FocusIndicator", {
    extend: qx.ui.container.Composite,
    /**
     * @param scroller {qx.ui.table.pane.Scroller} The scroller, which contains this focus indicator
     */
    construct: function construct(scroller) {
      // use the grow layout to make sure that the editing control
      // always fills the focus indicator box.
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.Grow());
      this.__scroller__P_212_0 = scroller;
      this.setKeepActive(true);
      this.addListener("keypress", this._onKeyPress, this);
    },
    properties: {
      // overridden
      visibility: {
        refine: true,
        init: "excluded"
      },
      /** Table row, where the indicator is placed. */
      row: {
        check: "Integer",
        nullable: true
      },
      /** Table column, where the indicator is placed. */
      column: {
        check: "Integer",
        nullable: true
      }
    },
    members: {
      __scroller__P_212_0: null,
      /**
       * Keypress handler. Suppress all key events but "Enter" and "Escape"
       *
       * @param e {qx.event.type.KeySequence} key event
       */
      _onKeyPress: function _onKeyPress(e) {
        var iden = e.getKeyIdentifier();
        if (iden !== "Escape" && iden !== "Enter") {
          e.stopPropagation();
        }
      },
      /**
       * Move the focus indicator to the given table cell.
       *
       * @param col {Integer?null} The table column
       * @param row {Integer?null} The table row
       * @param editing {Boolean?null} Whether or not the cell is being edited
       */
      moveToCell: function moveToCell(col, row, editing) {
        // check if the focus indicator is shown and if the new column is
        // editable. if not, just exclude the indicator because the pointer events
        // should go to the cell itself linked with HTML links [BUG #4250]
        if (!this.__scroller__P_212_0.getShowCellFocusIndicator() && !this.__scroller__P_212_0.getTable().getTableModel().isColumnEditable(col)) {
          this.exclude();
          return;
        } else {
          this.show();
        }
        if (col == null) {
          this.hide();
          this.setRow(null);
          this.setColumn(null);
        } else {
          var xPos = this.__scroller__P_212_0.getTablePaneModel().getX(col);
          if (xPos === -1) {
            this.hide();
            this.setRow(null);
            this.setColumn(null);
          } else {
            var table = this.__scroller__P_212_0.getTable();
            var columnModel = table.getTableColumnModel();
            var paneModel = this.__scroller__P_212_0.getTablePaneModel();
            var firstRow = this.__scroller__P_212_0.getTablePane().getFirstVisibleRow();
            var rowHeight = table.getRowHeight();
            var wt = 0;
            var wr = 0;
            var wb = 0;
            var wl = 0;
            var decoKey = this.getDecorator();
            if (decoKey) {
              var deco = qx.theme.manager.Decoration.getInstance().resolve(decoKey);
              if (deco) {
                wt = deco.getWidthTop();
                wr = deco.getWidthRight();
                wb = deco.getWidthBottom();
                wl = deco.getWidthLeft();
              }
            }
            var userHeight = rowHeight + (wl + wr - 2);
            var userTop = (row - firstRow) * rowHeight - (wr - 1);
            if (editing && this.__scroller__P_212_0.getMinCellEditHeight() && this.__scroller__P_212_0.getMinCellEditHeight() > userHeight) {
              userTop -= Math.floor((this.__scroller__P_212_0.getMinCellEditHeight() - userHeight) / 2);
              userHeight = this.__scroller__P_212_0.getMinCellEditHeight();
            }
            this.setUserBounds(paneModel.getColumnLeft(col) - (wt - 1), userTop, columnModel.getColumnWidth(col) + (wt + wb - 3), userHeight);
            this.show();
            this.setRow(row);
            this.setColumn(col);
          }
        }
      }
    },
    destruct: function destruct() {
      this.__scroller__P_212_0 = null;
    }
  });
  qx.ui.table.pane.FocusIndicator.$$dbClassInfo = $$dbClassInfo;
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
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Interface for a column menu item corresponding to a table column.
   */
  qx.Interface.define("qx.ui.table.IColumnMenuItem", {
    properties: {
      /**
       * Whether the table column associated with this menu item is visible
       * Should be of type {Boolean}!
       */
      columnVisible: {}
    },
    events: {
      /**
       * Dispatched when a column changes visibility state. The event data is a
       * boolean indicating whether the table column associated with this menu
       * item is now visible.
       */
      changeColumnVisible: "qx.event.type.Data"
    }
  });
  qx.ui.table.IColumnMenuItem.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.table.columnmodel.Basic": {
        "construct": true,
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.ui.table.columnmodel.resizebehavior.Abstract": {},
      "qx.ui.table.columnmodel.resizebehavior.Default": {},
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.tableResizeDebug": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A table column model that automatically resizes columns based on a
   * selected behavior.
   *
   * @see qx.ui.table.columnmodel.Basic
   */
  qx.Class.define("qx.ui.table.columnmodel.Resize", {
    extend: qx.ui.table.columnmodel.Basic,
    include: qx.locale.MTranslation,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.table.columnmodel.Basic.constructor.call(this);

      // We don't want to recursively call ourself based on our resetting of
      // column sizes.  Track when we're resizing.
      this.__bInProgress__P_201_0 = false;

      // Track when the table has appeared.  We want to ignore resize events
      // until then since we won't be able to determine the available width
      // anyway.
      this.__bAppeared__P_201_1 = false;
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * The behavior to use.
       *
       * The provided behavior must extend {@link qx.ui.table.columnmodel.resizebehavior.Abstract} and
       * implement the <i>onAppear</i>, <i>onTableWidthChanged</i>,
       * <i>onColumnWidthChanged</i> and <i>onVisibilityChanged</i>methods.
       */
      behavior: {
        check: "qx.ui.table.columnmodel.resizebehavior.Abstract",
        init: null,
        nullable: true,
        apply: "_applyBehavior",
        event: "changeBehavior"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __bAppeared__P_201_1: null,
      __bInProgress__P_201_0: null,
      __table__P_201_2: null,
      // Behavior modifier
      _applyBehavior: function _applyBehavior(value, old) {
        if (old != null) {
          old.dispose();
          old = null;
        }

        // Tell the new behavior how many columns there are
        value._setNumColumns(this.getOverallColumnCount());
        value.setTableColumnModel(this);
      },
      /**
       * Initializes the column model.
       *
       * @param numColumns {Integer} the number of columns the model should have.
       * @param table {qx.ui.table.Table}
       *   The table which this model is used for. This allows us access to
       *   other aspects of the table, as the <i>behavior</i> sees fit.
       */
      init: function init(numColumns, table) {
        // Call our superclass
        qx.ui.table.columnmodel.Resize.superclass.prototype.init.call(this, numColumns, table);
        if (this.__table__P_201_2 == null) {
          this.__table__P_201_2 = table;
          // We'll do our column resizing when the table appears, ...
          table.addListener("appear", this._onappear, this);

          // ... when the inner width of the table changes, ...
          table.addListener("tableWidthChanged", this._onTableWidthChanged, this);

          // ... when a vertical scroll bar appears or disappears
          table.addListener("verticalScrollBarChanged", this._onverticalscrollbarchanged, this);

          // We want to manipulate the button visibility menu
          table.addListener("columnVisibilityMenuCreateEnd", this._addResetColumnWidthButton, this);

          // ... when columns are resized, ...
          this.addListener("widthChanged", this._oncolumnwidthchanged, this);

          // ... and when a column visibility changes.
          this.addListener("visibilityChanged", this._onvisibilitychanged, this);
        }

        // Set the initial resize behavior
        if (this.getBehavior() == null) {
          this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
        }

        // Tell the behavior how many columns there are
        this.getBehavior()._setNumColumns(numColumns);
      },
      /**
       * Get the table widget
       *
       * @return {qx.ui.table.Table} the table widget
       */
      getTable: function getTable() {
        return this.__table__P_201_2;
      },
      /**
       * Reset the column widths to their "onappear" defaults.
       *
       * @param event {qx.event.type.Data}
       *   The "columnVisibilityMenuCreateEnd" event indicating that the menu is
       *   being generated.  The data is a map containing properties <i>table</i>
       *   and <i>menu</i>.
       *
       */
      _addResetColumnWidthButton: function _addResetColumnWidthButton(event) {
        var data = event.getData();
        var columnButton = data.columnButton;
        var menu = data.menu;
        var o;

        // Add a separator between the column names and our reset button
        o = columnButton.factory("separator");
        menu.add(o);

        // Add a button to reset the column widths
        o = columnButton.factory("user-button", {
          text: this.tr("Reset column widths")
        });
        menu.add(o);
        o.addListener("execute", this._onappear, this);
      },
      /**
       * Event handler for the "appear" event.
       *
       * @param event {qx.event.type.Event}
       *   The "onappear" event object.
       *
       */
      _onappear: function _onappear(event) {
        // Is this a recursive call?
        if (this.__bInProgress__P_201_0) {
          // Yup.  Ignore it.
          return;
        }
        this.__bInProgress__P_201_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onappear");
          }
        }

        // this handler is also called by the "execute" event of the menu button
        this.getBehavior().onAppear(event, event.getType() !== "appear");
        this.__table__P_201_2._updateScrollerWidths();
        this.__table__P_201_2._updateScrollBarVisibility();
        this.__bInProgress__P_201_0 = false;
        this.__bAppeared__P_201_1 = true;
      },
      /**
       * Event handler for the "tableWidthChanged" event.
       *
       * @param event {qx.event.type.Event}
       *   The "onwindowresize" event object.
       *
       */
      _onTableWidthChanged: function _onTableWidthChanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_201_0 || !this.__bAppeared__P_201_1) {
          // Yup.  Ignore it.
          return;
        }
        this.__bInProgress__P_201_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("ontablewidthchanged");
          }
        }
        this.getBehavior().onTableWidthChanged(event);
        this.__bInProgress__P_201_0 = false;
      },
      /**
       * Event handler for the "verticalScrollBarChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "verticalScrollBarChanged" event object.  The data is a boolean
       *   indicating whether a vertical scroll bar is now present.
       *
       */
      _onverticalscrollbarchanged: function _onverticalscrollbarchanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_201_0 || !this.__bAppeared__P_201_1) {
          // Yup.  Ignore it.
          return;
        }
        this.__bInProgress__P_201_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onverticalscrollbarchanged");
          }
        }
        this.getBehavior().onVerticalScrollBarChanged(event);
        qx.event.Timer.once(function () {
          if (this.__table__P_201_2 && !this.__table__P_201_2.isDisposed()) {
            this.__table__P_201_2._updateScrollerWidths();
            this.__table__P_201_2._updateScrollBarVisibility();
          }
        }, this, 0);
        this.__bInProgress__P_201_0 = false;
      },
      /**
       * Event handler for the "widthChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "widthChanged" event object.
       *
       */
      _oncolumnwidthchanged: function _oncolumnwidthchanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_201_0 || !this.__bAppeared__P_201_1) {
          // Yup.  Ignore it.
          return;
        }
        this.__bInProgress__P_201_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("oncolumnwidthchanged");
          }
        }
        this.getBehavior().onColumnWidthChanged(event);
        this.__bInProgress__P_201_0 = false;
      },
      /**
       * Event handler for the "visibilityChanged" event.
       *
       * @param event {qx.event.type.Data}
       *   The "visibilityChanged" event object.
       *
       */
      _onvisibilitychanged: function _onvisibilitychanged(event) {
        // Is this a recursive call or has the table not yet been rendered?
        if (this.__bInProgress__P_201_0 || !this.__bAppeared__P_201_1) {
          // Yup.  Ignore it.
          return;
        }
        this.__bInProgress__P_201_0 = true;
        {
          if (qx.core.Environment.get("qx.tableResizeDebug")) {
            this.debug("onvisibilitychanged");
          }
        }
        this.getBehavior().onVisibilityChanged(event);
        this.__bInProgress__P_201_0 = false;
      }
    },
    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      var behavior = this.getBehavior();
      if (behavior) {
        behavior.dispose();
      }
      this.__table__P_201_2 = null;
    }
  });
  qx.ui.table.columnmodel.Resize.$$dbClassInfo = $$dbClassInfo;
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * All widget used as scrollbars must implement this interface.
   */
  qx.Interface.define("qx.ui.core.scroll.IScrollBar", {
    events: {
      /** Fired if the user scroll */
      scroll: "qx.event.type.Data",
      /** Fired as soon as the scroll animation ended. */
      scrollAnimationEnd: "qx.event.type.Event"
    },
    properties: {
      /**
       * The scroll bar orientation
       */
      orientation: {},
      /**
       * The maximum value (difference between available size and
       * content size).
       */
      maximum: {},
      /**
       * Position of the scrollbar (which means the scroll left/top of the
       * attached area's pane)
       *
       * Strictly validates according to {@link #maximum}.
       * Does not apply any correction to the incoming value. If you depend
       * on this, please use {@link #scrollTo} instead.
       */
      position: {},
      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {}
    },
    members: {
      /**
       * Scrolls to the given position.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param position {Integer} Scroll to this position. Must be greater zero.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollTo: function scrollTo(position, duration) {
        this.assertNumber(position);
      },
      /**
       * Scrolls by the given offset.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param offset {Integer} Scroll by this offset
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBy: function scrollBy(offset, duration) {
        this.assertNumber(offset);
      },
      /**
       * Scrolls by the given number of steps.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param steps {Integer} Number of steps
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBySteps: function scrollBySteps(steps, duration) {
        this.assertNumber(steps);
      }
    }
  });
  qx.ui.core.scroll.IScrollBar.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.core.scroll.IScrollBar": {
        "require": true
      },
      "qx.ui.core.scroll.ScrollSlider": {},
      "qx.ui.form.RepeatButton": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.VBox": {}
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
   * The scroll bar widget, is a special slider, which is used in qooxdoo instead
   * of the native browser scroll bars.
   *
   * Scroll bars are used by the {@link qx.ui.container.Scroll} container. Usually
   * a scroll bar is not used directly.
   *
   * @childControl slider {qx.ui.core.scroll.ScrollSlider} scroll slider component
   * @childControl button-begin {qx.ui.form.RepeatButton} button to scroll to top
   * @childControl button-end {qx.ui.form.RepeatButton} button to scroll to bottom
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var scrollBar = new qx.ui.core.scroll.ScrollBar("horizontal");
   *   scrollBar.set({
   *     maximum: 500
   *   })
   *   this.getRoot().add(scrollBar);
   * </pre>
   *
   * This example creates a horizontal scroll bar with a maximum value of 500.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/scrollbar.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.core.scroll.ScrollBar", {
    extend: qx.ui.core.Widget,
    implement: qx.ui.core.scroll.IScrollBar,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param orientation {String?"horizontal"} The initial scroll bar orientation
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this);

      // Create child controls
      this._createChildControl("button-begin");
      this._createChildControl("slider").addListener("resize", this._onResizeSlider, this);
      this._createChildControl("button-end");

      // Configure orientation
      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      }

      // prevent drag & drop on scrolling
      this.addListener("track", function (e) {
        e.stopPropagation();
      });
    },
    events: {
      /** Change event for the value. */
      scrollAnimationEnd: "qx.event.type.Event"
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
        init: "scrollbar"
      },
      /**
       * The scroll bar orientation
       */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },
      /**
       * The maximum value (difference between available size and
       * content size).
       */
      maximum: {
        check: "PositiveInteger",
        apply: "_applyMaximum",
        init: 100
      },
      /**
       * Position of the scrollbar (which means the scroll left/top of the
       * attached area's pane)
       *
       * Strictly validates according to {@link #maximum}.
       * Does not apply any correction to the incoming value. If you depend
       * on this, please use {@link #scrollTo} instead.
       */
      position: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",
        init: 0,
        apply: "_applyPosition",
        event: "scroll"
      },
      /**
       * Step size for each tap on the up/down or left/right buttons.
       */
      singleStep: {
        check: "Integer",
        init: 20
      },
      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing <code>PageUp</code> or <code>PageDown</code>.
       */
      pageStep: {
        check: "Integer",
        init: 10,
        apply: "_applyPageStep"
      },
      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {
        check: "PositiveNumber",
        apply: "_applyKnobFactor",
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __offset__P_216_0: 2,
      __originalMinSize__P_216_1: 0,
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var hint = qx.ui.core.scroll.ScrollBar.superclass.prototype._computeSizeHint.call(this);
        if (this.getOrientation() === "horizontal") {
          this.__originalMinSize__P_216_1 = hint.minWidth;
          hint.minWidth = 0;
        } else {
          this.__originalMinSize__P_216_1 = hint.minHeight;
          hint.minHeight = 0;
        }
        return hint;
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        var changes = qx.ui.core.scroll.ScrollBar.superclass.prototype.renderLayout.call(this, left, top, width, height);
        var horizontal = this.getOrientation() === "horizontal";
        if (this.__originalMinSize__P_216_1 >= (horizontal ? width : height)) {
          this.getChildControl("button-begin").setVisibility("hidden");
          this.getChildControl("button-end").setVisibility("hidden");
        } else {
          this.getChildControl("button-begin").setVisibility("visible");
          this.getChildControl("button-end").setVisibility("visible");
        }
        return changes;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "slider":
            control = new qx.ui.core.scroll.ScrollSlider();
            control.setPageStep(100);
            control.setFocusable(false);
            control.addListener("changeValue", this._onChangeSliderValue, this);
            control.addListener("slideAnimationEnd", this._onSlideAnimationEnd, this);
            this._add(control, {
              flex: 1
            });
            break;
          case "button-begin":
            // Top/Left Button
            control = new qx.ui.form.RepeatButton();
            control.setFocusable(false);
            control.addListener("execute", this._onExecuteBegin, this);
            this._add(control);
            break;
          case "button-end":
            // Bottom/Right Button
            control = new qx.ui.form.RepeatButton();
            control.setFocusable(false);
            control.addListener("execute", this._onExecuteEnd, this);
            this._add(control);
            break;
        }
        return control || qx.ui.core.scroll.ScrollBar.superclass.prototype._createChildControlImpl.call(this, id);
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyMaximum: function _applyMaximum(value) {
        this.getChildControl("slider").setMaximum(value);
      },
      // property apply
      _applyPosition: function _applyPosition(value) {
        this.getChildControl("slider").setValue(value);
      },
      // property apply
      _applyKnobFactor: function _applyKnobFactor(value) {
        this.getChildControl("slider").setKnobFactor(value);
      },
      // property apply
      _applyPageStep: function _applyPageStep(value) {
        this.getChildControl("slider").setPageStep(value);
      },
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-orientation", value);

        // Dispose old layout
        var oldLayout = this._getLayout();
        if (oldLayout) {
          oldLayout.dispose();
        }

        // Reconfigure
        if (value === "horizontal") {
          this._setLayout(new qx.ui.layout.HBox());
          this.setAllowStretchX(true);
          this.setAllowStretchY(false);
          this.replaceState("vertical", "horizontal");
          this.getChildControl("button-begin").replaceState("up", "left");
          this.getChildControl("button-end").replaceState("down", "right");
        } else {
          this._setLayout(new qx.ui.layout.VBox());
          this.setAllowStretchX(false);
          this.setAllowStretchY(true);
          this.replaceState("horizontal", "vertical");
          this.getChildControl("button-begin").replaceState("left", "up");
          this.getChildControl("button-end").replaceState("right", "down");
        }

        // Sync slider orientation
        this.getChildControl("slider").setOrientation(value);
      },
      /*
      ---------------------------------------------------------------------------
        METHOD REDIRECTION TO SLIDER
      ---------------------------------------------------------------------------
      */
      /**
       * Scrolls to the given position.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param position {Integer} Scroll to this position. Must be greater zero.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollTo: function scrollTo(position, duration) {
        this.getChildControl("slider").slideTo(position, duration);
      },
      /**
       * Scrolls by the given offset.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param offset {Integer} Scroll by this offset
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBy: function scrollBy(offset, duration) {
        this.getChildControl("slider").slideBy(offset, duration);
      },
      /**
       * Scrolls by the given number of steps.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param steps {Integer} Number of steps
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBySteps: function scrollBySteps(steps, duration) {
        var size = this.getSingleStep();
        this.getChildControl("slider").slideBy(steps * size, duration);
      },
      /**
       * Updates the position property considering the minimum and maximum values.
       * @param position {Number} The new position.
       */
      updatePosition: function updatePosition(position) {
        this.getChildControl("slider").updatePosition(position);
      },
      /**
       * If a scroll animation is running, it will be stopped.
       */
      stopScrollAnimation: function stopScrollAnimation() {
        this.getChildControl("slider").stopSlideAnimation();
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */
      /**
       * Executed when the up/left button is executed (pressed)
       *
       * @param e {qx.event.type.Event} Execute event of the button
       */
      _onExecuteBegin: function _onExecuteBegin(e) {
        this.scrollBy(-this.getSingleStep(), 50);
      },
      /**
       * Executed when the down/right button is executed (pressed)
       *
       * @param e {qx.event.type.Event} Execute event of the button
       */
      _onExecuteEnd: function _onExecuteEnd(e) {
        this.scrollBy(this.getSingleStep(), 50);
      },
      /**
       * Change listener for slider animation end.
       */
      _onSlideAnimationEnd: function _onSlideAnimationEnd() {
        this.fireEvent("scrollAnimationEnd");
      },
      /**
       * Change listener for slider value changes.
       *
       * @param e {qx.event.type.Data} The change event object
       */
      _onChangeSliderValue: function _onChangeSliderValue(e) {
        this.setPosition(e.getData());
      },
      /**
       * Hide the knob of the slider if the slidebar is too small or show it
       * otherwise.
       *
       * @param e {qx.event.type.Data} event object
       */
      _onResizeSlider: function _onResizeSlider(e) {
        var knob = this.getChildControl("slider").getChildControl("knob");
        var knobHint = knob.getSizeHint();
        var hideKnob = false;
        var sliderSize = this.getChildControl("slider").getInnerSize();
        if (this.getOrientation() == "vertical") {
          if (sliderSize.height < knobHint.minHeight + this.__offset__P_216_0) {
            hideKnob = true;
          }
        } else {
          if (sliderSize.width < knobHint.minWidth + this.__offset__P_216_0) {
            hideKnob = true;
          }
        }
        if (hideKnob) {
          knob.exclude();
        } else {
          knob.show();
        }
      }
    }
  });
  qx.ui.core.scroll.ScrollBar.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.IField": {
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all form widgets which have boolean as their primary
   * data type like a checkbox.
   */
  qx.Interface.define("qx.ui.form.IBooleanForm", {
    extend: qx.ui.form.IField,
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired when the value was modified */
      changeValue: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        VALUE PROPERTY
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the element's value.
       *
       * @param value {Boolean|null} The new value of the element.
       */
      setValue: function setValue(value) {
        return arguments.length == 1;
      },
      /**
       * Resets the element's value to its initial value.
       */
      resetValue: function resetValue() {},
      /**
       * The element's user set value.
       *
       * @return {Boolean|null} The value.
       */
      getValue: function getValue() {}
    }
  });
  qx.ui.form.IBooleanForm.$$dbClassInfo = $$dbClassInfo;
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
      },
      "qx.ui.form.IBooleanForm": {
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Renders a special checkbox button inside a menu. The button behaves like
   * a normal {@link qx.ui.form.CheckBox} and shows a check icon when
   * checked; normally shows no icon when not checked (depends on the theme).
   */
  qx.Class.define("qx.ui.menu.CheckBox", {
    extend: qx.ui.menu.AbstractButton,
    implement: [qx.ui.form.IBooleanForm],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param label {String} Initial label
     * @param menu {qx.ui.menu.Menu} Initial sub menu
     */
    construct: function construct(label, menu) {
      qx.ui.menu.AbstractButton.constructor.call(this);

      // ARIA attrs
      var contenEl = this.getContentElement();
      contenEl.setAttribute("role", "checkbox");
      contenEl.setAttribute("aria-checked", false);

      // Initialize with incoming arguments
      if (label != null) {
        // try to translate every time you create a checkbox [BUG #2699]
        if (label.translate) {
          this.setLabel(label.translate());
        } else {
          this.setLabel(label);
        }
      }
      if (menu != null) {
        this.setMenu(menu);
      }
      this.addListener("execute", this._onExecute, this);
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
        init: "menu-checkbox"
      },
      /** Whether the button is checked */
      value: {
        check: "Boolean",
        init: false,
        apply: "_applyValue",
        event: "changeValue",
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      // overridden (from MExecutable to keep the icon out of the binding)
      /**
       * @lint ignoreReferenceField(_bindableProperties)
       */
      _bindableProperties: ["enabled", "label", "toolTipText", "value", "menu"],
      // property apply
      _applyValue: function _applyValue(value, old) {
        value ? this.addState("checked") : this.removeState("checked");

        // ARIA attrs
        this.getContentElement().setAttribute("aria-checked", Boolean(value));
      },
      /**
       * Handler for the execute event.
       *
       * @param e {qx.event.type.Event} The execute event.
       */
      _onExecute: function _onExecute(e) {
        this.toggleValue();
      }
    }
  });
  qx.ui.menu.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.CheckBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IColumnMenuItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A menu item.
   */
  qx.Class.define("qx.ui.table.columnmenu.MenuItem", {
    extend: qx.ui.menu.CheckBox,
    implement: qx.ui.table.IColumnMenuItem,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * Create a new instance of an item for insertion into the table column
     * visibility menu.
     *
     * @param text {String}
     *   Text for the menu item, most typically the name of the column in the
     *   table.
     */
    construct: function construct(text) {
      qx.ui.menu.CheckBox.constructor.call(this, text);

      // Two way binding this.columnVisible <--> this.value
      this.bind("value", this, "columnVisible");
      this.bind("columnVisible", this, "value");
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      columnVisible: {
        check: "Boolean",
        init: true,
        event: "changeColumnVisible"
      }
    }
  });
  qx.ui.table.columnmenu.MenuItem.$$dbClassInfo = $$dbClassInfo;
})();

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
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.basic.Label": {},
      "qx.ui.basic.Image": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The default header cell widget
   *
   * @childControl label {qx.ui.basic.Label} label of the header cell
   * @childControl sort-icon {qx.ui.basic.Image} sort icon of the header cell
   * @childControl icon {qx.ui.basic.Image} icon of the header cell
   */
  qx.Class.define("qx.ui.table.headerrenderer.HeaderCell", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this);
      var layout = new qx.ui.layout.Grid();
      layout.setRowFlex(0, 1);
      layout.setColumnFlex(1, 1);
      layout.setColumnFlex(2, 1);
      this.setLayout(layout);

      // ARIA attrs
      this.getContentElement().setAttribute("role", "columnheader");
    },
    properties: {
      appearance: {
        refine: true,
        init: "table-header-cell"
      },
      /** header cell label */
      label: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applyLabel"
      },
      /** The icon URL of the sorting indicator */
      sortIcon: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applySortIcon",
        themeable: true
      },
      /** Icon URL */
      icon: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applyIcon"
      }
    },
    members: {
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        if (value) {
          this._showChildControl("label").setValue(value);
        } else {
          this._excludeChildControl("label");
        }
      },
      // property apply
      _applySortIcon: function _applySortIcon(value, old) {
        if (value) {
          this._showChildControl("sort-icon").setSource(value);
        } else {
          this._excludeChildControl("sort-icon");
        }
      },
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        if (value) {
          this._showChildControl("icon").setSource(value);
        } else {
          this._excludeChildControl("icon");
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "label":
            control = new qx.ui.basic.Label(this.getLabel()).set({
              anonymous: true,
              allowShrinkX: true
            });
            this._add(control, {
              row: 0,
              column: 1
            });
            break;
          case "sort-icon":
            control = new qx.ui.basic.Image(this.getSortIcon());
            control.setAnonymous(true);
            this._add(control, {
              row: 0,
              column: 2
            });
            break;
          case "icon":
            control = new qx.ui.basic.Image(this.getIcon()).set({
              anonymous: true,
              allowShrinkX: true
            });
            this._add(control, {
              row: 0,
              column: 0
            });
            break;
        }
        return control || qx.ui.table.headerrenderer.HeaderCell.superclass.prototype._createChildControlImpl.call(this, id);
      }
    }
  });
  qx.ui.table.headerrenderer.HeaderCell.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.StringEscape": {},
      "qx.lang.Object": {
        "defer": "runtime"
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
  
  ************************************************************************ */

  /**
   * A Collection of utility functions to escape and unescape strings.
   */
  qx.Bootstrap.define("qx.bom.String", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** Mapping of HTML entity names to the corresponding char code */
      TO_CHARCODE: {
        quot: 34,
        // " - double-quote
        amp: 38,
        // &
        lt: 60,
        // <
        gt: 62,
        // >

        // http://www.w3.org/TR/REC-html40/sgml/entities.html
        // ISO 8859-1 characters
        nbsp: 160,
        // no-break space
        iexcl: 161,
        // inverted exclamation mark
        cent: 162,
        // cent sign
        pound: 163,
        // pound sterling sign
        curren: 164,
        // general currency sign
        yen: 165,
        // yen sign
        brvbar: 166,
        // broken (vertical) bar
        sect: 167,
        // section sign
        uml: 168,
        // umlaut (dieresis)
        copy: 169,
        // copyright sign
        ordf: 170,
        // ordinal indicator, feminine
        laquo: 171,
        // angle quotation mark, left
        not: 172,
        // not sign
        shy: 173,
        // soft hyphen
        reg: 174,
        // registered sign
        macr: 175,
        // macron
        deg: 176,
        // degree sign
        plusmn: 177,
        // plus-or-minus sign
        sup2: 178,
        // superscript two
        sup3: 179,
        // superscript three
        acute: 180,
        // acute accent
        micro: 181,
        // micro sign
        para: 182,
        // pilcrow (paragraph sign)
        middot: 183,
        // middle dot
        cedil: 184,
        // cedilla
        sup1: 185,
        // superscript one
        ordm: 186,
        // ordinal indicator, masculine
        raquo: 187,
        // angle quotation mark, right
        frac14: 188,
        // fraction one-quarter
        frac12: 189,
        // fraction one-half
        frac34: 190,
        // fraction three-quarters
        iquest: 191,
        // inverted question mark
        Agrave: 192,
        // capital A, grave accent
        Aacute: 193,
        // capital A, acute accent
        Acirc: 194,
        // capital A, circumflex accent
        Atilde: 195,
        // capital A, tilde
        Auml: 196,
        // capital A, dieresis or umlaut mark
        Aring: 197,
        // capital A, ring
        AElig: 198,
        // capital AE diphthong (ligature)
        Ccedil: 199,
        // capital C, cedilla
        Egrave: 200,
        // capital E, grave accent
        Eacute: 201,
        // capital E, acute accent
        Ecirc: 202,
        // capital E, circumflex accent
        Euml: 203,
        // capital E, dieresis or umlaut mark
        Igrave: 204,
        // capital I, grave accent
        Iacute: 205,
        // capital I, acute accent
        Icirc: 206,
        // capital I, circumflex accent
        Iuml: 207,
        // capital I, dieresis or umlaut mark
        ETH: 208,
        // capital Eth, Icelandic
        Ntilde: 209,
        // capital N, tilde
        Ograve: 210,
        // capital O, grave accent
        Oacute: 211,
        // capital O, acute accent
        Ocirc: 212,
        // capital O, circumflex accent
        Otilde: 213,
        // capital O, tilde
        Ouml: 214,
        // capital O, dieresis or umlaut mark
        times: 215,
        // multiply sign
        Oslash: 216,
        // capital O, slash
        Ugrave: 217,
        // capital U, grave accent
        Uacute: 218,
        // capital U, acute accent
        Ucirc: 219,
        // capital U, circumflex accent
        Uuml: 220,
        // capital U, dieresis or umlaut mark
        Yacute: 221,
        // capital Y, acute accent
        THORN: 222,
        // capital THORN, Icelandic
        szlig: 223,
        // small sharp s, German (sz ligature)
        agrave: 224,
        // small a, grave accent
        aacute: 225,
        // small a, acute accent
        acirc: 226,
        // small a, circumflex accent
        atilde: 227,
        // small a, tilde
        auml: 228,
        // small a, dieresis or umlaut mark
        aring: 229,
        // small a, ring
        aelig: 230,
        // small ae diphthong (ligature)
        ccedil: 231,
        // small c, cedilla
        egrave: 232,
        // small e, grave accent
        eacute: 233,
        // small e, acute accent
        ecirc: 234,
        // small e, circumflex accent
        euml: 235,
        // small e, dieresis or umlaut mark
        igrave: 236,
        // small i, grave accent
        iacute: 237,
        // small i, acute accent
        icirc: 238,
        // small i, circumflex accent
        iuml: 239,
        // small i, dieresis or umlaut mark
        eth: 240,
        // small eth, Icelandic
        ntilde: 241,
        // small n, tilde
        ograve: 242,
        // small o, grave accent
        oacute: 243,
        // small o, acute accent
        ocirc: 244,
        // small o, circumflex accent
        otilde: 245,
        // small o, tilde
        ouml: 246,
        // small o, dieresis or umlaut mark
        divide: 247,
        // divide sign
        oslash: 248,
        // small o, slash
        ugrave: 249,
        // small u, grave accent
        uacute: 250,
        // small u, acute accent
        ucirc: 251,
        // small u, circumflex accent
        uuml: 252,
        // small u, dieresis or umlaut mark
        yacute: 253,
        // small y, acute accent
        thorn: 254,
        // small thorn, Icelandic
        yuml: 255,
        // small y, dieresis or umlaut mark

        // Latin Extended-B
        fnof: 402,
        // latin small f with hook = function= florin, U+0192 ISOtech

        // Greek
        Alpha: 913,
        // greek capital letter alpha, U+0391
        Beta: 914,
        // greek capital letter beta, U+0392
        Gamma: 915,
        // greek capital letter gamma,U+0393 ISOgrk3
        Delta: 916,
        // greek capital letter delta,U+0394 ISOgrk3
        Epsilon: 917,
        // greek capital letter epsilon, U+0395
        Zeta: 918,
        // greek capital letter zeta, U+0396
        Eta: 919,
        // greek capital letter eta, U+0397
        Theta: 920,
        // greek capital letter theta,U+0398 ISOgrk3
        Iota: 921,
        // greek capital letter iota, U+0399
        Kappa: 922,
        // greek capital letter kappa, U+039A
        Lambda: 923,
        // greek capital letter lambda,U+039B ISOgrk3
        Mu: 924,
        // greek capital letter mu, U+039C
        Nu: 925,
        // greek capital letter nu, U+039D
        Xi: 926,
        // greek capital letter xi, U+039E ISOgrk3
        Omicron: 927,
        // greek capital letter omicron, U+039F
        Pi: 928,
        // greek capital letter pi, U+03A0 ISOgrk3
        Rho: 929,
        // greek capital letter rho, U+03A1

        // there is no Sigmaf, and no U+03A2 character either
        Sigma: 931,
        // greek capital letter sigma,U+03A3 ISOgrk3
        Tau: 932,
        // greek capital letter tau, U+03A4
        Upsilon: 933,
        // greek capital letter upsilon,U+03A5 ISOgrk3
        Phi: 934,
        // greek capital letter phi,U+03A6 ISOgrk3
        Chi: 935,
        // greek capital letter chi, U+03A7
        Psi: 936,
        // greek capital letter psi,U+03A8 ISOgrk3
        Omega: 937,
        // greek capital letter omega,U+03A9 ISOgrk3
        alpha: 945,
        // greek small letter alpha,U+03B1 ISOgrk3
        beta: 946,
        // greek small letter beta, U+03B2 ISOgrk3
        gamma: 947,
        // greek small letter gamma,U+03B3 ISOgrk3
        delta: 948,
        // greek small letter delta,U+03B4 ISOgrk3
        epsilon: 949,
        // greek small letter epsilon,U+03B5 ISOgrk3
        zeta: 950,
        // greek small letter zeta, U+03B6 ISOgrk3
        eta: 951,
        // greek small letter eta, U+03B7 ISOgrk3
        theta: 952,
        // greek small letter theta,U+03B8 ISOgrk3
        iota: 953,
        // greek small letter iota, U+03B9 ISOgrk3
        kappa: 954,
        // greek small letter kappa,U+03BA ISOgrk3
        lambda: 955,
        // greek small letter lambda,U+03BB ISOgrk3
        mu: 956,
        // greek small letter mu, U+03BC ISOgrk3
        nu: 957,
        // greek small letter nu, U+03BD ISOgrk3
        xi: 958,
        // greek small letter xi, U+03BE ISOgrk3
        omicron: 959,
        // greek small letter omicron, U+03BF NEW
        pi: 960,
        // greek small letter pi, U+03C0 ISOgrk3
        rho: 961,
        // greek small letter rho, U+03C1 ISOgrk3
        sigmaf: 962,
        // greek small letter final sigma,U+03C2 ISOgrk3
        sigma: 963,
        // greek small letter sigma,U+03C3 ISOgrk3
        tau: 964,
        // greek small letter tau, U+03C4 ISOgrk3
        upsilon: 965,
        // greek small letter upsilon,U+03C5 ISOgrk3
        phi: 966,
        // greek small letter phi, U+03C6 ISOgrk3
        chi: 967,
        // greek small letter chi, U+03C7 ISOgrk3
        psi: 968,
        // greek small letter psi, U+03C8 ISOgrk3
        omega: 969,
        // greek small letter omega,U+03C9 ISOgrk3
        thetasym: 977,
        // greek small letter theta symbol,U+03D1 NEW
        upsih: 978,
        // greek upsilon with hook symbol,U+03D2 NEW
        piv: 982,
        // greek pi symbol, U+03D6 ISOgrk3

        // General Punctuation
        bull: 8226,
        // bullet = black small circle,U+2022 ISOpub

        // bullet is NOT the same as bullet operator, U+2219
        hellip: 8230,
        // horizontal ellipsis = three dot leader,U+2026 ISOpub
        prime: 8242,
        // prime = minutes = feet, U+2032 ISOtech
        Prime: 8243,
        // double prime = seconds = inches,U+2033 ISOtech
        oline: 8254,
        // overline = spacing overscore,U+203E NEW
        frasl: 8260,
        // fraction slash, U+2044 NEW

        // Letterlike Symbols
        weierp: 8472,
        // script capital P = power set= Weierstrass p, U+2118 ISOamso
        image: 8465,
        // blackletter capital I = imaginary part,U+2111 ISOamso
        real: 8476,
        // blackletter capital R = real part symbol,U+211C ISOamso
        trade: 8482,
        // trade mark sign, U+2122 ISOnum
        alefsym: 8501,
        // alef symbol = first transfinite cardinal,U+2135 NEW

        // alef symbol is NOT the same as hebrew letter alef,U+05D0 although the same glyph could be used to depict both characters
        // Arrows
        larr: 8592,
        // leftwards arrow, U+2190 ISOnum
        uarr: 8593,
        // upwards arrow, U+2191 ISOnum-->
        rarr: 8594,
        // rightwards arrow, U+2192 ISOnum
        darr: 8595,
        // downwards arrow, U+2193 ISOnum
        harr: 8596,
        // left right arrow, U+2194 ISOamsa
        crarr: 8629,
        // downwards arrow with corner leftwards= carriage return, U+21B5 NEW
        lArr: 8656,
        // leftwards double arrow, U+21D0 ISOtech

        // ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
        uArr: 8657,
        // upwards double arrow, U+21D1 ISOamsa
        rArr: 8658,
        // rightwards double arrow,U+21D2 ISOtech

        // ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ?rArr can be used for 'implies' as ISOtech suggests
        dArr: 8659,
        // downwards double arrow, U+21D3 ISOamsa
        hArr: 8660,
        // left right double arrow,U+21D4 ISOamsa

        // Mathematical Operators
        forall: 8704,
        // for all, U+2200 ISOtech
        part: 8706,
        // partial differential, U+2202 ISOtech
        exist: 8707,
        // there exists, U+2203 ISOtech
        empty: 8709,
        // empty set = null set = diameter,U+2205 ISOamso
        nabla: 8711,
        // nabla = backward difference,U+2207 ISOtech
        isin: 8712,
        // element of, U+2208 ISOtech
        notin: 8713,
        // not an element of, U+2209 ISOtech
        ni: 8715,
        // contains as member, U+220B ISOtech

        // should there be a more memorable name than 'ni'?
        prod: 8719,
        // n-ary product = product sign,U+220F ISOamsb

        // prod is NOT the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
        sum: 8721,
        // n-ary summation, U+2211 ISOamsb

        // sum is NOT the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
        minus: 8722,
        // minus sign, U+2212 ISOtech
        lowast: 8727,
        // asterisk operator, U+2217 ISOtech
        radic: 8730,
        // square root = radical sign,U+221A ISOtech
        prop: 8733,
        // proportional to, U+221D ISOtech
        infin: 8734,
        // infinity, U+221E ISOtech
        ang: 8736,
        // angle, U+2220 ISOamso
        and: 8743,
        // logical and = wedge, U+2227 ISOtech
        or: 8744,
        // logical or = vee, U+2228 ISOtech
        cap: 8745,
        // intersection = cap, U+2229 ISOtech
        cup: 8746,
        // union = cup, U+222A ISOtech
        "int": 8747,
        // integral, U+222B ISOtech
        there4: 8756,
        // therefore, U+2234 ISOtech
        sim: 8764,
        // tilde operator = varies with = similar to,U+223C ISOtech

        // tilde operator is NOT the same character as the tilde, U+007E,although the same glyph might be used to represent both
        cong: 8773,
        // approximately equal to, U+2245 ISOtech
        asymp: 8776,
        // almost equal to = asymptotic to,U+2248 ISOamsr
        ne: 8800,
        // not equal to, U+2260 ISOtech
        equiv: 8801,
        // identical to, U+2261 ISOtech
        le: 8804,
        // less-than or equal to, U+2264 ISOtech
        ge: 8805,
        // greater-than or equal to,U+2265 ISOtech
        sub: 8834,
        // subset of, U+2282 ISOtech
        sup: 8835,
        // superset of, U+2283 ISOtech

        // note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included. Should it be, for symmetry?It is in ISOamsn  --> <!ENTITY nsub": 8836,  //not a subset of, U+2284 ISOamsn
        sube: 8838,
        // subset of or equal to, U+2286 ISOtech
        supe: 8839,
        // superset of or equal to,U+2287 ISOtech
        oplus: 8853,
        // circled plus = direct sum,U+2295 ISOamsb
        otimes: 8855,
        // circled times = vector product,U+2297 ISOamsb
        perp: 8869,
        // up tack = orthogonal to = perpendicular,U+22A5 ISOtech
        sdot: 8901,
        // dot operator, U+22C5 ISOamsb

        // dot operator is NOT the same character as U+00B7 middle dot
        // Miscellaneous Technical
        lceil: 8968,
        // left ceiling = apl upstile,U+2308 ISOamsc
        rceil: 8969,
        // right ceiling, U+2309 ISOamsc
        lfloor: 8970,
        // left floor = apl downstile,U+230A ISOamsc
        rfloor: 8971,
        // right floor, U+230B ISOamsc
        lang: 9001,
        // left-pointing angle bracket = bra,U+2329 ISOtech

        // lang is NOT the same character as U+003C 'less than' or U+2039 'single left-pointing angle quotation mark'
        rang: 9002,
        // right-pointing angle bracket = ket,U+232A ISOtech

        // rang is NOT the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
        // Geometric Shapes
        loz: 9674,
        // lozenge, U+25CA ISOpub

        // Miscellaneous Symbols
        spades: 9824,
        // black spade suit, U+2660 ISOpub

        // black here seems to mean filled as opposed to hollow
        clubs: 9827,
        // black club suit = shamrock,U+2663 ISOpub
        hearts: 9829,
        // black heart suit = valentine,U+2665 ISOpub
        diams: 9830,
        // black diamond suit, U+2666 ISOpub

        // Latin Extended-A
        OElig: 338,
        //  -- latin capital ligature OE,U+0152 ISOlat2
        oelig: 339,
        //  -- latin small ligature oe, U+0153 ISOlat2

        // ligature is a misnomer, this is a separate character in some languages
        Scaron: 352,
        //  -- latin capital letter S with caron,U+0160 ISOlat2
        scaron: 353,
        //  -- latin small letter s with caron,U+0161 ISOlat2
        Yuml: 376,
        //  -- latin capital letter Y with diaeresis,U+0178 ISOlat2

        // Spacing Modifier Letters
        circ: 710,
        //  -- modifier letter circumflex accent,U+02C6 ISOpub
        tilde: 732,
        // small tilde, U+02DC ISOdia

        // General Punctuation
        ensp: 8194,
        // en space, U+2002 ISOpub
        emsp: 8195,
        // em space, U+2003 ISOpub
        thinsp: 8201,
        // thin space, U+2009 ISOpub
        zwnj: 8204,
        // zero width non-joiner,U+200C NEW RFC 2070
        zwj: 8205,
        // zero width joiner, U+200D NEW RFC 2070
        lrm: 8206,
        // left-to-right mark, U+200E NEW RFC 2070
        rlm: 8207,
        // right-to-left mark, U+200F NEW RFC 2070
        ndash: 8211,
        // en dash, U+2013 ISOpub
        mdash: 8212,
        // em dash, U+2014 ISOpub
        lsquo: 8216,
        // left single quotation mark,U+2018 ISOnum
        rsquo: 8217,
        // right single quotation mark,U+2019 ISOnum
        sbquo: 8218,
        // single low-9 quotation mark, U+201A NEW
        ldquo: 8220,
        // left double quotation mark,U+201C ISOnum
        rdquo: 8221,
        // right double quotation mark,U+201D ISOnum
        bdquo: 8222,
        // double low-9 quotation mark, U+201E NEW
        dagger: 8224,
        // dagger, U+2020 ISOpub
        Dagger: 8225,
        // double dagger, U+2021 ISOpub
        permil: 8240,
        // per mille sign, U+2030 ISOtech
        lsaquo: 8249,
        // single left-pointing angle quotation mark,U+2039 ISO proposed
        // lsaquo is proposed but not yet ISO standardized
        rsaquo: 8250,
        // single right-pointing angle quotation mark,U+203A ISO proposed
        // rsaquo is proposed but not yet ISO standardized
        euro: 8364 //  -- euro sign, U+20AC NEW
      },
      /**
       * Escapes the characters in a <code>String</code> using HTML entities.
       *
       * For example: <tt>"bread" & "butter"</tt> => <tt>&amp;quot;bread&amp;quot; &amp;amp; &amp;quot;butter&amp;quot;</tt>.
       * Supports all known HTML 4.0 entities, including funky accents.
       *
       * * <a href="http://www.w3.org/TR/REC-html32#latin1">HTML 3.2 Character Entities for ISO Latin-1</a>
       * * <a href="http://www.w3.org/TR/REC-html40/sgml/entities.html">HTML 4.0 Character entity references</a>
       * * <a href="http://www.w3.org/TR/html401/charset.html#h-5.3">HTML 4.01 Character References</a>
       * * <a href="http://www.w3.org/TR/html401/charset.html#code-position">HTML 4.01 Code positions</a>
       *
       * @param str {String} the String to escape
       * @return {String} a new escaped String
       * @see #unescape
       */
      escape: function escape(str) {
        return qx.util.StringEscape.escape(str, qx.bom.String.FROM_CHARCODE);
      },
      /**
       * Unescapes a string containing entity escapes to a string
       * containing the actual Unicode characters corresponding to the
       * escapes. Supports HTML 4.0 entities.
       *
       * For example, the string "&amp;lt;Fran&amp;ccedil;ais&amp;gt;"
       * will become "&lt;Fran&ccedil;ais&gt;"
       *
       * If an entity is unrecognized, it is left alone, and inserted
       * verbatim into the result string. e.g. "&amp;gt;&amp;zzzz;x" will
       * become "&gt;&amp;zzzz;x".
       *
       * @param str {String} the String to unescape, may be null
       * @return {var} a new unescaped String
       * @see #escape
       */
      unescape: function unescape(str) {
        return qx.util.StringEscape.unescape(str, qx.bom.String.TO_CHARCODE);
      },
      /**
       * Converts a plain text string into HTML.
       * This is similar to {@link #escape} but converts new lines to
       * <tt>&lt:br&gt:</tt> and preserves whitespaces.
       *
       * @param str {String} the String to convert
       * @return {String} a new converted String
       * @see #escape
       */
      fromText: function fromText(str) {
        return qx.bom.String.escape(str).replace(/(  |\n)/g, function (chr) {
          var map = {
            "  ": " &nbsp;",
            "\n": "<br>"
          };
          return map[chr] || chr;
        });
      },
      /**
       * Converts HTML to plain text.
       *
       * * Strips all HTML tags
       * * converts <tt>&lt:br&gt:</tt> to new line
       * * unescapes HTML entities
       *
       * @param str {String} HTML string to converts
       * @return {String} plain text representation of the HTML string
       */
      toText: function toText(str) {
        return qx.bom.String.unescape(str.replace(/\s+|<([^>])+>/gi, function (chr)
        //return qx.bom.String.unescape(str.replace(/<\/?[^>]+(>|$)/gi, function(chr)
        {
          if (chr.indexOf("<br") === 0) {
            return "\n";
          } else if (chr.length > 0 && chr.replace(/^\s*/, "").replace(/\s*$/, "") == "") {
            return " ";
          } else {
            return "";
          }
        }));
      }
    },
    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      /** Mapping of char codes to HTML entity names */
      statics.FROM_CHARCODE = qx.lang.Object.invert(statics.TO_CHARCODE);
    }
  });
  qx.bom.String.$$dbClassInfo = $$dbClassInfo;
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
      "qx.util.format.IFormat": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Type": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.locale.Number": {},
      "qx.lang.String": {}
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
   * A formatter and parser for numbers.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.util.format.NumberFormat", {
    extend: qx.core.Object,
    implement: [qx.util.format.IFormat, qx.core.IDisposable],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param locale {String} optional locale to be used
     * @throws {Error} If the argument is not a string.
     */
    construct: function construct(locale) {
      qx.core.Object.constructor.call(this);
      if (arguments.length > 0) {
        if (arguments.length === 1) {
          if (qx.lang.Type.isString(locale)) {
            this.setLocale(locale);
          } else {
            throw new Error("Wrong argument type. String is expected.");
          }
        } else {
          throw new Error("Wrong number of arguments.");
        }
      }
      if (!locale) {
        this.setLocale(qx.locale.Manager.getInstance().getLocale());
        {
          qx.locale.Manager.getInstance().bind("locale", this, "locale");
        }
      }
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * The minimum number of integer digits (digits before the decimal separator).
       * Missing digits will be filled up with 0 ("19" -> "0019").
       */
      minimumIntegerDigits: {
        check: "Number",
        init: 0
      },
      /**
       * The maximum number of integer digits (superfluous digits will be cut off
       * ("1923" -> "23").
       */
      maximumIntegerDigits: {
        check: "Number",
        nullable: true
      },
      /**
       * The minimum number of fraction digits (digits after the decimal separator).
       * Missing digits will be filled up with 0 ("1.5" -> "1.500")
       */
      minimumFractionDigits: {
        check: "Number",
        init: 0
      },
      /**
       * The maximum number of fraction digits (digits after the decimal separator).
       * Superfluous digits will cause rounding ("1.8277" -> "1.83")
       */
      maximumFractionDigits: {
        check: "Number",
        nullable: true
      },
      /** Whether thousand groupings should be used {e.g. "1,432,234.65"}. */
      groupingUsed: {
        check: "Boolean",
        init: true
      },
      /** The prefix to put before the number {"EUR " -> "EUR 12.31"}. */
      prefix: {
        check: "String",
        init: "",
        event: "changeNumberFormat"
      },
      /** Sets the postfix to put after the number {" %" -> "56.13 %"}. */
      postfix: {
        check: "String",
        init: "",
        event: "changeNumberFormat"
      },
      /** Locale used */
      locale: {
        check: "String",
        init: null,
        event: "changeLocale"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Formats a number.
       *
       * @param num {Number} the number to format.
       * @return {String} the formatted number as a string.
       */
      format: function format(num) {
        // handle special cases
        if (isNaN(num)) {
          return "NaN";
        }
        switch (num) {
          case Infinity:
            return "Infinity";
          case -Infinity:
            return "-Infinity";
        }
        var negative = num < 0;
        if (negative) {
          num = -num;
        }
        if (this.getMaximumFractionDigits() != null) {
          // Do the rounding
          var mover = Math.pow(10, this.getMaximumFractionDigits());
          num = Math.round(num * mover) / mover;
        }
        var integerDigits = String(Math.floor(num)).length;
        var numStr = "" + num;

        // Prepare the integer part
        var integerStr = numStr.substring(0, integerDigits);
        while (integerStr.length < this.getMinimumIntegerDigits()) {
          integerStr = "0" + integerStr;
        }
        if (this.getMaximumIntegerDigits() != null && integerStr.length > this.getMaximumIntegerDigits()) {
          // NOTE: We cut off even though we did rounding before, because there
          //     may be rounding errors ("12.24000000000001" -> "12.24")
          integerStr = integerStr.substring(integerStr.length - this.getMaximumIntegerDigits());
        }

        // Prepare the fraction part
        var fractionStr = numStr.substring(integerDigits + 1);
        while (fractionStr.length < this.getMinimumFractionDigits()) {
          fractionStr += "0";
        }
        if (this.getMaximumFractionDigits() != null && fractionStr.length > this.getMaximumFractionDigits()) {
          // We have already rounded -> Just cut off the rest
          fractionStr = fractionStr.substring(0, this.getMaximumFractionDigits());
        }

        // Add the thousand groupings
        if (this.getGroupingUsed()) {
          var origIntegerStr = integerStr;
          integerStr = "";
          var groupPos;
          for (groupPos = origIntegerStr.length; groupPos > 3; groupPos -= 3) {
            integerStr = "" + qx.locale.Number.getGroupSeparator(this.getLocale()) + origIntegerStr.substring(groupPos - 3, groupPos) + integerStr;
          }
          integerStr = origIntegerStr.substring(0, groupPos) + integerStr;
        }

        // Workaround: prefix and postfix are null even their defaultValue is "" and
        //             allowNull is set to false?!?
        var prefix = this.getPrefix() ? this.getPrefix() : "";
        var postfix = this.getPostfix() ? this.getPostfix() : "";

        // Assemble the number
        var str = prefix + (negative ? "-" : "") + integerStr;
        if (fractionStr.length > 0) {
          str += "" + qx.locale.Number.getDecimalSeparator(this.getLocale()) + fractionStr;
        }
        str += postfix;
        return str;
      },
      /**
       * Parses a number.
       *
       * @param str {String} the string to parse.
       * @return {Double} the number.
       * @throws {Error} If the number string does not match the number format.
       */
      parse: function parse(str) {
        // use the escaped separators for regexp
        var groupSepEsc = qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.getLocale()) + "");
        var decimalSepEsc = qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.getLocale()) + "");
        var regex = new RegExp("^(" + qx.lang.String.escapeRegexpChars(this.getPrefix()) + ")?([-+]){0,1}" + "([0-9]{1,3}(?:" + groupSepEsc + "{0,1}[0-9]{3}){0,}){0,1}" + "(" + decimalSepEsc + "\\d+){0,1}(" + qx.lang.String.escapeRegexpChars(this.getPostfix()) + ")?$");
        var hit = regex.exec(str);
        if (hit == null) {
          throw new Error("Number string '" + str + "' does not match the number format");
        }

        // hit[1] = potential prefix
        var negative = hit[2] == "-";
        var integerStr = hit[3] || "0";
        var fractionStr = hit[4];
        // hit[5] = potential postfix

        // Remove the thousand groupings
        integerStr = integerStr.replace(new RegExp(groupSepEsc, "g"), "");
        var asStr = (negative ? "-" : "") + integerStr;
        if (fractionStr != null && fractionStr.length != 0) {
          // Remove the leading decimal separator from the fractions string
          fractionStr = fractionStr.replace(new RegExp(decimalSepEsc), "");
          asStr += "." + fractionStr;
        }
        return parseFloat(asStr);
      }
    },
    destruct: function destruct() {
      {
        qx.locale.Manager.getInstance().removeRelatedBindings(this);
      }
    }
  });
  qx.util.format.NumberFormat.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IStringForm": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.theme.manager.Color": {},
      "qx.theme.manager.Appearance": {},
      "qx.theme.manager.Font": {},
      "qx.lang.Object": {},
      "qx.ui.style.Stylesheet": {
        "defer": "runtime"
      },
      "qx.bom.client.Css": {
        "construct": true,
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.html.Input": {},
      "qx.util.ResourceManager": {},
      "qx.bom.webfonts.WebFont": {},
      "qx.bom.Font": {},
      "qx.html.Element": {},
      "qx.bom.Label": {},
      "qx.ui.core.queue.Layout": {},
      "qx.lang.Type": {},
      "qx.event.type.Data": {},
      "qx.html.Label": {},
      "qx.bom.Stylesheet": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "css.placeholder": {
          "construct": true,
          "className": "qx.bom.client.Css"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "qx.dynlocale": {
          "load": true
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
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
   * This is a basic form field with common functionality for
   * {@link TextArea} and {@link TextField}.
   *
   * On every keystroke the value is synchronized with the
   * value of the textfield. Value changes can be monitored by listening to the
   * {@link #input} or {@link #changeValue} events, respectively.
   */
  qx.Class.define("qx.ui.form.AbstractField", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IStringForm, qx.ui.form.IForm],
    include: [qx.ui.form.MForm],
    type: "abstract",
    statics: {
      /** Stylesheet needed to style the native placeholder element. */
      __stylesheet__P_218_0: null,
      __addedPlaceholderRules__P_218_1: false,
      /**
       * Adds the CSS rules needed to style the native placeholder element.
       */
      __addPlaceholderRules__P_218_2: function __addPlaceholderRules__P_218_2() {
        if (qx.ui.form.AbstractField.__addedPlaceholderRules__P_218_1) {
          return;
        }
        qx.ui.form.AbstractField.__addedPlaceholderRules__P_218_1 = true;
        var engine = qx.core.Environment.get("engine.name");
        var browser = qx.core.Environment.get("browser.name");
        var colorManager = qx.theme.manager.Color.getInstance();
        var appearanceProperties = qx.theme.manager.Appearance.getInstance().styleFrom("textfield", {
          showingPlaceholder: true
        });
        var styles = {};
        var color = null;
        var font = null;
        if (appearanceProperties) {
          color = appearanceProperties["textColor"] ? colorManager.resolve(appearanceProperties["textColor"]) : null;
          font = appearanceProperties["font"] ? qx.theme.manager.Font.getInstance().resolve(appearanceProperties["font"]) : null;
        }
        if (!color) {
          color = colorManager.resolve("text-placeholder");
        }
        if (color) {
          styles.color = color + " !important";
        }
        if (font) {
          qx.lang.Object.mergeWith(styles, font.getStyles(), false);
        }
        var selector;
        if (engine == "gecko") {
          // see https://developer.mozilla.org/de/docs/CSS/:-moz-placeholder for details
          if (parseFloat(qx.core.Environment.get("engine.version")) >= 19) {
            selector = "input::-moz-placeholder, textarea::-moz-placeholder";
          } else {
            selector = "input:-moz-placeholder, textarea:-moz-placeholder";
          }
        } else if (engine == "webkit" && browser != "edge") {
          selector = "input.qx-placeholder-color::-webkit-input-placeholder, textarea.qx-placeholder-color::-webkit-input-placeholder";
        } else if (engine == "mshtml" || browser == "edge") {
          var separator = browser == "edge" ? "::" : ":";
          selector = ["input.qx-placeholder-color", "-ms-input-placeholder, textarea.qx-placeholder-color", "-ms-input-placeholder"].join(separator);
          qx.ui.style.Stylesheet.getInstance().addRule(selector, "color: " + color + " !important");
        }
      }
    },
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param value {String} initial text value of the input field ({@link #setValue}).
     */
    construct: function construct(value) {
      qx.ui.core.Widget.constructor.call(this);

      // shortcut for placeholder feature detection
      this.__useQxPlaceholder__P_218_3 = !qx.core.Environment.get("css.placeholder");
      if (value != null) {
        this.setValue(value);
      }
      this.getContentElement().addListener("change", this._onChangeContent, this);

      // use qooxdoo placeholder if no native placeholder is supported
      if (this.__useQxPlaceholder__P_218_3) {
        // assign the placeholder text after the appearance has been applied
        this.addListener("syncAppearance", this._syncPlaceholder, this);
      } else {
        // add rules for native placeholder color
        qx.ui.form.AbstractField.__addPlaceholderRules__P_218_2();
        // add a class to the input to restrict the placeholder color
        this.getContentElement().addClass("qx-placeholder-color");
      }

      // translation support
      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * The event is fired on every keystroke modifying the value of the field.
       *
       * The method {@link qx.event.type.Data#getData} returns the
       * current value of the text field.
       */
      input: "qx.event.type.Data",
      /**
       * The event is fired each time the text field looses focus and the
       * text field values has changed.
       *
       * If you change {@link #liveUpdate} to true, the changeValue event will
       * be fired after every keystroke and not only after every focus loss. In
       * that mode, the changeValue event is equal to the {@link #input} event.
       *
       * The method {@link qx.event.type.Data#getData} returns the
       * current text value of the field.
       */
      changeValue: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Alignment of the text
       */
      textAlign: {
        check: ["left", "center", "right"],
        nullable: true,
        themeable: true,
        apply: "_applyTextAlign"
      },
      /** Whether the field is read only */
      readOnly: {
        check: "Boolean",
        apply: "_applyReadOnly",
        event: "changeReadOnly",
        init: false
      },
      // overridden
      selectable: {
        refine: true,
        init: true
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },
      /** Maximal number of characters that can be entered in the TextArea. */
      maxLength: {
        apply: "_applyMaxLength",
        check: "PositiveInteger",
        init: Infinity
      },
      /**
       * Whether the {@link #changeValue} event should be fired on every key
       * input. If set to true, the changeValue event is equal to the
       * {@link #input} event.
       */
      liveUpdate: {
        check: "Boolean",
        init: false
      },
      /**
       * Fire a {@link #changeValue} event whenever the content of the
       * field matches the given regular expression. Accepts both regular
       * expression objects as well as strings for input.
       */
      liveUpdateOnRxMatch: {
        check: "RegExp",
        transform: "_string2RegExp",
        init: null
      },
      /**
       * String value which will be shown as a hint if the field is all of:
       * unset, unfocused and enabled. Set to null to not show a placeholder
       * text.
       */
      placeholder: {
        check: "String",
        nullable: true,
        apply: "_applyPlaceholder"
      },
      /**
       * RegExp responsible for filtering the value of the textfield. the RegExp
       * gives the range of valid values.
       * Note: The regexp specified is applied to each character in turn,
       * NOT to the entire string. So only regular expressions matching a
       * single character make sense in the context.
       * The following example only allows digits in the textfield.
       * <pre class='javascript'>field.setFilter(/[0-9]/);</pre>
       */
      filter: {
        check: "RegExp",
        nullable: true,
        init: null
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
    members: {
      __nullValue__P_218_4: true,
      _placeholder: null,
      __oldValue__P_218_5: null,
      __oldInputValue__P_218_6: null,
      __useQxPlaceholder__P_218_3: true,
      __font__P_218_7: null,
      __webfontListenerId__P_218_8: null,
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      getFocusElement: function getFocusElement() {
        var el = this.getContentElement();
        if (el) {
          return el;
        }
      },
      /**
       * Creates the input element. Derived classes may override this
       * method, to create different input elements.
       *
       * @return {qx.html.Input} a new input element.
       */
      _createInputElement: function _createInputElement() {
        return new qx.html.Input("text");
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        var updateInsets = this._updateInsets;
        var changes = qx.ui.form.AbstractField.superclass.prototype.renderLayout.call(this, left, top, width, height);

        // Directly return if superclass has detected that no
        // changes needs to be applied
        if (!changes) {
          return;
        }
        var inner = changes.size || updateInsets;
        var pixel = "px";
        if (inner || changes.local || changes.margin) {
          var innerWidth = width;
          var innerHeight = height;
        }
        var input = this.getContentElement();

        // we don't need to update positions on native placeholders
        if (updateInsets && this.__useQxPlaceholder__P_218_3) {
          if (this.__useQxPlaceholder__P_218_3) {
            var insets = this.getInsets();
            this._getPlaceholderElement().setStyles({
              paddingTop: insets.top + pixel,
              paddingRight: insets.right + pixel,
              paddingBottom: insets.bottom + pixel,
              paddingLeft: insets.left + pixel
            });
          }
        }
        if (inner || changes.margin) {
          // we don't need to update dimensions on native placeholders
          if (this.__useQxPlaceholder__P_218_3) {
            var insets = this.getInsets();
            this._getPlaceholderElement().setStyles({
              width: innerWidth - insets.left - insets.right + pixel,
              height: innerHeight - insets.top - insets.bottom + pixel
            });
          }
          input.setStyles({
            width: innerWidth + pixel,
            height: innerHeight + pixel
          });
          this._renderContentElement(innerHeight, input);
        }
        if (changes.position) {
          if (this.__useQxPlaceholder__P_218_3) {
            this._getPlaceholderElement().setStyles({
              left: left + pixel,
              top: top + pixel
            });
          }
        }
      },
      /**
       * Hook into {@link qx.ui.form.AbstractField#renderLayout} method.
       * Called after the contentElement has a width and an innerWidth.
       *
       * Note: This was introduced to fix BUG#1585
       *
       * @param innerHeight {Integer} The inner height of the element.
       * @param element {Element} The element.
       */
      _renderContentElement: function _renderContentElement(innerHeight, element) {
        //use it in child classes
      },
      // overridden
      _createContentElement: function _createContentElement() {
        // create and add the input element
        var el = this._createInputElement();

        // initialize the html input
        el.setSelectable(this.getSelectable());
        el.setEnabled(this.getEnabled());

        // Add listener for input event
        el.addListener("input", this._onHtmlInput, this);

        // Disable HTML5 spell checking
        el.setAttribute("spellcheck", "false");
        el.addClass("qx-abstract-field");

        // IE8 in standard mode needs some extra love here to receive events.
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") == 8) {
          el.setStyles({
            backgroundImage: "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")"
          });
        }
        return el;
      },
      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.form.AbstractField.superclass.prototype._applyEnabled.call(this, value, old);
        this.getContentElement().setEnabled(value);
        if (this.__useQxPlaceholder__P_218_3) {
          if (value) {
            this._showPlaceholder();
          } else {
            this._removePlaceholder();
          }
        } else {
          var input = this.getContentElement();
          // remove the placeholder on disabled input elements
          input.setAttribute("placeholder", value ? this.getPlaceholder() : "");
        }
      },
      // default text sizes
      /**
       * @lint ignoreReferenceField(__textSize)
       */
      __textSize__P_218_9: {
        width: 16,
        height: 16
      },
      // overridden
      _getContentHint: function _getContentHint() {
        return {
          width: this.__textSize__P_218_9.width * 10,
          height: this.__textSize__P_218_9.height || 16
        };
      },
      // overridden
      _applyFont: function _applyFont(value, old) {
        if (old && this.__font__P_218_7 && this.__webfontListenerId__P_218_8) {
          this.__font__P_218_7.removeListenerById(this.__webfontListenerId__P_218_8);
          this.__webfontListenerId__P_218_8 = null;
        }

        // Apply
        var styles;
        if (value) {
          this.__font__P_218_7 = qx.theme.manager.Font.getInstance().resolve(value);
          if (this.__font__P_218_7 instanceof qx.bom.webfonts.WebFont) {
            this.__webfontListenerId__P_218_8 = this.__font__P_218_7.addListener("changeStatus", this._onWebFontStatusChange, this);
          }
          styles = this.__font__P_218_7.getStyles();
        } else {
          styles = qx.bom.Font.getDefaultStyles();
        }

        // check if text color already set - if so this local value has higher priority
        if (this.getTextColor() != null) {
          delete styles["color"];
        }

        // apply the font to the content element
        // IE 8 - 10 (but not 11 Preview) will ignore the lineHeight value
        // unless it's applied directly.
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 11) {
          qx.html.Element.flush();
          this.getContentElement().setStyles(styles, true);
        } else {
          this.getContentElement().setStyles(styles);
        }

        // the font will adjust automatically on native placeholders
        if (this.__useQxPlaceholder__P_218_3) {
          // don't apply the color to the placeholder
          delete styles["color"];
          // apply the font to the placeholder
          this._getPlaceholderElement().setStyles(styles);
        }

        // Compute text size
        if (value) {
          this.__textSize__P_218_9 = qx.bom.Label.getTextSize("A", styles);
        } else {
          delete this.__textSize__P_218_9;
        }

        // Update layout
        qx.ui.core.queue.Layout.add(this);
      },
      // overridden
      _applyTextColor: function _applyTextColor(value, old) {
        if (value) {
          this.getContentElement().setStyle("color", qx.theme.manager.Color.getInstance().resolve(value));
        } else {
          this.getContentElement().removeStyle("color");
        }
      },
      // property apply
      _applyMaxLength: function _applyMaxLength(value, old) {
        if (value) {
          this.getContentElement().setAttribute("maxLength", value);
        } else {
          this.getContentElement().removeAttribute("maxLength");
        }
      },
      // property transform
      _string2RegExp: function _string2RegExp(value, old) {
        if (qx.lang.Type.isString(value)) {
          value = new RegExp(value);
        }
        return value;
      },
      // overridden
      tabFocus: function tabFocus() {
        qx.ui.form.AbstractField.superclass.prototype.tabFocus.call(this);
        this.selectAllText();
      },
      /**
       * Returns the text size.
       * @return {Map} The text size.
       */
      _getTextSize: function _getTextSize() {
        return this.__textSize__P_218_9;
      },
      /*
      ---------------------------------------------------------------------------
        EVENTS
      ---------------------------------------------------------------------------
      */
      /**
       * Event listener for native input events. Redirects the event
       * to the widget. Also checks for the filter and max length.
       *
       * @param e {qx.event.type.Data} Input event
       */
      _onHtmlInput: function _onHtmlInput(e) {
        var value = e.getData();
        var fireEvents = true;
        this.__nullValue__P_218_4 = false;

        // value unchanged; Firefox fires "input" when pressing ESC [BUG #5309]
        if (this.__oldInputValue__P_218_6 && this.__oldInputValue__P_218_6 === value) {
          fireEvents = false;
        }

        // check for the filter
        if (this.getFilter() != null) {
          var filteredValue = this._validateInput(value);
          if (filteredValue != value) {
            fireEvents = this.__oldInputValue__P_218_6 !== filteredValue;
            value = filteredValue;
            this.getContentElement().setValue(value);
          }
        }
        // fire the events, if necessary
        if (fireEvents) {
          // store the old input value
          this.fireDataEvent("input", value, this.__oldInputValue__P_218_6);
          this.__oldInputValue__P_218_6 = value;

          // check for the live change event
          if (this.getLiveUpdate()) {
            this.__fireChangeValueEvent__P_218_10(value);
          }
          // check for the liveUpdateOnRxMatch change event
          else {
            var fireRx = this.getLiveUpdateOnRxMatch();
            if (fireRx && value.match(fireRx)) {
              this.__fireChangeValueEvent__P_218_10(value);
            }
          }
        }
      },
      /**
       * Triggers text size recalculation after a web font was loaded
       *
       * @param ev {qx.event.type.Data} "changeStatus" event
       */
      _onWebFontStatusChange: function _onWebFontStatusChange(ev) {
        if (ev.getData().valid === true) {
          var styles = this.__font__P_218_7.getStyles();
          this.__textSize__P_218_9 = qx.bom.Label.getTextSize("A", styles);
          qx.ui.core.queue.Layout.add(this);
        }
      },
      /**
       * Handles the firing of the changeValue event including the local cache
       * for sending the old value in the event.
       *
       * @param value {String} The new value.
       */
      __fireChangeValueEvent__P_218_10: function __fireChangeValueEvent__P_218_10(value) {
        var old = this.__oldValue__P_218_5;
        this.__oldValue__P_218_5 = value;
        if (old != value) {
          this.fireNonBubblingEvent("changeValue", qx.event.type.Data, [value, old]);
        }
      },
      /*
      ---------------------------------------------------------------------------
        TEXTFIELD VALUE API
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the value of the textfield to the given value.
       *
       * @param value {String} The new value
       */
      setValue: function setValue(value) {
        if (this.isDisposed()) {
          return null;
        }

        // handle null values
        if (value === null) {
          // just do nothing if null is already set
          if (this.__nullValue__P_218_4) {
            return value;
          }
          value = "";
          this.__nullValue__P_218_4 = true;
        } else {
          this.__nullValue__P_218_4 = false;
          // native placeholders will be removed by the browser
          if (this.__useQxPlaceholder__P_218_3) {
            this._removePlaceholder();
          }
        }
        if (qx.lang.Type.isString(value)) {
          var elem = this.getContentElement();
          if (elem.getValue() != value) {
            var oldValue = elem.getValue();
            elem.setValue(value);
            var data = this.__nullValue__P_218_4 ? null : value;
            this.__oldValue__P_218_5 = oldValue;
            this.__fireChangeValueEvent__P_218_10(data);
            // reset the input value on setValue calls [BUG #6892]
            this.__oldInputValue__P_218_6 = this.__oldValue__P_218_5;
          }
          // native placeholders will be shown by the browser
          if (this.__useQxPlaceholder__P_218_3) {
            this._showPlaceholder();
          }
          return value;
        }
        throw new Error("Invalid value type: " + value);
      },
      /**
       * Returns the current value of the textfield.
       *
       * @return {String|null} The current value
       */
      getValue: function getValue() {
        return this.isDisposed() || this.__nullValue__P_218_4 ? null : this.getContentElement().getValue();
      },
      /**
       * Resets the value to the default
       */
      resetValue: function resetValue() {
        this.setValue(null);
      },
      /**
       * Event listener for change event of content element
       *
       * @param e {qx.event.type.Data} Incoming change event
       */
      _onChangeContent: function _onChangeContent(e) {
        this.__nullValue__P_218_4 = e.getData() === null;
        this.__fireChangeValueEvent__P_218_10(e.getData());
      },
      /*
      ---------------------------------------------------------------------------
        TEXTFIELD SELECTION API
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the current selection.
       * This method only works if the widget is already created and
       * added to the document.
       *
       * @return {String|null}
       */
      getTextSelection: function getTextSelection() {
        return this.getContentElement().getTextSelection();
      },
      /**
       * Returns the current selection length.
       * This method only works if the widget is already created and
       * added to the document.
       *
       * @return {Integer|null}
       */
      getTextSelectionLength: function getTextSelectionLength() {
        return this.getContentElement().getTextSelectionLength();
      },
      /**
       * Returns the start of the text selection
       *
       * @return {Integer|null} Start of selection or null if not available
       */
      getTextSelectionStart: function getTextSelectionStart() {
        return this.getContentElement().getTextSelectionStart();
      },
      /**
       * Returns the end of the text selection
       *
       * @return {Integer|null} End of selection or null if not available
       */
      getTextSelectionEnd: function getTextSelectionEnd() {
        return this.getContentElement().getTextSelectionEnd();
      },
      /**
       * Set the selection to the given start and end (zero-based).
       * If no end value is given the selection will extend to the
       * end of the textfield's content.
       * This method only works if the widget is already created and
       * added to the document.
       *
       * @param start {Integer} start of the selection (zero-based)
       * @param end {Integer} end of the selection
       */
      setTextSelection: function setTextSelection(start, end) {
        this.getContentElement().setTextSelection(start, end);
      },
      /**
       * Clears the current selection.
       * This method only works if the widget is already created and
       * added to the document.
       *
       */
      clearTextSelection: function clearTextSelection() {
        this.getContentElement().clearTextSelection();
      },
      /**
       * Selects the whole content
       *
       */
      selectAllText: function selectAllText() {
        this.setTextSelection(0);
      },
      /*
      ---------------------------------------------------------------------------
        PLACEHOLDER HELPERS
      ---------------------------------------------------------------------------
      */
      // overridden
      setLayoutParent: function setLayoutParent(parent) {
        qx.ui.form.AbstractField.superclass.prototype.setLayoutParent.call(this, parent);
        if (this.__useQxPlaceholder__P_218_3) {
          if (parent) {
            this.getLayoutParent().getContentElement().add(this._getPlaceholderElement());
          } else {
            var placeholder = this._getPlaceholderElement();
            placeholder.getParent().remove(placeholder);
          }
        }
      },
      /**
       * Helper to show the placeholder text in the field. It checks for all
       * states and possible conditions and shows the placeholder only if allowed.
       */
      _showPlaceholder: function _showPlaceholder() {
        var fieldValue = this.getValue() || "";
        var placeholder = this.getPlaceholder();
        if (placeholder != null && fieldValue == "" && !this.hasState("focused") && !this.hasState("disabled")) {
          if (this.hasState("showingPlaceholder")) {
            this._syncPlaceholder();
          } else {
            // the placeholder will be set as soon as the appearance is applied
            this.addState("showingPlaceholder");
          }
        }
      },
      /**
       * Remove the fake placeholder
       */
      _onPointerDownPlaceholder: function _onPointerDownPlaceholder() {
        window.setTimeout(function () {
          this.focus();
        }.bind(this), 0);
      },
      /**
       * Helper to remove the placeholder. Deletes the placeholder text from the
       * field and removes the state.
       */
      _removePlaceholder: function _removePlaceholder() {
        if (this.hasState("showingPlaceholder")) {
          if (this.__useQxPlaceholder__P_218_3) {
            this._getPlaceholderElement().setStyle("visibility", "hidden");
          }
          this.removeState("showingPlaceholder");
        }
      },
      /**
       * Updates the placeholder text with the DOM
       */
      _syncPlaceholder: function _syncPlaceholder() {
        if (this.hasState("showingPlaceholder") && this.__useQxPlaceholder__P_218_3) {
          this._getPlaceholderElement().setStyle("visibility", "visible");
        }
      },
      /**
       * Returns the placeholder label and creates it if necessary.
       */
      _getPlaceholderElement: function _getPlaceholderElement() {
        if (this._placeholder == null) {
          // create the placeholder
          this._placeholder = new qx.html.Label();
          var colorManager = qx.theme.manager.Color.getInstance();
          this._placeholder.setStyles({
            zIndex: 11,
            position: "absolute",
            color: colorManager.resolve("text-placeholder"),
            whiteSpace: "normal",
            // enable wrap by default
            cursor: "text",
            visibility: "hidden"
          });
          this._placeholder.addListener("pointerdown", this._onPointerDownPlaceholder, this);
        }
        return this._placeholder;
      },
      /**
       * Locale change event handler
       *
       * @signature function(e)
       * @param e {Event} the change event
       */
      _onChangeLocale: qx.core.Environment.select("qx.dynlocale", {
        "true": function _true(e) {
          var content = this.getPlaceholder();
          if (content && content.translate) {
            this.setPlaceholder(content.translate());
          }
        },
        "false": null
      }),
      // overridden
      _onChangeTheme: function _onChangeTheme() {
        qx.ui.form.AbstractField.superclass.prototype._onChangeTheme.call(this);
        if (this._placeholder) {
          // delete the placeholder element because it uses a theme dependent color
          this._placeholder.dispose();
          this._placeholder = null;
        }
        if (!this.__useQxPlaceholder__P_218_3 && qx.ui.form.AbstractField.__stylesheet__P_218_0) {
          qx.bom.Stylesheet.removeSheet(qx.ui.form.AbstractField.__stylesheet__P_218_0);
          qx.ui.form.AbstractField.__stylesheet__P_218_0 = null;
          qx.ui.form.AbstractField.__addPlaceholderRules__P_218_2();
        }
      },
      /**
       * Validates the the input value.
       *
       * @param value {Object} The value to check
       * @returns The checked value
       */
      _validateInput: function _validateInput(value) {
        var filteredValue = value;
        var filter = this.getFilter();

        // If no filter is set return just the value
        if (filter !== null) {
          filteredValue = "";
          var index = value.search(filter);
          var processedValue = value;
          while (index >= 0 && processedValue.length > 0) {
            filteredValue = filteredValue + processedValue.charAt(index);
            processedValue = processedValue.substring(index + 1, processedValue.length);
            index = processedValue.search(filter);
          }
        }
        return filteredValue;
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyPlaceholder: function _applyPlaceholder(value, old) {
        var _this = this;
        if (this.__useQxPlaceholder__P_218_3) {
          this._getPlaceholderElement().setValue(value);
          if (value != null) {
            this.addListener("focusin", this._removePlaceholder, this);
            this.addListener("focusout", this._showPlaceholder, this);
            this._showPlaceholder();
          } else {
            this.removeListener("focusin", this._removePlaceholder, this);
            this.removeListener("focusout", this._showPlaceholder, this);
            this._removePlaceholder();
          }
        } else {
          // only apply if the widget is enabled
          if (this.getEnabled()) {
            this.getContentElement().setAttribute("placeholder", value);
            if (qx.core.Environment.get("browser.name") === "firefox" && parseFloat(qx.core.Environment.get("browser.version")) < 36 && this.getContentElement().getNodeName() === "textarea" && !this.getContentElement().getDomElement()) {
              /* qx Bug #8870: Firefox 35 will not display a text area's
                 placeholder text if the attribute is set before the
                 element is added to the DOM. This is fixed in FF 36. */
              this.addListenerOnce("appear", function () {
                _this.getContentElement().getDomElement().removeAttribute("placeholder");
                _this.getContentElement().getDomElement().setAttribute("placeholder", value);
              });
            }
          }
        }
      },
      // property apply
      _applyTextAlign: function _applyTextAlign(value, old) {
        this.getContentElement().setStyle("textAlign", value);
      },
      // property apply
      _applyReadOnly: function _applyReadOnly(value, old) {
        var element = this.getContentElement();
        element.setAttribute("readOnly", value);
        if (value) {
          this.addState("readonly");
          this.setFocusable(false);
        } else {
          this.removeState("readonly");
          this.setFocusable(true);
        }
      }
    },
    defer: function defer(statics) {
      var css = "border: none;padding: 0;margin: 0;display : block;background : transparent;outline: none;appearance: none;position: absolute;autoComplete: off;resize: none;border-radius: 0;";
      qx.ui.style.Stylesheet.getInstance().addRule(".qx-abstract-field", css);
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this._placeholder) {
        this._placeholder.removeListener("pointerdown", this._onPointerDownPlaceholder, this);
        var parent = this._placeholder.getParent();
        if (parent) {
          parent.remove(this._placeholder);
        }
        this._placeholder.dispose();
      }
      this._placeholder = this.__font__P_218_7 = null;
      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }
      if (this.__font__P_218_7 && this.__webfontListenerId__P_218_8) {
        this.__font__P_218_7.removeListenerById(this.__webfontListenerId__P_218_8);
      }
      this.getContentElement().removeListener("input", this._onHtmlInput, this);
    }
  });
  qx.ui.form.AbstractField.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.form.AbstractField": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Device": {
        "require": true
      }
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
        "device.type": {
          "className": "qx.bom.client.Device"
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
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   * The TextField is a single-line text input field.
   */
  qx.Class.define("qx.ui.form.TextField", {
    extend: qx.ui.form.AbstractField,
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "textfield"
      },
      // overridden
      allowGrowY: {
        refine: true,
        init: false
      },
      // overridden
      allowShrinkY: {
        refine: true,
        init: false
      }
    },
    members: {
      // overridden
      _renderContentElement: function _renderContentElement(innerHeight, element) {
        if (qx.core.Environment.get("engine.name") == "mshtml" && (parseInt(qx.core.Environment.get("engine.version"), 10) < 9 || qx.core.Environment.get("browser.documentmode") < 9)) {
          element.setStyles({
            "line-height": innerHeight + "px"
          });
        }
      },
      // overridden
      _createContentElement: function _createContentElement() {
        var el = qx.ui.form.TextField.superclass.prototype._createContentElement.call(this);
        var deviceType = qx.core.Environment.get("device.type");
        if (deviceType == "tablet" || deviceType == "mobile") {
          el.addListener("keypress", this._onKeyPress, this);
        }
        return el;
      },
      /**
       * Close the virtual keyboard if the Enter key is pressed.
       * @param evt {qx.event.type.KeySequence} the keypress event.
       */
      _onKeyPress: function _onKeyPress(evt) {
        // On return
        if (evt.getKeyIdentifier() == "Enter") {
          if (this.isFocusable()) {
            this.blur();
          } else {
            // When the text field is not focusable, blur() will raise an exception on
            // touch devices and the virtual keyboard is not closed. To work around this
            // issue, we're enabling the focus just for the blur() call.
            this.setFocusable(true);
            this.blur();
            this.setFocusable(false);
          }
        }
      }
    },
    destruct: function destruct() {
      this.getContentElement().removeListener("keypress", this._onKeyPress, this);
    }
  });
  qx.ui.form.TextField.$$dbClassInfo = $$dbClassInfo;
})();

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
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Mixin holding the handler for roll event. Please
   * keep in mind that the including widget has to have the scroll bars
   * implemented as child controls named <code>scrollbar-x</code> and
   * <code>scrollbar-y</code> to get the handler working. Also, you have to
   * attach the listener yourself.
   */
  qx.Mixin.define("qx.ui.core.scroll.MRoll", {
    members: {
      _cancelRoll: null,
      /**
       * Responsible for adding the event listener needed for scroll handling.
       */
      _addRollHandling: function _addRollHandling() {
        this.addListener("roll", this._onRoll, this);
        this.addListener("pointerdown", this._onPointerDownForRoll, this);
      },
      /**
       * Responsible for removing the event listener needed for scroll handling.
       */
      _removeRollHandling: function _removeRollHandling() {
        this.removeListener("roll", this._onRoll, this);
        this.removeListener("pointerdown", this._onPointerDownForRoll, this);
      },
      /**
       * Handler for the pointerdown event which simply stops the momentum scrolling.
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDownForRoll: function _onPointerDownForRoll(e) {
        this._cancelRoll = e.getPointerId();
      },
      /**
       * Roll event handler
       *
       * @param e {qx.event.type.Roll} Roll event
       */
      _onRoll: function _onRoll(e) {
        // only wheel and touch
        if (e.getPointerType() == "mouse") {
          return;
        }
        if (this._cancelRoll && e.getMomentum()) {
          e.stopMomentum();
          this._cancelRoll = null;
          return;
        }
        this._cancelRoll = null;
        var showX = this._isChildControlVisible("scrollbar-x");
        var showY = this._isChildControlVisible("scrollbar-y");
        var scrollbarY = showY ? this.getChildControl("scrollbar-y", true) : null;
        var scrollbarX = showX ? this.getChildControl("scrollbar-x", true) : null;
        var deltaY = e.getDelta().y;
        var deltaX = e.getDelta().x;
        var endY = !showY;
        var endX = !showX;

        // y case
        if (scrollbarY) {
          if (deltaY !== 0) {
            scrollbarY.scrollBy(parseInt(deltaY, 10));
          }
          var position = scrollbarY.getPosition();
          var max = scrollbarY.getMaximum();

          // pass the event to the parent if the scrollbar is at an edge
          if (deltaY < 0 && position <= 0 || deltaY > 0 && position >= max) {
            endY = true;
          }
        }

        // x case
        if (scrollbarX) {
          if (deltaX !== 0) {
            scrollbarX.scrollBy(parseInt(deltaX, 10));
          }
          var position = scrollbarX.getPosition();
          var max = scrollbarX.getMaximum();
          // pass the event to the parent if the scrollbar is at an edge
          if (deltaX < 0 && position <= 0 || deltaX > 0 && position >= max) {
            endX = true;
          }
        }
        if (endX && endY) {
          e.stopMomentum();
        }

        // pass the event to the parent if both scrollbars are at the end
        if (!endY && deltaX === 0 || !endX && deltaY === 0 || (!endX || !endY) && deltaX !== 0 && deltaY !== 0) {
          // Stop bubbling and native event only if a scrollbar is visible
          e.stop();
        }
      }
    }
  });
  qx.ui.core.scroll.MRoll.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.scroll.MScrollBarFactory": {
        "require": true
      },
      "qx.ui.core.scroll.MRoll": {
        "require": true
      },
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.bom.client.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.core.scroll.ScrollPane": {},
      "qx.ui.core.queue.Manager": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.scrollBarOverlayed": {
          "construct": true,
          "className": "qx.bom.client.Scroll"
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
   * The ScrollArea provides a container widget with on demand scroll bars
   * if the content size exceeds the size of the container.
   *
   * @childControl pane {qx.ui.core.scroll.ScrollPane} pane which holds the content to scroll
   * @childControl scrollbar-x {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar} horizontal scrollbar
   * @childControl scrollbar-y {qx.ui.core.scroll.ScrollBar?qx.ui.core.scroll.NativeScrollBar} vertical scrollbar
   * @childControl corner {qx.ui.core.Widget} corner where no scrollbar is shown
   */
  qx.Class.define("qx.ui.core.scroll.AbstractScrollArea", {
    extend: qx.ui.core.Widget,
    include: [qx.ui.core.scroll.MScrollBarFactory, qx.ui.core.scroll.MRoll, qx.ui.core.MDragDropScrolling],
    type: "abstract",
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * The default width which is used for the width of the scroll bar if
       * overlaid.
       */
      DEFAULT_SCROLLBAR_WIDTH: 14
    },
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      if (qx.core.Environment.get("os.scrollBarOverlayed")) {
        // use a plain canvas to overlay the scroll bars
        this._setLayout(new qx.ui.layout.Canvas());
      } else {
        // Create 'fixed' grid layout
        var grid = new qx.ui.layout.Grid();
        grid.setColumnFlex(0, 1);
        grid.setRowFlex(0, 1);
        this._setLayout(grid);
      }

      // since the scroll container disregards the min size of the scrollbars
      // we have to set the min size of the scroll area to ensure that the
      // scrollbars always have an usable size.
      var size = qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH * 2 + 14;
      this.set({
        minHeight: size,
        minWidth: size
      });

      // Roll listener for scrolling
      this._addRollHandling();
    },
    events: {
      /** Fired as soon as the scroll animation in X direction ends. */
      scrollAnimationXEnd: "qx.event.type.Event",
      /** Fired as soon as the scroll animation in Y direction ends. */
      scrollAnimationYEnd: "qx.event.type.Event"
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
        init: "scrollarea"
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
      },
      /**
       * The policy, when the horizontal scrollbar should be shown.
       * <ul>
       *   <li><b>auto</b>: Show scrollbar on demand</li>
       *   <li><b>on</b>: Always show the scrollbar</li>
       *   <li><b>off</b>: Never show the scrollbar</li>
       * </ul>
       */
      scrollbarX: {
        check: ["auto", "on", "off"],
        init: "auto",
        themeable: true,
        apply: "_computeScrollbars"
      },
      /**
       * The policy, when the horizontal scrollbar should be shown.
       * <ul>
       *   <li><b>auto</b>: Show scrollbar on demand</li>
       *   <li><b>on</b>: Always show the scrollbar</li>
       *   <li><b>off</b>: Never show the scrollbar</li>
       * </ul>
       */
      scrollbarY: {
        check: ["auto", "on", "off"],
        init: "auto",
        themeable: true,
        apply: "_computeScrollbars"
      },
      /**
       * Group property, to set the overflow of both scroll bars.
       */
      scrollbar: {
        group: ["scrollbarX", "scrollbarY"]
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
        CHILD CONTROL SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "pane":
            control = new qx.ui.core.scroll.ScrollPane();
            control.addListener("update", this._computeScrollbars, this);
            control.addListener("scrollX", this._onScrollPaneX, this);
            control.addListener("scrollY", this._onScrollPaneY, this);
            if (qx.core.Environment.get("os.scrollBarOverlayed")) {
              this._add(control, {
                edge: 0
              });
            } else {
              this._add(control, {
                row: 0,
                column: 0
              });
            }
            break;
          case "scrollbar-x":
            control = this._createScrollBar("horizontal");
            control.setMinWidth(0);
            control.exclude();
            control.addListener("scroll", this._onScrollBarX, this);
            control.addListener("changeVisibility", this._onChangeScrollbarXVisibility, this);
            control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd.bind(this, "X"));
            if (qx.core.Environment.get("os.scrollBarOverlayed")) {
              control.setMinHeight(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);
              this._add(control, {
                bottom: 0,
                right: 0,
                left: 0
              });
            } else {
              this._add(control, {
                row: 1,
                column: 0
              });
            }
            break;
          case "scrollbar-y":
            control = this._createScrollBar("vertical");
            control.setMinHeight(0);
            control.exclude();
            control.addListener("scroll", this._onScrollBarY, this);
            control.addListener("changeVisibility", this._onChangeScrollbarYVisibility, this);
            control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd.bind(this, "Y"));
            if (qx.core.Environment.get("os.scrollBarOverlayed")) {
              control.setMinWidth(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);
              this._add(control, {
                right: 0,
                bottom: 0,
                top: 0
              });
            } else {
              this._add(control, {
                row: 0,
                column: 1
              });
            }
            break;
          case "corner":
            control = new qx.ui.core.Widget();
            control.setWidth(0);
            control.setHeight(0);
            control.exclude();
            if (!qx.core.Environment.get("os.scrollBarOverlayed")) {
              // only add for non overlayed scroll bars
              this._add(control, {
                row: 1,
                column: 1
              });
            }
            break;
        }
        return control || qx.ui.core.scroll.AbstractScrollArea.superclass.prototype._createChildControlImpl.call(this, id);
      },
      /*
      ---------------------------------------------------------------------------
        PANE SIZE
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the dimensions of the pane.
       *
       * @return {Map|null} The pane dimension in pixel. Contains
       *    the keys <code>width</code> and <code>height</code>.
       */
      getPaneSize: function getPaneSize() {
        return this.getChildControl("pane").getInnerSize();
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
        return this.getChildControl("pane").getItemTop(item);
      },
      /**
       * Returns the top offset of the end of the given item in relation to the
       * inner height of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemBottom: function getItemBottom(item) {
        return this.getChildControl("pane").getItemBottom(item);
      },
      /**
       * Returns the left offset of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Top offset
       */
      getItemLeft: function getItemLeft(item) {
        return this.getChildControl("pane").getItemLeft(item);
      },
      /**
       * Returns the left offset of the end of the given item in relation to the
       * inner width of this widget.
       *
       * @param item {qx.ui.core.Widget} Item to query
       * @return {Integer} Right offset
       */
      getItemRight: function getItemRight(item) {
        return this.getChildControl("pane").getItemRight(item);
      },
      /*
      ---------------------------------------------------------------------------
        SCROLL SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToX: function scrollToX(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-x").scrollTo(value, duration);
      },
      /**
       * Scrolls the element's content by the given left offset
       *
       * @param value {Integer} The vertical position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByX: function scrollByX(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-x").scrollBy(value, duration);
      },
      /**
       * Returns the scroll left position of the content
       *
       * @return {Integer} Horizontal scroll position
       */
      getScrollX: function getScrollX() {
        var scrollbar = this.getChildControl("scrollbar-x", true);
        return scrollbar ? scrollbar.getPosition() : 0;
      },
      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollToY: function scrollToY(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-y").scrollTo(value, duration);
      },
      /**
       * Scrolls the element's content by the given top offset
       *
       * @param value {Integer} The horizontal position to scroll to.
       * @param duration {Number?} The time in milliseconds the scroll to should take.
       */
      scrollByY: function scrollByY(value, duration) {
        // First flush queue before scroll
        qx.ui.core.queue.Manager.flush();
        this.getChildControl("scrollbar-y").scrollBy(value, duration);
      },
      /**
       * Returns the scroll top position of the content
       *
       * @return {Integer} Vertical scroll position
       */
      getScrollY: function getScrollY() {
        var scrollbar = this.getChildControl("scrollbar-y", true);
        return scrollbar ? scrollbar.getPosition() : 0;
      },
      /**
       * In case a scroll animation is currently running in X direction,
       * it will be stopped. If not, the method does nothing.
       */
      stopScrollAnimationX: function stopScrollAnimationX() {
        var scrollbar = this.getChildControl("scrollbar-x", true);
        if (scrollbar) {
          scrollbar.stopScrollAnimation();
        }
      },
      /**
       * In case a scroll animation is currently running in X direction,
       * it will be stopped. If not, the method does nothing.
       */
      stopScrollAnimationY: function stopScrollAnimationY() {
        var scrollbar = this.getChildControl("scrollbar-y", true);
        if (scrollbar) {
          scrollbar.stopScrollAnimation();
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      /**
       * Event handler for the scroll animation end event for both scroll bars.
       *
       * @param direction {String} Either "X" or "Y".
       */
      _onScrollAnimationEnd: function _onScrollAnimationEnd(direction) {
        this.fireEvent("scrollAnimation" + direction + "End");
      },
      /**
       * Event handler for the scroll event of the horizontal scrollbar
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollBarX: function _onScrollBarX(e) {
        this.getChildControl("pane").scrollToX(e.getData());
      },
      /**
       * Event handler for the scroll event of the vertical scrollbar
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollBarY: function _onScrollBarY(e) {
        this.getChildControl("pane").scrollToY(e.getData());
      },
      /**
       * Event handler for the horizontal scroll event of the pane
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollPaneX: function _onScrollPaneX(e) {
        var scrollbar = this.getChildControl("scrollbar-x");
        if (scrollbar) {
          scrollbar.updatePosition(e.getData());
        }
      },
      /**
       * Event handler for the vertical scroll event of the pane
       *
       * @param e {qx.event.type.Data} The scroll event object
       */
      _onScrollPaneY: function _onScrollPaneY(e) {
        var scrollbar = this.getChildControl("scrollbar-y");
        if (scrollbar) {
          scrollbar.updatePosition(e.getData());
        }
      },
      /**
       * Event handler for visibility changes of horizontal scrollbar.
       *
       * @param e {qx.event.type.Event} Property change event
       */
      _onChangeScrollbarXVisibility: function _onChangeScrollbarXVisibility(e) {
        var showX = this._isChildControlVisible("scrollbar-x");
        var showY = this._isChildControlVisible("scrollbar-y");
        if (!showX) {
          this.scrollToX(0);
        }
        showX && showY ? this._showChildControl("corner") : this._excludeChildControl("corner");
      },
      /**
       * Event handler for visibility changes of horizontal scrollbar.
       *
       * @param e {qx.event.type.Event} Property change event
       */
      _onChangeScrollbarYVisibility: function _onChangeScrollbarYVisibility(e) {
        var showX = this._isChildControlVisible("scrollbar-x");
        var showY = this._isChildControlVisible("scrollbar-y");
        if (!showY) {
          this.scrollToY(0);
        }
        showX && showY ? this._showChildControl("corner") : this._excludeChildControl("corner");
      },
      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Computes the visibility state for scrollbars.
       *
       */
      _computeScrollbars: function _computeScrollbars() {
        var pane = this.getChildControl("pane");
        var content = pane.getChildren()[0];
        if (!content) {
          this._excludeChildControl("scrollbar-x");
          this._excludeChildControl("scrollbar-y");
          return;
        }
        var innerSize = this.getInnerSize();
        var paneSize = pane.getInnerSize();
        var scrollSize = pane.getScrollSize();

        // if the widget has not yet been rendered, return and try again in the
        // resize event
        if (!paneSize || !scrollSize) {
          return;
        }
        var scrollbarX = this.getScrollbarX();
        var scrollbarY = this.getScrollbarY();
        if (scrollbarX === "auto" && scrollbarY === "auto") {
          // Check if the container is big enough to show
          // the full content.
          var showX = scrollSize.width > innerSize.width;
          var showY = scrollSize.height > innerSize.height;

          // Dependency check
          // We need a special intelligence here when only one
          // of the autosized axis requires a scrollbar
          // This scrollbar may then influence the need
          // for the other one as well.
          if ((showX || showY) && !(showX && showY)) {
            if (showX) {
              showY = scrollSize.height > paneSize.height;
            } else if (showY) {
              showX = scrollSize.width > paneSize.width;
            }
          }
        } else {
          var showX = scrollbarX === "on";
          var showY = scrollbarY === "on";

          // Check auto values afterwards with already
          // corrected client dimensions
          if (scrollSize.width > (showX ? paneSize.width : innerSize.width) && scrollbarX === "auto") {
            showX = true;
          }
          if (scrollSize.height > (showX ? paneSize.height : innerSize.height) && scrollbarY === "auto") {
            showY = true;
          }
        }

        // Update scrollbars
        if (showX) {
          var barX = this.getChildControl("scrollbar-x");
          barX.show();
          barX.setMaximum(Math.max(0, scrollSize.width - paneSize.width));
          barX.setKnobFactor(scrollSize.width === 0 ? 0 : paneSize.width / scrollSize.width);
        } else {
          this._excludeChildControl("scrollbar-x");
        }
        if (showY) {
          var barY = this.getChildControl("scrollbar-y");
          barY.show();
          barY.setMaximum(Math.max(0, scrollSize.height - paneSize.height));
          barY.setKnobFactor(scrollSize.height === 0 ? 0 : paneSize.height / scrollSize.height);
        } else {
          this._excludeChildControl("scrollbar-y");
        }
      }
    }
  });
  qx.ui.core.scroll.AbstractScrollArea.$$dbClassInfo = $$dbClassInfo;
})();

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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Clipping area for the table header and table pane.
   */
  qx.Class.define("qx.ui.table.pane.Clipper", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.Grow());
      this.setMinWidth(0);
    },
    members: {
      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       */
      scrollToX: function scrollToX(value) {
        this.getContentElement().scrollToX(value, false);
      },
      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       */
      scrollToY: function scrollToY(value) {
        this.getContentElement().scrollToY(value, true);
      }
    }
  });
  qx.ui.table.pane.Clipper.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Pointer": {
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
       * David Perez Carmona (david-perez)
  
  ************************************************************************ */

  /**
   * A cell event instance contains all data for pointer events related to cells in
   * a table.
   **/
  qx.Class.define("qx.ui.table.pane.CellEvent", {
    extend: qx.event.type.Pointer,
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The table row of the event target */
      row: {
        check: "Integer",
        nullable: true
      },
      /** The table column of the event target */
      column: {
        check: "Integer",
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
       *****************************************************************************
          CONSTRUCTOR
       *****************************************************************************
       */
      /**
       * Initialize the event
       *
       * @param scroller {qx.ui.table.pane.Scroller} The tables pane scroller
       * @param me {qx.event.type.Pointer} The original pointer event
       * @param row {Integer?null} The cell's row index
       * @param column {Integer?null} The cell's column index
       */
      init: function init(scroller, me, row, column) {
        me.clone(this);
        this.setBubbles(false);
        if (row != null) {
          this.setRow(row);
        } else {
          this.setRow(scroller._getRowForPagePos(this.getDocumentLeft(), this.getDocumentTop()));
        }
        if (column != null) {
          this.setColumn(column);
        } else {
          this.setColumn(scroller._getColumnForPageX(this.getDocumentLeft()));
        }
      },
      // overridden
      clone: function clone(embryo) {
        var clone = qx.ui.table.pane.CellEvent.superclass.prototype.clone.call(this, embryo);
        clone.set({
          row: this.getRow(),
          column: this.getColumn()
        });
        return clone;
      }
    }
  });
  qx.ui.table.pane.CellEvent.$$dbClassInfo = $$dbClassInfo;
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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * An abstract resize behavior.  All resize behaviors should extend this
   * class.
   */
  qx.Class.define("qx.ui.table.columnmodel.resizebehavior.Abstract", {
    type: "abstract",
    extend: qx.core.Object,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Called when the ResizeTableColumnModel is initialized, and upon loading of
       * a new TableModel, to allow the Resize Behaviors to know how many columns
       * are in use.
       *
       * @abstract
       * @param numColumns {Integer} The number of columns in use.
       * @throws {Error} the abstract function warning.
       */
      _setNumColumns: function _setNumColumns(numColumns) {
        throw new Error("_setNumColumns is abstract");
      },
      /**
       * Called when the table has first been rendered.
       *
       * @abstract
       * @param event {var} The <i>onappear</i> event object.
       * @param forceRefresh {Boolean?false} Whether a refresh should be forced
       * @throws {Error} the abstract function warning.
       */
      onAppear: function onAppear(event, forceRefresh) {
        throw new Error("onAppear is abstract");
      },
      /**
       * Called when the table width changes due to either a window size change
       * or a parent object changing size causing the table to change size.
       *
       * @abstract
       * @param event {var} The <i>tableWidthChanged</i> event object.
       * @throws {Error} the abstract function warning.
       */
      onTableWidthChanged: function onTableWidthChanged(event) {
        throw new Error("onTableWidthChanged is abstract");
      },
      /**
       * Called when the use of vertical scroll bar in the table changes, either
       * from present to not present, or vice versa.
       *
       * @abstract
       * @param event {var} The <i>verticalScrollBarChanged</i> event object.  This event has data,
       *     obtained via event.getValue(), which is a boolean indicating whether a
       *     vertical scroll bar is now present.
       * @throws {Error} the abstract function warning.
       */
      onVerticalScrollBarChanged: function onVerticalScrollBarChanged(event) {
        throw new Error("onVerticalScrollBarChanged is abstract");
      },
      /**
       * Called when a column width is changed.
       *
       * @abstract
       * @param event {var} The <i>widthChanged</i> event object.  This event has data, obtained via
       *     event.getValue(), which is an object with three properties: the column
       *     which changed width (data.col), the old width (data.oldWidth) and the new
       *     width (data.newWidth).
       * @throws {Error} the abstract function warning.
       */
      onColumnWidthChanged: function onColumnWidthChanged(event) {
        throw new Error("onColumnWidthChanged is abstract");
      },
      /**
       * Called when a column visibility is changed.
       *
       * @abstract
       * @param event {var} The <i>visibilityChanged</i> event object.  This event has data, obtained
       *     via event.getValue(), which is an object with two properties: the column
       *     which changed width (data.col) and the new visibility of the column
       *     (data.visible).
       * @throws {Error} the abstract function warning.
       */
      onVisibilityChanged: function onVisibilityChanged(event) {
        throw new Error("onVisibilityChanged is abstract");
      },
      /**
       * Determine the inner width available to columns in the table.
       *
       * @return {Integer} The available width
       */
      _getAvailableWidth: function _getAvailableWidth() {
        var tableColumnModel = this.getTableColumnModel();

        // Get the inner width off the table
        var table = tableColumnModel.getTable();
        var scrollerArr = table._getPaneScrollerArr();
        if (!scrollerArr[0] || !scrollerArr[0].getLayoutParent().getBounds()) {
          return null;
        }
        var scrollerParentWidth = scrollerArr[0].getLayoutParent().getBounds().width;
        var lastScroller = scrollerArr[scrollerArr.length - 1];
        scrollerParentWidth -= lastScroller.getPaneInsetRight();
        return scrollerParentWidth;
      }
    }
  });
  qx.ui.table.columnmodel.resizebehavior.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * All of the resizing information about a column.
   *
   *  This is used internally by qx.ui.table and qx.ui.progressive's table and
   *  may be used for other widgets as well.
   */
  qx.Class.define("qx.ui.core.ColumnData", {
    extend: qx.ui.core.LayoutItem,
    construct: function construct() {
      qx.ui.core.LayoutItem.constructor.call(this);
      this.setColumnWidth("auto");
    },
    members: {
      __computedWidth__P_215_0: null,
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        this.__computedWidth__P_215_0 = width;
      },
      /**
       * Get the computed width of the column.
       * @return {Integer} Computed column width
       */
      getComputedWidth: function getComputedWidth() {
        return this.__computedWidth__P_215_0;
      },
      /**
       * Get the column's flex value
       *
       * @return {Integer} The column's flex value
       */
      getFlex: function getFlex() {
        return this.getLayoutProperties().flex || 0;
      },
      /**
       * Set the column width. The column width can be one of the following
       * values:
       *
       * * Pixels: e.g. <code>23</code>
       * * Autosized: <code>"auto"</code>
       * * Flex: e.g. <code>"1*"</code>
       * * Percent: e.g. <code>"33%"</code>
       *
       * @param width {Integer|String} The column width
       * @param flex {Integer?0} Optional flex value of the column
       */
      setColumnWidth: function setColumnWidth(width, flex) {
        var flex = flex || 0;
        var percent = null;
        if (typeof width == "number") {
          this.setWidth(width);
        } else if (typeof width == "string") {
          if (width == "auto") {
            flex = 1;
          } else {
            var match = width.match(/^[0-9]+(?:\.[0-9]+)?([%\*])$/);
            if (match) {
              if (match[1] == "*") {
                flex = parseFloat(width);
              } else {
                percent = width;
              }
            }
          }
        }
        this.setLayoutProperties({
          flex: flex,
          width: percent
        });
      }
    },
    environment: {
      "qx.tableResizeDebug": false
    }
  });
  qx.ui.core.ColumnData.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.ui.core.ColumnData": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.columnmodel.resizebehavior.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      },
      "qx.ui.table.columnmodel.Resize": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The default resize behavior.  Until a resize model is loaded, the default
   * behavior is to:
   * <ol>
   *   <li>
   *     Upon the table initially appearing, and upon any window resize, divide
   *     the table space equally between the visible columns.
   *   </li>
   *   <li>
   *     When a column is increased in width, all columns to its right are
   *     pushed to the right with no change to their widths.  This may push some
   *     columns off the right edge of the table, causing a horizontal scroll
   *     bar to appear.
   *   </li>
   *   <li>
   *     When a column is decreased in width, if the total width of all columns
   *     is <i>greater than</i> the table width, no additional column width
   *     change is made.
   *   </li>
   *   <li>
   *     When a column is decreased in width, if the total width of all columns
   *     is <i>less than</i> the table width, the visible column
   *     immediately to the right of the column which decreased in width has its
   *     width increased to fill the remaining space.
   *   </li>
   * </ol>
   *
   * A resize model may be loaded to provide more guidance on how to adjust
   * column width upon each of the events: initial appear, window resize, and
   * column resize. *** TO BE FILLED IN ***
   *
   * @require(qx.ui.core.ColumnData)
   */
  qx.Class.define("qx.ui.table.columnmodel.resizebehavior.Default", {
    extend: qx.ui.table.columnmodel.resizebehavior.Abstract,
    construct: function construct() {
      qx.ui.table.columnmodel.resizebehavior.Abstract.constructor.call(this);
      this.__resizeColumnData__P_213_0 = [];

      // This layout is not connected to a widget but to this class. This class
      // must implement the method "getLayoutChildren", which must return all
      // columns (LayoutItems) which should be recalculated. The call
      // "layout.renderLayout" will call the method "renderLayout" on each column
      // data object
      // The advantage of the use of the normal layout manager is that the
      // semantics of flex and percent are exactly the same as in the widget code.
      this.__layout__P_213_1 = new qx.ui.layout.HBox();
      this.__layout__P_213_1.connectToWidget(this);
      this.__deferredComputeColumnsFlexWidth__P_213_2 = new qx.util.DeferredCall(this._computeColumnsFlexWidth, this);
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * A function to instantiate a resize behavior column data object.
       */
      newResizeBehaviorColumnData: {
        check: "Function",
        init: function init(obj) {
          return new qx.ui.core.ColumnData();
        }
      },
      /**
       * Whether to reinitialize default widths on each appear event.
       * Typically, one would want to initialize the default widths only upon
       * the first appearance of the table, but the original behavior was to
       * reinitialize it even if the table is hidden and then reshown
       * (e.g. it's in a pageview and the page is switched and then switched
       * back).
       */
      initializeWidthsOnEveryAppear: {
        check: "Boolean",
        init: false
      },
      /**
       * The table column model in use.  Of particular interest is the method
       * <i>getTable</i> which is a reference to the table widget.  This allows
       * access to any other features of the table, for use in calculating widths
       * of columns.
       */
      tableColumnModel: {
        check: "qx.ui.table.columnmodel.Resize"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __layout__P_213_1: null,
      __layoutChildren__P_213_3: null,
      __resizeColumnData__P_213_0: null,
      __deferredComputeColumnsFlexWidth__P_213_2: null,
      /**
       * Whether we have initialized widths on the first appear yet
       */
      __widthsInitialized__P_213_4: false,
      /**
       * Set the width of a column.
       *
       * @param col {Integer} The column whose width is to be set
       *
       * @param width {Integer|String}
       *   The width of the specified column.  The width may be specified as
       *   integer number of pixels (e.g. 100), a string representing percentage
       *   of the inner width of the Table (e.g. "25%"), or a string
       *   representing a flex width (e.g. "1*").
       *
       * @param flex {Integer?0} Optional flex value of the column
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setWidth: function setWidth(col, width, flex) {
        // Ensure the column is within range
        if (col >= this.__resizeColumnData__P_213_0.length) {
          throw new Error("Column number out of range");
        }

        // Set the new width
        this.__resizeColumnData__P_213_0[col].setColumnWidth(width, flex);
        this.__deferredComputeColumnsFlexWidth__P_213_2.schedule();
      },
      /**
       * Set the minimum width of a column.
       *
       * @param col {Integer}
       *   The column whose minimum width is to be set
       *
       * @param width {Integer}
       *   The minimum width of the specified column.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setMinWidth: function setMinWidth(col, width) {
        // Ensure the column is within range
        if (col >= this.__resizeColumnData__P_213_0.length) {
          throw new Error("Column number out of range");
        }

        // Set the new width
        this.__resizeColumnData__P_213_0[col].setMinWidth(width);
        this.__deferredComputeColumnsFlexWidth__P_213_2.schedule();
      },
      /**
       * Set the maximum width of a column.
       *
       * @param col {Integer}
       *   The column whose maximum width is to be set
       *
       * @param width {Integer}
       *   The maximum width of the specified column.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      setMaxWidth: function setMaxWidth(col, width) {
        // Ensure the column is within range
        if (col >= this.__resizeColumnData__P_213_0.length) {
          throw new Error("Column number out of range");
        }

        // Set the new width
        this.__resizeColumnData__P_213_0[col].setMaxWidth(width);
        this.__deferredComputeColumnsFlexWidth__P_213_2.schedule();
      },
      /**
       * Set any or all of the width, minimum width, and maximum width of a
       * column in a single call.
       *
       * @param col {Integer}
       *   The column whose attributes are to be changed
       *
       * @param map {Map}
       *   A map containing any or all of the property names "width", "minWidth",
       *   and "maxWidth".  The property values are as described for
       *   {@link #setWidth}, {@link #setMinWidth} and {@link #setMaxWidth}
       *   respectively.
       *
       *
       * @throws {Error}
       *   Error is thrown if the provided column number is out of the range.
       */
      set: function set(col, map) {
        for (var prop in map) {
          switch (prop) {
            case "width":
              this.setWidth(col, map[prop]);
              break;
            case "minWidth":
              this.setMinWidth(col, map[prop]);
              break;
            case "maxWidth":
              this.setMaxWidth(col, map[prop]);
              break;
            default:
              throw new Error("Unknown property: " + prop);
          }
        }
      },
      // overloaded
      onAppear: function onAppear(event, forceRefresh) {
        // If we haven't initialized widths at least once, or
        // they want us to reinitialize widths on every appear event...
        if (forceRefresh === true || !this.__widthsInitialized__P_213_4 || this.getInitializeWidthsOnEveryAppear()) {
          // Calculate column widths
          this._computeColumnsFlexWidth();

          // Track that we've initialized widths at least once
          this.__widthsInitialized__P_213_4 = true;
        }
      },
      // overloaded
      onTableWidthChanged: function onTableWidthChanged(event) {
        this._computeColumnsFlexWidth();
      },
      // overloaded
      onVerticalScrollBarChanged: function onVerticalScrollBarChanged(event) {
        this._computeColumnsFlexWidth();
      },
      // overloaded
      onColumnWidthChanged: function onColumnWidthChanged(event) {
        // Extend the next column to fill blank space
        this._extendNextColumn(event);
      },
      // overloaded
      onVisibilityChanged: function onVisibilityChanged(event) {
        // Event data properties: col, visible
        var data = event.getData();

        // If a column just became visible, resize all columns.
        if (data.visible) {
          this._computeColumnsFlexWidth();
          return;
        }

        // Extend the last column to fill blank space
        this._extendLastColumn(event);
      },
      // overloaded
      _setNumColumns: function _setNumColumns(numColumns) {
        var colData = this.__resizeColumnData__P_213_0;
        // Are there now fewer (or the same number of) columns than there were
        // previously?
        if (numColumns <= colData.length) {
          // Yup.  Delete the extras.
          colData.splice(numColumns, colData.length);
          return;
        }

        // There are more columns than there were previously.  Allocate more.
        for (var i = colData.length; i < numColumns; i++) {
          colData[i] = this.getNewResizeBehaviorColumnData()();
          colData[i].columnNumber = i;
        }
      },
      /**
       * This method is required by the box layout. If returns an array of items
       * to relayout.
       *
       * @return {qx.ui.core.ColumnData[]} The list of column data object to layout.
       */
      getLayoutChildren: function getLayoutChildren() {
        return this.__layoutChildren__P_213_3;
      },
      /**
       * Computes the width of all flexible children.
       *
       */
      _computeColumnsFlexWidth: function _computeColumnsFlexWidth() {
        this.__deferredComputeColumnsFlexWidth__P_213_2.cancel();
        var width = this._getAvailableWidth();
        if (width === null) {
          return;
        }
        var tableColumnModel = this.getTableColumnModel();
        var visibleColumns = tableColumnModel.getVisibleColumns();
        var visibleColumnsLength = visibleColumns.length;
        var colData = this.__resizeColumnData__P_213_0;
        var i, l;
        if (visibleColumnsLength === 0) {
          return;
        }

        // Create an array of the visible columns
        var columns = [];
        for (i = 0; i < visibleColumnsLength; i++) {
          columns.push(colData[visibleColumns[i]]);
        }
        this.__layoutChildren__P_213_3 = columns;
        this.__clearLayoutCaches__P_213_5();

        // Use a horizontal box layout to determine the available width.
        this.__layout__P_213_1.renderLayout(width, 100, {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        });

        // Now that we've calculated the width, set it.
        for (i = 0, l = columns.length; i < l; i++) {
          var colWidth = columns[i].getComputedWidth();
          tableColumnModel.setColumnWidth(visibleColumns[i], colWidth);
        }
      },
      /**
       * Clear all layout caches of the column datas.
       */
      __clearLayoutCaches__P_213_5: function __clearLayoutCaches__P_213_5() {
        this.__layout__P_213_1.invalidateChildrenCache();
        var children = this.__layoutChildren__P_213_3;
        for (var i = 0, l = children.length; i < l; i++) {
          children[i].invalidateLayoutCache();
        }
      },
      /**
       * Extend the visible column to right of the column which just changed
       * width, to fill any available space within the inner width of the table.
       * This means that if the sum of the widths of all columns exceeds the
       * inner width of the table, no change is made.  If, on the other hand,
       * the sum of the widths of all columns is less than the inner width of
       * the table, the visible column to the right of the column which just
       * changed width is extended to take up the width available within the
       * inner width of the table.
       *
       *
       * @param event {qx.event.type.Data}
       *   The event object.
       *
       */
      _extendNextColumn: function _extendNextColumn(event) {
        var tableColumnModel = this.getTableColumnModel();

        // Event data properties: col, oldWidth, newWidth
        var data = event.getData();
        var visibleColumns = tableColumnModel.getVisibleColumns();

        // Determine the available width
        var width = this._getAvailableWidth();

        // Determine the number of visible columns
        var numColumns = visibleColumns.length;

        // Did this column become longer than it was?
        if (data.newWidth > data.oldWidth) {
          // Yup.  Don't resize anything else.  The other columns will just get
          // pushed off and require scrollbars be added (if not already there).
          return;
        }

        // This column became shorter.  See if we no longer take up the full
        // space that's available to us.
        var i;
        var nextCol;
        var widthUsed = 0;
        for (i = 0; i < numColumns; i++) {
          widthUsed += tableColumnModel.getColumnWidth(visibleColumns[i]);
        }

        // If the used width is less than the available width...
        if (widthUsed < width) {
          // ... then determine the next visible column
          for (i = 0; i < visibleColumns.length; i++) {
            if (visibleColumns[i] == data.col) {
              nextCol = visibleColumns[i + 1];
              break;
            }
          }
          if (nextCol) {
            // Make the next column take up the available space.
            var newWidth = width - (widthUsed - tableColumnModel.getColumnWidth(nextCol));
            tableColumnModel.setColumnWidth(nextCol, newWidth);
          }
        }
      },
      /**
       * If a column was just made invisible, extend the last column to fill any
       * available space within the inner width of the table.  This means that
       * if the sum of the widths of all columns exceeds the inner width of the
       * table, no change is made.  If, on the other hand, the sum of the widths
       * of all columns is less than the inner width of the table, the last
       * column is extended to take up the width available within the inner
       * width of the table.
       *
       *
       * @param event {qx.event.type.Data}
       *   The event object.
       *
       */
      _extendLastColumn: function _extendLastColumn(event) {
        var tableColumnModel = this.getTableColumnModel();

        // Event data properties: col, visible
        var data = event.getData();

        // If the column just became visible, don't make any width changes
        if (data.visible) {
          return;
        }

        // Get the array of visible columns
        var visibleColumns = tableColumnModel.getVisibleColumns();

        // If no columns are visible...
        if (visibleColumns.length == 0) {
          return;
        }

        // Determine the available width
        var width = this._getAvailableWidth(tableColumnModel);

        // Determine the number of visible columns
        var numColumns = visibleColumns.length;

        // See if we no longer take up the full space that's available to us.
        var i;
        var lastCol;
        var widthUsed = 0;
        for (i = 0; i < numColumns; i++) {
          widthUsed += tableColumnModel.getColumnWidth(visibleColumns[i]);
        }

        // If the used width is less than the available width...
        if (widthUsed < width) {
          // ... then get the last visible column
          lastCol = visibleColumns[visibleColumns.length - 1];

          // Make the last column take up the available space.
          var newWidth = width - (widthUsed - tableColumnModel.getColumnWidth(lastCol));
          tableColumnModel.setColumnWidth(lastCol, newWidth);
        }
      },
      /**
       * Returns an array of the resizing information of a column.
       *
       * @return {qx.ui.core.ColumnData[]} array of the resizing information of a column.
       */
      _getResizeColumnData: function _getResizeColumnData() {
        return this.__resizeColumnData__P_213_0;
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__resizeColumnData__P_213_0 = this.__layoutChildren__P_213_3 = null;
      this._disposeObjects("__layout__P_213_1", "__deferredComputeColumnsFlexWidth__P_213_2");
    }
  });
  qx.ui.table.columnmodel.resizebehavior.Default.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.IField": {
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all form widgets which use a numeric value as their
   * primary data type like a spinner.
   */
  qx.Interface.define("qx.ui.form.INumberForm", {
    extend: qx.ui.form.IField,
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired when the value was modified */
      changeValue: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        VALUE PROPERTY
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the element's value.
       *
       * @param value {Number|null} The new value of the element.
       */
      setValue: function setValue(value) {
        return arguments.length == 1;
      },
      /**
       * Resets the element's value to its initial value.
       */
      resetValue: function resetValue() {},
      /**
       * The element's user set value.
       *
       * @return {Number|null} The value.
       */
      getValue: function getValue() {}
    }
  });
  qx.ui.form.INumberForm.$$dbClassInfo = $$dbClassInfo;
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all widgets which deal with ranges. The spinner is a good
   * example for a range using widget.
   */
  qx.Interface.define("qx.ui.form.IRange", {
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        MINIMUM PROPERTY
      ---------------------------------------------------------------------------
      */
      /**
       * Set the minimum value of the range.
       *
       * @param min {Number} The minimum.
       */
      setMinimum: function setMinimum(min) {
        return arguments.length == 1;
      },
      /**
       * Return the current set minimum of the range.
       *
       * @return {Number} The current set minimum.
       */
      getMinimum: function getMinimum() {},
      /*
      ---------------------------------------------------------------------------
        MAXIMUM PROPERTY
      ---------------------------------------------------------------------------
      */
      /**
       * Set the maximum value of the range.
       *
       * @param max {Number} The maximum.
       */
      setMaximum: function setMaximum(max) {
        return arguments.length == 1;
      },
      /**
       * Return the current set maximum of the range.
       *
       * @return {Number} The current set maximum.
       */
      getMaximum: function getMaximum() {},
      /*
      ---------------------------------------------------------------------------
        SINGLESTEP PROPERTY
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the value for single steps in the range.
       *
       * @param step {Number} The value of the step.
       */
      setSingleStep: function setSingleStep(step) {
        return arguments.length == 1;
      },
      /**
       * Returns the value which will be stepped in a single step in the range.
       *
       * @return {Number} The current value for single steps.
       */
      getSingleStep: function getSingleStep() {},
      /*
      ---------------------------------------------------------------------------
        PAGESTEP PROPERTY
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the value for page steps in the range.
       *
       * @param step {Number} The value of the step.
       */
      setPageStep: function setPageStep(step) {
        return arguments.length == 1;
      },
      /**
       * Returns the value which will be stepped in a page step in the range.
       *
       * @return {Number} The current value for page steps.
       */
      getPageStep: function getPageStep() {}
    }
  });
  qx.ui.form.IRange.$$dbClassInfo = $$dbClassInfo;
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
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.INumberForm": {
        "require": true
      },
      "qx.ui.form.IRange": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.theme.manager.Decoration": {},
      "qx.bom.element.Location": {},
      "qx.event.Timer": {},
      "qx.bom.AnimationFrame": {},
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
   * The Slider widget provides a vertical or horizontal slider.
   *
   * The Slider is the classic widget for controlling a bounded value.
   * It lets the user move a slider handle along a horizontal or vertical
   * groove and translates the handle's position into an integer value
   * within the defined range.
   *
   * The Slider has very few of its own functions.
   * The most useful functions are slideTo() to set the slider directly to some
   * value; setSingleStep(), setPageStep() to set the steps; and setMinimum()
   * and setMaximum() to define the range of the slider.
   *
   * A slider accepts focus on Tab and provides both a mouse wheel and
   * a keyboard interface. The keyboard interface is the following:
   *
   * * Left/Right move a horizontal slider by one single step.
   * * Up/Down move a vertical slider by one single step.
   * * PageUp moves up one page.
   * * PageDown moves down one page.
   * * Home moves to the start (minimum).
   * * End moves to the end (maximum).
   *
   * Here are the main properties of the class:
   *
   * # <code>value</code>: The bounded integer that {@link qx.ui.form.INumberForm}
   * maintains.
   * # <code>minimum</code>: The lowest possible value.
   * # <code>maximum</code>: The highest possible value.
   * # <code>singleStep</code>: The smaller of two natural steps that an abstract
   * sliders provides and typically corresponds to the user pressing an arrow key.
   * # <code>pageStep</code>: The larger of two natural steps that an abstract
   * slider provides and typically corresponds to the user pressing PageUp or
   * PageDown.
   *
   * @childControl knob {qx.ui.core.Widget} knob to set the value of the slider
   */
  qx.Class.define("qx.ui.form.Slider", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IForm, qx.ui.form.INumberForm, qx.ui.form.IRange],
    include: [qx.ui.form.MForm],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param orientation {String?"horizontal"} Configure the
     * {@link #orientation} property
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this);

      // Force canvas layout
      this._setLayout(new qx.ui.layout.Canvas());

      // ARIA attrs
      this.getContentElement().setAttribute("role", "slider");

      // Add listeners
      this.addListener("keypress", this._onKeyPress, this);
      this.addListener("roll", this._onRoll, this);
      this.addListener("pointerdown", this._onPointerDown, this);
      this.addListener("pointerup", this._onPointerUp, this);
      this.addListener("losecapture", this._onPointerUp, this);
      this.addListener("resize", this._onUpdate, this);

      // Stop events
      this.addListener("contextmenu", this._onStopEvent, this);
      this.addListener("tap", this._onStopEvent, this);
      this.addListener("dbltap", this._onStopEvent, this);

      // Initialize orientation
      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      }
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Change event for the value.
       */
      changeValue: "qx.event.type.Data",
      /** Fired as soon as the slide animation ended. */
      slideAnimationEnd: "qx.event.type.Event"
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
        init: "slider"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },
      /** Whether the slider is horizontal or vertical. */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },
      /**
       * The current slider value.
       *
       * Strictly validates according to {@link #minimum} and {@link #maximum}.
       * Do not apply any value correction to the incoming value. If you depend
       * on this, please use {@link #slideTo} instead.
       */
      value: {
        check: "typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",
        init: 0,
        apply: "_applyValue",
        nullable: true
      },
      /**
       * The minimum slider value (may be negative). This value must be smaller
       * than {@link #maximum}.
       */
      minimum: {
        check: "Integer",
        init: 0,
        apply: "_applyMinimum",
        event: "changeMinimum"
      },
      /**
       * The maximum slider value (may be negative). This value must be larger
       * than {@link #minimum}.
       */
      maximum: {
        check: "Integer",
        init: 100,
        apply: "_applyMaximum",
        event: "changeMaximum"
      },
      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing an arrow key.
       */
      singleStep: {
        check: "Integer",
        init: 1
      },
      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing <code>PageUp</code> or <code>PageDown</code>.
       */
      pageStep: {
        check: "Integer",
        init: 10
      },
      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {
        check: "Number",
        apply: "_applyKnobFactor",
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __sliderLocation__P_219_0: null,
      __knobLocation__P_219_1: null,
      __knobSize__P_219_2: null,
      __dragMode__P_219_3: null,
      __dragOffset__P_219_4: null,
      __trackingMode__P_219_5: null,
      __trackingDirection__P_219_6: null,
      __trackingEnd__P_219_7: null,
      __timer__P_219_8: null,
      // event delay stuff during drag
      __dragTimer__P_219_9: null,
      __lastValueEvent__P_219_10: null,
      __dragValue__P_219_11: null,
      __scrollAnimationframe__P_219_12: null,
      // overridden
      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        invalid: true
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        qx.ui.form.Slider.superclass.prototype.renderLayout.call(this, left, top, width, height);
        // make sure the layout engine does not override the knob position
        this._updateKnobPosition();
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "knob":
            control = new qx.ui.core.Widget();
            control.addListener("resize", this._onUpdate, this);
            control.addListener("pointerover", this._onPointerOver, this);
            control.addListener("pointerout", this._onPointerOut, this);
            this._add(control);
            break;
        }
        return control || qx.ui.form.Slider.superclass.prototype._createChildControlImpl.call(this, id);
      },
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */
      /**
       * Event handler for pointerover events at the knob child control.
       *
       * Adds the 'hovered' state
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        this.addState("hovered");
      },
      /**
       * Event handler for pointerout events at the knob child control.
       *
       * Removes the 'hovered' state
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        this.removeState("hovered");
      },
      /**
       * Listener of roll event
       *
       * @param e {qx.event.type.Roll} Incoming event object
       */
      _onRoll: function _onRoll(e) {
        // only wheel
        if (e.getPointerType() != "wheel") {
          return;
        }
        var axis = this.getOrientation() === "horizontal" ? "x" : "y";
        var delta = e.getDelta()[axis];
        var direction = delta > 0 ? 1 : delta < 0 ? -1 : 0;
        this.slideBy(direction * this.getSingleStep());
        e.stop();
      },
      /**
       * Event handler for keypress events.
       *
       * Adds support for arrow keys, page up, page down, home and end keys.
       *
       * @param e {qx.event.type.KeySequence} Incoming keypress event
       */
      _onKeyPress: function _onKeyPress(e) {
        var isHorizontal = this.getOrientation() === "horizontal";
        var backward = isHorizontal ? "Left" : "Up";
        var forward = isHorizontal ? "Right" : "Down";
        switch (e.getKeyIdentifier()) {
          case forward:
            this.slideForward();
            break;
          case backward:
            this.slideBack();
            break;
          case "PageDown":
            this.slidePageForward(100);
            break;
          case "PageUp":
            this.slidePageBack(100);
            break;
          case "Home":
            this.slideToBegin(200);
            break;
          case "End":
            this.slideToEnd(200);
            break;
          default:
            return;
        }

        // Stop processed events
        e.stop();
      },
      /**
       * Listener of pointerdown event. Initializes drag or tracking mode.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerDown: function _onPointerDown(e) {
        // this can happen if the user releases the button while dragging outside
        // of the browser viewport
        if (this.__dragMode__P_219_3) {
          return;
        }
        var isHorizontal = this.__isHorizontal__P_219_13;
        var knob = this.getChildControl("knob");
        var locationProperty = isHorizontal ? "left" : "top";
        var cursorLocation = isHorizontal ? e.getDocumentLeft() : e.getDocumentTop();
        var decorator = this.getDecorator();
        decorator = qx.theme.manager.Decoration.getInstance().resolve(decorator);
        if (isHorizontal) {
          var decoratorPadding = decorator ? decorator.getInsets().left : 0;
          var padding = (this.getPaddingLeft() || 0) + decoratorPadding;
        } else {
          var decoratorPadding = decorator ? decorator.getInsets().top : 0;
          var padding = (this.getPaddingTop() || 0) + decoratorPadding;
        }
        var sliderLocation = this.__sliderLocation__P_219_0 = qx.bom.element.Location.get(this.getContentElement().getDomElement())[locationProperty];
        sliderLocation += padding;
        var knobLocation = this.__knobLocation__P_219_1 = qx.bom.element.Location.get(knob.getContentElement().getDomElement())[locationProperty];
        if (e.getTarget() === knob) {
          // Switch into drag mode
          this.__dragMode__P_219_3 = true;
          if (!this.__dragTimer__P_219_9) {
            // create a timer to fire delayed dragging events if dragging stops.
            this.__dragTimer__P_219_9 = new qx.event.Timer(100);
            this.__dragTimer__P_219_9.addListener("interval", this._fireValue, this);
          }
          this.__dragTimer__P_219_9.start();
          // Compute dragOffset (includes both: inner position of the widget and
          // cursor position on knob)
          this.__dragOffset__P_219_4 = cursorLocation + sliderLocation - knobLocation;

          // add state
          knob.addState("pressed");
        } else {
          // Switch into tracking mode
          this.__trackingMode__P_219_5 = true;

          // Detect tracking direction
          this.__trackingDirection__P_219_6 = cursorLocation <= knobLocation ? -1 : 1;

          // Compute end value
          this.__computeTrackingEnd__P_219_14(e);

          // Directly call interval method once
          this._onInterval();

          // Initialize timer (when needed)
          if (!this.__timer__P_219_8) {
            this.__timer__P_219_8 = new qx.event.Timer(100);
            this.__timer__P_219_8.addListener("interval", this._onInterval, this);
          }

          // Start timer
          this.__timer__P_219_8.start();
        }

        // Register move listener
        this.addListener("pointermove", this._onPointerMove, this);

        // Activate capturing
        this.capture();

        // Stop event
        e.stopPropagation();
      },
      /**
       * Listener of pointerup event. Used for cleanup of previously
       * initialized modes.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerUp: function _onPointerUp(e) {
        if (this.__dragMode__P_219_3) {
          // Release capture mode
          this.releaseCapture();

          // Cleanup status flags
          delete this.__dragMode__P_219_3;

          // as we come out of drag mode, make
          // sure content gets synced
          this.__dragTimer__P_219_9.stop();
          this._fireValue();
          delete this.__dragOffset__P_219_4;

          // remove state
          this.getChildControl("knob").removeState("pressed");

          // it's necessary to check whether the cursor is over the knob widget to be able to
          // to decide whether to remove the 'hovered' state.
          if (e.getType() === "pointerup") {
            var deltaSlider;
            var deltaPosition;
            var positionSlider;
            if (this.__isHorizontal__P_219_13) {
              deltaSlider = e.getDocumentLeft() - (this._valueToPosition(this.getValue()) + this.__sliderLocation__P_219_0);
              positionSlider = qx.bom.element.Location.get(this.getContentElement().getDomElement())["top"];
              deltaPosition = e.getDocumentTop() - (positionSlider + this.getChildControl("knob").getBounds().top);
            } else {
              deltaSlider = e.getDocumentTop() - (this._valueToPosition(this.getValue()) + this.__sliderLocation__P_219_0);
              positionSlider = qx.bom.element.Location.get(this.getContentElement().getDomElement())["left"];
              deltaPosition = e.getDocumentLeft() - (positionSlider + this.getChildControl("knob").getBounds().left);
            }
            if (deltaPosition < 0 || deltaPosition > this.__knobSize__P_219_2 || deltaSlider < 0 || deltaSlider > this.__knobSize__P_219_2) {
              this.getChildControl("knob").removeState("hovered");
            }
          }
        } else if (this.__trackingMode__P_219_5) {
          // Stop timer interval
          this.__timer__P_219_8.stop();

          // Release capture mode
          this.releaseCapture();

          // Cleanup status flags
          delete this.__trackingMode__P_219_5;
          delete this.__trackingDirection__P_219_6;
          delete this.__trackingEnd__P_219_7;
        }

        // Remove move listener again
        this.removeListener("pointermove", this._onPointerMove, this);

        // Stop event
        if (e.getType() === "pointerup") {
          e.stopPropagation();
        }
      },
      /**
       * Listener of pointermove event for the knob. Only used in drag mode.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerMove: function _onPointerMove(e) {
        if (this.__dragMode__P_219_3) {
          var dragStop = this.__isHorizontal__P_219_13 ? e.getDocumentLeft() : e.getDocumentTop();
          var position = dragStop - this.__dragOffset__P_219_4;
          this.slideTo(this._positionToValue(position));
        } else if (this.__trackingMode__P_219_5) {
          // Update tracking end on pointermove
          this.__computeTrackingEnd__P_219_14(e);
        }

        // Stop event
        e.stopPropagation();
      },
      /**
       * Listener of interval event by the internal timer. Only used
       * in tracking sequences.
       *
       * @param e {qx.event.type.Event} Incoming event object
       */
      _onInterval: function _onInterval(e) {
        // Compute new value
        var value = this.getValue() + this.__trackingDirection__P_219_6 * this.getPageStep();

        // Limit value
        if (value < this.getMinimum()) {
          value = this.getMinimum();
        } else if (value > this.getMaximum()) {
          value = this.getMaximum();
        }

        // Stop at tracking position (where the pointer is pressed down)
        var slideBack = this.__trackingDirection__P_219_6 == -1;
        if (slideBack && value <= this.__trackingEnd__P_219_7 || !slideBack && value >= this.__trackingEnd__P_219_7) {
          value = this.__trackingEnd__P_219_7;
        }

        // Finally slide to the desired position
        this.slideTo(value);
      },
      /**
       * Listener of resize event for both the slider itself and the knob.
       *
       * @param e {qx.event.type.Data} Incoming event object
       */
      _onUpdate: function _onUpdate(e) {
        // Update sliding space
        var availSize = this.getInnerSize();
        var knobSize = this.getChildControl("knob").getBounds();
        var sizeProperty = this.__isHorizontal__P_219_13 ? "width" : "height";

        // Sync knob size
        this._updateKnobSize();

        // Store knob size
        this.__slidingSpace__P_219_15 = availSize[sizeProperty] - knobSize[sizeProperty];
        this.__knobSize__P_219_2 = knobSize[sizeProperty];

        // Update knob position (sliding space must be updated first)
        this._updateKnobPosition();
      },
      /*
      ---------------------------------------------------------------------------
        UTILS
      ---------------------------------------------------------------------------
      */

      /** @type {Boolean} Whether the slider is laid out horizontally */
      __isHorizontal__P_219_13: false,
      /**
       * @type {Integer} Available space for knob to slide on, computed on resize of
       * the widget
       */
      __slidingSpace__P_219_15: 0,
      /**
       * Computes the value where the tracking should end depending on
       * the current pointer position.
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      __computeTrackingEnd__P_219_14: function __computeTrackingEnd__P_219_14(e) {
        var isHorizontal = this.__isHorizontal__P_219_13;
        var cursorLocation = isHorizontal ? e.getDocumentLeft() : e.getDocumentTop();
        var sliderLocation = this.__sliderLocation__P_219_0;
        var knobLocation = this.__knobLocation__P_219_1;
        var knobSize = this.__knobSize__P_219_2;

        // Compute relative position
        var position = cursorLocation - sliderLocation;
        if (cursorLocation >= knobLocation) {
          position -= knobSize;
        }

        // Compute stop value
        var value = this._positionToValue(position);
        var min = this.getMinimum();
        var max = this.getMaximum();
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        } else {
          var old = this.getValue();
          var step = this.getPageStep();
          var method = this.__trackingDirection__P_219_6 < 0 ? "floor" : "ceil";

          // Fix to page step
          value = old + Math[method]((value - old) / step) * step;
        }

        // Store value when undefined, otherwise only when it follows the
        // current direction e.g. goes up or down
        if (this.__trackingEnd__P_219_7 == null || this.__trackingDirection__P_219_6 == -1 && value <= this.__trackingEnd__P_219_7 || this.__trackingDirection__P_219_6 == 1 && value >= this.__trackingEnd__P_219_7) {
          this.__trackingEnd__P_219_7 = value;
        }
      },
      /**
       * Converts the given position to a value.
       *
       * Does not respect single or page step.
       *
       * @param position {Integer} Position to use
       * @return {Integer} Resulting value (rounded)
       */
      _positionToValue: function _positionToValue(position) {
        // Reading available space
        var avail = this.__slidingSpace__P_219_15;

        // Protect undefined value (before initial resize) and division by zero
        if (avail == null || avail == 0) {
          return 0;
        }

        // Compute and limit percent
        var percent = position / avail;
        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        }

        // Compute range
        var range = this.getMaximum() - this.getMinimum();

        // Compute value
        return this.getMinimum() + Math.round(range * percent);
      },
      /**
       * Converts the given value to a position to place
       * the knob to.
       *
       * @param value {Integer} Value to use
       * @return {Integer} Computed position (rounded)
       */
      _valueToPosition: function _valueToPosition(value) {
        // Reading available space
        var avail = this.__slidingSpace__P_219_15;
        if (avail == null) {
          return 0;
        }

        // Computing range
        var range = this.getMaximum() - this.getMinimum();

        // Protect division by zero
        if (range == 0) {
          return 0;
        }

        // Translating value to distance from minimum
        var value = value - this.getMinimum();

        // Compute and limit percent
        var percent = value / range;
        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        }

        // Compute position from available space and percent
        return Math.round(avail * percent);
      },
      /**
       * Updates the knob position following the currently configured
       * value. Useful on reflows where the dimensions of the slider
       * itself have been modified.
       *
       */
      _updateKnobPosition: function _updateKnobPosition() {
        this._setKnobPosition(this._valueToPosition(this.getValue()));
      },
      /**
       * Moves the knob to the given position.
       *
       * @param position {Integer} Any valid position (needs to be
       *   greater or equal than zero)
       */
      _setKnobPosition: function _setKnobPosition(position) {
        // Use the DOM Element to prevent unnecessary layout recalculations
        var knob = this.getChildControl("knob");
        var dec = this.getDecorator();
        dec = qx.theme.manager.Decoration.getInstance().resolve(dec);
        var content = knob.getContentElement();
        if (this.__isHorizontal__P_219_13) {
          if (dec && dec.getPadding()) {
            position += dec.getPadding().left;
          }
          position += this.getPaddingLeft() || 0;
          content.setStyle("left", position + "px", true);
        } else {
          if (dec && dec.getPadding()) {
            position += dec.getPadding().top;
          }
          position += this.getPaddingTop() || 0;
          content.setStyle("top", position + "px", true);
        }
      },
      /**
       * Reconfigures the size of the knob depending on
       * the optionally defined {@link #knobFactor}.
       *
       */
      _updateKnobSize: function _updateKnobSize() {
        // Compute knob size
        var knobFactor = this.getKnobFactor();
        if (knobFactor == null) {
          return;
        }

        // Ignore when not rendered yet
        var avail = this.getInnerSize();
        if (avail == null) {
          return;
        }

        // Read size property
        if (this.__isHorizontal__P_219_13) {
          this.getChildControl("knob").setWidth(Math.round(knobFactor * avail.width));
        } else {
          this.getChildControl("knob").setHeight(Math.round(knobFactor * avail.height));
        }
      },
      /*
      ---------------------------------------------------------------------------
        SLIDE METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Slides backward to the minimum value
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideToBegin: function slideToBegin(duration) {
        this.slideTo(this.getMinimum(), duration);
      },
      /**
       * Slides forward to the maximum value
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideToEnd: function slideToEnd(duration) {
        this.slideTo(this.getMaximum(), duration);
      },
      /**
       * Slides forward (right or bottom depending on orientation)
       *
       */
      slideForward: function slideForward() {
        this.slideBy(this.getSingleStep());
      },
      /**
       * Slides backward (to left or top depending on orientation)
       *
       */
      slideBack: function slideBack() {
        this.slideBy(-this.getSingleStep());
      },
      /**
       * Slides a page forward (to right or bottom depending on orientation)
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slidePageForward: function slidePageForward(duration) {
        this.slideBy(this.getPageStep(), duration);
      },
      /**
       * Slides a page backward (to left or top depending on orientation)
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slidePageBack: function slidePageBack(duration) {
        this.slideBy(-this.getPageStep(), duration);
      },
      /**
       * Slides by the given offset.
       *
       * This method works with the value, not with the coordinate.
       *
       * @param offset {Integer} Offset to scroll by
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideBy: function slideBy(offset, duration) {
        this.slideTo(this.getValue() + offset, duration);
      },
      /**
       * Slides to the given value
       *
       * This method works with the value, not with the coordinate.
       *
       * @param value {Integer} Scroll to a value between the defined
       *   minimum and maximum.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideTo: function slideTo(value, duration) {
        this.stopSlideAnimation();
        if (duration) {
          this.__animateTo__P_219_16(value, duration);
        } else {
          this.updatePosition(value);
        }
      },
      /**
       * Updates the position property considering the minimum and maximum values.
       * @param value {Number} The new position.
       */
      updatePosition: function updatePosition(value) {
        this.setValue(this.__normalizeValue__P_219_17(value));
      },
      /**
       * In case a slide animation is currently running, it will be stopped.
       * If not, the method does nothing.
       */
      stopSlideAnimation: function stopSlideAnimation() {
        if (this.__scrollAnimationframe__P_219_12) {
          this.__scrollAnimationframe__P_219_12.cancelSequence();
          this.__scrollAnimationframe__P_219_12 = null;
        }
      },
      /**
       * Internal helper to normalize the given value concerning the minimum
       * and maximum value.
       * @param value {Number} The value to normalize.
       * @return {Number} The normalized value.
       */
      __normalizeValue__P_219_17: function __normalizeValue__P_219_17(value) {
        // Bring into allowed range or fix to single step grid
        if (value < this.getMinimum()) {
          value = this.getMinimum();
        } else if (value > this.getMaximum()) {
          value = this.getMaximum();
        } else {
          value = this.getMinimum() + Math.round((value - this.getMinimum()) / this.getSingleStep()) * this.getSingleStep();
        }
        return value;
      },
      /**
       * Animation helper which takes care of the animated slide.
       * @param to {Number} The target value.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      __animateTo__P_219_16: function __animateTo__P_219_16(to, duration) {
        to = this.__normalizeValue__P_219_17(to);
        var from = this.getValue();
        this.__scrollAnimationframe__P_219_12 = new qx.bom.AnimationFrame();
        this.__scrollAnimationframe__P_219_12.on("frame", function (timePassed) {
          this.setValue(parseInt(timePassed / duration * (to - from) + from));
        }, this);
        this.__scrollAnimationframe__P_219_12.on("end", function () {
          this.setValue(to);
          this.__scrollAnimationframe__P_219_12 = null;
          this.fireEvent("slideAnimationEnd");
        }, this);
        this.__scrollAnimationframe__P_219_12.startSequence(duration);
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-orientation", value);
        var knob = this.getChildControl("knob");

        // Update private flag for faster access
        this.__isHorizontal__P_219_13 = value === "horizontal";

        // Toggle states and knob layout
        if (this.__isHorizontal__P_219_13) {
          this.removeState("vertical");
          knob.removeState("vertical");
          this.addState("horizontal");
          knob.addState("horizontal");
          knob.setLayoutProperties({
            top: 0,
            right: null,
            bottom: 0
          });
        } else {
          this.removeState("horizontal");
          knob.removeState("horizontal");
          this.addState("vertical");
          knob.addState("vertical");
          knob.setLayoutProperties({
            right: 0,
            bottom: null,
            left: 0
          });
        }

        // Sync knob position
        this._updateKnobPosition();
      },
      // property apply
      _applyKnobFactor: function _applyKnobFactor(value, old) {
        if (value != null) {
          this._updateKnobSize();
        } else {
          if (this.__isHorizontal__P_219_13) {
            this.getChildControl("knob").resetWidth();
          } else {
            this.getChildControl("knob").resetHeight();
          }
        }
      },
      // property apply
      _applyValue: function _applyValue(value, old) {
        if (value != null) {
          // ARIA attrs
          this.getContentElement().setAttribute("aria-valuenow", value);
          this._updateKnobPosition();
          if (this.__dragMode__P_219_3) {
            this.__dragValue__P_219_11 = [value, old];
          } else {
            this.fireEvent("changeValue", qx.event.type.Data, [value, old]);
          }
        } else {
          this.resetValue();
        }
      },
      /**
       * Helper for applyValue which fires the changeValue event.
       */
      _fireValue: function _fireValue() {
        if (!this.__dragValue__P_219_11) {
          return;
        }
        var tmp = this.__dragValue__P_219_11;
        this.__dragValue__P_219_11 = null;
        this.fireEvent("changeValue", qx.event.type.Data, tmp);
      },
      // property apply
      _applyMinimum: function _applyMinimum(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-valuemin", value);
        if (this.getValue() < value) {
          this.setValue(value);
        }
        this._updateKnobPosition();
      },
      // property apply
      _applyMaximum: function _applyMaximum(value, old) {
        // ARIA attrs
        this.getContentElement().setAttribute("aria-valuemax", value);
        if (this.getValue() > value) {
          this.setValue(value);
        }
        this._updateKnobPosition();
      }
    }
  });
  qx.ui.form.Slider.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Slider": {
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
   * Minimal modified version of the {@link qx.ui.form.Slider} to be
   * used by {@link qx.ui.core.scroll.ScrollBar}.
   *
   * @internal
   */
  qx.Class.define("qx.ui.core.scroll.ScrollSlider", {
    extend: qx.ui.form.Slider,
    // overridden
    construct: function construct(orientation) {
      qx.ui.form.Slider.constructor.call(this, orientation);

      // Remove roll/keypress events
      this.removeListener("keypress", this._onKeyPress);
      this.removeListener("roll", this._onRoll);
    },
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case "knob":
            control = qx.ui.core.scroll.ScrollSlider.superclass.prototype._createChildControlImpl.call(this, id);
            control.addListener("dblclick", function (e) {
              e.stopPropagation();
            });
        }
        return control || qx.ui.core.scroll.ScrollSlider.superclass.prototype._createChildControlImpl.call(this, id);
      },
      // overridden
      getSizeHint: function getSizeHint(compute) {
        // get the original size hint
        var hint = qx.ui.core.scroll.ScrollSlider.superclass.prototype.getSizeHint.call(this);
        // set the width or height to 0 depending on the orientation.
        // this is necessary to prevent the ScrollSlider to change the size
        // hint of its parent, which can cause errors on outer flex layouts
        // [BUG #3279]
        if (this.getOrientation() === "horizontal") {
          hint.width = 0;
        } else {
          hint.height = 0;
        }
        return hint;
      }
    }
  });
  qx.ui.core.scroll.ScrollSlider.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Generic escaping and unescaping of DOM strings.
   *
   * {@link qx.bom.String} for (un)escaping of HTML strings.
   * {@link qx.xml.String} for (un)escaping of XML strings.
   */
  qx.Bootstrap.define("qx.util.StringEscape", {
    statics: {
      /**
       * generic escaping method
       *
       * @param str {String} string to escape
       * @param charCodeToEntities {Map} entity to charcode map
       * @return {String} escaped string
       */
      escape: function escape(str, charCodeToEntities) {
        var entity,
          result = "";
        for (var i = 0, l = str.length; i < l; i++) {
          var chr = str.charAt(i);
          var code = str.codePointAt(i);
          i += String.fromCodePoint(code).length - 1;
          if (charCodeToEntities[code]) {
            entity = "&" + charCodeToEntities[code] + ";";
          } else {
            if (code > 0x7f) {
              entity = "&#" + code + ";";
            } else {
              entity = chr;
            }
          }
          result += entity;
        }
        return result;
      },
      /**
       * generic unescaping method
       *
       * @param str {String} string to unescape
       * @param entitiesToCharCode {Map} charcode to entity map
       * @return {String} unescaped string
       */
      unescape: function unescape(str, entitiesToCharCode) {
        return str.replace(/&[#\w]+;/gi, function (entity) {
          var chr = entity;
          var entity = entity.substring(1, entity.length - 1);
          var code = entitiesToCharCode[entity];
          if (code) {
            chr = String.fromCharCode(code);
          } else {
            if (entity.charAt(0) == "#") {
              if (entity.charAt(1).toUpperCase() == "X") {
                code = entity.substring(2);

                // match hex number
                if (code.match(/^[0-9A-Fa-f]+$/gi)) {
                  chr = String.fromCodePoint(parseInt(code, 16));
                }
              } else {
                code = entity.substring(1);

                // match integer
                if (code.match(/^\d+$/gi)) {
                  chr = String.fromCodePoint(parseInt(code, 10));
                }
              }
            }
          }
          return chr;
        });
      }
    }
  });
  qx.util.StringEscape.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {}
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
   * Provides information about locale-dependent number formatting (like the decimal
   * separator).
   *
   * @cldr()
   */

  qx.Class.define("qx.locale.Number", {
    statics: {
      /**
       * Get decimal separator for number formatting
       *
       * @param locale {String} optional locale to be used
       * @return {String} decimal separator.
       */
      getDecimalSeparator: function getDecimalSeparator(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_number_decimal_separator", [], locale);
      },
      /**
       * Get thousand grouping separator for number formatting
       *
       * @param locale {String} optional locale to be used
       * @return {String} group separator.
       */
      getGroupSeparator: function getGroupSeparator(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_number_group_separator", [], locale);
      },
      /**
       * Get percent format string
       *
       * @param locale {String} optional locale to be used
       * @return {String} percent format string.
       */
      getPercentFormat: function getPercentFormat(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_number_percent_format", [], locale);
      }
    }
  });
  qx.locale.Number.$$dbClassInfo = $$dbClassInfo;
})();

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.rgba": {
          "load": true,
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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Tristan Koch (trkoch)
  
  ************************************************************************ */

  /**
   * Indigo color theme
   */
  qx.Theme.define("qx.theme.indigo.Color", {
    colors: {
      // main
      background: "white",
      "dark-blue": "#323335",
      "light-background": "#F4F4F4",
      font: "#262626",
      highlight: "#3D72C9",
      // bright blue
      "highlight-shade": "#5583D0",
      // bright blue

      // backgrounds
      "background-selected": "#3D72C9",
      "background-selected-disabled": "#CDCDCD",
      "background-selected-dark": "#323335",
      "background-disabled": "#F7F7F7",
      "background-disabled-checked": "#BBBBBB",
      "background-pane": "white",
      // tabview
      "tabview-unselected": "#1866B5",
      "tabview-button-border": "#134983",
      "tabview-label-active-disabled": "#D9D9D9",
      // text colors
      link: "#24B",
      // scrollbar
      "scrollbar-bright": "#F1F1F1",
      "scrollbar-dark": "#EBEBEB",
      // form
      button: "#E8F0E3",
      "button-border": "#BBB",
      "button-border-hovered": "#939393",
      invalid: "#C00F00",
      "button-box-bright": "#F9F9F9",
      "button-box-dark": "#E3E3E3",
      "button-box-bright-pressed": "#BABABA",
      "button-box-dark-pressed": "#EBEBEB",
      "border-lead": "#888888",
      // window
      "window-border": "#dddddd",
      "window-border-inner": "#F4F4F4",
      // group box
      "white-box-border": "#dddddd",
      // shadows
      shadow: qx.core.Environment.get("css.rgba") ? "rgba(0, 0, 0, 0.4)" : "#666666",
      // borders
      "border-main": "#dddddd",
      "border-light": "#B7B7B7",
      "border-light-shadow": "#686868",
      // separator
      "border-separator": "#808080",
      // text
      text: "#262626",
      "text-disabled": "#A7A6AA",
      "text-selected": "white",
      "text-placeholder": "#CBC8CD",
      // tooltip
      tooltip: "#FE0",
      "tooltip-text": "black",
      // table
      "table-header": [242, 242, 242],
      "table-focus-indicator": "#3D72C9",
      // used in table code
      "table-header-cell": [235, 234, 219],
      "table-row-background-focused-selected": "#3D72C9",
      "table-row-background-focused": "#F4F4F4",
      "table-row-background-selected": [51, 94, 168],
      "table-row-background-even": "white",
      "table-row-background-odd": "white",
      "table-row-selected": [255, 255, 255],
      "table-row": [0, 0, 0],
      "table-row-line": "#EEE",
      "table-column-line": "#EEE",
      // used in progressive code
      "progressive-table-header": "#AAAAAA",
      "progressive-table-row-background-even": [250, 248, 243],
      "progressive-table-row-background-odd": [255, 255, 255],
      "progressive-progressbar-background": "gray",
      "progressive-progressbar-indicator-done": "#CCCCCC",
      "progressive-progressbar-indicator-undone": "white",
      "progressive-progressbar-percent-background": "gray",
      "progressive-progressbar-percent-text": "white"
    }
  });
  qx.theme.indigo.Color.$$dbClassInfo = $$dbClassInfo;
})();
//# sourceMappingURL=package-21.js.map?dt=1686138468341
qx.$$packageData['21'] = {
  "locales": {},
  "resources": {},
  "translations": {
    "en": {},
    "ru": {
      "Reset column widths": "Сбросить длины столбцов"
    }
  }
};
