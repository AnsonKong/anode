const moment = require('moment');
moment.locale('zh-cn');
const reg = /@(.+?)(\b)/g;

exports.encodeBase64 = (src) => {
	return src ? Buffer.from(src).toString('base64') : '';
};

exports.decodeBase64 = (encoded) => {
	return encoded ? Buffer.from(encoded, 'base64').toString() : '';
};

exports.parseMarkdown = (content) => {
	const markdown = require('marked')(content);
	const result = markdown.replace(reg, '<a href="/user/$1" target="_blank">@$1</a>$2');
	return result;
};

exports.parseAtUsers = (content) => {
	const obj = content.match(reg);
	for(let i in obj) {
		obj[i] = obj[i].replace('@', '');
	}
	return new Set(obj);
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

exports.getNewMessagesLength = (messages) => {
	let count = 0;
	for(let i = 0;i < messages.length;i++) {
		let item = messages[i];
		if (!item.read) count++;
	}
	return count;
};

exports.buildJSONResponse = (code, msg, data) => {
	const json = { code, msg, data };
	return JSON.stringify(json);
};