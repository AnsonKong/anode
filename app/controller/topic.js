const Controller = require('egg').Controller;
const moment = require('moment');
moment.locale('zh-cn');

class TopicController extends Controller {
	// get /topic/create
	async new() {
		await this.ctx.render('/topic/edit.tpl', { title: '发布话题' });
	}

	// post /topic/create
	async create() {
		const body = this.ctx.request.body;
		const created_time = moment().unix();
		const conditions = {
			category: body.category,
			title: this.ctx.helper.encodeBase64(body.title),
			content: this.ctx.helper.encodeBase64(body.content),
			user: this.ctx.user.id,
			created_time,
			last_modified_time: created_time,
		};
		// 创建Topic文档
		const newTopicDoc = await this.ctx.model.Topic.create(conditions);
		this.ctx.redirect(`/topic/${newTopicDoc.id}`);
	}

	// get /topic/:id
	async read() {
		const topicId = this.ctx.params.id;
		const topic = await this.ctx.model.Topic.findById(topicId).populate('user');
		if (topic) {
			// 更新Topic的阅读次数
			await topic.update({ view_account: topic.view_account + 1 });
			// 获取Topic的回复
			const replies = await this.ctx.model.Reply.find({ topic: topic.id }).populate('user');
			const locals = {
				topic,
				replies,
			};
			await this.ctx.render('/topic/read.tpl', locals);
		} else {
			this.ctx.redirect('/');
		}
	}

	// get /topic/:id/edit
	async edit() {
		const topicId = this.ctx.params.id;
		const topic = await this.ctx.model.Topic.findById(topicId);
		if (topic) {
			await this.ctx.render('/topic/edit.tpl', { topic, title: '编辑话题' });
		} else {
			this.ctx.redirect('/');
		}
	}

	// get /topic/:id/del
	async del() {
		const topicId = this.ctx.params.id;
		// 删除Topic文档
		const topicDoc = await this.ctx.model.Topic.findByIdAndRemove(topicId);
		if (topicDoc) {
			// 删除Topic文档对应的Reply文档
			await this.ctx.model.Reply.deleteMany({ topic: topicDoc.id });
		}
		this.ctx.redirect(`/user/${topicDoc.user}`);
	}

	// post /topic/:id/edit
	async update() {
		const topicId = this.ctx.params.id;
		const body = this.ctx.request.body;
		const conditions = {
			category: body.category,
			title: this.ctx.helper.encodeBase64(body.title),
			content: this.ctx.helper.encodeBase64(body.content),
			last_modified_time: moment().unix(),
		};
		// 更新Topic文档
		await this.ctx.model.Topic.findById(topicId).update(conditions);
		this.ctx.redirect(`/topic/${topicId}`);
	}

	// post /topic/:id/reply
	async reply() {
		const topicId = this.ctx.params.id;
		const topicDoc = await this.ctx.model.Topic.findById(topicId);
		if (topicDoc) {
			const body = this.ctx.request.body;
			const newReply = {
				content: this.ctx.helper.encodeBase64(body.content),
				created_time: moment().unix(),
				topic: topicId,
				user: this.ctx.user.id,
			};
			// 创建Reply文档
			await this.ctx.model.Reply.create(newReply);
			// 添加Topic回复数
			await topicDoc.update({ reply_account: topicDoc.reply_account + 1 });
		}
		this.ctx.redirect('/topic/' + topicId);
	}

}

module.exports = TopicController;