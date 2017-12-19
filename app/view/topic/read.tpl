{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
{% endblock %}
{% block content %}
	<style type="text/css">
		#topicHead small:before {
			content: "• ";
		}
		.CodeMirror {
		  height: 160px;
		}
	</style>
	<div class="container rounded-top bg-light mt-3 p-0">
		<div id="topicHead" class="p-2 pt-4">
			<h4><b>{{ title }}</b></h4>
	  	<small class="text-muted">发布于 {{ fromNow }}</small>
	  	<small class="text-muted">作者 <a class="text-muted" href="/user/{{ user._id }}">{{ user.email }}</a></small>
		</div>
		<hr class="my-2">
		<div class="p-3">{{ content | safe }}</div>
	</div>

	{% import '../common/panel.tpl' as repliesPanel %}
	{% set repliesModule %}
		<ul class="list-group">
			{% for item in replies %}
				<li class="list-group-item border-left-0 border-right-0 border-top-1 border-bottom-0 rounded-0">{{ item.content }}</li>
			{% endfor %}
		</ul>
	{% endset %}
	{{ repliesPanel.init('回复', repliesModule) }}

	<!-- s -->
	{% import '../common/panel.tpl' as newReplyPanel %}
	{% set newReplyModule %}
		<div class="border-0 p-2">
			<form id="myForm" method="post" action="/topic/{{ ctx.params.id }}/reply">
				<div class="form-group">
					<textarea name="content"></textarea>
				</div>
				<div class="form-group">
			    <a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">回复</a>
			  </div>
			</form>
		</div>
	{% endset %}
	{{ newReplyPanel.init('添加回复', newReplyModule) }}
{% endblock %}
{% block customTail %}
	<script type="text/javascript">
		var editor = new Editor({
			status: false
		});
		editor.render();
	</script>
{% endblock %}