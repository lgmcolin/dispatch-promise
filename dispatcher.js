var Promise = require('es6-promise').Promise;

class Dispatcher {

  constructor() {
    this._callbacks = [];
    this._promise = [];
  }

  //register
  register(callback) {
    this._callbacks.push(callback);
    return this._callbacks.length - 1;
  }

  //dispatch
  dispatch(payload) { 
    var resolve = [];
    var reject = [];

    this._promise = this._callbacks.map(function(callback, i) {
      return new Promise(function(resolve, reject) {
        resolve[i] = resolve;
        reject[i] = reject;
      })
    }); 

    this._callbacks.forEach(function(callback, i) {
      Promise.resolve(callback(payload)).then(function(result) {
        resolve[i](result);
      }, function(err) {
        reject[i](err);
      });
    });

    return Promise.all(this._promise);
  }

  //waitfor
  waitFor(/*array*/ promiseIndexes, /*function*/ callback) {
    var cb = typeof callback === 'function' ? callback : function() {};
    var selectedPromises = promiseIndexes.map((index) => {
      return this._promise[index];
    }, this);
    return Promise.all(selectedPromises).then(cb);
  }

}

module.exports = Dispatcher;
