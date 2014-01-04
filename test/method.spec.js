describe('LinkMethods', function () {
  var a, aWithMethod;

  before(function () {
    expect(document).to.not.equal(null);
    a = document.createElement('a');
    aWithMethod = document.createElement('a');

    aWithMethod.setAttribute('data-method', 'post');

    $fix.appendChild(a);
    $fix.appendChild(aWithMethod);
  });

  it('is true', function () {
  });
});
