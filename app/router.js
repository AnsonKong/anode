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
  	failureRedirect: '/signin/fail'
  };

  // passport-local
  const local = app.passport.authenticate('local', options);
  router.post('/signin', app.middlewares.isSignined(), local);
  // passport-github
  app.passport.mount('github');

  router.get('/signout', controller.user.signout);

  // 2.topic
  router.get('/topic/create', controller.topic.new);
  router.post('/topic/create', controller.topic.create);
  router.get('/topic/:id', controller.topic.read);

  // 3.user
  router.get('/user/:id', controller.user.home);
  router.get('/user/:id/topics', controller.user.topics);
};
