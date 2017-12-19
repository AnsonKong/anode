const Controller = require('egg').Controller;

class UsersController extends Controller {
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
		const user_id = this.ctx.params.id;
		const user = await this.ctx.model.User.findOne({ _id: user_id });
		const createdTopics = await this.ctx.model.Topic.find({ user_id }).sort({ created_time: -1 }).limit(5);
		this.ctx.helper.parseBriefTopics(createdTopics);
		
		await this.ctx.render('user/home.tpl', { user, createdTopics });
	}

	// get /user/:id/topics
	async topics() {
		const user_id = this.ctx.params.id;
		const user = await this.ctx.model.User.findOne({ _id: user_id });
		const topics = await this.ctx.model.Topic.find({ user_id }).sort({ created_time: -1 });
		this.ctx.helper.parseBriefTopics(topics);

		await this.ctx.render('user/topics.tpl', { user, topics });
	}
}

module.exports = UsersController;