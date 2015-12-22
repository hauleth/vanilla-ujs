document.addEventListener('click', function (event) {
  var message, element;

  element = event.target;

  if (matches.call(element, 'a[data-disable-with], button[data-disable-with], input[data-disable-with]')) {
    message = element.getAttribute('data-disable-with');
    if(!!element.value){
      element.value = message;
    }else{
      element.innerHTML = message;
    }
    // timeout is needed because Safari stops the submit if the button is immediately disabled
    setTimeout(function(){
      element.setAttribute('disabled', 'disabled');
    }, 0);
  }
}, false);
