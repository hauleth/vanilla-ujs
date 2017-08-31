describe('Should disable links and buttons with [data-disable-with]', function () {
  describe('<a> link', function () {
    var a;

    beforeEach(function () {
      a = document.createElement('a');
      a.setAttribute('data-disable-with', 'Lolcontent');
      a.href = '#clicked';
      doc().body.appendChild(a);
    });

    it('when click a link', function (done) {
      click(a);

      expect(win().location.hash).to.equal('#clicked');
      expect(a.innerText).to.equal('Lolcontent');

      setTimeout(function () {
        expect(win().location.hash).to.equal('#clicked');
        expect(a.getAttribute('disabled')).to.equal('disabled');
        done();
      }, 5); // because original code has timeout too
    });

    it('when click element inside link', function (done) {
      var i = document.createElement('i');
      a.appendChild(i);

      click(i);

      expect(win().location.hash).to.equal('#clicked');
      expect(a.innerText).to.equal('Lolcontent');

      setTimeout(function () {
        expect(a.getAttribute('disabled')).to.equal('disabled');
        done();
      }, 5); // because original code has timeout too
    });
  });

  // TODO: Write tests for <button>
});

describe('Should disable links and buttons with [data-disable]', function () {
  var a;

  beforeEach(function () {
    a = document.createElement('a');
    a.innerText = 'Original'
    a.setAttribute('data-disable', '');
    a.href = '#clicked';
    doc().body.appendChild(a);
  });

  it('when click a link', function (done) {
    click(a);

    expect(win().location.hash).to.equal('#clicked');
    expect(a.innerText).to.equal('Original');

    setTimeout(function () {
      expect(a.getAttribute('disabled')).to.equal('disabled');
      done();
    }, 5); // because original code has timeout too
  });

  it('when click element inside link', function (done) {
    var i = document.createElement('i');
    a.appendChild(i);

    click(i);

    expect(win().location.hash).to.equal('#clicked');
    expect(a.innerText).to.equal('Original');

    setTimeout(function () {
      expect(a.getAttribute('disabled')).to.equal('disabled');
      done();
    }, 5); // because original code has timeout too
  });
})