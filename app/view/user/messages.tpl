{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set messages = newMessages %}
	{% set module %}
    {% include '../common/messages-list.tpl' %}
	{% endset %}
	{{ myPanel.init('新消息', module) }}

	{% set messages = oldMessages %}
	{% set module %}
    {% include '../common/messages-list.tpl' %}
	{% endset %}
	{{ myPanel.init('旧消息', module) }}
{% endblock %}