var ctaEmail2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

ctaEmail2.prototype.init = function(){

  this.options.$el.find('form').validate({
    rules: {
      "email": {
        required: true,
        email: true
      }
    }
  });

};

module.exports = ctaEmail2;
