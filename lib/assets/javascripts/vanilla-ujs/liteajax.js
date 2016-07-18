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

    if(!options.accepts) {
      options.accepts = 'text/javascript, application/javascript, ' +
                        'application/ecmascript, application/x-ecmascript';
    }

    url = url || options.url || location.href || '';
    var data = options.data;
    var target = options.target || document;
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var responseType = xhr.getResponseHeader('content-type');
      if(responseType === 'text/javascript; charset=utf-8') {
        eval(xhr.response);
      }

      var event = new CustomEvent('ajax:complete', {detail: xhr, bubbles: true});
      target.dispatchEvent(event);
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
    xhr.setRequestHeader('Accept', '*/*;q=0.5, ' + options.accepts);

    if(options.json) {
      xhr.setRequestHeader('Content-type', 'application/json');
      data = JSON.stringify(data);
    }

    var beforeSend = new CustomEvent('ajax:before', {detail: xhr, bubbles: true});
    target.dispatchEvent(beforeSend);
    xhr.send(data);

    return xhr;
  };

  return LiteAjax;
})();
