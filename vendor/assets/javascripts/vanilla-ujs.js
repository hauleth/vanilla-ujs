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


  var ready = function (f) {
    (/in/.test(document.readyState)) ?
      setTimeout(function() { ready(f); }, 9) : f();
  };

  var addListener = function (element, eventName, handler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    }
    else if (element.attachEvent) {
      element.attachEvent('on' + eventName, handler);
    }
    else {
      element['on' + eventName] = handler;
    }
  };

  window.rails = {
    /*
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',
    */

    beforeDomReady: function() {
      //console.log('before dom ready');
      addListener(document, 'click', function (e) {
        var attrValue;
        var el = e.target;

        if (el.tagName == 'A') {

          // a[data-confirm]
          if (attrValue = el.getAttribute('data-confirm')) {
            if (!confirm(attrValue)) el.preventDefault();
          }

        }

        // temporary solution, need to be handled withing xhr request
        // a[data-disable-with], input[data-disable-with], button[data-disable-with]
        if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.tagName == 'BUTTON') {
          if (attrValue = el.getAttribute('data-disable-with')) {
            el.disabled = true;
            el[('innerText' in el) ? 'innerText' : 'textContent'] = attrValue;
          }
        }
      });
    }
  };

  //domready(window.rails.onDomReady);
  window.rails.beforeDomReady();
  ready(function() {
    console.log('dom ready');
  });
}(window, document));