(function () {
  global.expect = chai.expect;
  global.click  = function (element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 80, 20, false, false, false, false, 0, null);

    element.dispatchEvent(evt);
  };
  mocha.suite.beforeEach(function(done) {
    global.iframe  = document.createElement('iframe');
    global.iframe.src   = '/fixture';
    global.iframe.onload = function () {
      global.iframe.onload = function () {};

      global.win = function () {
        return global.iframe.contentWindow;
      };
      global.doc = function () {
        return global.iframe.contentDocument;
      };

      done();
    };

    var fixture = document.getElementById('fixture');
    fixture.appendChild(global.iframe);
  });
}).call(this);
