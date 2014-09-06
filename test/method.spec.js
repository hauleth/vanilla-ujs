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

    it('is sent normally', function () {
      click(a);

      expect(clickLink.called).to.be.true;
    });
  });

  describe('[data-method=get]', function () {
    beforeEach(function () {
      a.onclick = clickLink;
      a.setAttribute('data-method', 'get');
    });

    it('is sent normally', function () {
      click(a);

      expect(clickLink.called).to.be.true;
    });
  });

  describe('[data-method=post]', function () {
    beforeEach(function () {
      a.setAttribute('data-method', 'post');
    });

    describe('no [data-remote]', function () {
      beforeEach(function () {
        a.setAttribute('href', '/echo?callback=parse');
      });

      it('is sent as POST form', function (done) {
        var url = win().location.href;

        window.parse = function (json) {
          expect(url).to.not.equal(win().location.href);
          expect(json).to.deep.equal({
            method: 'post',
            path: '/echo'
          });
          done();
        };

        click(a);
      });
    });

    describe('[data-remote]', function () {
      beforeEach(function () {
        a.setAttribute('href', '/xhr');
        a.setAttribute('data-remote', 'true');
      });

      it('is sent as XHR request', function (done) {
        var url = win().location.href;

        var handler = function (event, xhr) {
          expect(url).to.equal(win().location.href);
          expect(JSON.parse(event.detail.response)).to.deep.equal({
            method: 'post',
            path: '/xhr'
          });

          doc().removeEventListener('ajaxComplete', handler);
          done();
        };

        doc().addEventListener('ajaxComplete', handler);

        click(a);
      });
    });
  });

  describe('[data-method=delete]', function () {
    beforeEach(function () {
      a.setAttribute('href', '/echo?callback=parse');
      a.setAttribute('data-method', 'delete');
    });

    it('is sent with DELETE method', function (done) {
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
