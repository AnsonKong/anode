const Service = require('egg').Service;

class TopicService extends Service {
	async getTopics(conditions, limit = -1, offset = 0) {
		let query = this.ctx.model.Topic.find(conditions).sort({ created_time: -1 }).populate('user');
		if (offset) query.skip(offset);
		if (limit != -1) query.limit(limit);
		const topics = await query;

		return await this._fillLastReply(topics);
	}

	// 获取用户回复了的
	async getReplyTopics(userId, limit = -1, offset = 0) {
		const replyTopicIds = await this.getReplyTopicIds(userId);
		const ids = [];
		for(let v of replyTopicIds) ids.push(v.toString());

		let allReplies = await this.ctx.model.Reply.find({ user: userId }).sort({ created_time: -1 });
		let currentOffset = 0;
		const result = [];

		for(let i = 0;i < allReplies.length && ids.length && (limit == -1 || result.length < limit);i++) {
			let tempReply = allReplies[i];
			if (ids.indexOf(tempReply.topic.toString()) != -1) {
				let tempIndex = ids.indexOf(tempReply.topic.toString());
				ids.splice(tempIndex, 1);
				if (currentOffset >= offset) {
					// 可放入
					let tempTopic = await this.ctx.model.Topic.findById(tempReply.topic).populate('user');
					result.push(tempTopic);
				} else {
					currentOffset++;
				}
			}
		}
		return await this._fillLastReply(result);
	}

	async getReplyTopicIds(userId) {
		const replyTopicIds = await this.ctx.model.Reply.distinct('topic', { user: userId });
		return replyTopicIds;
	}

	async _fillLastReply(topics) {
		for(let i = 0;i < topics.length;i++) {
			let tempReplyTopic = topics[i];
			let lastReply = await this.ctx.model.Reply.findOne({ topic: tempReplyTopic.id }).sort({ created_time: -1 }).populate('user');
			if (lastReply) tempReplyTopic.last_reply = lastReply;
		}
		return topics;
	}
}

module.exports = TopicService;