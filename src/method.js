var matches = (function(doc) {
  return doc.matchesSelector ||
    doc.webkitMatchesSelector ||
    doc.mozMatchesSelector ||
    doc.oMatchesSelector ||
    doc.msMatchesSelector;
})(document.documentElement);

document.addEventListener('click', function(e) {
  if ( matches.call( e.target, 'ul a') ) {
    var  form, input, method;

    if (matches(element, 'a[data-remote]')) {
      return;
    }

    method = element.getAttribute('data-method').toLowerCase();
    if (method == 'get') {
      return;
    }

    form = document.createElement('form');
    form.method = 'POST';
    form.action = element.attr('href');
    form.style.display = 'none';

    if (method != 'post') {
      input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', '_method');
      input.setAttribute('value', method);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    event.preventDefault();
    return false;
  }
}, false);
