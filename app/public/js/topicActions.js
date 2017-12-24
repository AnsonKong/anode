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
