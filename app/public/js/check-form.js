function checkForm(formId, textareaId) {
	let form = document.getElementById(formId);
	if (textareaId) {
		let tt = document.getElementById(textareaId);
		tt.value = (editor.codemirror.getValue());
	}
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
  	// if (textareaId) $(`#textareaId`).text('');
  }
  form.classList.add('was-validated');
}