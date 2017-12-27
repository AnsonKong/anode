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

  router.get('/signin', app.middlewares.isSignined(), controller.user.old);

  const options = {
  	successRedirect: '/',
  	// failureRedirect: '/signin/fail'
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
  router.get('/topic/:id/edit', controller.topic.edit);
  router.get('/topic/:id/del', controller.topic.del);
  router.post('/topic/:id/edit', controller.topic.update);
  router.post('/topic/:id/reply', controller.topic.reply);

  // 3.reply
  router.get('/reply/:id/edit', controller.reply.edit);
  router.post('/reply/:id/edit', controller.reply.update);
  router.get('/reply/:id/del', controller.reply.del);
  router.post('/reply/:id/like', controller.reply.like);

  // 4.user
  router.get('/user/:username', controller.user.home);
  router.get('/user/:username/topics', controller.user.topics);
  router.get('/user/:username/replies', controller.user.replies);
  router.get('/setting', controller.user.setting);
  router.get('/messages', controller.user.messages);
  router.post('/setting', controller.user.updateSetting);

  // 5.upload
  router.post('/upload', controller.upload.upload);
};
