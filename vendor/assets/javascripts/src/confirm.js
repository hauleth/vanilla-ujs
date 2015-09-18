document.addEventListener('click', function (event) {
  var message, element;

  element = event.target;

  if (matches.call(element, 'a[data-confirm], button[data-confirm], input[data-confirm]')) {
    message = element.getAttribute('data-confirm');
    if (!confirm(message)) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    }

    return;
  }
}, false);
