<!DOCTYPE html>
<html>
	<head>
		<title>{% block title %}{% endblock %} - ANode技术社区</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
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
		<div class="d-flex flex-column" style="min-height: 100%;">
			<!-- nav -->
			{% include './nav.tpl' %}
			<!-- alert -->
			{% if alertMsg %}
			<div class="alert alert-warning alert-dismissible fade show m-0" role="alert">
			  {{ alertMsg.msg }}
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			  </button>
			</div>
			{% endif %}
			<!-- content -->
			<div class="container px-0 px-lg-3 my-lg-3">
				{% block content %}{% endblock %}
				{% block customTail %}{% endblock %}
			</div>
			<!-- footer -->
			<div class="d-none d-lg-block mt-auto bg-dark" style="height: 100px;"></div>
			{% include './bootstrap.js.tpl' %}
		</div>
	</body>
</html>