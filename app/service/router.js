'use strict';
const Service = require('egg').Service;
class RouterService extends Service {

  async storeAlertMsg(msg) {
    if (msg) this.ctx.app.locals.alertMsg = { msg, time: new Date().getTime() };
  }

}

module.exports = RouterService;
