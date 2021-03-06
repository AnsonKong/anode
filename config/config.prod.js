'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = {};
  config.passportGithub = {
    key: require('./github.prod.passport').key,
    secret: require('./github.prod.passport').secret,
    callbackURL: 'https://www.anodejsfun.top/passport/github/callback',
    proxy: true,
  };

  config.proxy = true;

  config.alinode = {
    appid: require('./alinode').appid,
    secret: require('./alinode').secret,
  };

  config.static = {
    dir: path.join(appInfo.baseDir, 'app/public/dist'),
  };

  config.view = {
    root: path.resolve(appInfo.baseDir, 'app/view/dist'),
  };

  return config;
};
