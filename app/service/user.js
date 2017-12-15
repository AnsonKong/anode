const Service = require('egg').Service;

class UserService extends Service {
	async register (user) {
		this.ctx.logger.debug('UserService register:' + user);
	}
}

module.exports = UserService;