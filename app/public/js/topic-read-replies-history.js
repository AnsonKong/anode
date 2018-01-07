const list = $('#replies-history-list');
let timeoutFlag;
list.hover(function() {
	clearTimeout(timeoutFlag);
}, function() {
	list.fadeOut();
});
$('.replies-history-btn').hover(function(){
	clearTimeout(timeoutFlag);
	const li = $(this).parents('li[parent-id]');
	if (li.length) {
		const parentIds = [];
		getParentIds(li, parentIds);
		// 如果有父回复
		if (parentIds.length) {
			buildRepliesHistory(parentIds);

			const btn = $(event.target);
			const parent = btn.parent();
			parent.append(list);
			const x = btn.position().left + btn.width() + 10;
			const y = btn.position().top;
			list.css('left', x);
			list.css('top', y);
			list.fadeIn();
		}
	}
}, function() {
	timeoutFlag = setTimeout(function(){list.fadeOut();}, 500);
});
/** 获取父回复id数组 */
function getParentIds(li, parentIds) {
	const parentId = li.attr('parent-id');
	if (parentId) {
		const parentLi = $('#' + parentId);
		if (parentLi.length) {
			parentIds.unshift(parentId);
			getParentIds(parentLi, parentIds);
		}
	}
}
/** 构建回复历史列表 */
function buildRepliesHistory(parentIds) {
	list.empty();
	const p = list.get(0).parentNode;
	if (p) p.removeChild(list.get(0));
	// 添加head
	const head = $(`<li class="list-group-item bg-info text-white text-center">对话历史</li>`);
	list.append(head);
	// 添加父回复历史
	for (let i = 0; i < parentIds.length; i++) {
		let latestParentReplyContent = $('#' + parentIds[i] + ' .reply-content');
		let text = latestParentReplyContent.get(0).innerText;

		let latestParentAvatarContainer = $('#' + parentIds[i] + ' .reply-avatar-container');
		let aNode = latestParentAvatarContainer.get(0).cloneNode(true);
		$(aNode).attr('target', '_blank');
		$(aNode).css('text-decoration', 'none');

		let newLi = $(`<li class="list-group-item">${aNode.outerHTML}${text}<a href="#${parentIds[i]}">↑</a></li>`);

		list.append(newLi);
	}
}