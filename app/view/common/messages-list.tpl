<ul class="list-group">
	{% if messages.length %}
  	{% for item in messages %}
      {% set senderUrl = '/user/' + item.sender.username %}
      {% set topicUrl = '/topic/' + item.reply.topic.id + '?msg=' + item.id + '#' + item.reply.id %}
      {% set topicTitle = helper.decodeBase64(item.reply.topic.title) %}
        <li class="list-group-item border-left-0 border-right-0 border-bottom-1 rounded-0">
      {% if item.type == '0' %}
          <a href="{{senderUrl}}" target="_blank">{{ item.sender.username }}</a>回复了你的话题<a href="{{topicUrl}}" target="_blank">{{topicTitle}}</a>
      {% else %}
    			<a href="{{senderUrl}}" target="_blank">{{ item.sender.username }}</a>在话题<a href="{{topicUrl}}" target="_blank">{{topicTitle}}</a>中的回复<a href="{{topicUrl}}" target="_blank">提到了你</a>
    	{% endif %}
    		</li>
  	{% endfor %}
  {% else %}
  	<li class="list-group-item border-left-0 border-right-0 border-bottom-1 rounded-0">暂无消息</li>
  {% endif %}
</ul>