'use strict';
const Service = require('egg').Service;
const crypto = require('crypto');
const moment = require('moment');
moment.locale('zh-cn');

class UserService extends Service {

  async signup(conditions) {
    if (conditions.password) {
      // salt:推荐使用16字节（128位）以上，因使用十六进制保存，所以除以2;
      const salt = crypto.randomBytes(128 / 2).toString('hex');
      // 进行pbkdf2加密，迭代100000次，返回key长度512字节
      const key = crypto.pbkdf2Sync(conditions.password, salt, 100000, 512, 'sha512');
      // 以16进制形式保存，所以字符长度会double，所以数据库中的密码字符长度是1024
      conditions.password = key.toString('hex');
      conditions.salt = salt;
    }
    conditions.created_time = moment().unix();
    const newUser = await this.ctx.model.User.create(conditions);
    return newUser;
  }

  async signin(username, password) {
    const ctx = this.ctx;
    const user = await ctx.model.User.findOne({ username });
    if (user) {
      const attemptKey = crypto.pbkdf2Sync(password, user.salt, 100000, 512, 'sha512');
      const attemptPassword = attemptKey.toString('hex');
      if (user.password === attemptPassword) return user;
      return null;
    }
    return null;

  }

  async getUsers(conditions, sortConditions, limit = -1, offset = 0) {
    const query = this.ctx.model.User.find(conditions).sort(sortConditions);
    if (offset) query.skip(offset);
    if (limit !== -1) query.limit(limit);
    const users = await query;

    return users;
  }
}

module.exports = UserService;
