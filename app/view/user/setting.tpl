{% extends "../common/common.tpl" %}
{% block title %}用户设置{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as settingPanel %}
	{% set settingModule %}
		<div class="container">
			<form id="myForm" class="py-2" method="post" action="/setting">
				<div class="form-group">
					<label>用户名</label>
					<input class="form-control" value="{{ user.username }}" type="text" name="username">
				</div>
				<div class="form-group">
					<label>电子邮件</label>
					<input class="form-control" disabled value="{{ user.email }}" type="text" name="email">
				</div>
				<div class="form-group">
					<label>个人网站</label>
					<input class="form-control" value="{{ user.website }}" type="text" name="website">
				</div>
				<div class="form-group">
					<label>所在地点</label>
					<input class="form-control" value="{{ user.location }}" type="text" name="location">
				</div>
				<div class="form-group">
					<label>微博</label>
					<input class="form-control" value="{{ user.weibo }}" type="text" name="weibo">
				</div>
				<div class="form-group">
					<label>GitHub</label>
					<input class="form-control" value="{{ user.github }}" type="text" name="github">
				</div>
				<div class="form-group">
					<label>个性签名</label>
					<textarea class="form-control" rows="4" name="signature">{{ user.signature }}</textarea>
				</div>
				<div class="form-group">
					<a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">提交</a>
				</div>
			</form>
		</div>
	{% endset %}
	{{ settingPanel.init('设置', settingModule) }}
{% endblock %}