const Controller = require('egg').Controller;
const pageAmount = 10;

class UserController extends Controller {
	// get /signup
	async new() {
		await this.ctx.render('user/signup.tpl');
	}

	// post /signup
	async signup() {
		const username = this.ctx.request.body.username;
		const password = this.ctx.request.body.password;
		const newUser = await this.ctx.service.user.signup({ username, password });
		if (newUser) {
			// 自动登录并跳转到主页
			this.ctx.login(newUser);
			this.ctx.redirect('/');
		}
		else this.ctx.body = '注册失败';
	}

	// get /login
	async old() {
		await this.ctx.render('user/signin.tpl');
	}

	// post /login
	/*async login() {
		const email = this.ctx.request.body.email;
		const password = this.ctx.request.body.password;
		const result = await this.ctx.service.user.login(email, password);
		let tip;
		switch(result) {
			case 0:
				tip = '登录成功';
				break;
			case 1:
				tip = '密码错误';
				break;
			case 2:
				tip = '用户不存在';
				break;
		}
		this.ctx.body = tip;
	}*/
	// get /signout
	async signout() {
		this.ctx.logout();
		this.ctx.redirect('/');
	}

	// get /user/:username
	async home() {
		const username = this.ctx.params.username;
		const user = await this.ctx.model.User.findOne({ username });
		const userId = user.id;

		// const user = await this.ctx.model.User.findById(userId);
		const topics = await this.ctx.service.topic.getTopics(userId, 5);
		const replyTopics = await this.ctx.service.topic.getReplyTopics(userId, 5);

		await this.ctx.render('user/home.tpl', { user, topics, replyTopics });
	}

	// get /user/:username/topics?page=1
	async topics() {
		const username = this.ctx.params.username;
		const user = await this.ctx.model.User.findOne({ username });
		const userId = user.id;

		const currentPage = parseInt(this.ctx.query.page) || 1;
		const totalAmount = await this.ctx.model.Topic.count({ user: userId });
		const totalPage = Math.ceil(totalAmount / pageAmount);
		const topics = await this.ctx.service.topic.getTopics(userId, pageAmount, pageAmount * (currentPage - 1));
		const pagination = {
			currentPage,
			totalPage,
		};
		const title = user.username + '创建的话题';
		await this.ctx.render('user/topics.tpl', { user, topics, pagination, title, panelTitle: title });
	}

	// get /user/:username/replies?page=1
	async replies() {
		const username = this.ctx.params.username;
		const user = await this.ctx.model.User.findOne({ username });
		const userId = user.id;

		const currentPage = parseInt(this.ctx.query.page) || 1;
		const totalAmount = await this.ctx.service.topic.getReplyTopicsCount(userId);
		const totalPage = Math.ceil(totalAmount / pageAmount);
		const topics = await this.ctx.service.topic.getReplyTopics(userId, pageAmount, pageAmount * (currentPage - 1));
		const pagination = {
			currentPage,
			totalPage,
		};
		const title = user.username + '参与的话题';
		await this.ctx.render('user/topics.tpl', { user, topics, pagination, title, panelTitle: title });
	}

	// get /setting
	async setting() {
		await this.ctx.render('user/setting.tpl', { user: this.ctx.user });
	}

	// post /setting
	async updateSetting() {
		const body = this.ctx.request.body;
		const newUsername = body.username;
		const conditions = {
			username: newUsername,
			website: body.website,
			location: body.location,
			weibo: body.weibo,
			github: body.github,
			signature: body.signature,
		}
		await this.ctx.model.User.findByIdAndUpdate(this.ctx.user.id, conditions);
		this.ctx.redirect(`/user/${newUsername}`);
	}

	// get /setting
	async messages() {
		const result = await this.ctx.model.User.findById(this.ctx.user.id).populate('messages');
		const allMessages = result.messages;
		const newMessages = [];
		const oldMessages = [];
		let msgDoc;
		let replyDoc;
		let topicDoc;
		for(let i = 0;i < allMessages.length;i++) {
			msgDoc = allMessages[i];
			// 实例化sender
			await this.ctx.model.Message.populate(msgDoc, 'sender');
			msgDoc.reply = await this.ctx.model.Reply.findById(msgDoc.data).populate('topic');
			if (msgDoc.read) oldMessages.push(msgDoc);
			else newMessages.push(msgDoc);
		}
		await this.ctx.render('user/messages.tpl', { oldMessages, newMessages });
	}
}

module.exports = UserController;