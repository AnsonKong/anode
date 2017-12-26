<ul class="list-group">
	{% if messages.length %}
  	{% for item in messages %}
    		<li class="list-group-item border-left-0 border-right-0 border-bottom-1 rounded-0">
    	{% if item.type == '0' %}
    			<a href="/user/{{item.sender.username}}">{{ item.sender.username }}</a>回复了你的话题<a href="/topic/{{item.reply.topic.id}}?msg={{item.id}}#{{item.reply.id}}">{{ helper.decodeBase64(item.reply.topic.title) }}</a>
    	{% else %}
    			<a href="/user/{{item.sender.username}}">{{ item.sender.username }}</a>在话题<a href="/topic/{{item.reply.topic.id}}">{{ helper.decodeBase64(item.reply.topic.title) }}</a>中的回复<a href="/topic/{{item.reply.topic.id}}?msg={{item.id}}#{{item.reply.id}}">提到了你</a>
    	{% endif %}
    		</li>
  	{% endfor %}
  {% else %}
  	<li class="list-group-item border-left-0 border-right-0 border-bottom-1 rounded-0">暂无消息</li>
  {% endif %}
</ul>