function checkForm(formId, textareaId) {
	let form = document.getElementById(formId);
	console.log(textareaId)
	if (textareaId) {
		let tt = document.getElementById(textareaId);
		console.log('set inner')
		tt.innerHtml = (editor.codemirror.getValue());
	}
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
  	// if (textareaId) $(`#textareaId`).text('');
  }
  form.classList.add('was-validated');
}