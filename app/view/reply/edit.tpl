{% extends "../common/common.tpl" %}
{% block title %}编辑回复{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
	<script type="text/javascript" src="/public/js/check-form.js"></script>
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as panel %}
	{% set module %}
	<div class="pl-3 pr-3 pt-3 pb-1">
		<form id="myForm" method="post" action="/reply/{{ reply.id }}/edit" novalidate>
			<div class="form-group">
				<textarea id="myTextarea" class="form-control" name="content" required>{{ helper.decodeBase64(reply.content) }}</textarea>
				<div class="invalid-feedback">
					请正确填写回复内容，要求字数1字以上。
				</div>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" style="cursor: pointer;" onclick="checkForm('myForm', 'myTextarea')" type="submit">提交</button>
		  </div>
		</form>
	</div>
	{% endset %}
	{{ panel.init('编辑回复', module) }}
{% endblock %}
{% block customTail %}
	<script type="text/javascript">
		var editor = new Editor();
		editor.render();
	</script>
{% endblock %}