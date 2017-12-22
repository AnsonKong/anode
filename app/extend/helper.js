const moment = require('moment');
moment.locale('zh-cn');

exports.encodeBase64 = (src) => {
	return src ? Buffer.from(src).toString('base64') : '';
};

exports.decodeBase64 = (encoded) => {
	return encoded ? Buffer.from(encoded, 'base64').toString() : '';
};

exports.parseMarkdown = (content) => {
	return require('marked')(content);
};

exports.fromNow = (timestamps) => {
	return moment.unix(timestamps).startOf('second').fromNow();
};

exports.parseAvatar = function(avatar) {
	return avatar || this.githubAvatar();
};

exports.githubAvatar = () => {
	return '/public/img/zhihu-default-avatar.jpg';
	// return `https://identicons.github.com/${name}.png`;
};

exports.parseCategory = (num) => {
	let result = 'unknown';
	switch(num) {
		case '0':
			result = '分享';
			break;
		case '1':
			result = '问答';
			break;
		case '2':
			result = '招聘';
			break;
	}
	return result;
};

exports.parseTextWrap = (content, helper) => {
	const arr = content.split('\r\n');
	return arr.join('<br>');
};