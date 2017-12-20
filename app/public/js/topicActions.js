function onEditTopic(id) {
	window.location.href = `/topic/${id}/edit`;
}

function onDelTopic(id) {
	const result = confirm('确定要删除此话题吗？');
	if (result) {
		window.location.href = `/topic/${id}/del`;
	}
}

function onEditReply(topicId, replyId) {
	window.location.href = `/reply/${replyId}/edit?topicId=${topicId}`;
}

function onDelReply(topicId, replyId) {
	const result = confirm('确定要删除此回复吗？');
	if (result) {
		const r = encodeURIComponent(window.location.href);
		window.location.href = `/reply/${replyId}/del?topicId=${topicId}&redirect_uri=` + r;
	}
}
