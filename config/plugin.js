'use strict';

// had enabled by egg
// exports.static = true;
exports.security = {
	csrf: false
};

exports.nunjucks = {
	enabled: true,
	package: 'egg-view-nunjucks'
}

exports.mongoose = {
	enabled: true,
	package: 'egg-mongoose'
}