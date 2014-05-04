var f = require('../');

describe('promise/callback', function() {
  describe('callback', function() {
    describe('no error', function() {
      it('calls callback function', function(done) {
        f({}, function(err, res) {
          expect(err).to.be.null;
          expect(res).to.equal(1);
          done();
        });
      });
    });

    describe('has error', function() {
      it('calls callback function with error', function(done) {
        f({ hasError: true }, function(err, res) {
          expect(err).to.not.be.null;
          done();
        });
      });
    });
  });

  describe('promise', function() {
    describe('no error', function() {
      it('calls promise fulfilled function', function(done) {
        f({}).then(function(res) {
          expect(res).to.equal(1);
          done();
        });
      });
    });

    describe('has error', function() {
      it('calls promise reject function', function(done) {
        f({ hasError: true }).catch(function(err) {
          expect(err).to.be.ok;
          done();
        });
      });
    });
  });

  describe('callback & promise', function() {
    describe('no error', function() {
      it('calls both functions', function(done) {
        var callbackCalled = false;
        var promiseCalled = false;
        f({}, function(err, res) {
          expect(err).to.be.null;
          expect(res).to.equal(1);
          callbackCalled = true;
          if (promiseCalled) done();
        }).then(function(res) {
          expect(res).to.equal(1);
          promiseCalled = true;
          if (callbackCalled) done();
        });
      });
    });

    describe('has error', function() {
      it('calls both functions', function(done) {
        var callbackCalled = false;
        var promiseCalled = false;
        f({ hasError: true }, function(err, res) {
          expect(err).to.be.ok;
          callbackCalled = true;
          if (promiseCalled) done();
        }).catch(function(err) {
          expect(err).to.be.ok;
          promiseCalled = true;
          if (callbackCalled) done();
        });
      });
    });
  });
});
