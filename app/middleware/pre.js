module.exports = (options, app) => {
	return async (ctx, next) => {
		const m1 = app.locals.lastAlertMsg;
		const m2 = app.locals.alertMsg;
		if (m1 && m2 && m1.msg === m2.msg && m1.time === m2.time) {
			app.locals.alertMsg = null;
		} else {
			app.locals.lastAlertMsg = app.locals.alertMsg;
		}
		await next();
	};
};