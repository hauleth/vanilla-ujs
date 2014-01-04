(function () {
  global.expect = chai.expect;

  mocha.suite.beforeAll(function () {
    global.$fix = document.getElementById('fixtures');
    expect(global.$fix).to.exist;
  });

  mocha.suite.afterEach(function () {
    global.$fix.innerHTML = '';
  });
}).call(this);
