'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class ReplyService extends Service {

  async checkAtUsers(content, replyId, senderId) {
    if (content) {
      const usersSet = this.ctx.helper.parseAtUsers(content);
      this.ctx.logger.debug('at Users:');
      this.ctx.logger.debug(usersSet);
      if (usersSet) {
        for (const receiverUsername of usersSet) {
          const receiverDoc = await this.ctx.model.User.findOne({ username: receiverUsername });
          if (!receiverDoc) continue;
          if (senderId !== receiverDoc.id) {
            const newMessage = {
              created_time: moment().unix(),
              sender: senderId,
              receiver: receiverDoc.id,
              type: '1',
              data: replyId,
            };
            const newMessageDoc = await this.ctx.model.Message.create(newMessage);
            receiverDoc.messages.unshift(newMessageDoc.id);
            await receiverDoc.save();
          }
        }
      }
    }
  }
}

module.exports = ReplyService;
