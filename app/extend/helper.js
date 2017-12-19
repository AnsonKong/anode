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
		tempDoc.content = this.decodeBase64(tempDoc.content);
		tempDoc['fromNow'] = this.fromNow(tempDoc.created_time);
	});
	return topicDocs;
};

exports.parseReplies = (replies) => {
	replies.reverse();
	replies.forEach((tempReply) => {
		tempReply.content = this.decodeBase64(tempReply.content);
	});
	return replies;
};