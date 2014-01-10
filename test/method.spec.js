describe('Link methods', function () {
  var a, clickLink;

  beforeEach(function () {
    a = document.createElement('a');
    doc().body.appendChild(a);
    win().clickLink = clickLink = sinon.spy();
  });

  describe('no [data-method]', function () {
    beforeEach(function () {
      a.onclick = clickLink;
    });

    it('is send normally', function () {
      click(a);

      expect(clickLink.called).to.be.true;
    });
  });

  describe('[data-method=get]', function () {
    beforeEach(function () {
      a.onclick = clickLink;
      a.setAttribute('data-method', 'get');
    });

    it('is send normally', function () {
      click(a);

      expect(clickLink.called).to.be.true;
    });
  });

  describe('[data-method=post]', function () {
    beforeEach(function () {
      a.setAttribute('href', '/echo?callback=parse');
      a.setAttribute('data-method', 'post');
    });

    it('is send as POST form', function (done) {
      window.parse = function (json) {
        expect(json).to.deep.equal({
          method: 'post',
          path: '/echo'
        });
        done();
      };

      click(a);
    });
  });

  describe('[data-method=delete]', function () {
    beforeEach(function () {
      a.setAttribute('href', '/echo?callback=parse');
      a.setAttribute('data-method', 'delete');
    });

    it('is send with DELETE method', function (done) {
      window.parse = function (json) {
        expect(json).to.deep.equal({
          method: 'delete',
          path: '/echo'
        });
        done();
      };

      click(a);
    });
  });

  describe('[data-method=put]', function () {
    beforeEach(function () {
      a.setAttribute('href', '/echo?callback=parse');
      a.setAttribute('data-method', 'put');
    });

    it('is sent with PUT method', function (done) {
      window.parse = function (json) {
        expect(json).to.deep.equal({
          method: 'put',
          path: '/echo'
        });
        done();
      };

      click(a);
    });
  });
});
