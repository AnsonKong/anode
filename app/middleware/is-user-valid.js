'use strict';
module.exports = () => {
  return async (ctx, next) => {
    const username = ctx.params.username;
    const user = await ctx.model.User.findOne({ username });
    if (user) {
      await next();
    } else {
      ctx.service.router.storeAlertMsg(`用户名${username}不存在。`);
      ctx.redirect('/');
    }
  };
};
