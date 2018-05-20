'use strict';
module.exports = () => {
  return async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
      // ctx.service.router.storeAlertMsg(`您所访问的路径${ctx.path}不存在。`);
      ctx.redirect('/');
    }
  };
};
