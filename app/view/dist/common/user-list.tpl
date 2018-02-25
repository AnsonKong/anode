{% macro init(list, helper, ctx, keyword = "") %}
<ul class="list-group">
	{% for item in list %}
		<li class="list-group-item list-group-item-action border-top-0 border-left-0 border-right-0 border-bottom-1 rounded-0 m-0">
			<a href="/user/{{ item.username }}" class="mr-2">
				<img class="reply-avatar rounded" src="{{ helper.parseAvatar(item.avatar) }}">
			</a>
			<a href="/user/{{ item.username }}">{{ helper.highlight(item.username, keyword, helper) | safe }}</a>
		</li>
	{% endfor %}
</ul>
{% endmacro %}