{% extends "../common/common.tpl" %}
{% block title %}用户主页{% endblock %}
{% block customHead %}
	<style type="text/css">
	.replyAvatar {
			width: 30px;
			height: 30px;
		}
	</style>
{% endblock %}
{% block content %}
	<!-- init first panel -->
	{% import '../common/panel.tpl' as createdPanel %}
	{% set createdModule %}
    {% from '../common/topicList.tpl' import init as initCreated %}
    {{ initCreated(createdTopics) }}
    <div class="p-2">
			<small>
	    	{% if createdTopics.length %}
				<a class="text-muted" href="/user/{{ user._id }}/topics">查看更多&gt;&gt;</a>
				{% else %}
				无话题
				{% endif %}
			</small>
		</div>
	{% endset %}
	{{ createdPanel.init('最近创建的话题', createdModule) }}
{% endblock %}