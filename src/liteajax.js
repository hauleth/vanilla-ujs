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

    var beforeSend = new CustomEvent('ajaxBeforeSend');
    document.dispatchEvent(beforeSend);
    xhr.open(options.method || 'GET', url, options.async);
    xhr.send(options.data);

    return xhr;
  };

  return LiteAjax;
})();
