<div class="container bg-white p-0 mt-3 rounded-top">
	<div class="p-2 rounded-top" style="background-color: #f6f6f6"><small>{{ title }}</small></div>
	<ul class="list-group">
		{% for item in list %}
			<li class="list-group-item list-group-item-action border-left-0 border-right-0 border-bottom-1">
				<a href="/topic/{{ item._id }}">{{ item.title }}</a>
			</li>
		{% endfor %}
	</ul>
	{% block tail %}{% endblock %}
</div>