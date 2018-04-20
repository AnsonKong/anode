'use strict';
module.exports = options => {
  return async (ctx, next) => {
    const replyId = ctx.params.id || ctx.request.body.id;
    let reply;
    let alertMsg;
    try {
      reply = await ctx.model.Reply.findById(replyId);
    } catch (e) {
      alertMsg = '您所访问的回复不存在。';
    }
    if (reply) {
      let pass = true;
      // reply.user - ObjectId('')
      // ctx.user.id - String
      if (options && options.checkIsOwner && reply.user.toString() !== ctx.user.id) pass = false;
      if (pass) {
        await next();
        return;
      }
      alertMsg = '您无权限操作此回复。';

    }

    ctx.service.router.storeAlertMsg(alertMsg);
    ctx.redirect('/');
  };
};
