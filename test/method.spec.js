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
      a.setAttribute('href', '/echo');
      a.setAttribute('data-method', 'post');
    });

    it('is send as POST form', function (done) {
      click(a);

      iframe.onload = function () {
        var json = JSON.parse(doc.body.innerText);
        expect(json).to.deep.equal({
          method: 'post',
          path: '/echo'
        });
        done();
      };
    });
  });

  describe('[data-method=delete]', function () {
    beforeEach(function () {
      a.setAttribute('href', '/echo');
      a.setAttribute('data-method', 'delete');
    });

    it('is send with DELETE method', function (done) {
      click(a);

      iframe.onload = function () {
        var json = JSON.parse(doc.body.innerText);
        expect(json).to.deep.equal({
          method: 'delete',
          path: '/echo'
        });
        done();
      };
    });
  });

  describe('[data-method=put]', function () {
    beforeEach(function () {
      a.setAttribute('href', '/echo');
      a.setAttribute('data-method', 'put');
    });

    it('is sent with PUT method', function (done) {
      click(a);

      iframe.onload = function () {
        var json = JSON.parse(doc.body.innerText);
        expect(json).to.deep.equal({
          method: 'put',
          path: '/echo'
        });
        done();
      };
    });
  });
});
