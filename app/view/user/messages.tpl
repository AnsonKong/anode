{% extends "../common/common.tpl" %}
{% block title %}{{ title }}{% endblock %}
{% block customHead %}
	{% include '../common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    <ul class="list-group">
    	{% for item in newMessages %}
	    		<li class="list-group-item border-left-0 border-right-0 border-bottom-1 rounded-0">
	    	{% if item.type == '0' %}
	    			<a href="/user/{{item.sender.username}}">{{ item.sender.username }}</a>回复了你的话题<a href="/topic/{{item.topic.id}}">{{ helper.decodeBase64(item.topic.title) }}</a>
	    	{% else %}
	    			<a href="/user/{{item.sender.username}}">{{ item.sender.username }}</a>在话题<a href="/topic/{{item.reply.topic.id}}">{{ helper.decodeBase64(item.reply.topic.title) }}</a>中的<a href="/topic/{{item.reply.topic.id}}#{{item.reply.id}}">回复</a>提到了你
	    	{% endif %}
	    		</li>
    	{% endfor %}
    </ul>
	{% endset %}
	{{ myPanel.init('新消息', module) }}


	{% import '../common/panel.tpl' as myPanel %}
	{% set module %}
    <ul class="list-group">
    	{% for item in oldMessages %}
	    		<li class="list-group-item border-left-0 border-right-0 border-bottom-1 rounded-0">
	    	{% if item.type == '0' %}
	    			<a href="/user/{{item.sender.username}}">{{ item.sender.username }}</a>回复了你的话题<a href="/topic/{{item.topic.id}}">{{ helper.decodeBase64(item.topic.title) }}</a>
	    	{% else %}
	    			<a href="/user/{{item.sender.username}}">{{ item.sender.username }}</a>在话题<a href="/topic/{{item.reply.topic.id}}">{{ helper.decodeBase64(item.reply.topic.title) }}</a>中的<a href="/topic/{{item.reply.topic.id}}#{{item.reply.id}}">回复</a>提到了你
	    	{% endif %}
	    		</li>
    	{% endfor %}
    </ul>
	{% endset %}
	{{ myPanel.init('旧消息', module) }}
{% endblock %}