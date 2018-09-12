var ctaEmail1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

ctaEmail1.prototype.init = function(){

  this.options.$el.find('form').validate({
    rules: {
      "email": {
        required: true,
        email: true
      }
    }
  });

};

module.exports = ctaEmail1;
