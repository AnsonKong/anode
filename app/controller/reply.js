const Controller = require('egg').Controller;

class ReplyController extends Controller {
	// get /reply/del
	async del() {
		const replyId = this.ctx.request.body.id;
		let code = -1;
		// 删除Reply文档
		const reply = await this.ctx.model.Reply.findByIdAndRemove(replyId);
		if (reply) {
			// 更新Topic的回复数
			const topic = await this.ctx.model.Topic.findById(reply.topic);
			await topic.update({ reply_account: topic.reply_account - 1});
			code = 0;
		}
		this.ctx.body = { code };
	}

	// get /reply/:id/edit
	async edit() {
		const replyId = this.ctx.params.id;
		const reply = await this.ctx.model.Reply.findById(replyId);
		await this.ctx.render('/reply/edit.tpl', { reply });
	}

	// post /reply/:id/edit
	async update() {
		const replyId = this.ctx.params.id;
		const body = this.ctx.request.body;
		// 更新Reply
		const reply = await this.ctx.model.Reply.findByIdAndUpdate(replyId, { content: this.ctx.helper.encodeBase64(body.content) });
		// 添加“回复被提到”提示消息
		const sender = this.ctx.user.id;
		await this.ctx.service.reply.checkAtUsers(body.content, reply.id, sender);
		this.ctx.redirect(`/topic/${reply.topic}#${reply.id}`);
	}

	// post /reply/like
	async like() {
		const replyId = this.ctx.request.body.id;
		const userId = this.ctx.user.id;
		// 更新Reply
		const reply = await this.ctx.model.Reply.findById(replyId);
		let code = -1;
		let action;
		if (reply) {
			const index = reply.likes.indexOf(userId);
			if (index != -1) {
				reply.likes.splice(index, 1);
				action = 'down';
			} else {
				reply.likes.push(userId);
				action = 'up';
			}
			await reply.save();	
			code = 0;
		}
		this.ctx.body = { code, action, data: reply.likes.length };
	}
}

module.exports = ReplyController;