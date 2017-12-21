{% extends "../common/common.tpl" %}
{% block title %}用户主页{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	<!-- 简介 -->
	{% import '../common/panel.tpl' as briefPanel %}
	{% set briefModule %}
		<div class="d-flex flex-column p-3">
			<div>
	    	<img class="briefAvatar rounded" src="{{ helper.parseAvatar(user.avatar) }}">
	    	<big class="ml-1">{{ user.username }}</big>
			</div>
			{% if user.github %}
			<div class="mt-2">
				<i class="fab fa-github interactive_btn"></i>
				<a class="text-muted dumbText" target="_blank" href="{{ user.github }}">
					<small>@{{ user.username }}</small>
				</a>
			</div>
			{% endif %}
			<div class="mt-1">
	    	<small class="text-muted">注册时间 {{ helper.fromNow(user.created_time) }}</small>
			</div>
		</div>
	{% endset %}
	{{ briefPanel.init('主页', briefModule) }}
	<!-- 最近创建的话题 -->
	{% import '../common/panel.tpl' as createdPanel %}
	{% set createdModule %}
    {% from '../common/topicList.tpl' import init as initCreated %}
    {{ initCreated(topics, helper, ctx) }}
    <div class="p-2">
			<small>
	    	{% if topics.length %}
					<a class="text-muted" href="/user/{{ user.id }}/topics">查看更多&gt;&gt;</a>
				{% else %}
					无话题
				{% endif %}
			</small>
		</div>
	{% endset %}
	{{ createdPanel.init('最近创建的话题', createdModule) }}

	<!-- 最近参与的话题 -->
	{% import '../common/panel.tpl' as repliedPanel %}
	{% set repliedModule %}
    {% from '../common/topicList.tpl' import init as initReplied %}
    {{ initReplied(replyTopics, helper, ctx) }}
    <div class="p-2">
			<small>
	    	{% if replyTopics.length %}
					<a class="text-muted" href="/user/{{ user.id }}/replies">查看更多&gt;&gt;</a>
				{% else %}
					无话题
				{% endif %}
			</small>
		</div>
	{% endset %}
	{{ repliedPanel.init('最近参与的话题', repliedModule) }}

{% endblock %}