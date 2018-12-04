var Wallop = require('Wallop');
var anime = require("animejs");

var Hero3 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Hero3.prototype.init = function(){

  var self = this;
  var slider = this.options.$el.find('.Wallop')[0]; // wallop takes a plain JS element, so use [0]
  var wallop = new Wallop(slider);

  this.options.$el.find(".slider-dots-nav span").on("click", function(){
    var goToSlide = $(this).data("slideIndex");
    self.animateHeadings();
    wallop.goTo(goToSlide);
  });

  var slideChange = function(event) {
    var activeSlideNum = event.detail.currentItemIndex;
    self.options.$el.find('.slider-dots-nav span').removeClass('active');
    self.options.$el.find('[data-slide-index=' + activeSlideNum + ']').addClass('active');
  };

  wallop.on('change', slideChange);

};

Hero3.prototype.animateHeadings = function(){

  var animeTimeline = anime.timeline();

  var headings = this.options.$el.get(0).querySelectorAll('.hero-slide .heading');
  var subheadings = this.options.$el.get(0).querySelectorAll('.hero-slide .subheading');

  animeTimeline
  // fade out text
  .add({
    targets: [headings, subheadings],
    opacity: 0,
    duration: 200,
    offset: 0,
    easing: 'linear'
  })
  // move text down while hidden
  .add({
    targets: [headings, subheadings],
    translateY: 50,
    duration: 1,
    offset: 250,
    easing: 'linear'
  })
  // animate move heading up
  .add({
    targets: [headings],
    translateY: 0,
    duration: 300,
    offset: 400,
    easing: 'linear'
  })
  // animate fade heading in
  .add({
    targets: [headings],
    opacity: 1,
    duration: 300,
    offset: 400,
    easing: 'easeInCubic'
  })
  // animate move subheading up
  .add({
    targets: [subheadings],
    opacity: 1,
    translateY: 0,
    duration: 300,
    offset: 500,
    easing: 'linear'
  })
  // animate fade subheading in
  .add({
    targets: [subheadings],
    opacity: 1,
    duration: 300,
    offset: 500,
    easing: 'easeInCubic'
  });

};

module.exports = Hero3;
