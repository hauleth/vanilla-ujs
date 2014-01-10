var CSRF = {
  token: function () {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  },
  param: function () {
    return document.querySelector('meta[name="csrf-param"]').getAttribute('content');
  }
};

window.CSRF = CSRF;

document.addEventListener('ajaxBeforeSend', function (event, xhr) {
  var token = CSRF.token();
  if (token)
    xhr.setRequestHeader('X-CSRF-Token', token);
});
