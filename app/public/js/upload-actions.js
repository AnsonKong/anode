function uploadAvatar(imgEle) {
  var formData = new FormData();
  // Attach file
  formData.append('image', $('input[type=file]')[0].files[0]);

  $.ajax({
    url: '/upload?_csrf=' + getCsrf(),
    data: formData,
    method: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    success: function(result) {
      imgEle.src = result.url;
    },
    error: function(responseStr) {
      alert("error", responseStr);
    }
  });
}

function getCsrf() {
  var keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}