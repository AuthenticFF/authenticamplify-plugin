var AnalyticsHelper = require("../classes/AnalyticsHelper");

var ctaEmail2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

  // Analytics
  this.analyticsHelper = new AnalyticsHelper();

};

ctaEmail2.prototype.init = function(){

  var self = this;

  this.options.$el.find('form').validate({
    rules: {
      "email": {
        required: true,
        email: true
      }
    }
  });

  this.options.$el.find('form input[type="submit"]').on('click', function() {

    if (self.options.$el.find('form').valid())
    {
      self.analyticsHelper.sendEvent("Email Signup", "Submit");
    }

  });

};

module.exports = ctaEmail2;
