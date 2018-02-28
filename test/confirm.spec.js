describe('Link confirmation', function () {
  describe('<a> link', function () {
    var a, confirm, clickLink;

    beforeEach(function () {
      win().confirm   = confirm   = sinon.stub();
      win().clickLink = clickLink = sinon.spy();

      a = document.createElement('a');
      a.setAttribute('data-confirm', 'Lolcontent');
      a.href = '#clicked';
      doc().body.appendChild(a);
    });

    it('call confirm', function () {
      click(a);

      expect(confirm.called).to.be.true;
    });

    it('fire default action if confirm() returns true', function () {
      win.confirm = confirm = confirm.returns(true);

      click(a);

      expect(win().location.hash).to.equal('#clicked');
    });

    it('do not fire default action if confirm() returns false', function () {
      win.confirm = confirm = confirm.returns(false);

      click(a);

      expect(win().location.hash).to.not.equal('#clicked');
    });

    it('call confirm woth elements inside link', function () {
      var i = document.createElement('i');
      a.appendChild(i);

      click(i);

      expect(confirm.called).to.be.true;
    });
  });

  // TODO: Write tests for <button>
});
