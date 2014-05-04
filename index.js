var Promise = require('q').Promise;

module.exports = function(options, callback) {

  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (options.hasError) {
        // OK:
        // - reject(new Error());
        // - try { throw new Error(); } catch(e) { reject(e); }
        //
        // NG: 
        // - throw new Error();
        //
        reject(new Error());
      } else {
        resolve(1);
      }
    }, 0);
  });

  if (callback) {
    promise.then(function(result) {
      callback(null, result);
    }, function(err) {
      callback(err, null);
    });
  }

  return promise;
};
