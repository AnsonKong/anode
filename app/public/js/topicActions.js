function onEditTopic(id) {
	window.location.href = `/topic/${id}/edit`;
}

function onDelTopic(id) {
	if (confirm('确定要删除此话题吗？')) {
		$.post(`/topic/${id}/del`, { _csrf: getCsrf() }, (result) => {
			if (result.code == 0) window.location.href = '/home';
		});
	}
}

function onCollectTopic(id) {
	$.post('/topic/collect', { id, _csrf: getCsrf() }, (result) => {
		if (result.code == 0) {
			const btn = $('#myCollectBtn');
			if (result.action == 'add') {
				btn.addClass('btn-muted');
				btn.removeClass('btn-primary');
				btn.text('取消收藏');
			} else {
				btn.addClass('btn-primary');
				btn.removeClass('btn-muted');
				btn.text('收藏');
			}
		}
	});
}

function onLikeReply(id) {
	const btn = $(event.target);
	const likeText = $(`#like_text_${id}`);
	$.post('/reply/like', { id, _csrf: getCsrf() }, (result) => {
		if (result.code == 0) {
			likeText.removeClass('d-none');

			if (result.action == 'up') {
				btn.addClass('fas');
				btn.removeClass('far');
			} else {
				btn.addClass('far');
				btn.removeClass('fas');
			}
			likeText.text(result.data);
		}
	});
}

function getCsrf() {
  let keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

function onEditReply(id) {
	window.location.href = `/reply/${id}/edit`;
}

function onDelReply(id, topicId) {
	if (confirm('确定要删除此回复吗？')) {
		$.post('/reply/del', { id, _csrf: getCsrf() }, (result) => {
			if (result.code == 0) window.location.href = `/topic/${topicId}`;
		});
	}
}

let replyUserWrapper;
let replyUserFormElement;
let replyUserParentElement;
let replyUserEditor;
let replyTriggerList;
function onUserReply(parentReplyId, topicId, username) {
	if (!replyUserEditor) {
		replyUserWrapper = $('<form id="newForm" method="post" novalidate/>');
		replyUserFormElement = replyUserWrapper[0];
		// 2.form-group
		const formGroup = $('<div class="form-group" style="position: relative;"></div>');
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
		replyUserEditor.render();
		// 6.添加@
		if (replyUsernamesSet) {
			replyTriggerList = new EditorCharTriggeringList(replyUserEditor.codemirror, replyUsernamesSet);
			replyTriggerList.activate();
		}
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
