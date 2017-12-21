{% extends "../common/common.tpl" %}
{% block title %}用户主页{% endblock %}
{% block customHead %}
	{% include '../common/topicManagement.tpl' %}
{% endblock %}
{% block content %}
	<!-- init first panel -->
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

	<!-- init second panel -->
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