{% extends "./common/common.tpl" %}
{% block title %}首页{% endblock %}
{% block customHead %}
	{% include './common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import './common/panel.tpl' as panel %}
	{% import './common/topic-list.tpl' as topicList %}
	{% import './common/pagination.tpl' as p %}
	<div class="row no-gutters">
		<!-- left -->
		<div class="col-9 rounded">
			<ul class="nav bg-white nav-tabs">
			  <li class="nav-item">
			    <a class="nav-link {{'active' if tab=='all' else ''}}" href="/?tab=all">全部</a>
			  </li>
			  <li class="nav-item">
			    <a class="nav-link {{'active' if tab=='good' else ''}}" href="/?tab=good">精华</a>
			  </li>
			  <li class="nav-item">
			    <a class="nav-link {{'active' if tab=='share' else ''}}" href="/?tab=share">分享</a>
			  </li>
			  <li class="nav-item">
			    <a class="nav-link {{'active' if tab=='ask' else ''}}" href="/?tab=ask">问答</a>
			  </li>
			  <li class="nav-item">
			    <a class="nav-link {{'active' if tab=='job' else ''}}" href="/?tab=job">招聘</a>
			  </li>
			</ul>
			{% if topics.length %}
		  	{{ topicList.init(topics, helper, ctx, false, tab=='all') }}
				{% if categoryTopics.length %}
		  	<div class="bg-white p-3">
		  		{{ p.init(ctx, helper, pagination) }}
		  	</div>
		  	{% endif %}
		  {% else %}
		  	<div class="bg-white p-3">
					<small>无话题</small>
				</div>
		  {% endif %}
		</div>
		<!-- right -->
		<div class="d-none d-lg-block col-3 pl-3">
			{% set module %}
				{% if noReplyTopics.length %}
				<ul class="list-group">
					{% for item in noReplyTopics %}
				  <li class="text-truncate list-group-item list-group-item-action border-top-0 border-left-0 border-right-0 border-bottom-1 rounded-0 m-0" title="{{ item.title }}"><a href="/topic/{{ item.id }}">{{ item.title }}</a></li>
				  {% endfor %}
				</ul>
				{% else %}
				<div class="p-3">
					<small>无话题</small>
				</div>
				{% endif %}
			{% endset %}
			{{ panel.init('无人回复的话题', module) }}

			{% set module %}
				<div class="p-3">
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li>
							<a target="_blank" href="https://cnodejs.org/">
			          CNode：Node.js专业中文社区
			      	</a>
						</li>
						<li class="my-1">
							<a target="_blank" href="https://eggjs.org/">
			          Egg.js 为企业级框架和应用而生
			      	</a>
						</li>
						<li>
							<a target="_blank" href="https://www.aliyun.com/product/ecs">
			          阿里云服务器 ECS
			      	</a>
						</li>
					</ul>
				</div>
			{% endset %}
			<div class="mt-3">
				{{ panel.init('友情链接', module) }}
			</div>
		</div>
	</div>
{% endblock %}