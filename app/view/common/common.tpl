<!DOCTYPE html>
<html>
	<head>
		<title>{% block title %}{% endblock %}</title>
		{% include './bootstrap.css.tpl' %}
		{% block customHead %}{% endblock %}
		<style type="text/css">
			html, body {
				height: 100%;
			}
		</style>
	</head>
	<body style="background-color: #e1e1e1">
		<div class="d-flex flex-column">
			{% include './nav.tpl' %}

			{% block content %}{% endblock %}

			{% include './bootstrap.js.tpl' %}

			{% block customTail %}{% endblock %}
			<div class="mt-auto bg-white" style="height: 100px;">
	
			</div>
		</div>
		
	</body>
</html>