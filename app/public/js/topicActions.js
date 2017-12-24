function onEditTopic(id) {
	window.location.href = `/topic/${id}/edit`;
}

function onDelTopic(id) {
	const result = confirm('确定要删除此话题吗？');
	if (result) {
		window.location.href = `/topic/${id}/del`;
	}
}

function onLikeReply(id) {
	const i = event.target;
	$(i).toggleClass('far fas');

	const likeText = $(`#like_text_${id}`);
	let likesCount = parseInt(likeText.text());
	let newCount = likesCount + ($(i).hasClass('fas') ? 1 : -1);
	if (newCount) likeText.removeClass('d-none');
	likeText.text(newCount);

	$.post(`/reply/${id}/like?_csrf=${getCsrf()}`);
}

function getCsrf() {
  var keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

function onEditReply(id) {
	window.location.href = `/reply/${id}/edit`;
}

function onDelReply(id) {
	const result = confirm('确定要删除此回复吗？');
	if (result) {
		window.location.href = `/reply/${id}/del`;
	}
}
let replyUserWrapper;
let replyUserEditor;
function onUserReply(replyId, username) {
	if (!replyUserEditor) {
		replyUserWrapper = $('<div/>');
		// 1.添加textarea
		const textareaWrapper = $('<div/>');
		textareaWrapper.css('height', '160px');
		const newTextarea = $('<textarea>');
		textareaWrapper.append(newTextarea);
		replyUserWrapper.append(textareaWrapper);
		// 2.添加按钮
		const replyUserBtn = $('<button/>');
		// TO-DO: add btn listener
		replyUserBtn.addClass('btn btn-primary');
		replyUserBtn.css('cursor', 'pointer');
		replyUserBtn.text('回复');
		replyUserWrapper.append(replyUserBtn);
		// 3.初始化editor
		replyUserEditor = new Editor({
			element: newTextarea[0],
			status: false,
		});
		editor.render();
	}
	const container = $('#userReplyContainer_' + replyId);
	container.append(replyUserWrapper);
	// 填充要回复的用户
	replyUserEditor.codemirror.doc.setValue(`@${username} `);
	// 光标移动到末尾
	replyUserEditor.codemirror.doc.setCursor(999, 999);
	// 获取焦点
	replyUserEditor.codemirror.doc.cm.focus();
}
