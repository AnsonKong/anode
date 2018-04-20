{% extends "../common/common.tpl" %}
{% block title %}登录{% endblock %}
{% block customHead %}
	<script type="text/javascript" src="/public/js/custom/check-form.586cd04df7.min.js"></script>
{% endblock %}
{% block content %}
	<div class="container">
		<form id="myForm" novalidate class="mt-2" method="post" action="/signin">
			<div class="form-group">
				<label>用户名</label>
				<input class="form-control" type="text" name="username" placeholder="Username"
					required pattern="[a-zA-Z]\w{3,}">
				<div class="invalid-feedback">
	        请正确填写用户名，以英文字母开头，由英文字母、数字和下划线组成,长度为4个字符或以上。
	      </div>
			</div>
			<div class="form-group">
				<label>密码</label>
				<input class="form-control" type="password" name="password" placeholder="Password"
					required pattern="[0-9a-zA-Z]{3,}">
				<div class="invalid-feedback">
	        请正确填写密码，由英文字母和数字组成，长度为3个字符或以上。
	      </div>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" style="cursor: pointer;" onclick="checkForm('myForm')" type="submit">登录</button>
				<a class="btn btn-light" href="/passport/github">使用Github账号登录</a>
			</div>
		</form>
	</div>
{% endblock %}