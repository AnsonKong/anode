const Controller = require('egg').Controller;

class ReplyController extends Controller {
	// get /reply/:id/del
	async del() {
		const replyId = this.ctx.params.id;
		// 删除Reply文档
		const reply = await this.ctx.model.Reply.findByIdAndRemove(replyId);
		if (reply) {
			// 更新Topic的回复数
			const topic = await this.ctx.model.Topic.findById(reply.topic);
			await topic.update({ reply_account: topic.reply_account - 1});
		}
		this.ctx.redirect(`/topic/${reply.topic}`);
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
		this.ctx.redirect(`/topic/${reply.topic}`);
	}

	// post /reply/:id/like
	async like() {
		const replyId = this.ctx.params.id;
		const userId = this.ctx.user.id;
		// 更新Reply
		const reply = await this.ctx.model.Reply.findById(replyId);
		let action = 'fail';
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
		}
		this.ctx.body = { "success": true, "action": action };
	}

}

module.exports = ReplyController;