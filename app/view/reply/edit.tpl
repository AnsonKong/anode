{% extends "../common/common.tpl" %}
{% block title %}编辑回复{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as panel %}
	{% set module %}
	<div class="pl-3 pr-3 pt-3 pb-1">
		<form id="myForm" method="post" action="/reply/{{ reply.id }}/edit">
			<div class="form-group">
				<div class="border">
					<textarea name="content">{{ helper.decodeBase64(reply.content) }}</textarea>
				</div>
			</div>
			<div class="form-group">
		    <a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">提交</a>
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