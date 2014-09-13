(function (window, document) {
'use strict';
var matches = (function(doc) {
  return doc.matchesSelector ||
    doc.webkitMatchesSelector ||
    doc.mozMatchesSelector ||
    doc.oMatchesSelector ||
    doc.msMatchesSelector;
})(document.documentElement);

var CustomEvent = function (event, params) {
  params = params || {bubbles: false, cancelable: false, detail: undefined};
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
};

CustomEvent.prototype = window.CustomEvent.prototype;

window.CustomEvent = CustomEvent;

var LiteAjax = (function () {
  var LiteAjax = {};

  LiteAjax.options = {
    method: 'GET',
    url: window.location.href,
    async: true,
  };

  LiteAjax.ajax = function (url, options) {
    if (typeof url == 'object') {
      options = url;
      url = undefined;
    }

    options = options || {};
    url = url || options.url || location.href || '';

    var xhr;

    xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var event = new CustomEvent('ajaxComplete', {detail: xhr});
      document.dispatchEvent(event);
    });

    if (typeof options.success == 'function')
      xhr.addEventListener('load', function (event) {
        if (xhr.status >= 200 && xhr.status < 300)
          options.success(xhr);
      });

    if (typeof options.error == 'function') {
      xhr.addEventListener('load', function (event) {
        if (xhr.status < 200 || xhr.status >= 300)
          options.error(xhr);
      });
      xhr.addEventListener('error', function (event) {
        options.error(xhr);
      });
    }

    xhr.open(options.method || 'GET', url, options.async);
    var beforeSend = new CustomEvent('ajax:before', {detail: xhr});
    document.dispatchEvent(beforeSend);
    xhr.send(options.data);

    return xhr;
  };

  return LiteAjax;
})();

document.addEventListener('click', function(event) {
  var element, url, method, data, handler;

  element = event.target;

  if (matches.call(element, 'a[data-method]')) {
    url = element.getAttribute('href');
    method = element.getAttribute('data-method').toUpperCase();
    data = {};

    if (CSRF.param() && CSRF.token()) {
      data[CSRF.param()] = CSRF.token();
    }

    if (matches.call(element, 'a[data-remote]')) {
      handler = xhr;
    } else {
      handler = submit;
    }

    if (handler({ url: url, method: method, data: data })) {
      event.preventDefault();
    } else {
      return true;
    }
  }

  function submit(options) {
    var form, input, param;

    if (options.method == 'GET') {
      return false;
    }

    form = document.createElement('form');
    form.method = 'POST';
    form.action = options.url;
    form.style.display = 'none';

    for (param in options.data) {
      if (Object.prototype.hasOwnProperty.call(options.data, param)) {
        input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', param);
        input.setAttribute('value', options.data[param]);
        form.appendChild(input);
      }
    }

    if (options.method != 'POST') {
      input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', '_method');
      input.setAttribute('value', options.method);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    return true;
  }

  function xhr(options) {
    LiteAjax.ajax(options);
    return true;
  }
}, false);

document.addEventListener('click', function (event) {
  var message, element;

  element = event.target;

  if (matches.call(element, 'a[data-confirm], button[data-confirm]')) {
    message = element.getAttribute('data-confirm');
    if (!confirm(message)) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    }

    return;
  }
}, false);

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
  var a = document.create('a'), origin;
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
}).call(null, window, document);