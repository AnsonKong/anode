{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block content %}
	<div class="container rounded bg-light mt-2 p-0">
		<h1>{{ title }}</h1>
	  <span>author</span>
		<hr class="my-2">
		<div class="mx-4 mb-4">{{ content | safe }}</div>
	</div>
{% endblock %}