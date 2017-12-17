const Service = require('egg').Service;
const crypto = require('crypto');

class UserService extends Service {

	async signup(email, password) {
		let dbPassword = '';
		let salt = '';
		email = email || '';
		if (password) {
			// salt:推荐使用16字节（128位）以上，因使用十六进制保存，所以除以2;
			salt = crypto.randomBytes(128 / 2).toString('hex');
			// 进行pbkdf2加密，迭代100000次，返回key长度512字节
			const key = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');
			// 以16进制形式保存，所以字符长度会double，所以数据库中的密码字符长度是1024
			dbPassword = key.toString('hex');
		}

		const conditions = {
			email,
			password: dbPassword,
			salt,
		};
		const newUser = await this.ctx.model.User.create(conditions);
		return newUser;
	}

	async signin(email, password) {
		const ctx = this.ctx;
		const user = await ctx.model.User.findOne({ email });
		if (user) {
			const attemptKey = crypto.pbkdf2Sync(password, user.salt, 100000, 512, 'sha512');
			const attemptPassword = attemptKey.toString('hex');
			if (user.password === attemptPassword) return user;
			else return null;
		} else {
			return null;
		}
	}
}

module.exports = UserService;