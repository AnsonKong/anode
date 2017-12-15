'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/register', controller.users.new);
  router.post('/register', controller.users.create);

  router.get('/login', controller.users.old);
  router.post('/login', controller.users.login);

  app.passport.mount('github');
};
