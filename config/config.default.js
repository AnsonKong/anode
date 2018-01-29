'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513127576177_3743';

  // add your config here
  config.middleware = ['pre', 'notfoundHandler'];

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
    key: require('./github.local.passport').key,
    secret: require('./github.local.passport').secret
  };

  config.multipart = {
    fileSize: '1mb',
    whitelist: [
      '.png',
      '.jpg',
      '.jpeg',
    ],
  };

  config.alinode = {
    appid: require('./alinode').appid,
    secret: require('./alinode').secret,
  }

  return config;
};
