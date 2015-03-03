# dispatch-promise
---
flux dispatch support promise

# Usage

```
  callbackIndex1 = Dispatcher.register(function(args) {
    //do something
  });
  
  callbackIndex2 = Dispatcher.register(function(args) {
    //do something
  });
  
  callbackIndex3 = Dispatcher.register(function(args) {
    Dispatcher.waitFor([callbackIndex2], function() {
      //do something
    });
  });
```
