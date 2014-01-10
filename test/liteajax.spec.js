describe('LiteAjax', function () {
  describe('success callback', function () {
    var xhr, callbackSpy;

    beforeEach(function (done) {
      callbackSpy = sinon.spy();
      xhr = LiteAjax.ajax('/echo', {
        success: function () {
          callbackSpy();
          done();
        }
      });
    });

    it('is called on valid request', function () {
      expect(callbackSpy.called).to.be.true;
    });
  });

  describe('error callback', function () {
    var xhr, callbackSpy;

    beforeEach(function (done) {
      callbackSpy = sinon.spy();
      xhr = LiteAjax.ajax('/404', {
        success: function () { done(); },
        error: function () {
          callbackSpy();
          done();
        }
      });
    });

    it('is called on invalid request', function () {
      expect(callbackSpy.called).to.be.true;
    });
  });
});
