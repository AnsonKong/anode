const assert = require('assert');

module.exports = app => {
	app.passport.verify(async (ctx, user) => {
		let userDoc;
		if (user.provider) {
			ctx.logger.debug('verify by OAuth:' + user.provider);
			ctx.logger.debug(user);
			// OAuth
			const authConditions = {
				uid: user.id,
				provider: user.provider,
			};
			// 查找授权文档
			let authDoc = await ctx.model.Authorization.findOne(authConditions);
			// 查找用户文档
			if (authDoc) {
				userDoc = await ctx.model.User.findById(authDoc.user);
			} else {
				// 创建匿名用户文档
				const conditions = {
					username: user.name,
					email: user.profile._json.email,
					avatar: user.photo,
					github: user.profile.profileUrl,
				};
				userDoc = await ctx.service.user.signup(conditions);
				// 创建授权文档
				authConditions["user"] = userDoc.id;
				authDoc = await ctx.model.Authorization.create(authConditions);
			}
		} else {
			ctx.logger.debug('verify by Local');
			// Local
			userDoc = await ctx.service.user.signin(user.name, user.pass);
		}
		return userDoc;
	});

	app.passport.serializeUser(async (ctx, user) => {
		return user._id;
	});

	app.passport.deserializeUser(async (ctx, user) => {
		const userDoc = ctx.model.User.findOne({ _id: user });
		return userDoc;
	});
};