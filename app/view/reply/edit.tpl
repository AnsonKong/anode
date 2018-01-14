{% extends "../common/common.tpl" %}
{% block title %}编辑回复{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
	<script type="text/javascript" src="/public/js/check-form.js"></script>
	<style type="text/css">
		.CodeMirror {
		  height: 320px;
		}
		.CodeMirror:-webkit-full-screen {
		  width: 100%;
		  height: 100%;
		}
		.CodeMirror:-moz-full-screen {
		  width: 100%;
		  height: 100%;
		}
		.CodeMirror:full-screen {
		  width: 100%;
		  height: 100%;
		}
	</style>
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as panel %}
	{% set module %}
	<div class="pl-3 pr-3 pt-3 pb-1">
		<form id="myForm" method="post" action="/reply/{{ reply.id }}/edit" novalidate>
			<div class="form-group">
				<textarea id="myTextarea" class="form-control" name="content" required>{{ reply.content }}</textarea>
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
		editor.codemirror.doc.setCursor(9999);
		editor.codemirror.focus();
	</script>
{% endblock %}
{% block topLayer %}
	{% include '../common/editor.popup.modal.tpl' %}
{% endblock %}