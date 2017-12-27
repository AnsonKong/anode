'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 1.user
  router.get('/signup', controller.user.new);
  router.post('/signup', controller.user.signup);

  router.get('/signin', controller.user.old);

  const options = {
  	successRedirect: '/',
  	failureRedirect: '/signin'
  };

  // passport-local
  const local = app.passport.authenticate('local', options);
  router.post('/signin', app.middlewares.isSignined(), local);
  // passport-github
  app.passport.mount('github');

  router.get('/signout', controller.user.signout);

  // 2.topic
  router.get('/topic/create', app.middlewares.isSignined(), controller.topic.new);
  router.post('/topic/create', app.middlewares.isSignined(), controller.topic.create);
  router.get('/topic/:id', controller.topic.read);
  router.get('/topic/:id/edit', app.middlewares.isSignined(), controller.topic.edit);
  router.get('/topic/:id/del', app.middlewares.isSignined(), controller.topic.del);
  router.post('/topic/:id/edit', app.middlewares.isSignined(), controller.topic.update);
  router.post('/topic/:id/reply', app.middlewares.isSignined(), controller.topic.reply);

  // 3.reply
  router.get('/reply/:id/edit', app.middlewares.isSignined(), controller.reply.edit);
  router.post('/reply/:id/edit', app.middlewares.isSignined(), controller.reply.update);
  router.get('/reply/:id/del', app.middlewares.isSignined(), controller.reply.del);
  router.post('/reply/:id/like', app.middlewares.isSignined(), controller.reply.like);

  // 4.user
  router.get('/user/:username', controller.user.home);
  router.get('/user/:username/topics', controller.user.topics);
  router.get('/user/:username/replies', controller.user.replies);
  router.get('/setting', app.middlewares.isSignined(), controller.user.setting);
  router.get('/messages', app.middlewares.isSignined(), controller.user.messages);
  router.post('/setting', app.middlewares.isSignined(), controller.user.updateSetting);

  // 5.upload
  router.post('/upload', app.middlewares.isSignined(), controller.upload.upload);
};
