const Controller = require('egg').Controller;

class TopicController extends Controller {
	// get /topic/create
	async new() {
		await this.ctx.render('./topic/create.tpl');
	}

	// post /topic/create
	async create() {
		const body = this.ctx.request.body;
		const conditions = {
			category: body.category,
			title: body.title,
			content: body.content,
			user_id: this.ctx.user._id,
		};
		this.ctx.model.Topic.create(conditions);
		this.ctx.redirect('/');
	}
}

module.exports = TopicController;