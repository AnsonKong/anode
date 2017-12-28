const Service = require('egg').Service;
const moment = require('moment');
class ReplyService extends Service {

	async checkAtUsers(content, replyId, senderId) {
		if (content) {
			const usersSet = this.ctx.helper.parseAtUsers(content);
			this.ctx.logger.debug('at Users:');
			this.ctx.logger.debug(usersSet);
			if (usersSet) {
				for (let receiverUsername of usersSet) {
					let receiverDoc = await this.ctx.model.User.findOne({ username: receiverUsername });
					if (!receiverDoc) continue;
					if (senderId != receiverDoc.id) {
						let newMessage = {
							created_time: moment().unix(),
							sender: senderId,
							receiver: receiverDoc.id,
							type: '1',
							data: replyId,
						};
						let newMessageDoc = await this.ctx.model.Message.create(newMessage);
						receiverDoc.messages.unshift(newMessageDoc.id);
						await receiverDoc.save();
					}
				}
			}
		}
	}
}

module.exports = ReplyService;