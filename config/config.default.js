'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};
  const baseDir = appInfo.baseDir;
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513127576177_3743';

  // add your config here
  config.middleware = ['pre', 'notfoundHandler'];

  config.logger = {
    consoleLevel: 'DEBUG'
  };

  config.view = {
    root: path.resolve(baseDir, 'app/view/dist'),
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
  
  return config;
};
