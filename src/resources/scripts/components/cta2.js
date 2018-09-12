var AnalyticsHelper = require("../classes/AnalyticsHelper");

var Cta2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

  // Analytics
  this.analyticsHelper = new AnalyticsHelper();

};

Cta2.prototype.init = function(){

  var self = this;

  this.options.$el.find('.cta a').on('click', function() {

    self.analyticsHelper.sendEvent("CTA Button", "Click", $(this).attr('href'));

  });

};

module.exports = Cta2;
