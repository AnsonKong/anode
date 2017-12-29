const Service = require('egg').Service;

class TopicService extends Service {
	async getTopics(conditions, limit = -1, offset = 0) {
		// 最近创建的5个Topic
		let query = this.ctx.model.Topic.find(conditions).sort({ created_time: -1 }).populate('user');
		if (offset) query.skip(offset);
		if (limit != -1) query.limit(limit);
		const topics = await query;

		return await this._fillLastReply(topics);
	}

	async getReplyTopics(userId, limit = -1, offset = 0) {
		const replyTopicIds = await this.ctx.model.Reply.distinct('topic', { user: userId });
		// 找出对应的Topic
		let query = this.ctx.model.Topic.find({ _id: { $in: replyTopicIds } }).sort({ created_time: -1 }).populate('user');
		if (offset) query.skip(offset);
		if (limit != -1) query.limit(limit);
		const replyTopics = await query;
		
		return await this._fillLastReply(replyTopics);
	}

	async getReplyTopicsCount(userId) {
		const replyTopicIds = await this.ctx.model.Reply.distinct('topic', { user: userId });
		return replyTopicIds.length;
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