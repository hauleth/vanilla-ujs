describe('Link methods', function () {
  var click = function (element) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true);

    element.dispatchEvent(evt);
  };

  before(function () {
    window.clickLink = sinon.spy();
  });

  describe('no [data-method]', function () {
    var a;

    beforeEach(function () {
      a = document.createElement('a');
      a.setAttribute('href', 'javascript:clickLink()');
      $fix.appendChild(a);
    });

    it('is send normally', function () {
      click(a);

      expect(window.clickLink.called).to.be.true;
    });
  });

  describe('[data-method=get]', function () {
    var a;

    beforeEach(function () {
      a = document.createElement('a');
      a.setAttribute('href', 'javascript:clickLink()');
      a.setAttribute('data-method', 'get');
      $fix.appendChild(a);
    });

    it('is send normally', function () {
      click(a);

      expect(window.clickLink.called).to.be.true;
    });
  });
});
