const Service = require('egg').Service;
class RouterService extends Service {

	async redirect(path, alertMsg) {
		if (alertMsg) this.ctx.app.locals.alertMsg = alertMsg;
		this.ctx.redirect(path);
	}
	
}

module.exports = RouterService;