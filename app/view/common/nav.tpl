<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container justify-content-center d-flex flex-column flex-lg-row">
        <a class="navbar-brand" href="/">ANode</a>

        <form class="form-inline" method="GET" action="/search">
          <input class="form-control mr-2" style="width: auto;" name="q" type="search" placeholder="请输入关键字">
          <input class="btn btn-outline-light pointer" type="submit" value="搜索">
        </form>

        <ul class="navbar-nav ml-lg-auto flex-row">
            {% if ctx.user %}
            <span class="navbar-text d-none d-lg-block">
              欢迎回来，
            </span>
            <li class="nav-item mr-2 mr-lg-0 d-none d-lg-block">
                <a class="nav-link" href="/user/{{ ctx.user.username }}">{{ ctx.user.username }}</a>
            </li>
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/user/{{ ctx.user.username }}"><img class="my-avatar nav-avatar rounded" src="{{ helper.parseAvatar(ctx.user.avatar) }}"></a>
            </li>
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/messages">未读消息
                    {% if helper.getNewMessagesLength(ctx.user.messages) %}
                     <span class="badge badge-danger">{{ helper.getNewMessagesLength(ctx.user.messages) }}</span>
                    {% endif %}
                </a>
            </li>
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/topic/create">发布话题</a>
            </li>
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/setting">设置</a>
            </li>
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/about">关于</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/signout">退出</a>
            </li>
            {% else %}
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/about">关于</a>
            </li>
            <li class="nav-item mr-2 mr-lg-0">
                <a class="nav-link" href="/signin">登录</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/signup">注册</a>
            </li>
            {% endif %}
        </ul>
        
    </div>
</nav>