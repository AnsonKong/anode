const avatarMaxSize = 1024 * 1024;
const cropMaxSize = 400;
let jcropApi;
function uploadAvatar(imgEle) {
  const formData = new FormData();
  // Attach file
  const size = $('input[type=file]')[0].files[0].size;
  if (size > avatarMaxSize) {
    $('#myAvatarTip').removeClass('invisible');
    $('#myAvatarTip').addClass('visible');
    return;
  }
  // 弹出模态窗口
  $('#myModal').modal({
    backdrop: 'static',
  });
  // 初始化Jcrop
  $('#myCrop').Jcrop({
      boxWidth: cropMaxSize,
      boxHeight: cropMaxSize,
      bgColor: 'white',
      bgOpacity: .5,
      aspectRatio: 1
  }, function() {
    jcropApi = this;
    const w = $('#myCrop')[0].width;
    const h = $('#myCrop')[0].height;
    if (w !== h) {
      const cropInitSize = Math.min(w, h);
      const cropX = (w - cropInitSize) * .5;
      const cropY = (h - cropInitSize) * .5;
      jcropApi.setSelect([cropX, cropY, cropInitSize, cropInitSize]);
    }
  });
  return;
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
  const keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}