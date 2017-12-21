const Controller = require('egg').Controller;

class UserController extends Controller {
	// get /signup
	async new() {
		await this.ctx.render('user/signup.tpl');
	}

	// post /signup
	async signup() {
		const email = this.ctx.request.body.username;
		const password = this.ctx.request.body.password;
		const newUser = await this.ctx.service.user.signup(email, password);
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

	// get /user/:id
	async home() {
		const userId = this.ctx.params.id;
		const user = await this.ctx.model.User.findById(userId);
		// 最近创建的5个Topic
		const topics = await this.ctx.model.Topic.find({ user: userId }).sort({ created_time: -1 }).limit(5).populate('user');
		// 最近回复的5个Topic
		const replyTopicIds = await this.ctx.model.Reply.distinct('topic', { user: userId });
		const replyTopics = await this.ctx.model.Topic.find({ _id: { $in: replyTopicIds } }).sort({ created_time: -1 }).limit(5).populate('user');
		this.ctx.logger.debug(replyTopics);

		await this.ctx.render('user/home.tpl', { user, topics, replyTopics });
	}

	// get /user/:id/topics
	async topics() {
		const userId = this.ctx.params.id;
		const user = await this.ctx.model.User.findById(userId);
		const topics = await this.ctx.model.Topic.find({ user: userId }).populate('user').sort({ created_time: -1 });

		await this.ctx.render('user/topics.tpl', { user, topics });
	}
}

module.exports = UserController;