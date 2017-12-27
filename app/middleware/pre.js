module.exports = (options, app) => {
	return async function isSignined(ctx, next) {
		if (app.locals.lastAlertMsg === app.locals.alertMsg) {
			app.locals.alertMsg = null;
		} else {
			app.locals.lastAlertMsg = app.locals.alertMsg;
		}
		await next();
	};
};