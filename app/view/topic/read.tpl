{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block content %}
	<style type="text/css">
		small:before {
			content: "• ";
		}
	</style>
	<div class="container rounded bg-light mt-3 p-0">
		<div class="p-2 pt-4">
			<h4><b>{{ title }}</b></h4>
	  	<small class="text-muted">作者 <a class="text-muted" href="/user/{{ user._id }}">{{ user.email }}</a></small>
		</div>
		<hr class="my-2">
		<div class="p-3">{{ content | safe }}</div>
	</div>
{% endblock %}