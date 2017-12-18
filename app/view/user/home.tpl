{% extends "../common/common.tpl" %}
{% block title %}用户主页{% endblock %}
{% block content %}
		{% set title = "最近创建的话题" %}
		{% set list = createdTopics %}
		{% include '../common/panel.tpl' %}
		{% block tail %}
			<div class="p-2">
				<small><a class="text-muted" href="/user/{{ user._id }}/topics">查看更多&gt;&gt;</a></small>
			</div>
		{% endblock %}

		
{% endblock %}