<link rel="stylesheet" href="http://lab.lepture.com/editor/editor.css" />
<script type="text/javascript" src="http://lab.lepture.com/editor/editor.js"></script>
<script type="text/javascript" src="http://lab.lepture.com/editor/marked.js"></script>
<script type="text/javascript">
	let selectedEditor;
	/** 输入链接信息 */
	function drawLink(editor) {
		selectedEditor = editor;
		// 弹出模态窗口
	  $('#myLinkModal').modal({
	    backdrop: 'static',
	  });
	  $('#modalTitle').val('');
	  $('#modalLink').val('http://');
	}
	/** 上传图片 */
	function drawImage(editor) {
		selectedEditor = editor;
	  $('#myImageModal').modal({
	    backdrop: 'static',
	  });
	}
	/** 保存链接 */
	function saveLink() {
		const replacement = `[${$('#modalTitle').val()}](${$('#modalLink').val()})`;
		selectedEditor.codemirror.doc.replaceSelection(replacement);
		$('#myLinkModal').modal('hide');
	}
	Editor.toolbar[7] =  { name: 'link', action: drawLink };
	Editor.toolbar[8] =  { name: 'image', action: drawImage };
</script>