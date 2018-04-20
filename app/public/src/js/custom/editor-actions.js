'use strict';
let selectedEditor;
// 弹出输入链接信息
function drawLink(editor) {
  selectedEditor = editor;
  // 弹出模态窗口
  $('#myLinkModal').modal({
    backdrop: 'static',
  });
  $('#modalTitle').val('');
  $('#modalLink').val('http://');
}
// 保存链接
function saveLink() {
  $('#myLinkModal').modal('hide');
  const replacement = `[${$('#modalTitle').val()}](${$('#modalLink').val()})`;
  insertEditorText(replacement);
}
// 插入文本
function insertEditorText(val) {
  selectedEditor.codemirror.doc.replaceSelection(val, 'end');
  selectedEditor.codemirror.focus();
}

// 弹出上传图片
function drawImage(editor) {
  selectedEditor = editor;
  $('#myImageModal').modal({
    backdrop: 'static',
  });
  $('#myImageModal input[type=file]').val('');
}
// 上传图片
function uploadImage() {
  const formData = new FormData();
  formData.append('image', $('#myImageModal input[type=file]')[0].files[0]);
  $.ajax({
    url: '/upload/topic/img?_csrf=' + getCsrf(),
    data: formData,
    method: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    success(result, textStatus, xhr) {
      if (result.code === 0) {
        $('#myImageModal').modal('hide');
        const replacement = `![${result.data}](${result.data})`;
        insertEditorText(replacement);
      } else {
        $('.upload-img-fail').show();
        $('.upload-img-fail').text(result.msg);
        $('.upload-img-success').hide();
      }
    },
    error(responseStr) {
      alert('error', responseStr);
    },
  });
}
Editor.toolbar[7] = { name: 'link', action: drawLink };
Editor.toolbar[8] = { name: 'image', action: drawImage };
