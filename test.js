
var Dis = require('./dist/dispatcher');

var Dispatcher = new Dis();

callbackIndex1 = Dispatcher.register(function(args) {
  console.log('1=', args);
});

callbackIndex2 = Dispatcher.register(function(args) {
  console.log('2=', args);
});

callbackIndex3 = Dispatcher.register(function(args) {
  Dispatcher.waitFor([callbackIndex2], function(result) {
    console.log('3=', result);
  });
});

var result = Dispatcher.dispatch('hello').then(function(result){
    console.log('result=',result);
});

console.log('result= ',result);