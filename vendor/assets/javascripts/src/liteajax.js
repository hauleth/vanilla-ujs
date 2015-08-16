var LiteAjax = (function () {
  var LiteAjax = {};

  LiteAjax.options = {
    method: 'GET',
    url: window.location.href
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
      responseType = xhr.getResponseHeader('content-type');
      if(responseType === 'text/javascript; charset=utf-8') {
        eval(xhr.response);
      }

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

    xhr.open(options.method || 'GET', url);
    xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
    var beforeSend = new CustomEvent('ajax:before', {detail: xhr});
    document.dispatchEvent(beforeSend);
    xhr.send(options.data);

    return xhr;
  };

  return LiteAjax;
})();
