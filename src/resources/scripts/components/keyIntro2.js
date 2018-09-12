var AnalyticsHelper = require("../classes/AnalyticsHelper");

var keyIntro2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

  // Analytics
  this.analyticsHelper = new AnalyticsHelper();

};

keyIntro2.prototype.init = function(){

  var self = this;

  this.options.$el.find('.show-support-btn').on('click', function() {

    self.analyticsHelper.sendEvent("Support Button", "Click");

  });

  this.options.$el.find('.project-plan-link').on('click', function() {

    self.analyticsHelper.sendEvent("Project Info Download Link", "Click", $(this).attr('href'));

  });
};

module.exports = keyIntro2;
