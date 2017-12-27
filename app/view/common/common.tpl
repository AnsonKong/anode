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
		<div class="d-flex flex-column align-items-between" style="min-height: 100%;">
			<div class="w-100 mb-3">
				{% include './nav.tpl' %}
				{% if alertMsg %}
				<div class="container alert alert-warning alert-dismissible fade show" role="alert">
				  {{ alertMsg.msg }}
				  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				</div>
				{% endif %}
				{% block content %}{% endblock %}
			</div>
			{% include './bootstrap.js.tpl' %}
			{% block customTail %}{% endblock %}
			<div class="w-100 bg-dark mt-auto" style="height: 100px;"></div>
		</div>
	</body>
</html>