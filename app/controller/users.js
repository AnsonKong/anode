const Controller = require('egg').Controller;

class UsersController extends Controller {
	async new() {
		await this.ctx.render('users/new.tpl');
	}

	async create() {
		this.ctx.body = 'create';
	}
}

module.exports = UsersController;