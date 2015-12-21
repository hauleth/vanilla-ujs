var CSRF = {
  token: function () {
    var token = document.querySelector('meta[name="csrf-token"]');
    return token && token.getAttribute('content');
  },
  param: function () {
    var param = document.querySelector('meta[name="csrf-param"]');
    return param && param.getAttribute('content');
  }
};

var sameOrigin = function (url) {
  var a = document.createElement('a'), origin;
  a.href = url;
  origin = a.href.split('/', 3).join('/');

  return window.location.href.indexOf(origin) === 0;
};

window.CSRF = CSRF;

document.addEventListener('ajax:before', function (e) {
  var token = CSRF.token(), xhr = e.detail;
  if (token)
    xhr.setRequestHeader('X-CSRF-Token', token);
});

document.addEventListener('submit', function (e) {
  var token = CSRF.token(),
      param = CSRF.param(),
      form  = e.target;

  if (matches.call(form, 'form')) {
    if (matches.call(form, 'form[data-remote]'))
      return true;
    if (!form.method || form.method.toUpperCase() == 'GET')
      return true;
    if (!sameOrigin(form.action))
      return true;

    if (param && token && !form.querySelector('input[name='+param+']')) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', param);
      input.setAttribute('value', token);

      form.appendChild(input);
    }

    return true;
  }
});
