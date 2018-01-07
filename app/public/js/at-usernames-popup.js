/** 需先加载Bootstrap */
class AtUsersPopup {
	constructor(codemirror, usernamesSet, configuration = null) {
    this._codemirror = codemirror;
    this._doc = this._codemirror.doc;
    this._display = this._codemirror.display;
    this._cursor = this._display.cursor;
    this._wrapper = this._display.wrapper;

    this._usernames = usernamesSet;
    this._activate = false;
    this._index = 0;
    this._total = 0;
    this._atCursor = null;
    this._limit = 5;

    this._configuration = configuration;
    this._parseConfig();

    this._initList();
    this._initListeners();
  }

  _parseConfig() {

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
		$(nodes[this._index]).removeClass('active');
		this._index = i;
		$(nodes[this._index]).addClass('active');
	}

	_enterItem(){
		const nodes = this._list.get(0).childNodes;
		const username = $(nodes[this._index]).text();
		this._hide();
		this._doc.replaceRange(`${username} `, this._atCursor, this._doc.getCursor());
	}

  _initListeners() {
  	this._codemirror.on('change', (i, changeObj) => {
  		const addText = changeObj.text;
  		console.log(changeObj)
			if (addText.length == 1) {
				const singleChar = addText[0];
				if (singleChar == '@') {
					this._atCursor = this._doc.getCursor();
					this._show();
					this._searchKeyword('');
					this._updatePosition();
					return;
				} else if(this._activate) {
					const currentKeyword = this._doc.getRange(this._atCursor, this._doc.getCursor());
					if (currentKeyword && this._searchKeyword(currentKeyword)) {
						this._updatePosition();
						return;
					}
				}
			}
			this._hide();
  	});

  	this._codemirror.on('keydown', (i) => {
			if (!this._activate) return;
			switch(event.keyCode) {
				case 13:
				case 38:
				case 40:
					event.preventDefault();
					event.stopPropagation();
					if (event.keyCode == 13) this._enterItem();
					else if (event.keyCode == 38) this._prevItem();
					else if (event.keyCode == 40) this._nextItem();
					break;
			}
		});
  }

  _searchKeyword(keyword){
		keyword = keyword.toLowerCase();
		const matched = [];
		const values = this._usernames.values();
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
				let newLi = $(`<a href="#" class="list-group-item list-group-item-action at-item" style="line-height: 1;">${matched[i]}</a>`);
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
		this._list.css('top', (this._atCursor.line * lineH + lineH / 2) + 'px');
	}

	_show() {
		$(this._wrapper).append(this._list);
		this._list.show();
		this._activate = true;
	}

	_hide() {
		this._list.hide();
		this._activate = false;
	}

  _initList() {
  	this._list = $('<div></div>');
  	this._list.addClass('list-group');
  	this._list.css('position', 'absolute');
  	this._list.css('z-index', 101);
  	this._list.css('max-width', '300px');
  	this._list.css('min-width', '130px');
  	this._list.css('display', 'none');
  }
}