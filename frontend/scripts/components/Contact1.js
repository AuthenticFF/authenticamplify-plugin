var contact1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

contact1.prototype.init = function(){

  var self = this;

  this.options.$el.find('form').validate({
    rules: {
      "email": {
        email: true
      }
    }
  });

};

module.exports = contact1;
