var AnalyticsHelper = require("../classes/AnalyticsHelper");

var ContentWithLinks1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

  // Analytics
  this.analyticsHelper = new AnalyticsHelper();

};

ContentWithLinks1.prototype.init = function(){

  var self = this;

  this.options.$el.find('.cta a').on('click', function() {

    self.analyticsHelper.sendEvent("CTA Button", "Click", $(this).attr('href'));

  });

};

module.exports = ContentWithLinks1;
