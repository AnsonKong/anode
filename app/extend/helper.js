const moment = require('moment');
moment.locale('zh-cn');
exports.parseTopics = function(topicDocs) {
	for(let i = 0;i < topicDocs.length;i++) {
		let tempDoc = topicDocs[i];
		tempDoc.title = Buffer.from(tempDoc.title, 'base64').toString();
		tempDoc.content= Buffer.from(tempDoc.content, 'base64').toString();
		tempDoc['fromNow'] = moment.unix(tempDoc.created_time).startOf('second').fromNow();
	}
};