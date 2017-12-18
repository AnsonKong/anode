<ul class="list-group">
	{% macro init(list) %}
		{% for item in list %}
			<li class="list-group-item list-group-item-action border-left-0 border-right-0 border-bottom-1 rounded-0">
				<a href="/topic/{{ item._id }}">{{ item.title }}</a>
			</li>
		{% endfor %}
	{% endmacro %}
</ul>