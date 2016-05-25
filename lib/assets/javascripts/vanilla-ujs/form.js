document.addEventListener('submit', function(event) {

  var form = event.target;

  if (matches.call(form, 'form[data-remote]')) {
    var url = form.action;
    var method = (form.method || form.getAttribute('data-method') || 'POST').toUpperCase();
    var data = new FormData(form);

    if (CSRF.param() && CSRF.token()) {
      data[CSRF.param()] = CSRF.token();
    }

    if (LiteAjax.ajax({ url: url, method: method, data: data })){
      event.preventDefault();
    } else {
      return true;
    }
  }
});
