document.addEventListener('click', function (event) {
  var message, element;

  // do not disable on right click. Work on left and middle click
  if (event.which == 3) {
    return;
  }

  if (element = matchesSelfOrParent(event.target, 'a[data-disable-with], button[data-disable-with], input[data-disable-with]')) {

    // do not disable if the element is a submit button and its form has invalid input elements.
    // since failed validations prevent the form from being submitted, we would lock the form permanently
    // by disabling the submit button even though the form was never submitted
    if (element.getAttribute("type") === "submit" && element.form.querySelector(":invalid") !== null) {
      return;
    }

    message = element.getAttribute('data-disable-with');
    if (!!element.value) {
      element.value = message;
    } else {
      element.innerHTML = message;
    }
    // timeout is needed because Safari stops the submit if the button is immediately disabled
    setTimeout(function() {
      element.setAttribute('disabled', 'disabled');
    }, 0);
    return;
  }

  if (element = matchesSelfOrParent(event.target, 'a[data-disable], button[data-disable], input[data-disable]')) {
    if (element.getAttribute("type") === "submit" && element.form.querySelector(":invalid") !== null) {
      return;
    }

    setTimeout(function() {
      element.setAttribute('disabled', 'disabled');
    }, 0);
  }
}, false);
