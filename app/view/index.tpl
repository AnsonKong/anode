{% extends "./common/common.tpl" %}
{% block title %}首页{% endblock %}
{% block customHead %}
	{% include './common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import './common/panel.tpl' as panel %}
	{% import './common/topicList.tpl' as topicList %}
	<div class="container bg-white p-0 rounded mt-3">
		<ul class="nav nav-tabs p-0 m-0">
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
	  {% else %}
	  	<div class="p-2">
				<small>无话题</small>
			</div>
	  {% endif %}
	</div>
{% endblock %}