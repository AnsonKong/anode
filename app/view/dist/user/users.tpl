{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    {% from '../common/user-list.tpl' import init %}
    {{ init(users, helper, ctx, keyword) }}
  	{% import '../common/pagination.tpl' as p %}
  	{% if users.length %}
    <div class="p-3">
    	{{ p.init(ctx, helper, pagination) }}
    </div>
    {% else %}
		<div class="p-2">
				<small>无用户</small>
			</div>
	  {% endif %}
	{% endset %}
	{{ myPanel.init(panelTitle, module) }}
{% endblock %}