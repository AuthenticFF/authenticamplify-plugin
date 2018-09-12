var AnalyticsHelper = require("../classes/AnalyticsHelper");

var ContentImage1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

  // Analytics
  this.analyticsHelper = new AnalyticsHelper();

};

ContentImage1.prototype.init = function(){

  var self = this;

  this.options.$el.find('.cta a').on('click', function() {

    self.analyticsHelper.sendEvent("CTA Button", "Click", $(this).attr('href'));

  });

};

module.exports = ContentImage1;
