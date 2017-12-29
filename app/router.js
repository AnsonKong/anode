'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router: r, controller: c, middlewares: m } = app;
  r.get('/', c.home.index);
  // 1.user
  r.get('/signup', c.user.new);
  r.post('/signup', c.user.signup);

  r.get('/signin', c.user.old);

  const options = {
  	successRedirect: '/',
  	failureRedirect: '/signin'
  };

  // passport-local
  const local = app.passport.authenticate('local', options);
  r.post('/signin', m.isSignined(), local);
  // passport-github
  app.passport.mount('github');

  r.get('/signout', c.user.signout);

  // 2.topic
  r.get('/topic/create', m.isSignined(), c.topic.new);
  r.post('/topic/create', m.isSignined(), c.topic.create);
  r.get('/topic/:id', m.isTopicValid(), c.topic.read);
  r.get('/topic/:id/edit', m.isSignined(), m.isTopicValid({ checkIsOwner: true }), c.topic.edit);
  r.post('/topic/:id/edit',m.isSignined(), m.isTopicValid({ checkIsOwner: true }), c.topic.update);
  r.post('/topic/:id/reply',m.isSignined(), m.isTopicValid(), c.topic.reply);
  r.post('/topic/:id/del',m.isSignined(), m.isTopicValid({ checkIsOwner: true }), c.topic.del);
  r.post('/topic/collect',m.isSignined(), m.isTopicValid(), c.topic.collect);

  // 3.reply
  r.get('/reply/:id/edit', m.isSignined(), m.isReplyValid({ checkIsOwner: true }), c.reply.edit);
  r.post('/reply/:id/edit', m.isSignined(), m.isReplyValid({ checkIsOwner: true }), c.reply.update);
  r.post('/reply/del', m.isSignined(), m.isReplyValid({ checkIsOwner: true }), c.reply.del);
  r.post('/reply/like', m.isSignined(), m.isReplyValid(), c.reply.like);

  // 4.user
  r.get('/user/:username', m.isUserValid(), c.user.home);
  r.get('/user/:username/topics', m.isUserValid(), c.user.topics);
  r.get('/user/:username/replies', m.isUserValid(), c.user.replies);
  r.get('/user/:username/collections', m.isUserValid(), c.user.collections);
  r.get('/setting', m.isSignined(), c.user.setting);
  r.get('/messages', m.isSignined(), c.user.messages);
  r.post('/setting', m.isSignined(), c.user.updateSetting);
  r.get('/home', m.isSignined(), c.user.myHome);

  // 5.upload
  r.post('/upload', m.isSignined(), c.upload.upload);
};
