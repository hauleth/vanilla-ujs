var VanillaUJS = {
  formHasNoInputs: function (form) {
    var element,
        fieldType;

    for (var i = 0, elements = form.elements, count = elements.length; i < count; i++) {
      element = elements[i];
      fieldType = element.nodeName.toUpperCase();

      if (!element.hasAttribute('name') || element.disabled) {
        continue;
      }

      if ((fieldType == 'RADIO' || fieldType == 'CHECKBOX') && !element.checked) {
        continue;
      }

      return false;
    }

    return true;
  }
};

document.addEventListener('submit', function(event) {

  var form = event.target;

  if (matches.call(form, 'form[data-remote]')) {
    var url = form.action;
    var method = (form.method || form.getAttribute('data-method') || 'POST').toUpperCase();
    var data = new FormData(form);
    var formHasNoInputs = VanillaUJS.formHasNoInputs(form);

    if (CSRF.param() && CSRF.token()) {
      data[CSRF.param()] = CSRF.token();
    } else if (formHasNoInputs) {
      data = null;
    }

    if (LiteAjax.ajax({ url: url, method: method, data: data, target: form })){
      event.preventDefault();
    } else {
      return true;
    }
  }
});
