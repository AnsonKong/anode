<ul class="list-group">
	{% macro init(list, helper, ctx, canEdit = false) %}
		{% for item in list %}
			<li class="list-group-item list-group-item-action border-left-0 border-right-0 border-bottom-1 rounded-0">
				{% set topic = item %}
				<div class="row">
					<!-- left -->
					<div class="col-auto mr-auto d-flex align-items-center">
						<a href="/user/{{ topic.user.id }}"><img class="replyAvatar rounded" src="{{ helper.parseAvatar(topic.user.avatar) }}"></a>
						<small class="text-center" style="width: 80px;">{{ topic.reply_account }} / {{ topic.view_account }}</small>
						<a href="/topic/{{ topic.id }}">{{ helper.decodeBase64(topic.title) }}</a>
					</div>
					<!-- right -->
					<div class="col-auto d-flex align-items-center">
							{% if canEdit and topic.user.id == ctx.user.id %}
							<i class="far fa-edit interactive_btn mx-2" title="编辑" onclick="onEditTopic('{{ topic.id }}')"></i>
							<i class="far fa-trash-alt interactive_btn ml-2" title="删除" onclick="onDelTopic('{{ topic.id }}')"></i>
							{% endif %}
							{% if item.last_reply %}
							<a class="ml-3" href="/topic/{{ item.id }}#{{ item.last_reply.id }}"><img class="replyAvatar rounded" src="{{ helper.parseAvatar(item.last_reply.user.avatar) }}"></a>
							{% endif %}
							<small class="text-muted text-right ml-3">{{ helper.fromNow((item.last_reply if item.last_reply else item).created_time) }}</small>
					</div>
				</div>
			</li>
		{% endfor %}
	{% endmacro %}
</ul>