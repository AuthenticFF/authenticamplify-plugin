var Wallop = require('Wallop');
var anime = require("animejs");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);

var Gallery7 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery7.prototype.init = function(){

  var self = this;
  var slider = this.options.$el.find('.Wallop')[0]; // wallop takes a plain JS element, so use [0]
  var wallop = new Wallop(slider);

  this.options.$el.find(".slider-dots-nav span").on("click", function(){
    var goToSlide = $(this).data("slideIndex");
    wallop.goTo(goToSlide);
  });

  var slideChange = function(event) {
    var activeSlideNum = event.detail.currentItemIndex;
    self.options.$el.find('.slider-dots-nav span').removeClass('active');
    self.options.$el.find('[data-slide-index=' + activeSlideNum + ']').addClass('active');
  };

  wallop.on('change', slideChange);

  // swipe events
  this.options.$el.on('swiperight', function() {
    wallop.previous();

  });

  this.options.$el.on('swipeleft', function() {
    wallop.next();
  });

};

module.exports = Gallery7;
