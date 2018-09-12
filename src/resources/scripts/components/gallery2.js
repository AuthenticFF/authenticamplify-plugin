var Wallop = require('Wallop');

var Gallery2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery2.prototype.init = function(){

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

};

module.exports = Gallery2;
