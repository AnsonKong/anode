'use strict';
const Controller = require('egg').Controller;

class ReplyController extends Controller {
  // post /reply/del
  async del() {
    const replyId = this.ctx.request.body.id;
    let code = -1;
    // 删除Reply文档
    const reply = await this.ctx.model.Reply.findByIdAndRemove(replyId);
    if (reply) {
      // 更新Topic的回复数
      const topic = await this.ctx.model.Topic.findById(reply.topic);
      await topic.update({ reply_account: topic.reply_account - 1 });
      code = 0;
    }
    this.ctx.body = { code };
  }

  // get /reply/:id/edit
  async edit() {
    const replyId = this.ctx.params.id;
    let reply;
    if (replyId) {
      reply = await this.ctx.model.Reply.findById(replyId);
    }
    if (reply) {
      await this.ctx.render('/reply/edit.tpl', { reply });
    } else {
      this.ctx.service.router.storeAlertMsg(`${replyId}回复不存在`);
      this.ctx.redirect('/');
    }
  }

  // post /reply/:id/edit
  async update() {
    const replyId = this.ctx.params.id;
    const content = this.ctx.request.body.content;
    const sender = this.ctx.user.id;
    if (replyId && content && sender) {
      // 更新Reply
      const reply = await this.ctx.model.Reply.findByIdAndUpdate(replyId, { content });
      // 添加“回复被提到”提示消息
      await this.ctx.service.reply.checkAtUsers(content, reply.id, sender);
      this.ctx.redirect(`/topic/${reply.topic}#${reply.id}`);
    } else {
      this.ctx.service.router.storeAlertMsg(`${replyId}回复编辑失败`);
      this.ctx.redirect('/');
    }
  }

  // post /reply/like
  async like() {
    const replyId = this.ctx.request.body.id;
    const userId = this.ctx.user.id;
    // 更新Reply
    let code = -1;
    let msg;
    let action;
    let data;
    if (replyId && userId) {
      try {
        const reply = await this.ctx.model.Reply.findById(replyId);
        if (reply) {
          const index = reply.likes.indexOf(userId);
          if (index !== -1) {
            reply.likes.splice(index, 1);
            action = 'down';
          } else {
            reply.likes.push(userId);
            action = 'up';
          }
          await reply.save();
          code = 0;
          data = reply.likes.length;
        }
      } catch (e) {
        code = -1;
        msg = e.toString();
      }
    }
    this.ctx.body = { code, action, msg, data };
  }
}

module.exports = ReplyController;
