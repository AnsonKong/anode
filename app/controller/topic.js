const Controller = require('egg').Controller;
const moment = require('moment');
moment.locale('zh-cn');

class TopicController extends Controller {
	// get /topic/create
	async new() {
		await this.ctx.render('./topic/edit.tpl', { form_action: '/topic/create' });
	}

	// post /topic/create
	async create() {
		const body = this.ctx.request.body;
		const created_time = moment().unix();
		const conditions = {
			category: body.category,
			title: this.ctx.helper.encodeBase64(body.title),
			content: this.ctx.helper.encodeBase64(body.content),
			user_id: this.ctx.user._id,
			created_time,
			last_modified_time: created_time,
		};
		await this.ctx.model.Topic.create(conditions);
		this.ctx.redirect('/user/' + this.ctx.user._id);
	}

	// get /topic/:id
	async read() {
		const topicDoc = await this.ctx.model.Topic.findOne({ _id: this.ctx.params.id });
		if (topicDoc) {
			const user = await this.ctx.model.User.findOne({ _id: topicDoc.user_id });
			const locals = {
				user,
				title: this.ctx.helper.decodeBase64(topicDoc.title),
				content: require('marked')(this.ctx.helper.decodeBase64(topicDoc.content)),
				fromNow: this.ctx.helper.fromNow(topicDoc.created_time),
				replies: this.ctx.helper.parseReplies(topicDoc.replies),
			}
			await this.ctx.render('./topic/read.tpl', locals);
		} else {
			this.ctx.redirect('/');
		}
	}

	// get /topic/:id/edit
	async edit() {
		const topicDoc = await this.ctx.model.Topic.findOne({ _id: this.ctx.params.id });
		if (topicDoc) {
			const locals = {
				form_action: '/topic/' + this.ctx.params.id + '/edit',
				category: topicDoc.category,
				title: this.ctx.helper.decodeBase64(topicDoc.title),
				content: this.ctx.helper.decodeBase64(topicDoc.content),
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
		const conditions = {
			category: body.category,
			title: this.ctx.helper.encodeBase64(body.title),
			content: this.ctx.helper.encodeBase64(body.content),
			last_modified_time: moment().unix(),
		};
		await this.ctx.model.Topic.where({ _id: id }).update(conditions);
		this.ctx.redirect('/user/' + this.ctx.user._id);
	}

	// post /topic/:id/reply
	async reply() {
		const id = this.ctx.params.id;
		const body = this.ctx.request.body;
		const newReply = {
			content: this.ctx.helper.encodeBase64(body.content),
			created_time: moment().unix(),
			user_id: this.ctx.user._id,
		};
		const topicDoc = await this.ctx.model.Topic.findOne({ _id: id });
		topicDoc.replies.push(newReply);
		await topicDoc.save();
		this.ctx.redirect('/topic/' + id);
	}

	
}

module.exports = TopicController;