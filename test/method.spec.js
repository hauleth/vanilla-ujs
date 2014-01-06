describe('Link methods', function () {
  var a;

  beforeEach(function () {
    a = document.createElement('a');
    doc.body.appendChild(a);
  });

  describe('no [data-method]', function () {
    beforeEach(function () {
      win.clickLink = sinon.spy();
      a.setAttribute('href', 'javascript:clickLink()');
    });

    it('is send normally', function () {
      click(a);

      expect(win.clickLink.called).to.be.true;
    });
  });

  describe('[data-method=get]', function () {
    beforeEach(function () {
      win.clickLink = sinon.spy();
      a.setAttribute('href', 'javascript:clickLink()');
      a.setAttribute('data-method', 'get');
    });

    it('is send normally', function () {
      click(a);

      expect(win.clickLink.called).to.be.true;
    });
  });

  describe('[data-method=post]', function () {
    beforeEach(function () {
      valid = false;
      a.setAttribute('href', '/echo');
      a.setAttribute('data-method', 'post');
    });

    it('is send as POST form', function (done) {
      click(a);

      iframe.onload = (function () {
        expect(document.body.innerText).to.have.string('post');
        done();
      });
    });
  });

  describe('[data-method=delete]', function () {
    beforeEach(function () {
      valid = false;
      a.setAttribute('href', '/echo');
      a.setAttribute('data-method', 'delete');
    });

    it('set _method param to DELETE', function (done) {
      click(a);

      iframe.onload = (function () {
        expect(document.body.innerText).to.have.string('delete');
        done();
      });
    });
  });

  describe('[data-method=put]', function () {
    beforeEach(function () {
      valid = false;
      a.setAttribute('href', '/echo');
      a.setAttribute('data-method', 'put');
    });

    it('set _method param to PUT', function (done) {
      click(a);

      iframe.onload = (function () {
        expect(document.body.innerText).to.have.string('put');
        done();
      });
    });
  });
});
