/** jQuery required */
class EditorCharTriggeringList {
	constructor(codemirror, itemsSet, configuration = null) {
    this._codemirror = codemirror;
    this._doc = this._codemirror.doc;
    this._display = this._codemirror.display;
    this._cursor = this._display.cursor;
    this._wrapper = this._display.wrapper;

    this._itemsSet = itemsSet;
    // <div>
    this._list = null;
    // [<a>, <a>]
    this._items = null;
    this._activate = false;
    this._isTriggered = false;
    // index of selected item
    this._index = 0;
    // total number of matched items
    this._total = 0;
    this._triggerCursor = null;

    // configurable
    this._limit = -1;
    this._triggerChar = null;
    this._listCssObj = null;
    this._itemCssObj = null;
    this._listClasses = null;
    this._itemClasses = null;

    this._configuration = configuration;
    this._parseConfig();

    this._initList();
    this._initListeners();
  }
  /** 激活侦听 */
  activate() {
  	this._activate = true;
  	this._codemirror.on('change', this._onChange);
  }
  /** 撤销侦听 */
  deactivate() {
  	this._hide();
  	this._activate = false;
  	this._codemirror.off('change', this._onChange);
  }

  _parseConfig() {
  	const c = this._configuration || {};
  	this._limit = c.hasOwnProperty('limit') ? c.limit : 5;
  	this._triggerChar = c.hasOwnProperty('triggerChar') ? c.triggerChar : '@';
  	this._listCssObj = c.hasOwnProperty('listCssObj') ? c.listCssObj : null;
  	this._itemCssObj = c.hasOwnProperty('itemCssObj') ? c.itemCssObj : null;
  	this._listClasses = c.hasOwnProperty('listClasses') ? c.listClasses : null;
  	this._itemClasses = c.hasOwnProperty('itemClasses') ? c.itemClasses : null;
  }

  _nextItem() {
		let targetIndex = this._index + 1;
		if (targetIndex > this._total - 1) targetIndex = 0;
		this._selectItem(targetIndex);
	}

	_prevItem() {
		let targetIndex = this._index - 1;
		if (targetIndex < 0) targetIndex = this._total - 1;
		this._selectItem(targetIndex);
	}

	_selectItem(i) {
		const nodes = this._list.get(0).childNodes;
		$(nodes[this._index]).removeClass('trigger-item-active');
		this._index = i;
		$(nodes[this._index]).addClass('trigger-item-active');
	}

	_enterItem(){
		const nodes = this._list.get(0).childNodes;
		const username = $(nodes[this._index]).text();
		this._hide();
		this._doc.replaceRange(`${username} `, this._triggerCursor, this._doc.getCursor());
		this._codemirror.focus();
	}

  _initListeners() {
  	this._onChange = this._onChange.bind(this);
  	this._onKeydown = this._onKeydown.bind(this);
  	this._onHide = this._onHide.bind(this);
  	this._onCursorActivity = this._onCursorActivity.bind(this);
  }

  _onChange(i, changeObj) {
		if (changeObj.text.toString() == this._triggerChar) {
			this._triggerCursor = this._doc.getCursor();
			this._show();
		}
  }

  _onCursorActivity() {
  	const currentCursor = this._doc.getCursor();
  	if(currentCursor.line > this._triggerCursor.line || (currentCursor.line == this._triggerCursor.line && currentCursor.ch >= this._triggerCursor.ch)) {
  		const k = this._doc.getRange(this._triggerCursor, this._doc.getCursor());
			if (this._searchKeyword(k)) {
				this._updatePosition();
				return;
			}
  	}
  	this._hide();
  }

  _onHide() {
  	this._hide();
  }

  _onKeydown(i) {
		switch(event.keyCode) {
			// Enter
			case 13:
			// ArrowUp
			case 38:
			// ArrowDown
			case 40:
				event.preventDefault();
				event.stopPropagation();
				if (event.keyCode == 13) this._enterItem();
				else if (event.keyCode == 38) this._prevItem();
				else if (event.keyCode == 40) this._nextItem();
				break;
			// Esc
			case 27:
				this._hide();
				break;
		}
  }

  _searchKeyword(keyword){
		keyword = keyword.toLowerCase();
		const matched = [];
		const values = this._itemsSet.values();
		// 获取匹配的字符串
		for (let n of values) {
		  if (n.toLowerCase().indexOf(keyword) != -1 && matched.length < this._limit) {
		  	matched.push(n);
		  }
		}
		this._list.empty();
		if (matched.length) {
			// 对结果进行排序
			matched.sort((a, b) => {
				const aIndex = a.toLowerCase().indexOf(keyword);
				const bIndex = b.toLowerCase().indexOf(keyword);
				return aIndex - bIndex;
			});
			// 组件UI
			for(let i = 0;i < matched.length;i++) {
				let newLi = this._items[i];
				let reg = new RegExp(`(${keyword})`, 'gi');
				let currentName = matched[i];
				currentName = currentName.replace(reg, '<b>$1</b>');
				newLi.html(currentName);
				this._list.append(newLi);
			}
			this._total = matched.length;
			this._selectItem(0);
			return true;
		}
		return false;
	}

  _updatePosition() {
		const lineH = this._display.cachedTextHeight;
		this._list.css('left', $(this._cursor).css('left'));
		this._list.css('top', (this._wrapper.offsetTop + this._cursor.offsetTop - this._doc.scrollTop + lineH / 2));
	}

	_show() {
		if (this._isTriggered) return;

		$(this._wrapper.offsetParent).append(this._list);
		this._list.show();
		this._isTriggered = true;

		this._codemirror.on('keydown', this._onKeydown);
		this._codemirror.on('blur', this._onHide);
		this._codemirror.on('scroll', this._onHide);
		this._codemirror.on('cursorActivity', this._onCursorActivity);
	}

	_hide() {
		this._list.hide();
		this._isTriggered = false;

		this._codemirror.off('keydown', this._onKeydown);
		this._codemirror.off('blur', this._onHide);
		this._codemirror.off('scroll', this._onHide);
		this._codemirror.off('cursorActivity', this._onCursorActivity);
	}

  _initList() {
  	this._list = $('<ul></ul>');
  	this._list.addClass('trigger-list');

  	this._list.mousedown((e) => {
  		e.preventDefault();
  		e.stopPropagation();
  	});
		this._list.click((e) => {
			e.preventDefault();
			e.stopPropagation();
			const node = e.target;
			const nodes = this._list.get(0).childNodes;
			for(var entry of nodes.entries()) {
				if(node == entry[1]) {
					this._selectItem(entry[0]);
					this._enterItem();
					break;
				}
			}
		});
  	// 子项
  	this._items = [];
  	for(let i = 0;i < this._limit;i++) {
  		let newLi = $(`<li>unknown</li>`);
  		newLi.addClass('trigger-item')
			this._items.push(newLi);
  	}
  }
}