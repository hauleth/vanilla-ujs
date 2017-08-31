var matches = (function(doc) {
  return doc.matchesSelector ||
    doc.webkitMatchesSelector ||
    doc.mozMatchesSelector ||
    doc.oMatchesSelector ||
    doc.msMatchesSelector;
})(document.documentElement);

var matchesSelfOrParent = function (element, selector) {
  while (!matches.call(element, selector)) {
    element = element.parentNode;
    if (element instanceof HTMLDocument) {
      return null;
    }
  }
  return element;
};

var CustomEvent = function (event, params) {
  params = params || {bubbles: false, cancelable: false, detail: undefined};
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
};

CustomEvent.prototype = window.CustomEvent.prototype;

window.CustomEvent = CustomEvent;
