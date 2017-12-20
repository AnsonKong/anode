<ul class="list-group">
	{% macro init(list) %}
		{% for item in list %}
			<li class="list-group-item list-group-item-action border-left-0 border-right-0 border-bottom-1 rounded-0">
				<div class="row align-items-center">
					<div class="col-auto">
						<a href="/user/{{ item.user._id }}"><img class="replyAvatar rounded" src="{{ item.user.avatar }}"></a>
					</div>
					<div class="col-auto">
						<small>{{ item.reply_account }} / {{ item.view_account }}</small>
					</div>
					<div class="col-auto">
						<a href="/topic/{{ item._id }}">{{ item.title }}</a>
					</div>
					<div class="col-auto ml-auto">
						<small class="text-muted">{{ item.fromNow }}</small>
					</div>
				</div>
			</li>
		{% endfor %}
	{% endmacro %}
</ul>