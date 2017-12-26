{% extends "../common/common.tpl" %}
{% block title %}用户设置{% endblock %}
{% block customHead %}
	<script type="text/javascript" src="/public/js/upload-actions.js"></script>
	<style type="text/css">
		.profile-avatar {
			width: 200px;
			height: 200px;
		}
		#myInputFile {
			width: 0.1px;
			height: 0.1px;
			opacity: 0;
			overflow: hidden;
			position: absolute;
			z-index: -1;
		}
	</style>
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as settingPanel %}
	{% set settingModule %}
		<div class="container">
			<form id="myForm" class="py-2 row" method="post" action="/setting">
				<div class="col">
					<div class="form-group">
						<label>用户名</label>
						<input class="form-control" readonly value="{{ user.username }}" type="text">
					</div>
					<div class="form-group">
						<label>电子邮件</label>
						<input class="form-control" readonly value="{{ user.email }}" type="text">
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
				</div>
				<div class="col-auto form-group">
					<label class="d-block">头像</label>
					<img id="myAvatar" class="profile-avatar rounded d-block" src="{{ helper.parseAvatar(user.avatar) }}">
					<input id="myInputFile" type="file" accept="image/png,image/jpeg" class="form-control-file" onchange="uploadAvatar($('#myAvatar')[0]);">
					<label class="btn btn-primary w-100 mt-2" for="myInputFile" style="cursor: pointer;">上传并更新头像</label>
				</div>
			</form>
		</div>
	{% endset %}
	{{ settingPanel.init('设置', settingModule) }}
{% endblock %}