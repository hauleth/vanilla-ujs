describe('CSRF', function () {
  beforeEach(function () {
    var token, param;

    token = doc().createElement('meta');
    token.setAttribute('name', 'csrf-token');
    token.setAttribute('content', 'CSRFToken');
    doc().head.appendChild(token);

    param = doc().createElement('meta');
    param.setAttribute('name', 'csrf-param');
    param.setAttribute('content', 'CSRFParam');
    doc().head.appendChild(param);
  });

  describe('getters', function () {

    it('return token value', function () {
      expect(win().CSRF.token()).to.equal('CSRFToken');
    });

    it('return param value', function () {
      expect(win().CSRF.param()).to.equal('CSRFParam');
    });
  });

  describe('LiteAjax request', function () {
    it('send valid CSRF header value', function (done) {
      var xhr = win().LiteAjax.ajax('/xhr', {
        success: function (req) {
          expect(JSON.parse(req.response).csrf).to.equal('CSRFToken');
          done();
        }
      });
    });
  });
});
