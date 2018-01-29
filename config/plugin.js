'use strict';

// had enabled by egg
// exports.static = true;
exports.security = {
	csrf: false
};

exports.nunjucks = {
	enable: true,
	package: 'egg-view-nunjucks'
};

exports.mongoose = {
	enable: true,
	package: 'egg-mongoose'
};

exports.passport = {
	enable: true,
	package: 'egg-passport',
};

exports.passportGithub = {
	enable: true,
	package: 'egg-passport-github',
};

exports.passportLocal = {
	enable: true,
	package: 'egg-passport-local',
};

exports.alinode = {
	enable: true,
	package: 'egg-alinode',
}