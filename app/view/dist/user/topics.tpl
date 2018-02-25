{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    {% from '../common/topic-list.tpl' import init %}
    {{ init(topics, helper, ctx, canEdit, false, keyword) }}
  	{% import '../common/pagination.tpl' as p %}
  	{% if topics.length %}
    <div class="p-3">
    	{{ p.init(ctx, helper, pagination) }}
    </div>
    {% else %}
		<div class="p-2">
				<small>无话题</small>
			</div>
	  {% endif %}
	{% endset %}
	{{ myPanel.init(panelTitle, module) }}
{% endblock %}