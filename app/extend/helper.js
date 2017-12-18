exports.parseTopics = function(topicDocs) {
	for(let i = 0;i < topicDocs.length;i++) {
		topicDocs[i].title = Buffer.from(topicDocs[i].title, 'base64').toString();
		topicDocs[i].content= Buffer.from(topicDocs[i].content, 'base64').toString();
	}
};