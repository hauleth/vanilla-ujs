(function(window, document, undefined) {
  if (window.rails !== undefined) {
    console.error('vanilla-js has been already loaded!');
    return window.rails;
  }

  var
  queryFirst = function(query) {
    return document.querySelector.call(document, query);
  },
  queryAll = function(query) {
    return document.querySelectorAll.call(document, query);
  },
  getCSRFToken = function() {
    return queryFirst('meta[name=csrf-token]').getAttribute('content');
  },
  getCSRFParam = function() {
    return queryFirst('meta[name=csrf-param]').getAttribute('content');
  },
  CSRFProtection = function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', getCSRFToken());
    return req;
  },
  refreshCSRFTokens = function() {
    var csrfToken = getCSRFToken(),
        csrfParam = getCSRFParam(),
        query = ['form input[name=', csrfParam,']'].join(''),
        inputs = queryAll(query);

    for (var i = 0; i < inputs.length; i++)
      inputs[i].setAttributte('value', csrfToken);
  };
}(window, document));
