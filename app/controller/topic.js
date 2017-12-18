const Controller = require('egg').Controller;

class TopicController extends Controller {
	// get /topic/create
	async new() {
		const locals = {
			form_action: '/topic/create',
		};
		await this.ctx.render('./topic/edit.tpl', locals);
	}

	// post /topic/create
	async create() {
		const body = this.ctx.request.body;
		const title = Buffer.from(body.title).toString('base64');
		const content = Buffer.from(body.content).toString('base64');
		const created_time = new Date().getTime();
		const conditions = {
			category: body.category,
			title,
			content,
			user_id: this.ctx.user._id,
			created_time,
			last_modified_time: created_time,
		};
		await this.ctx.model.Topic.create(conditions);
		this.ctx.redirect('/user/' + this.ctx.user._id);
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

			const user = await this.ctx.model.User.findOne({ _id: topicDoc.user_id });
			await this.ctx.render('./topic/read.tpl', { user, title, content });
		} else {
			this.ctx.redirect('/');
		}
	}

	// get /topic/:id/edit
	async edit() {
		const conditions = {
			_id: this.ctx.params.id,
		};
		const topicDoc = await this.ctx.model.Topic.findOne(conditions);
		if(topicDoc) {
			const title = Buffer.from(topicDoc.title, 'base64').toString();
			let content = Buffer.from(topicDoc.content, 'base64').toString();

			const user = await this.ctx.model.User.findOne({ _id: topicDoc.user_id });
			const locals = {
				form_action: '/topic/' + this.ctx.params.id + '/edit',
				category: topicDoc.category,
				title,
				content,
			};
			await this.ctx.render('./topic/edit.tpl', locals);
		} else {
			this.ctx.redirect('/');
		}
	}

	// post /topic/:id/edit
	async update() {
		const id = this.ctx.params.id;
		const body = this.ctx.request.body;
		const title = Buffer.from(body.title).toString('base64');
		const content = Buffer.from(body.content).toString('base64');
		const last_modified_time = new Date().getTime();
		const conditions = {
			category: body.category,
			title,
			content,
			last_modified_time
		};
		await this.ctx.model.Topic.where({ _id: id }).update(conditions);
		this.ctx.redirect('/user/' + this.ctx.user._id);
	}

	
}

module.exports = TopicController;