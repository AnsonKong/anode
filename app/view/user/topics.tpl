{% extends "../common/common.tpl" %}
{% block title %}用户主页{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    {% from '../common/topicList.tpl' import init %}
    {{ init(topics) }}
	{% endset %}
	{{ myPanel.init(user.email +'创建的话题', module) }}
{% endblock %}