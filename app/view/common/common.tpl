<!DOCTYPE html>
<html>
	<head>
		<title>{% block title %}{% endblock %}</title>
		{% include './bootstrap.css.tpl' %}
		{% block customHead %}{% endblock %}
	</head>
	<body style="background-color: #e1e1e1">
		{% include './nav.tpl' %}
		{% block content %}{% endblock %}
		{% include './bootstrap.js.tpl' %}
		{% block customTail %}{% endblock %}
	</body>
</html>