'use strict';
const avatarMaxSize = 1024 * 1024;
const cropMaxSize = 400;
let jcropApi;
// 上传需要裁剪的图片
function uploadAvatar() {
  // Attach file
  const size = $('input[type=file]')[0].files[0].size;
  if (size > avatarMaxSize) {
    $('.avatar-fail').show();
    $('.avatar-fail').text('图片大小不得大于1MB。');
    $('.avatar-success').hide();
    return;
  }
  // 先验证图片合法性，再进行裁剪操作
  const formData = new FormData();
  formData.append('image', $('input[type=file]')[0].files[0]);
  $.ajax({
    url: '/upload/avatar/validate?_csrf=' + getCsrf(),
    data: formData,
    method: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    success(result, textStatus, xhr) {
      if (result.code === 0) {
        popupModal(result.data);
      } else {
        $('.avatar-fail').show();
        $('.avatar-fail').text(result.msg);
        $('.avatar-success').hide();
      }
    },
    error(responseStr) {
      alert('error', responseStr);
    },
  });
}
// 设置裁剪图片的URL
function popupModal(avatarUrl) {
  // 弹出模态窗口
  $('#myModal').modal({
    backdrop: 'static',
  });
  // 设置<img>.src
  $('#myCrop').attr('src', avatarUrl);
  // 初始化Jcrop
  $('#myCrop').Jcrop({
    boxWidth: cropMaxSize,
    boxHeight: cropMaxSize,
    bgColor: 'white',
    bgOpacity: 0.5,
    aspectRatio: 1,
  }, function() {
    jcropApi = this;
    const w = $('#myCrop')[0].width;
    const h = $('#myCrop')[0].height;
    if (w !== h) {
      const cropInitSize = Math.min(w, h);
      const cropX = (w - cropInitSize) * 0.5;
      const cropY = (h - cropInitSize) * 0.5;
      jcropApi.setSelect([ cropX, cropY, cropInitSize, cropInitSize ]);
    }
  });
}
// 保存裁剪后的头像
function saveCrop() {
  const data = {};
  const select = jcropApi.tellSelect();
  data.avatarUrl = $('#myCrop').attr('src');
  // 需要裁剪
  if (select.w !== 0 && select.h !== 0) {
    data.resizeW = $('#myCrop')[0].width;
    data.resizeH = $('#myCrop')[0].height;
    data.cropX = select.x;
    data.cropY = select.y;
    data.cropW = select.w;
    data.cropH = select.h;
  }
  $.ajax({
    url: '/upload/avatar/upload?_csrf=' + getCsrf(),
    data,
    method: 'POST',
    success(result) {
      if (result.code === 0) {
        $('.my-avatar').attr('src', result.data);
        $('.avatar-fail').hide();
        $('.avatar-success').show();
      } else {
        $('.avatar-fail').show();
        $('.avatar-fail').text(result.msg);
        $('.avatar-success').hide();
      }
      $('#myModal').modal('hide');
    },
    error(responseStr) {
      alert('error', responseStr);
    },
  });
}
