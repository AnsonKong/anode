'use strict';
const Controller = require('egg').Controller;
const _ = require('lodash');
const pageAmount = 20;

class HomeController extends Controller {
  async index() {
  	const currentPage = parseInt(this.ctx.query.page) || 1;
  	const tab = this.ctx.query.tab || 'all';
  	const categoryConditions = this.ctx.helper.parseCategoryConditionsByTab(tab);
  	// 1.获取置顶话题
  	const topTopics = await this.ctx.service.topic.getTopics({ top: true }, { created_time: -1 });
  	// 2.获取分类话题
		const totalAmount = await this.ctx.model.Topic.count(categoryConditions);
		const totalPage = Math.ceil(totalAmount / pageAmount);
  	const categoryTopics = await this.ctx.service.topic.getTopics(categoryConditions, { last_woken_time: -1 }, pageAmount, pageAmount * (currentPage - 1));
  	// 3.合并话题
  	const mergedTopics = topTopics.concat(categoryTopics);
    // 分页信息
    const pagination = {
      currentPage,
      totalPage,
    };
    // 4.无人回复的话题
    const noReplyTopics = await this.ctx.service.topic.getNoReplyTopics(5);
    await this.ctx.render('index.tpl', { topics: mergedTopics, categoryTopics, noReplyTopics, pagination, tab });
  }

  async about() {
    await this.ctx.render('about.tpl');
  }

  // get /search
  async search() {
    const keyword = this.ctx.request.query.q;
    const reg = this._getSearchReg(keyword);
    if (!reg) {
      this.ctx.redirect('/');
      return;
    }
    // 话题
    const topics = await this.ctx.service.topic.getTopics({ title: reg }, { last_woken_time: -1 }, 5);
    // 用户
    const users = await this.ctx.service.user.getUsers({ username: reg }, { created_time: -1 }, 5);

    await this.ctx.render('search.tpl', { users, topics, keyword });
  }
  _getSearchReg(keyword) {
    if (!keyword) {
      return null;
    }
    keyword = _.escapeRegExp(keyword);
    const ar = keyword.split(' ');
    const reg = new RegExp(ar.join('|'), 'i');
    return reg;
  }
  // get /search/topics?q=xxx
  async searchTopics() {
    const keyword = this.ctx.request.query.q;
    const reg = this._getSearchReg(keyword);
    if (!reg) {
      this.ctx.redirect('/');
      return;
    }
    const conditions = { title: reg };
    const currentPage = parseInt(this.ctx.query.page) || 1;

    const totalAmount = await this.ctx.model.Topic.count(conditions);
    const totalPage = Math.ceil(totalAmount / pageAmount);
    const topics = await this.ctx.service.topic.getTopics(conditions, { last_woken_time: -1 }, pageAmount, pageAmount * (currentPage - 1));
    const pagination = {
      currentPage,
      totalPage,
    };
    const title = `关键字"${keyword}"的搜索结果话题`;
    await this.ctx.render('user/topics.tpl', { keyword, canEdit: false, topics, pagination, title, panelTitle: title });
  }

  // get /search/users?q=xxx
  async searchUsers() {
    const keyword = this.ctx.request.query.q;
    const reg = this._getSearchReg(keyword);
    if (!reg) {
      this.ctx.redirect('/');
      return;
    }
    const conditions = { username: reg };
    const currentPage = parseInt(this.ctx.query.page) || 1;

    const totalAmount = await this.ctx.model.User.count(conditions);
    const totalPage = Math.ceil(totalAmount / pageAmount);
    const users = await this.ctx.service.user.getUsers(conditions, { created_time: -1 }, pageAmount, pageAmount * (currentPage - 1));
    const pagination = {
      currentPage,
      totalPage,
    };
    const title = `关键字"${keyword}"的搜索结果用户`;
    await this.ctx.render('user/users.tpl', { keyword, users, pagination, title, panelTitle: title });
  }
}

module.exports = HomeController; 