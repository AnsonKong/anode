'use strict';
const Controller = require('egg').Controller;
const pageAmount = 10;

class HomeController extends Controller {
  async index() {
  	const currentPage = parseInt(this.ctx.query.page) || 1;
  	const tab = this.ctx.query.tab || 'all';
  	const categoryConditions = this.ctx.helper.parseCategoryConditionsByTab(tab);
  	// 1.获取置顶话题
  	const topTopics = await this.ctx.service.topic.getTopics({ top: true });
  	// 2.获取分类话题
		const totalAmount = await this.ctx.model.Topic.count(categoryConditions);
		const totalPage = Math.ceil(totalAmount / pageAmount);
  	const categoryTopics = await this.ctx.service.topic.getTopics(categoryConditions, pageAmount, pageAmount * (currentPage - 1));
  	// 3.合并话题
  	const mergedTopics = topTopics.concat(categoryTopics);

    await this.ctx.render('index.tpl', { topics: mergedTopics, tab });
  }
}

module.exports = HomeController; 