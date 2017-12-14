'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/users/register', controller.users.new);
  router.post('/users/register', controller.users.create);

  router.get('/users/login', controller.users.old);
  router.post('/users/login', controller.users.login);
};
