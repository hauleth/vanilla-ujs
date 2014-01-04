describe('Link methods', function () {
  var click = function (element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true);

    element.dispatchEvent(evt);
  };

  before(function () {
    window.clickLink = sinon.spy();
  });

  describe('GET', function () {
    it('is submited normally', function () {
      var a = document.createElement('a');
      a.setAttribute('href', 'javascript:clickLink()');
      $fix.appendChild(a);

      click(a);

      expect(window.clickLink.called).to.be.true;
    });
  });
});
