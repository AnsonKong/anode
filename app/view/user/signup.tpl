{% extends "../common/common.tpl" %}
{% block title %}注册{% endblock %}
{% block content %}
<div class="container">
	<form id="myForm" class="mt-2" method="post" action="/signup">
		<div class="form-group">
			<label>电子邮箱</label>
			<input class="form-control" type="email" name="username" placeholder="Email">
		</div>
		<div class="form-group">
			<label>密码</label>
			<input class="form-control" type="password" name="password" placeholder="Password">
		</div>
		<a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">注册</a>
	</form>
</div>
{% endblock %}