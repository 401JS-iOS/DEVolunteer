'use strict';

module.exports = function(){
  return function (developers, value){
    console.log(value);
    if(!value) return /.*/;
    developers.dev.forEach(item, function(){
      if(developers.dev.reviews == value) {
        return developers.dev;
      }
    });
  };
};