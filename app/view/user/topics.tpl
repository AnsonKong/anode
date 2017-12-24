{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    {% from '../common/topicList.tpl' import init %}
    {{ init(topics, helper, ctx, true) }}
    <div class="p-3">
	    <nav aria-label="Page navigation example">
			  <ul class="pagination m-0">
			    <li class="page-item {{ 'disabled' if pagination.currentPage == 1 else '' }}">
			      <a class="page-link" href="{{ ctx.path }}?page=1" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			        <span class="sr-only">Previous</span>
			      </a>
			    </li>
			    {% for i in range(1, pagination.totalPage + 1) %}
			    {% set isActive = (pagination.currentPage == i) %}
			    <li class="page-item {{ 'active' if isActive else '' }}">
			    	{% if isActive %}
			    	<span class="page-link">{{ i }}</span>
			    	{% else %}
			    	<a class="page-link" href="{{ ctx.path }}?page={{ i }}">{{ i }}</a>
			    	{% endif %}
			    </li>
			    {% endfor %}
			    <li class="page-item {{ 'disabled' if pagination.currentPage == pagination.totalPage else '' }}">
			      <a class="page-link" href="{{ ctx.path }}?page={{ pagination.totalPage }}" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			        <span class="sr-only">Next</span>
			      </a>
			    </li>
			  </ul>
			</nav>
    </div>
	{% endset %}
	{{ myPanel.init(panelTitle, module) }}
{% endblock %}