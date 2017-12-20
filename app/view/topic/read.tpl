{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
	{% include '../common/font-awesome.tpl' %}
	<script type="text/javascript" src="/public/js/topicActions.js"></script>
{% endblock %}
{% block content %}
	<style type="text/css">
		#topicHead small:before {
			content: "• ";
		}
		.CodeMirror {
		  height: 160px;
		}
		.replyAvatar {
			width: 40px;
			height: 40px;
		}
		.replyText:link {
			text-decoration:none;
		}
		.interactive_btn {
			opacity: .4;
			cursor: pointer;
		}
		.interactive_btn:hover {
			opacity: .6;
		}
	</style>
	
	<div class="container rounded-top bg-light mt-3 p-0">
		<!-- 话题面板 -->
		<div id="topicHead" class="p-2 pt-4">
			<h4><b>{{ title }}</b></h4>
	  	<small class="text-muted">发布于 {{ fromNow }}</small>
	  	<small class="text-muted">作者 <a class="text-muted" href="/user/{{ user._id }}">{{ user.email }}</a></small>
			{% if user._id.toString() == ctx.user._id.toString() %}
					<i class="far fa-edit interactive_btn mx-1" title="编辑" onclick="onEditTopic('{{ ctx.params.id }}')"></i>
					<i class="far fa-trash-alt interactive_btn mx-1" title="删除" onclick="onDelTopic('{{ ctx.params.id }}')"></i>
			{% endif %}
		</div>
		<hr class="my-2">
		<div class="p-3">{{ content | safe }}</div>
	</div>
	<!-- 回复面板 -->
	{% import '../common/panel.tpl' as repliesPanel %}
	{% set repliesModule %}
		<ul id="topicReplies" class="list-group">
			{% if replies.length %}
				{% for item in replies %}
					<li class="list-group-item border-left-0 border-right-0 border-top-1 border-bottom-0 rounded-0 p-2">
						<div class="row no-gutters">
							<div class="col-auto mr-2">
								<a href="/user/{{ item.user._id }}">
									<img class="replyAvatar rounded" src="{{ item.user.avatar }}">
								</a>
							</div>
							<div class="col">
								<div class="d-flex">
									<span class="mr-auto">
										<small><a class="text-dark replyText" href="/user/{{ item.user._id }}">{{ item.user.email }}</a></small>
										<small><a href="#">{{ loop.index }}楼•{{ item.fromNow }}</a></small>
										{% if item.user._id.toString() === user._id.toString() %}
											<small class="d-inline p-1 text-white bg-success">作者</small>
										{% endif %}
									</span>
									<div class="d-flex">
										<i class="far fa-thumbs-up interactive_btn mx-1" title="喜欢"></i>
										{% if item.user._id.toString() == ctx.user._id.toString() %}
										<i class="far fa-edit interactive_btn mx-1" title="编辑" onclick="onEditReply('{{ ctx.params.id }}','{{ item._id }}')"></i>
										<i class="far fa-trash-alt interactive_btn mx-1" title="删除" onclick="onDelReply('{{ ctx.params.id }}', '{{ item._id }}')"></i>
										{% endif %}
										<i class="fas fa-reply interactive_btn mx-1" title="回复"></i>
									</div>
								</div>
								<div class="pl-2">
									{{ item.content | safe }}
								</div>
							</div>
						</div>
					</li>
				{% endfor %}
			{% else %}
					<li class="list-group-item border-left-0 border-right-0 border-top-1 border-bottom-0 rounded-0"><small>暂无回复</small></li>
			{% endif %}
		</ul>
	{% endset %}
	{{ repliesPanel.init(replies.length + ' 回复', repliesModule) }}

	<!-- 添加回复面板 -->
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