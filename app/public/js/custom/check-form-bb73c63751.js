function checkForm(formId, textareaId, targetEditor) {
	let form = document.getElementById(formId);
	if (textareaId) {
		let tt = document.getElementById(textareaId);
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