'use strict';
module.exports = () => {
  return async (ctx, next) => {
    let path;
    let alertMsg;
    if (!ctx.user) {
      path = '/signin';
      alertMsg = '您尚未登录，请先登录。';
    } else if (!ctx.user.admin) {
      path = '/';
      alertMsg = '您无权限做此操作。';
    }
    ctx.service.router.storeAlertMsg(alertMsg);
    if (path) ctx.redirect(path);
    else await next();
  };
};
