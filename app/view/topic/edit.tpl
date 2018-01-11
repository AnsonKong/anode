{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
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
		<form id="myForm" method="post" action="{% if topic %}/topic/{{ topic.id }}/edit{% else %}/topic/create{% endif %}">
			<div class="form-group">
				<label>版块：</label>
				<select class="form-control" name="category" required>
		      <option {% if topic.category === '0' %}selected{% endif %} value="share">分享</option>
		      <option {% if topic.category === '1' %}selected{% endif %} value="ask">问答</option>
		      <option {% if topic.category === '2' %}selected{% endif %} value="job">招聘</option>
		    </select>
			</div>
			<div class="form-group">
				<label>标题：</label>
				<input class="form-control" value="{{ helper.decodeBase64(topic.title) }}" type="text" name="title" placeholder="标题字数10字以上"
					required pattern=".{10,}">
				<div class="invalid-feedback">
					请正确填写主题标题，要求字数10字以上。
				</div>
			</div>
			<div class="form-group">
				<label>正文：</label>
				<textarea id="myTextarea" class="form-control" name="content" required>{{ helper.decodeBase64(topic.content) }}</textarea>
				<div class="invalid-feedback">
					请正确填写主题内容，要求字数1字以上。
				</div>
			</div>
			<div class="form-group">
				<button class="btn btn-primary" style="cursor: pointer;" onclick="checkForm('myForm', 'myTextarea')" type="submit">{{btnLabel}}</button>
		  </div>
		</form>
	</div>
	{% endset %}
	{{ panel.init(title, module) }}
{% endblock %}
{% block customTail %}
	<script type="text/javascript">
		var editor = new Editor();
		editor.render(document.getElementById('myTextarea'), { autofocus: true });
		editor.codemirror.doc.setCursor(9999);
		editor.codemirror.focus();
	</script>
{% endblock %}
{% block topLayer %}
	{% include '../common/editor.popup.modal.tpl' %}
{% endblock %}