'use strict';

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    let userDoc;
    let alertMsg = '登录失败。';
    if (user.provider) {
      ctx.logger.debug('verify by OAuth:' + user.provider);
      // 1. OAuth by Github
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
          username: `${user.name}(G)`,
          email: user.profile._json.email,
          avatar: user.photo,
          github: user.profile.profileUrl,
        };
        userDoc = await ctx.service.user.signup(conditions);
        // 创建授权文档
        authConditions.user = userDoc.id;
        authDoc = await ctx.model.Authorization.create(authConditions);
      }
    } else {
      ctx.logger.debug('verify by Local');
      // 2. Local
      userDoc = await ctx.service.user.signin(user.name, user.pass);
      if (!userDoc) alertMsg = '用户名或密码不正确。';
    }
    if (!userDoc) ctx.service.router.storeAlertMsg(alertMsg);
    return userDoc;
  });

  app.passport.serializeUser(async (ctx, user) => {
    return user._id;
  });

  app.passport.deserializeUser(async (ctx, user) => {
    const userDoc = await ctx.model.User.findOne({ _id: user }).populate('messages');
    return userDoc;
  });
};
