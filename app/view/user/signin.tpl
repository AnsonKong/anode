<!DOCTYPE html>
<html>
	<head>
		<title>登录</title>
		{% include '../common/bootstrap.css.tpl' %}
	</head>
	<body>
		{% include '../common/nav.tpl' %}
		<div class="container">
			<form id="myForm" class="mt-2" method="post" action="/signin">
				<div class="form-group">
					<label>电子邮箱</label>
					<input class="form-control" type="email" name="username" placeholder="Email">
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
		{% include '../common/bootstrap.js.tpl' %}
	</body>
</html>