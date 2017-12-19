{% extends "../common/common.tpl" %}
{% block title %}编辑话题{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
{% endblock %}
{% block content %}
	<div class="container bg-light mt-3 p-3 rounded">
		<form id="myForm" method="post" action="{{ form_action }}">
			<div class="form-group">
				<label>版块：</label>
				<select class="form-control" name="category">
		      <option {% if category === '0' %}selected{% endif %} value="0">分享</option>
		      <option {% if category === '1' %}selected{% endif %} value="1">问答</option>
		      <option {% if category === '2' %}selected{% endif %} value="2">招聘</option>
		    </select>
			</div>
			<div class="form-group">
				<label>标题：</label>
				<input class="form-control" value="{{ title }}" type="text" name="title" placeholder="标题字数10字以上">
			</div>
			<div class="form-group">
				<label>正文：</label>
				<div class="border">
					<textarea name="content">{{content}}</textarea>
				</div>
			</div>
			<div class="form-group">
		    <a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">发布</a>
		  </div>
		</form>
	</div>
{% endblock %}
{% block customTail %}
	<script type="text/javascript">
		var editor = new Editor();
		editor.render();
	</script>
{% endblock %}