<ul class="list-group">
	{% macro init(list) %}
		{% for item in list %}
			<li class="list-group-item list-group-item-action border-left-0 border-right-0 border-bottom-1 rounded-0">
				<div class="d-flex justify-content-between align-items-center">
					<a class="pr-auto" href="/topic/{{ item._id }}">{{ item.title }}</a>
					<small class="text-muted">{{ item.fromNow }}</small>
				</div>
			</li>
		{% endfor %}
	{% endmacro %}
</ul>