{% extends "../common/common.tpl" %}
{% block title %}{{ topic.title }}{% endblock %}
{% block customHead %}
	{% include '../common/lepture-editor.tpl' %}
	<script type="text/javascript" src="/public/js/custom/check-form-bb73c63751.js"></script>
	<script type="text/javascript" src="/public/js/third-party/xss.js"></script>
	{% include '../common/font-awesome.tpl' %}
	{% include '../common/topic-management.tpl' %}
	<style type="text/css">
		#topicHead small:before {
			content: "• ";
		}
		.CodeMirror {
		  height: 160px;
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
		.at-item:hover{
			color: white;
			background-color: rgb(51, 102, 255);
		}
	</style>
{% endblock %}
{% block content %}
	<div class="container rounded-top bg-light p-0">
		<!-- 回复历史悬浮 -->
		<ul id="replies-history-list" class="list-group" style="position: absolute; z-index: 100; max-width: 300px; min-width: 130px;  display: none;">
		</ul>
		<!-- 话题面板 -->
		<div id="topicHead" class="px-2 pt-3 pb-0">
			{% if topic.top %}
			<div class="d-inline bg-success text-white p-1" style="font-size: 12px">置顶</div>
			{% endif %}
			{% if topic.good %}
			<div class="d-inline bg-success text-white p-1" style="font-size: 12px">精华</div>
			{% endif %}
			<h4 class="my-2"><b>{{ topic.title }}</b></h4>
			<div class="d-flex flex-column flex-lg-row">
				<!-- left -->
				<div class="mr-auto">
			  	<small class="text-muted">发布于 {{ helper.fromNow(topic.created_time) }}</small>
			  	<small class="text-muted">作者 <a class="text-muted" href="/user/{{ topic.user.username }}">{{ topic.user.username }}</a></small>
			  	<small class="text-muted">{{ topic.view_account }} 次浏览</small>
			  	<small class="text-muted">来自 {{ helper.parseCategory(topic) }}</small>
				</div>
				<!-- right -->
				<div class="d-flex justify-content-end align-items-end mt-2 mt-lg-0">
					{% if topic.user.id == ctx.user.id %}
						<i class="far fa-edit interactive_btn ml-2" title="编辑" onclick="onEditTopic('{{ ctx.params.id }}')"></i>
						<i class="far fa-trash-alt interactive_btn ml-2" title="删除" onclick="onDelTopic('{{ ctx.params.id }}')"></i>
					{% endif %}
					{% if ctx.user %}
						{% if ctx.user.admin %}
							<!-- 设为置顶 -->
							<button id="myTopBtn" class="ml-2 btn btn-sm {{'btn-muted' if topic.top else 'btn-primary'}} pointer" onclick="onSetTopTopic('{{ topic.id }}')">{{'取消置顶' if topic.top else '置顶'}}</button>
							<!-- 设为精华 -->
							<button id="myGoodBtn" class="ml-2 btn btn-sm {{'btn-muted' if topic.good else 'btn-primary'}} pointer" onclick="onSetGoodTopic('{{ topic.id }}')">{{'取消精华' if topic.good else '精华'}}</button>
						{% endif %}
						<!-- 收藏按钮 -->
						{% if topic.user.id != ctx.user.id %}
							{% set isCollected = (ctx.user.collections.indexOf(topic.id) != -1) %}
							<button id="myCollectBtn" class="ml-2 btn btn-sm {{'btn-muted' if isCollected else 'btn-primary'}} pointer" onclick="onCollectTopic('{{ topic.id }}')">{{'取消收藏' if isCollected else '收藏'}}</button>
						{% endif %}
					{% endif %}
				</div>
			</div>
		</div>
		<hr class="my-2">
		<div class="p-3 restrict-content">
			{{ helper.shtml(helper.parseMarkdown(topic.content)) }}
		</div>
	</div>
	<!-- 回复面板 -->
	{% import '../common/panel.tpl' as panel %}
	{% set repliesModule %}
	<ul id="topicReplies" class="list-group">
		{% if replies.length %}
		{% for item in replies %}
		<li id="{{ item.id }}" {{ ('parent-id=' + item.parent) if item.parent else '' }}  class="list-group-item border-left-0 border-right-0 border-top-1 border-bottom-0 rounded-0 p-2">
				<div class="d-flex flex-column">
					<!-- row 1 -->
					<div class="d-flex align-items-center">
						<a class="reply-avatar-container mr-2" href="/user/{{ item.user.username }}">
							<img class="reply-avatar rounded" src="{{ helper.parseAvatar(item.user.avatar) }}">
						</a>
						<span class="mr-auto">
							<small><b><a class="reply-username text-dark dumb-text" href="/user/{{ item.user.username }}">{{ item.user.username }}</a></b></small>
							<small><a href="#{{ item.id }}">{{ loop.index }}楼•{{ helper.fromNow(item.created_time) }}</a></small>
							{% if item.user.id === topic.user.id %}
								<small class="d-inline p-1 text-white bg-success">作者</small>
							{% endif %}
						</span>
						<!-- 最右侧工具 -->
						<div class="d-flex align-items-center">
							{% if ctx.user %}
							<i class="{{ 'far' if item.likes.indexOf(ctx.user.id) == -1 else 'fas' }} fa-thumbs-up interactive_btn mx-1" title="喜欢" onclick="onLikeReply('{{ item.id }}')"></i>
								<span id="like_text_{{ item.id }}" class="{{ 'd-none' if item.likes.length == 0 else '' }}">{{ item.likes.length }}</span>
								{% if item.user.id == ctx.user.id %}
								<i class="far fa-edit interactive_btn mx-1" title="编辑" onclick="onEditReply('{{ item.id }}')"></i>
								<i class="far fa-trash-alt interactive_btn mx-1" title="删除" onclick="onDelReply('{{ item.id }}', '{{ topic.id }}')"></i>
								{% endif %}
								<i class="fas fa-reply interactive_btn mx-1" title="回复" onclick="onUserReply('{{ item.id }}', '{{ topic.id }}', '{{ item.user.username }}')"></i>
							{% endif %}
						</div>
					</div>
					<!-- row 2 -->
					<div class="pl-0 pl-lg-4">
						<div class="reply-content restrict-content p-2">
							{{ helper.shtml(helper.parseMarkdown(item.content)) }}
						</div>
						<!-- editor container -->
						<div id="userReplyContainer_{{ item.id }}">
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
	<div class="my-3">
		{{ panel.init(replies.length + ' 回复', repliesModule) }}
	</div>

	<!-- 添加回复面板 -->
	{% set newReplyModule %}
	<div class="border-0 p-2">
		<form id="myForm" method="post" action="/topic/{{ ctx.params.id }}/reply" novalidate>
			<div class="form-group" style="position: relative;">
				<textarea id="myTextarea" class="form-control" name="content" required></textarea>
				<div class="invalid-feedback">
					请正确填写回复内容，要求字数1字以上。
				</div>
			</div>
			<div class="form-group">
		    <button class="btn btn-primary" style="cursor: pointer;" onclick="checkForm('myForm', 'myTextarea')" type="submit">回复</button>
		  </div>
		</form>
	</div>
	{% endset %}
	{{ panel.init('添加回复', newReplyModule) }}
{% endblock %}
{% block customTail %}
	<link rel="stylesheet" type="text/css" href="/public/css/custom/editor-at-triggering-list-ea9907a010.css">
	<script type="text/javascript" src="/public/js/custom/editor-at-triggering-list-892f3a6a2d.js"></script>
	<script type="text/javascript" src="/public/js/custom/topic-replies-history-b4fc5a77f4.js"></script>
	<script type="text/javascript">
		const editor = new Editor({
			element: $('#myTextarea')[0],
			status: false,
		});
		editor.render();
		// 计算可回复用户的名字
		let replyUsernamesArr = $('.reply-username');
		let replyUsernamesSet;
		if (replyUsernamesArr.length) {
			replyUsernamesSet = new Set();
			for(let i = 0;i < replyUsernamesArr.length;i++) {
				replyUsernamesSet.add(replyUsernamesArr[i].innerHTML);
			}
		}
		if (replyUsernamesSet) {
			const triggerList = new EditorCharTriggeringList(editor.codemirror, replyUsernamesSet);
			triggerList.activate();
		}
	</script>
{% endblock %}

{% block topLayer %}
	{% include '../common/editor-popup-modal.tpl' %}
{% endblock %}