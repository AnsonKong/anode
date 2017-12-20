const Controller = require('egg').Controller;

class ReplyController extends Controller {
	// get /reply/:id/del?topicId=xxx&redirect_uri=xxx
	async del() {
		const topicId = this.ctx.query.topicId;
		const replyId = this.ctx.params.id;
		const topicDoc = await this.ctx.model.Topic.findOne({ _id: topicId });
		topicDoc.replies.id(replyId).remove();
		await topicDoc.save();
		this.ctx.redirect(this.ctx.request.query['redirect_uri']);
	}

	// get /reply/:id/edit?topicId=xxx
	async edit() {
		const topicId = this.ctx.query.topicId;
		const replyId = this.ctx.params.id;
		const topicDoc = await this.ctx.model.Topic.findOne({ _id: topicId });
		const replyDoc = topicDoc.replies.id(replyId);
		const locals = {
			topicId,
			replyId,
			content: this.ctx.helper.decodeBase64(replyDoc.content)
		};
		await this.ctx.render('/reply/edit.tpl', locals);
	}

	// post /reply/:id/edit
	async update() {
		const replyId = this.ctx.params.id;
		const body = this.ctx.request.body;
		const topicId = body.topicId;
		
		const topicDoc = await this.ctx.model.Topic.findOne({ _id: topicId });
		const replyDoc = topicDoc.replies.id(replyId);
		replyDoc.content = this.ctx.helper.encodeBase64(body.content);
		await topicDoc.save();
		this.ctx.redirect(`/topic/${topicId}`);
	}


}

module.exports = ReplyController;