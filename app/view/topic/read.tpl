{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/lepture.editor.tpl' %}
	{% include '../common/font-awesome.tpl' %}
	{% include '../common/topic-management.tpl' %}
	<style type="text/css">
		#topicHead small:before {
			content: "• ";
		}
		.CodeMirror {
		  height: 160px;
		}
	</style>
{% endblock %}
{% block content %}
	<div class="container rounded-top bg-light mt-3 p-0">
		<!-- 话题面板 -->
		<div id="topicHead" class="p-2 pt-4">
			<h4><b>{{ helper.decodeBase64(topic.title) }}</b></h4>
	  	<small class="text-muted">发布于 {{ helper.fromNow(topic.created_time) }}</small>
	  	<small class="text-muted">作者 <a class="text-muted" href="/user/{{ topic.user.id }}">{{ topic.user.username }}</a></small>
	  	<small class="text-muted">{{ topic.view_account }} 次浏览</small>
	  	<small class="text-muted">来自 {{ helper.parseCategory(topic.category) }}</small>
			{% if topic.user.id == ctx.user.id %}
			<i class="far fa-edit interactive_btn mx-1" title="编辑" onclick="onEditTopic('{{ ctx.params.id }}')"></i>
			<i class="far fa-trash-alt interactive_btn mx-1" title="删除" onclick="onDelTopic('{{ ctx.params.id }}')"></i>
			{% endif %}
		</div>
		<hr class="my-2">
		<div class="p-3">{{ helper.parseMarkdown(helper.decodeBase64(topic.content)) | safe }}</div>
	</div>
	<!-- 回复面板 -->
	{% import '../common/panel.tpl' as repliesPanel %}
	{% set repliesModule %}
	<ul id="topicReplies" class="list-group">
		{% if replies.length %}
		{% for item in replies %}
		<li id="{{ item.id }}" class="list-group-item border-left-0 border-right-0 border-top-1 border-bottom-0 rounded-0 p-2">
			<div class="row">
				<!-- 头像 -->
				<div class="col-auto">
					<a href="/user/{{ item.user.id }}">
						<img class="replyAvatar rounded" src="{{ helper.parseAvatar(item.user.avatar) }}">
					</a>
				</div>
				<!-- 第二列 -->
				<div class="col pl-0 d-flex flex-column">
					<div class="d-flex">
						<span class="mr-auto">
							<small><b><a class="text-dark dumbText" href="/user/{{ item.user.id }}">{{ item.user.username }}</a></b></small>
							<small><a href="#{{ item.id }}">{{ loop.index }}楼•{{ helper.fromNow(item.created_time) }}</a></small>
							{% if item.user.id === topic.user.id %}
								<small class="d-inline p-1 text-white bg-success">作者</small>
							{% endif %}
						</span>
						<!-- 最右侧工具 -->
						<div class="d-flex align-items-center">
							<i class="{{ 'far' if item.likes.indexOf(ctx.user.id) == -1 else 'fas' }} fa-thumbs-up interactive_btn mx-1" title="喜欢" onclick="onLikeReply('{{ item.id }}')"></i>
							<span id="like_text_{{ item.id }}" class="{{ 'd-none' if item.likes.length == 0 else '' }}">{{ item.likes.length }}</span>
							{% if item.user.id == ctx.user.id %}
							<i class="far fa-edit interactive_btn mx-1" title="编辑" onclick="onEditReply('{{ item.id }}')"></i>
							<i class="far fa-trash-alt interactive_btn mx-1" title="删除" onclick="onDelReply('{{ item.id }}')"></i>
							{% endif %}
							<i class="fas fa-reply interactive_btn mx-1" title="回复"></i>
						</div>
					</div>
					<div class="pl-2">
						{{ helper.parseMarkdown(helper.decodeBase64(item.content)) | safe }}
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