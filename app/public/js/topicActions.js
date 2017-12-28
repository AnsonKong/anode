function onEditTopic(id) {
	window.location.href = `/topic/${id}/edit`;
}

function onDelTopic(id) {
	const result = confirm('确定要删除此话题吗？');
	if (result) {
		// window.location.href = `/topic/${id}/del`;
		$.post(`/topic/${id}/del`, { _csrf: getCsrf() }, () => {
			window.location.href = '/home';
		});
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
  let keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
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
let replyUserFormElement;
let replyUserParentElement;
let replyUserEditor;
function onUserReply(parentReplyId, topicId, username) {
	if (!replyUserEditor) {
		replyUserWrapper = $('<form id="newForm" method="post" novalidate/>');
		replyUserFormElement = replyUserWrapper[0];
		// 2.form-group
		const formGroup = $('<div class="form-group"></div>');
		// 1.添加textarea
		const newTextarea = $('<textarea id="newTextarea" class="form-control" name="content" required>');
		formGroup.append(newTextarea);
		replyUserTextareaElement = newTextarea[0];
		// 2.textarea错误提示
		const tip = $('<div class="invalid-feedback">请正确填写回复内容，要求字数1字以上。</div>');
		formGroup.append(tip);
		replyUserWrapper.append(formGroup);
		// 2.添加按钮
		const replyUserBtn = $('<button class="btn btn-primary" style="cursor: pointer;" type="submit">回复</button>');
		replyUserWrapper.append(replyUserBtn);
		replyUserBtn.click(function() {
			let result = checkForm('newForm', 'newTextarea', replyUserEditor);
			console.log(result)
			if (!result) {
				event.preventDefault();
    		event.stopPropagation();
			}
		});
		// 3.添加隐藏parent元素
		const replyUserParent = $('<input type="hidden" name="parent"/>');
		replyUserWrapper.append(replyUserParent);
		replyUserParentElement = replyUserParent[0];
		// 4.添加_csrf
		const replyUserCSRF = $('<input type="hidden" name="_csrf"/>');
		replyUserWrapper.append(replyUserCSRF);
		replyUserCSRFElement = replyUserCSRF[0];
		replyUserCSRFElement.value = getCsrf();
		// 5.初始化editor
		replyUserEditor = new Editor({
			element: replyUserTextareaElement,
			status: false,
		});
		editor.render();
	}

	// 更新form.action
	replyUserFormElement.action = `/topic/${topicId}/reply`;
	// 更新parent
	replyUserParentElement.value = parentReplyId;

	const container = $('#userReplyContainer_' + parentReplyId);
	container.append(replyUserWrapper);
	// 填充要回复的用户
	replyUserEditor.codemirror.doc.setValue(`@${username} `);
	// 光标移动到末尾
	replyUserEditor.codemirror.doc.setCursor(999, 999);
	// 获取焦点
	replyUserEditor.codemirror.doc.cm.focus();
}
