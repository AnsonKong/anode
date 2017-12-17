module.exports = (options, app) => {
	return async function isSignined(ctx, next) {
		if (ctx.user) {
			ctx.redirect('/');
			return;
		}
		await next();
	};
};