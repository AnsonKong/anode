const moment = require('moment');
moment.locale('zh-cn');
// 若@前方有可见字符，则在前方加上空格
const reg1 = /(\S)(@)/g;
// 若最后的@是以可见字符结尾，则在最后加上空格
const reg2 = /(@\S+)$/g;
// 以@开头，以不可见字符或<结尾，进行匹配
const reg3 = /@(\S+?)(\s|<)/g;

exports.encodeBase64 = (src) => {
	return src ? Buffer.from(src).toString('base64') : '';
};

exports.decodeBase64 = (encoded) => {
	return encoded ? Buffer.from(encoded, 'base64').toString() : '';
};

exports.parseMarkdown = (content) => {
	const markdown = require('marked')(content);
	let newStr = markdown.replace(reg1, '$1 $2');
	newStr = newStr.replace(reg2, '$1 ');
	const result = newStr.replace(reg3, '<a href="/user/$1" target="_blank">@$1</a>$2');
	return result;
};

exports.parseAtUsers = (content) => {
	let newStr = content.replace(reg1, '$1 $2');
	newStr = newStr.replace(reg2, '$1 ');
	const obj = newStr.match(reg3);
	for(let i in obj) {
		obj[i] = obj[i].replace('@', '');
		obj[i] = obj[i].replace(' ', '');
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

exports.parseCategory = (topicDoc) => {
	let result = 'unknown';
	switch(topicDoc.category) {
		case 'share':
			result = '分享';
			break;
		case 'ask':
			result = '问答';
			break;
		case 'job':
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

exports.parseCategoryConditionsByTab = (tab) => {
	const result = {};
	switch (tab) {
		case 'all':
			result.top = false;
			break;
		case 'top':
			result.top = true;
			break;
		case 'good':
			result.top = false;
			result.good = true;
			break;
		default:
			result.category = tab;
			result.top = false;
	}
	return result;
};

exports.addQuery = (ctx, key, value) => {
	let result = ctx.path;
	let cloneQuery = Object.create(ctx.query);
	cloneQuery[key] = value;
	let first = true;
	for(let i in cloneQuery) {
		result += (first ? '?' : '&') + i + '=' + cloneQuery[i];
		first = false;
	}
	return result;
}