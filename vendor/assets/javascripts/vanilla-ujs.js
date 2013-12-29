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

  // event listener
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

  // tinyxhr by Shimon Doodkin - licanse: public doamin - https://gist.github.com/4706967
  //
  // tinyxhr("http://site.com/ajaxaction",function (err,data,xhr){ if (err) console.log("goterr ",err,'status='+xhr.status); console.log(data)  });
  // tinyxhr("http://site.com/ajaxaction",function (err,data,xhr){ if (err) console.log("goterr ",err,'status='+xhr.status); console.log(data)  },'POST','value1=1&value2=2');
  // tinyxhr("http://site.com/ajaxaction.json",function (err,data,xhr){ if (err) console.log("goterr ",err,'status='+xhr.status); console.log(data); console.log(JSON.parse(data))  },'POST',JSON.stringify({value:1}),'application/javascript'); 
  // cb - a callback function like: function (err,data,XMLHttpRequestObject){ if (err) throw err;   }
  // 

  function tinyxhr (url, method, callback, post, contenttype) {
    var requestTimeout, xhr;
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        if (console) console.log("tinyxhr: XMLHttpRequest not supported");
        return null;
      }
    }
    requestTimeout = setTimeout(function() {
      xhr.abort(); callback(new Error("tinyxhr: aborted by a timeout"), "", xhr);
    }, 10000);

    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return;
      clearTimeout(requestTimeout);
      if (xhr.status == 200) {
        callback(false, xhr.responseText, xhr);
      } else {
        callback(new Error("tinyxhr: server respnse status is " + xhr.status))
      }
    };

    xhr.open(method ? method.toUpperCase() : "GET", url, true);

    //xhr.withCredentials = true;

    if (!post)
      xhr.send();
    else {
      xhr.setRequestHeader('Content-type', contenttype ? contenttype : 'application/x-www-form-urlencoded');
      xhr.send(post)
    }
  }

  //tinyxhr("/test",function (err,data,xhr){ if (err) console.log("goterr ",err); console.log(data)  });

  var hasAttr = function(el, attr) {
    return el.getAttribute(attr) === null;
  };

  var buildForm = function (action, method) {
    var div = document.createElement('DIV');
    div.innerHTML = '<form method="post"> \
      <input type="hidden" name="' + getCSRFParam() + '" value ="' + getCSRFToken() + '"> \
      <input type="hidden" name=_method value="' + method.toUpperCase() + '">\
    </form>';
    var form = div.getElementsByTagName('form')[0];
    form.action = action;
    return form;
  };

  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
  var triggerEvent = function (el, eventName, options) {
    var event = document.createEvent("Event");
    event.initEvent(eventName, true, true);
    var i;
    for (i in options || {}) event[i] = options[i];
    el.dispatchEvent(event);
  };

  var ready = function (f) {
    (/in/.test(document.readyState)) ?
      setTimeout(function() { ready(f); }, 9) : f();
  };


  window.rails = {
    domReady: ready,
    addListener: addListener,
    triggerEvent: triggerEvent,
    getCSRFToken: getCSRFToken,
    getCSRFParam: getCSRFParam,
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

          // a[data-remote]
          if ((attrValue = el.getAttribute('data-remote')) !== null) {
            e.preventDefault();

            tinyxhr (el.href, el.getAttribute('data-method') || 'GET', function(error, body, xhr) {
              // Here is differnt with jquery-ujs, in non-jquery world we can't pass extra arguments with events,
              // only as options. it will be available as function(event) { event.xhr, event.error, event.data }
              var options = {xhr: xhr, error: error, data: body};
              if (error) {
                triggerEvent(el, 'ajax:error', options);
              } else {
                triggerEvent(el, 'ajax:success', options);
              }
              triggerEvent(el, 'ajax:complete', options);
            });
          }

          // a[data-method]
          if (attrValue = el.getAttribute('data-method')) {
            if (attrValue.toLowerCase() == 'get') return;
            e.preventDefault();
            buildForm(el.href, attrValue).submit();
          }
        }

        // temporary solution, need to be handled withing xhr request
        // a[data-disable-with], input[data-disable-with], button[data-disable-with]
        if (el.tagName == 'A' || el.tagName == 'INPUT' || el.tagName == 'BUTTON') {
          if (attrValue = el.getAttribute('data-disable-with')) {
            el.disabled = true;
            if (el.tagName == 'A' || el.tagName == 'BUTTON') {
              el[('innerText' in el) ? 'innerText' : 'textContent'] = attrValue;
            } else {
              el.value = attrValue;
            }
          }
        }
      });
    }
  };

  //domready(window.rails.onDomReady);
  window.rails.beforeDomReady();
  window.rails.domReady(function() {
    console.log('dom ready');
  });
}(window, document));