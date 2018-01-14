{% extends "../common/common.tpl" %}
{% block title %}{{ user.username }}的主页{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
	<style type="text/css">
		.icon-container {
			 width: 30px;
		}
	</style>
{% endblock %}
{% block content %}
	<!-- 简介 -->
	{% import '../common/panel.tpl' as panel %}
	{% set briefModule %}
		<div class="d-flex flex-column p-3">
			<div class="mb-2">
	    	<img class="briefAvatar rounded" src="{{ helper.parseAvatar(user.avatar) }}">
	    	<big class="ml-2">{{ user.username }}</big>
	    	{% if user.id == ctx.user.id %}
				<i class="far fa-edit interactive_btn ml-2" onclick="window.location.href='/setting'" title="编辑"></i>
				{% endif %}
			</div>
			{% if user.collections.length %}
			<div>
				<div class="d-inline-flex icon-container">
					<i class="fas fa-star interactive_btn mx-auto"></i>
				</div>
				<a class="text-muted dumbText" target="_blank" href="/user/{{ user.username }}/collections">
					<small>{{ user.collections.length }}个话题收藏</small>
				</a>
			</div>
			{% endif %}
			{% if user.website %}
			<div>
				<div class="d-inline-flex icon-container">
					<i class="fas fa-home interactive_btn mx-auto"></i>
				</div>
				<a class="text-muted dumbText" target="_blank" href="{{ user.website }}">
					<small>{{ user.website }}</small>
				</a>
			</div>
			{% endif %}
			{% if user.location %}
			<div>
				<div class="d-inline-flex icon-container">
					<i class="fas fa-map-marker-alt interactive_btn mx-auto"></i>
				</div>
				<small class="text-muted">{{ user.location }}</small>
			</div>
			{% endif %}
			{% if user.github %}
			<div>
				<div class="d-inline-flex icon-container">
					<i class="fab fa-github interactive_btn mx-auto"></i>
				</div>
				<a class="text-muted dumbText" target="_blank" href="{{ user.github }}">
					<small>@{{ user.username }}</small>
				</a>
			</div>
			{% endif %}
			{% if user.weibo %}
			<div>
				<div class="d-inline-flex icon-container">
					<i class="fab fa-weibo interactive_btn mx-auto"></i>
				</div>
				<a class="text-muted dumbText" target="_blank" href="{{ user.weibo }}">
					<small>{{ user.weibo }}</small>
				</a>
			</div>
			{% endif %}
			{% if user.signature %}
			<div class="d-flex flex-row">
				<div class="d-inline-flex icon-container pt-1">
					<i class="fas fa-quote-left interactive_btn mx-auto"></i>
				</div>
				<q class="text-muted"><i><small>{{ user.signature }}</small></i></q>
			</div>
			{% endif %}
			<div class="mt-1">
	    	<small class="text-muted">注册时间 {{ helper.fromNow(user.created_time) }}</small>
			</div>
		</div>
	{% endset %}
	<!-- 1 -->
	{{ panel.init('主页', briefModule) }}
	{% set canEdit = (user.id == ctx.user.id) %}
	<!-- 最近创建的话题 -->
	{% set createdModule %}
    {% from '../common/topicList.tpl' import init as initCreated %}
    {{ initCreated(topics, helper, ctx, canEdit) }}
    <div class="p-2">
			<small>
	    	{% if topics.length %}
					<a class="text-muted" href="/user/{{ user.username }}/topics">查看更多&gt;&gt;</a>
				{% else %}
					无话题
				{% endif %}
			</small>
		</div>
	{% endset %}
	<!-- 2 -->
	<div class="my-3">
		{{ panel.init('最近创建的话题', createdModule) }}
	</div>

	<!-- 最近参与的话题 -->
	{% set repliedModule %}
    {% from '../common/topicList.tpl' import init as initReplied %}
    {{ initReplied(replyTopics, helper, ctx, canEdit) }}
    <div class="p-2">
			<small>
	    	{% if replyTopics.length %}
					<a class="text-muted" href="/user/{{ user.username }}/replies">查看更多&gt;&gt;</a>
				{% else %}
					无话题
				{% endif %}
			</small>
		</div>
	{% endset %}
	<!-- 3 -->
	<div>
		{{ panel.init('最近参与的话题', repliedModule) }}
	</div>

{% endblock %}