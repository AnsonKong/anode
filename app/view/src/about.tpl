{% extends "./common/common.tpl" %}
{% block title %}关于{% endblock %}
{% block customHead %}
	{% include './common/topic-management.tpl' %}
{% endblock %}
{% block content %}
	{% import './common/panel.tpl' as panel %}
	{% set module %}
		<div class="p-3">
			<h3 class="pb-1" style="border-bottom: 1px solid #eee;">关于</h3>
			<p>
				ANode 社区以 <a target="_blank" href="https://cnodejs.org">CNode 社区</a> 为原型，由 <a target="_blank" href="https://github.com/AnsonKong">@AnsonKong</a> 独立完成开发，有问题请与我联系。
			</p>
			<p>
				<a target="_blank" href="https://github.com/AnsonKong/anode">项目地址</a>，欢迎大家Star。
			</p>

			<h3 class="pb-1" style="border-bottom: 1px solid #eee;">友情链接</h3>
			<p>
				<ul>
					<li>
						<a target="_blank" href="https://cnodejs.org/">CNode 社区</a>
					</li>
					<li>
						<a target="_blank" href="https://eggjs.org/">Egg.js 为企业级框架和应用而生</a>
					</li>
					<li>
						<a target="_blank" href="https://www.aliyun.com/product/ecs">阿里云服务器 ECS（Elastic Compute Service）</a>
					</li>
				</ul>
			</p>
		</div>
	{% endset %}
	{{ panel.init('关于', module) }}
{% endblock %}