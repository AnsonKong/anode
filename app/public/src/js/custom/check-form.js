'use strict';
function checkForm(formId, textareaId, targetEditor) {
  const form = document.getElementById(formId);
  if (textareaId) {
    const tt = document.getElementById(textareaId);
    if (!targetEditor) targetEditor = editor;
    tt.value = (targetEditor.codemirror.getValue());
  }
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    return false;
  }

  return true;
}
