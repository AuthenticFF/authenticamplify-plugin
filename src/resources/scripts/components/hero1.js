var Wallop = require('Wallop');

var Hero1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Hero1.prototype.init = function(){

  var slider = this.options.$el.find('.Wallop')[0]; // wallop takes a plain JS element, so use [0]
  var wallop = new Wallop(slider);

  this.options.$el.find(".arrow-left").on("click", function(){
    wallop.previous();
  });

  this.options.$el.find(".arrow-right").on("click", function(){
    wallop.next();
  });



};

module.exports = Hero1;
