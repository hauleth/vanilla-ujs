document.addEventListener('click', function(event) {
  var form, input, method, element;

  element = event.target;

  if (matches.call(element, 'a[data-method]')) {
    if (matches.call(element, 'a[data-remote]')) {
      return true;
    }

    method = element.getAttribute('data-method').toUpperCase();
    if (method == 'GET') {
      return true;
    }

    form = document.createElement('form');
    form.method = 'POST';
    form.action = element.getAttribute('href');
    form.style.display = 'none';

    if (method != 'POST') {
      input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', '_method');
      input.setAttribute('value', method);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    event.preventDefault();
  }
}, false);
