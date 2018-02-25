{% extends "../common/common.tpl" %}
{% block title %}设置{% endblock %}
{% block customHead %}
	<script type="text/javascript" src="/public/js/custom/upload.303339827a.min.js"></script>
	<style type="text/css">
		.profile-avatar {
			width: 200px;
			height: 200px;
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
						<input class="form-control" value="{{ user.email }}" type="text" name="email">
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
				<div class="col-auto form-group d-none d-lg-block">
					<label class="d-block">头像</label>
					<img class="my-avatar profile-avatar rounded d-block" src="{{ helper.parseAvatar(user.avatar) }}">
					<input id="myInputFile" type="file" accept="image/*" class="form-control-file empty-input-file" onchange="uploadAvatar();">
					<label class="btn btn-primary w-100 mt-2" for="myInputFile" style="cursor: pointer;">上传新头像</label>
					<div class="avatar-fail text-danger" style="display: none;max-width: 200px;"></div>
					<div class="avatar-success text-success" style="display: none;max-width: 200px;">新头像更新成功。</div>
				</div>
			</form>
		</div>
	{% endset %}
	{{ settingPanel.init('设置', settingModule) }}
{% endblock %}

{% block customTail %}
	<script type="text/javascript" src="/public/js/third-party/jquery.Jcrop.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/public/css/third-party/jquery.Jcrop.min.css">
	<style type="text/css">
		.jcrop-keymgr {
		  opacity: 0;
		}
	</style>
{% endblock %}

{% block topLayer %}
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">裁剪您的新头像</h5>
        <button type="button" class="close" style="cursor: pointer;" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body justify-content-center d-flex">
        <img id="myCrop">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" style="cursor: pointer;" onclick="saveCrop();">保存头像</button>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
	$('#myModal').on('hidden.bs.modal', function (e) {
	  $('#myInputFile').val('');
	  if (jcropApi) jcropApi.destroy();
	});
</script>
{% endblock %}