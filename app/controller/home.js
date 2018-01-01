'use strict';
const Controller = require('egg').Controller;
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
    const pagination = {
      currentPage,
      totalPage,
    };

    // 4.无人回复的话题
    const noReplyTopics = await this.ctx.service.topic.getNoReplyTopics(5);

    await this.ctx.render('index.tpl', { topics: mergedTopics, categoryTopics, noReplyTopics, pagination, tab });
  }
}

module.exports = HomeController; 