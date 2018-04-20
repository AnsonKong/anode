{% extends "../common/common.tpl" %}
{% block title %}注册{% endblock %}
{% block customHead %}
	<script type="text/javascript" src="/public/js/custom/check-form.586cd04df7.min.js"></script>
{% endblock %}
{% block content %}
<div class="container">
	<form id="myForm" class="mt-2" method="post" action="/signup" novalidate>
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
		<button class="btn btn-primary" style="cursor: pointer;" onclick="checkForm('myForm')" type="submit">注册</button>
	</form>
</div>
{% endblock %}