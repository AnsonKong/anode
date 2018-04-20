'use strict';
module.exports = () => {
  return async (ctx, next) => {
    let path;
    let alertMsg;
    if (!ctx.user && ctx.request.path !== '/signin') {
      path = '/signin';
      alertMsg = '您尚未登录，请先登录。';
    }
    if (ctx.user && ctx.request.path === '/signin') {
      path = '/';
      alertMsg = '请勿重复登录。';
    }
    ctx.service.router.storeAlertMsg(alertMsg);
    if (path) ctx.redirect(path);
    else await next();
  };
};
