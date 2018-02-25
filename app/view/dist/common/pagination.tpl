{% macro init(ctx, helper, pagination, step = 1) %}
<nav>
  <ul class="pagination m-0">
    <li class="page-item {{ 'disabled' if pagination.currentPage == 1 else '' }}">
      <a class="page-link" href="{{ helper.addQuery(ctx, 'page', 1) }}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>

    {% set startPage = pagination.currentPage - step %}
    {% set startOut = (1 - startPage) if (startPage < 1) else 0 %}

    {% set endPage = pagination.currentPage + step + startOut %}
    {% set endOut =  (endPage - pagination.totalPage) if (endPage > pagination.totalPage) else 0 %}

    {% set startPage = startPage - endOut %}

    {% if startPage > 1 %}
    <span class="page-link">...</span>
    {% endif %}

    {% for i in range(startPage, endPage + 1) %}
    	{% if i >= 1 and i <= pagination.totalPage %}
	    {% set isActive = (pagination.currentPage == i) %}
	    <li class="page-item {{ 'active' if isActive else '' }}">
	    	{% if isActive %}
	    	<span class="page-link">{{ i }}</span>
	    	{% else %}
	    	<a class="page-link" href="{{ helper.addQuery(ctx, 'page', i) }}">{{ i }}</a>
	    	{% endif %}
	    </li>
	    {% endif %}
    {% endfor %}

    {% if endPage < pagination.totalPage %}
    <span class="page-link">...</span>
    {% endif %}

    <li class="page-item {{ 'disabled' if (not pagination.totalPage or pagination.currentPage == pagination.totalPage) else '' }}">
      <a class="page-link" href="{{ helper.addQuery(ctx, 'page', pagination.totalPage) }}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
{% endmacro %}