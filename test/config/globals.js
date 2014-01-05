(function () {
  global.expect = chai.expect;
  global.click  = function (element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent('click', true, true);

    element.dispatchEvent(evt);
  };
  mocha.suite.beforeEach(function(done) {
    global.iframe  = document.createElement('iframe');
    global.iframe.src   = '/fixture';
    global.iframe.onload = function () {
      global.iframe.onload = function () {};

      global.win = global.iframe.contentWindow;
      global.doc = global.iframe.contentDocument;

      done();
    };

    var fixture = document.getElementById('fixture');
    fixture.appendChild(global.iframe);
  });
}).call(this);
