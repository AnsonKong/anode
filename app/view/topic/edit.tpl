{% extends "../common/common.tpl" %}
{% block title %}编辑话题{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
{% endblock %}
{% block content %}
	<style type="text/css">
		.CodeMirror {
		  height: 320px;
		}
	</style>
	{% import '../common/panel.tpl' as panel %}
	{% set module %}
	<div class="pl-3 pr-3 pt-3 pb-1">
		<form id="myForm" method="post" action="{% if topic %}/topic/{{ topic.id }}/edit{% else %}/topic/create{% endif %}">
			<div class="form-group">
				<label>版块：</label>
				<select class="form-control" name="category">
		      <option {% if topic.category === '0' %}selected{% endif %} value="0">分享</option>
		      <option {% if topic.category === '1' %}selected{% endif %} value="1">问答</option>
		      <option {% if topic.category === '2' %}selected{% endif %} value="2">招聘</option>
		    </select>
			</div>
			<div class="form-group">
				<label>标题：</label>
				<input class="form-control" value="{{ helper.decodeBase64(topic.title) }}" type="text" name="title" placeholder="标题字数10字以上">
			</div>
			<div class="form-group">
				<label>正文：</label>
				<div class="border">
					<textarea name="content">{{ helper.decodeBase64(topic.content) }}</textarea>
				</div>
			</div>
			<div class="form-group">
		    <a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">发布</a>
		  </div>
		</form>
	</div>
	{% endset %}
	{{ panel.init('编辑话题', module) }}
{% endblock %}
{% block customTail %}
	<script type="text/javascript">
		var editor = new Editor();
		editor.render();
	</script>
{% endblock %}