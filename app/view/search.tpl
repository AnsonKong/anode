{% extends "./common/common.tpl" %}
{% block title %}关键字"{{keyword}}"的搜索结果{% endblock %}
{% block customHead %}
	{% include './common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import './common/panel.tpl' as panel %}
	{% import './common/topicList.tpl' as topicList %}
	{% import './common/user.list.tpl' as userList %}
	{% import './common/pagination.tpl' as p %}

	<span>关键字"{{keyword}}"的搜索结果</span>
	<!-- 话题 -->
	{% set module %}
		{{ topicList.init(topics, helper, ctx, false, false, keyword) }}
		<div class="p-2">
			<small>
	    	{% if topics.length %}
					<a class="text-muted" href="/search/topics?q={{keyword}}">查看更多&gt;&gt;</a>
				{% else %}
					无话题
				{% endif %}
			</small>
		</div>
	{% endset %}
	<div class="my-3">
		{{ panel.init('话题', module) }}
	</div>

	<!-- 用户 -->
	{% set module %}
		{{ userList.init(users, helper, ctx, keyword) }}
		<div class="p-2">
			<small>
	    	{% if users.length %}
					<a class="text-muted" href="/search/users?q={{keyword}}">查看更多&gt;&gt;</a>
				{% else %}
					无用户
				{% endif %}
			</small>
		</div>
	{% endset %}
	{{ panel.init('用户', module) }}
{% endblock %}