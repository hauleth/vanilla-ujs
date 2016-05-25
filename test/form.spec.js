describe('Form methods', function () {
  var form, submit, submitForm;

  beforeEach(function () {
    form = document.createElement('form');
    submit = document.createElement('input')
    doc().body.appendChild(form);
    submit.setAttribute('type', 'submit');
    submit.setAttribute('name', 'submit');
    submit.setAttribute('value', 'submit');
    form.appendChild(submit)
    win().submitForm = submitForm = sinon.spy();
  });
  
  describe('[method=post]', function () {
    beforeEach(function () {
      form.onsubmit = submitForm;
      form.setAttribute('method', 'post');
    });
    
    describe('no [data-remote]', function () {
      beforeEach(function () {
        form.setAttribute('action', '/echo?callback=parse');
      });
  
      it('is submitted as a form', function (done) {
        var url = win().location.href;
  
        window.parse = function (json) {
          expect(url).to.not.equal(win().location.href);
          expect(json).to.deep.equal({
            method: 'post',
            path: '/echo'
          });
          done();
        };
        
        click(submit);
        
        expect(submitForm.called).to.be.true;
      });
      
    });
  
    describe('[data-remote]', function () {
      beforeEach(function () {
        form.setAttribute('action', '/xhr');
        form.setAttribute('data-remote', 'true');
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
        
        click(submit);
        
        expect(submitForm.called).to.be.true;
      });
    });
  });
  
});
