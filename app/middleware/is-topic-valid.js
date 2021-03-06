'use strict';
module.exports = options => {
  return async (ctx, next) => {
    const topicId = ctx.params.id || ctx.request.body.id;
    let topic;
    let alertMsg;
    try {
      topic = await ctx.model.Topic.findById(topicId);
    } catch (e) {
      alertMsg = '您所访问的主题不存在。';
    }
    if (topic) {
      let pass = true;
      // topic.user - ObjectId('')
      // ctx.user.id - String
      if (options && options.checkIsOwner && topic.user.toString() !== ctx.user.id) pass = false;
      if (pass) {
        await next();
        return;
      }
      alertMsg = '您无权限操作此主题。';
    }

    ctx.service.router.storeAlertMsg(alertMsg);
    ctx.redirect('/');
  };
};
