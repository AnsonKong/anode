const moment = require('moment');
moment.locale('zh-cn');

exports.encodeBase64 = (src) => {
	return Buffer.from(src).toString('base64');
};

exports.decodeBase64 = (encoded) => {
	return Buffer.from(encoded, 'base64').toString();
};

exports.fromNow = (timestamps) => {
	return moment.unix(timestamps).startOf('second').fromNow();
}

exports.parseBriefTopics = (topicDocs) => {
	topicDocs.forEach(tempDoc => {
		tempDoc.title = this.decodeBase64(tempDoc.title);
		tempDoc.fromNow = this.fromNow(tempDoc.created_time);
		tempDoc.reply_account = tempDoc.replies.length;
		if(!tempDoc.user.avatar) tempDoc.user.avatar = this.githubAvatar(tempDoc.user._id);
	});
	return topicDocs;
};

exports.parseReplies = (replies) => {
	// replies.reverse();
	replies.forEach((tempReply) => {
		tempReply.content = require('marked')(this.decodeBase64(tempReply.content));
		tempReply.fromNow = this.fromNow(tempReply.created_time);
		if(!tempReply.user.avatar) tempReply.user.avatar = this.githubAvatar(tempReply.user._id);
	});
	return replies;
};

exports.githubAvatar = (name) => {
	return '/public/img/zhihu-default-avatar.jpg';
	// return `https://identicons.github.com/${name}.png`;
}