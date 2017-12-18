const Controller = require('egg').Controller;

class TopicController extends Controller {
	// get /topic/create
	async new() {
		await this.ctx.render('./topic/create.tpl');
	}

	// post /topic/create
	async create() {
		const body = this.ctx.request.body;
		const title = Buffer.from(body.title).toString('base64');
		const content = Buffer.from(body.content).toString('base64');
		const conditions = {
			category: body.category,
			title: title,
			content: content,
			user_id: this.ctx.user._id,
		};
		this.ctx.model.Topic.create(conditions);
		this.ctx.redirect('/');
	}


	// get /topic/:id
	async read() {
		const conditions = {
			_id: this.ctx.params.id,
		};
		const topicDoc = await this.ctx.model.Topic.findOne(conditions);
		if(topicDoc) {
			const title = Buffer.from(topicDoc.title, 'base64').toString();
			let content = Buffer.from(topicDoc.content, 'base64').toString();
			content = require('marked')(content);
			await this.ctx.render('./topic/read.tpl', { title, content });
		} else {
			this.ctx.redirect('/');
		}
	}
}

module.exports = TopicController;