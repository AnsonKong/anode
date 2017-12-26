<nav class="navbar navbar-expand navbar-dark bg-dark">
  <div class="container">
      
      <a class="navbar-brand" href="/">ANode</a>

      <div class="collapse navbar-collapse">

        <form class="form-inline ">
          <input class="form-control mr-2" type="search" placeholder="请输入关键字">
          <a class="btn btn-outline-light" href="#">搜索</a>
        </form>

        <ul class="navbar-nav ml-auto">
        	{% if ctx.user %}
        	<span class="navbar-text">
    		  欢迎回来，
    		</span>
            <li class="nav-item">
                <a class="nav-link" href="/user/{{ ctx.user.username }}">{{ ctx.user.username }}</a>
            </li>
        	<li class="nav-item">
                <a class="nav-link" href="/user/{{ ctx.user.username }}"><img class="nav-avatar rounded" src="{{ helper.parseAvatar(ctx.user.avatar) }}"></a>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" href="/messages">未读消息
                    {% if helper.getNewMessagesLength(ctx.user.messages) %}
                     <span class="badge badge-danger">{{ helper.getNewMessagesLength(ctx.user.messages) }}</span>
                    {% endif %}
                </a>
            </li>
            <li class="nav-item">
        		<a class="nav-link" href="/topic/create">发布话题</a>
        	</li>
            <li class="nav-item">
                <a class="nav-link" href="/setting">设置</a>
            </li>
        	<li class="nav-item">
        		<a class="nav-link" href="/signout">退出</a>
        	</li>
        	{% else %}
        	<li class="nav-item">
        		<a class="nav-link" href="/signin">登录</a>
        	</li>
        	<li class="nav-item">
        		<a class="nav-link" href="/signup">注册</a>
        	</li>
        	{% endif %}
        </ul>
      </div>

  </div>
</nav>