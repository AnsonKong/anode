exports.passportGithub = {
  key: require('./github.prod.passport').key,
  secret: require('./github.prod.passport').secret
};

exports.alinode = {
  appid: require('./alinode').appid,
  secret: require('./alinode').secret,
}