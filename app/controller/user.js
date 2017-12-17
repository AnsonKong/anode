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

	async signout() {
		this.ctx.logout();
		this.ctx.redirect('/');
	}
}

module.exports = UsersController;