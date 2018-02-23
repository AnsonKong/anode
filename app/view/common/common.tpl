<!DOCTYPE html>
<html>
	<head>
		<title>{% block title %}{% endblock %} - ANode技术社区</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		{% include './bootstrap.css.tpl' %}
		{% block customHead %}{% endblock %}
		<script type="text/javascript" src="/public/js/custom/default-3011464f81.js"></script>
		<link rel="stylesheet" type="text/css" href="/public/css/custom/default-da431dca28.css">
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
			{% include './bootstrap.js.tpl' %}
			<!-- content -->
			<div class="container px-0 my-lg-3">
				{% block content %}{% endblock %}
				{% block customTail %}{% endblock %}
			</div>
			<!-- footer -->
			<div class="d-none d-lg-block mt-auto bg-dark" style="height: 190px; font-size: 14px; line-height: 40px;">
				<div class="container text-muted d-flex flex-column justify-content-center h-100">
					<div class="d-flex align-items-center">
						ANode 社区是一款以CNode 社区&nbsp;
							<a target="_blank" href="https://cnodejs.org/"><img style="width: 120px;" src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg"></a>
							  &nbsp;为原型进行开发的作品。
    			</div>
    			<div class="d-flex align-items-center">
						开发框架使用Egg.js 2.0&nbsp;
							<a target="_blank" href="https://eggjs.org/"><img style="width: 120px;" src="https://zos.alipayobjects.com/rmsportal/VTcUYAaoKqXyHJbLAPyF.svg"></a>
							  &nbsp;, Egg 奉行『约定优于配置』，帮助开发团队和开发人员降低开发和维护成本。
    			</div>
    			<div class="d-flex align-items-center">
						服务器使用阿里云服务器ECS（Elastic Compute Service）&nbsp;
							<a target="_blank" href="https://www.aliyun.com/product/ecs"><img style="width: 120px;" src="//img.alicdn.com/tps/TB16hl5LpXXXXXRXVXXXXXXXXXX-198-46.png"></a>。
    			</div>
				</div>
			</div>
		</div>
		{% block topLayer %}
		{% endblock %}
	</body>
</html>