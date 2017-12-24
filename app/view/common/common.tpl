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
			.nav-avatar {
				width: 20px;
				height: 20px;
			}
		</style>
	</head>
	<body style="background-color: #e1e1e1">
		<div class="d-flex align-items-start flex-column h-100">
			<div class="w-100 mb-3">
				{% include './nav.tpl' %}
				{% block content %}{% endblock %}
				{% block customTail %}{% endblock %}
			</div>
			{% include './bootstrap.js.tpl' %}
			<div class="w-100 bg-white mt-auto" style="height: 100px;">
				
			</div>
		</div>
	</body>
</html>