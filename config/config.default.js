'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513127576177_3743';

  // add your config here
  config.middleware = ['pre'];

  config.logger = {
    consoleLevel: 'DEBUG'
  };

  config.view = {
  	defaultViewEngine: 'nunjucks',
  	mapping: {
  		'.tpl': 'nunjucks'
  	}
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/egg',
    options: {}
  };

  config.passportGithub = {
    key: 'bc0efa68b703557940f3',
    secret: '07609073261b5ed948d3927a7fe52e02de74308d'
  };

  config.multipart = {
    fileSize: '1mb',
    whitelist: [
      '.png',
      '.jpg',
      '.jpeg',
    ],
  };

  return config;
};
