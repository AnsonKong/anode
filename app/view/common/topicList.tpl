{% macro init(list, helper, ctx, canEdit = false, showBorderLeft = false) %}
<ul class="list-group">
	{% for item in list %}
		<li class="list-group-item list-group-item-action border-top-0 border-left-{{'1' if showBorderLeft else '0'}} border-right-0 border-bottom-1 rounded-0 m-0">
			{% set topic = item %}
			<div class="d-flex flex-nowrap">
					<!-- left -->
					<div class="d-flex align-items-center">
						<a href="/user/{{ topic.user.username }}"><img class="replyAvatar rounded" src="{{ helper.parseAvatar(topic.user.avatar) }}"></a>
						<small class="text-center" style="width: 80px;">{{ topic.reply_account }} / {{ topic.view_account }}</small>
						{% if item.top %}
							<div class="d-inline bg-success text-white p-1 mr-1" style="font-size: 12px">置顶</div>
						{% endif %}
						{% if item.good %}
							<div class="d-inline bg-success text-white p-1 mr-1" style="font-size: 12px">精华</div>
						{% endif %}
						<div class="d-inline bg-dark text-white p-1" style="font-size: 12px">{{ helper.parseCategory(item) }}</div>
					</div>
					<!-- middle, will count the fixed width -->
					<div class="col text-truncate mr-auto align-items-center">
						<a title="{{ helper.decodeBase64(topic.title) }}" href="/topic/{{ topic.id }}">{{ helper.decodeBase64(topic.title) }}</a>
					</div>
					<!-- right -->
					<div class="d-none d-lg-flex align-items-center">
						{% if canEdit and topic.user.id == ctx.user.id %}
						<i class="far fa-edit interactive_btn mx-2" title="编辑" onclick="onEditTopic('{{ topic.id }}')"></i>
						<i class="far fa-trash-alt interactive_btn ml-2" title="删除" onclick="onDelTopic('{{ topic.id }}')"></i>
						{% endif %}
						{% if item.last_reply %}
						<a class="ml-3" href="/topic/{{ item.id }}#{{ item.last_reply.id }}"><img class="replyAvatar rounded" src="{{ helper.parseAvatar(item.last_reply.user.avatar) }}"></a>
						{% endif %}
						<small class="text-muted text-right ml-3" style="width: 60px;">{{ helper.fromNow((item.last_reply if item.last_reply else item).created_time) }}</small>
					</div>
			</div>
		</li>
	{% endfor %}
</ul>
{% endmacro %}