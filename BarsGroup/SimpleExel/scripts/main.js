
window.onload = function () {
	var exlTable = new SimpleExcel('#simple-excel');
    console.log(exlTable);
};

/**
 * Module whitch can create table and manage the cells.
 */
var SimpleExcel = (function () {
	var table, parent, controls,
        blankRow = document.createElement('TR'),
        blankCol = document.createElement('TD'),
        ExlActions = {
            create: {
                title: 'Создать таблицу',
                handler: createTable
            },
            addCol: {
                title: 'Добавить колонку',
                handler: addCol
            },
            addRow: {
                title: 'Добавить строку',
                handler: addRow
            }
        };

	/** 
	 * @param {string} sParentSel Selector to the point of attachment
	 * @constructor 
	 */
	function construct(sParentSel) {
		if (sParentSel == null) {
			throw new Error('Incorrect input in SimpleExcel constructor');
		}
		parent = document.querySelector(sParentSel);
        controls = createControls();
        controls.classList.add('excel-controls');
        blankCol.innerHTML = '<input type="text">';
        blankRow.appendChild(blankCol);
        parent.appendChild(controls);
	}
    // Reveal public methods
    construct.prototype.createTable = createTable;
    construct.prototype.addCol = addCol;
    construct.prototype.addRow = addRow;

    /** @public */
	function createTable() {
        if (table != null) {
            return table;
        }
        table = document.createElement('TABLE');
        table.classList.add('excel-table');
        table.addEventListener('mousedown', tableHandler);
        table.addEventListener('dblclick', tableHandler);
        parent.appendChild(table);
        return table;
	}

    /** @public */
	function addCol() {
        var i, len;
        if (table.rows.length === 0) {
            addRow();
        }
        for (i = 0, len = table.rows.length; i < len; i++) {
            table.rows[i].appendChild(blankCol.cloneNode(true));
        }
        blankRow.appendChild(blankCol.cloneNode(true));
	}
    /** @public */
	function addRow() {
        table.appendChild(blankRow.cloneNode(true));
	}

    /** @private */
    function createControls() {
        var controls = document.createElement('DIV'),
            key, btns = '';
        // Generate controlls inner
        for (key in ExlActions) if (ExlActions.hasOwnProperty(key)) {
            btns += '<button data-excel-cmd="'+key+'">' +
                        ExlActions[key].title +
                    '</button>';
        }
        controls.innerHTML = btns;
        controls.addEventListener('click', controlsHandler);
        return controls;
    }

    /** @private */
    function tableHandler(event) {
        var e = event || window.event,
            target = e.target || e.srcElement;
        try {
            switch (e.type) {
                case 'mousedown':
                    if (target.tagName === 'INPUT') {
                        target.readOnly = true;
                    }
                    break;
                case 'dblclick':
                    if (target.tagName === 'INPUT') {
                        target.readOnly = false;
                        target.focus();
                    }
                    break;
            }
        } catch (ex) {
            console.warn('Error found in table event handling', ex);
        }
    }
    /** @private */
    function controlsHandler(event) {
        var e = event || window.event,
            target = e.target || e.srcElement;
        try {
            // Call method from configs - ExlActions
            ExlActions[target.dataset.excelCmd].handler();
        } catch(ex) {
            console.warn('Error found in controls event handling', ex);
        }
    }

	return construct;
})();