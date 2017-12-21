{% extends "../common/common.tpl" %}
{% block title %}用户参与的话题{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    {% from '../common/topicList.tpl' import init %}
    {{ init(topics, helper, ctx) }}
	{% endset %}
	{{ myPanel.init(user.username +'参与的话题', module) }}
{% endblock %}