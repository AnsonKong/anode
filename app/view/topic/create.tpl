<!DOCTYPE html>
<html>
	<head>
		<title>发布话题</title>
		{% include '../common/bootstrap.css.tpl' %}
		{% include '../common/lepture.editor.tpl' %}
	</head>
	<body>
		{% include '../common/nav.tpl' %}
		<div class="container mt-2">
			<form id="myForm" method="post" action="/topic/create">
				<div class="form-group">
					<label>版块：</label>
					<select class="form-control" name="category">
			      <option value="0">分享</option>
			      <option value="1">问答</option>
			      <option value="2">招聘</option>
			    </select>
				</div>
				<div class="form-group">
					<label>标题：</label>
					<input class="form-control" type="text" name="title" placeholder="标题字数10字以上">
				</div>
				<div class="form-group">
					<label>正文：</label>
					<textarea name="content"></textarea>
				</div>
				<div class="form-group">
			    <a class="btn btn-primary" onclick="$('#myForm').submit()" href="#">发布</a>
			  </div>
			</form>
		</div>
		
		<script type="text/javascript">
			var editor = new Editor();
			editor.render();
		</script>
		{% include '../common/bootstrap.js.tpl' %}
	</body>
</html>