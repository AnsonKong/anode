{% extends "../common/common.tpl" %}
{% block title %}用户主页{% endblock %}
{% block content %}
	<div class="container bg-white p-0 mt-3">
		<div class="p-2 bg-light text-dark">{{ user.email }}创建的话题</div>
		<ul class="list-group p-2">
			{% for item in topics %}
				<li class="list-group-item list-group-item-action border-0">
					<a href="/topic/{{ item._id }}">{{ item.title }}</a>
				</li>
			{% endfor %}
		</ul>
		
	</div>
{% endblock %}