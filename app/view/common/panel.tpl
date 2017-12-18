{% macro init(title, content) %}
	<div class="container bg-white p-0 mt-3 rounded-top">
		<div class="p-2 rounded-top" style="background-color: #f6f6f6"><small>{{ title }}</small></div>
		{{ content | safe }}
	</div>
{% endmacro %}