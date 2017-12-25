{% extends "../common/common.tpl" %}
{% block title %}登录{% endblock %}
{% block content %}
	<div class="container">
		<form id="myForm" class="mt-2" method="post" action="/signin">
			<div class="form-group">
				<label>用户名</label>
				<input class="form-control" type="text" name="username" placeholder="Username">
			</div>
			<div class="form-group">
				<label>密码</label>
				<input class="form-control" type="password" name="password" placeholder="Password">
			</div>
			<div class="form-group">
				<a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">登录</a>
				<a class="btn btn-light" href="/passport/github">使用Github账号登录</a>
			</div>
		</form>
	</div>
{% endblock %}