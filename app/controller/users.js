const Controller = require('egg').Controller;

class UsersController extends Controller {
	// get /register
	async new() {
		await this.ctx.render('users/register.tpl');
	}
	// post /register
	async create() {
		const conditions = {
			username: this.ctx.request.body.username,
			password: this.ctx.request.body.password
		};
		await this.ctx.model.User.create(conditions);
		this.ctx.body = '创建成功';
	}
	// get /login
	async old() {
		await this.ctx.render('users/login.tpl');
	}
	// post /login
	async login() {
		const conditions = {
			username: this.ctx.request.body.username,
			password: this.ctx.request.body.password,
		};
		this.ctx.logger.debug(conditions);
		const ctx = this.ctx;

		const user = await this.ctx.model.User.findOne(conditions);
		this.ctx.logger.debug(user);

		if (user) {
			this.ctx.body = "用户存在";
		} else {
			this.ctx.body = "用户不存在";
		}
	}
}

module.exports = UsersController;