const assert = require('assert');

module.exports = app => {
	app.passport.verify(async (ctx, user) => {
		// 检查用户
		assert(user.provider, 'user.provider should exists');
		assert(user.id, 'user.id should exists');


		const auth = await ctx.model.Authorization.findOne({
			uid: user.id,
			provider: user.provider,
		});
		const existsUser = await ctx.model.User.findOne({ id: auth.user_id });
		if (existsUser) {
			return existsUser;
		}
		// 调用service注册新用户
		const newUser = await ctx.service.user.register(user);
		return newUser;
	});

	app.passport.serializeUser(async (ctx, user) => {

	});

	app.passport.deserializeUser(async (ctx, user) => {
		
	});
};