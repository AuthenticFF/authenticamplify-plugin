var Wallop = require('Wallop');
var anime = require("animejs");

var Gallery2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery2.prototype.init = function(){

  var self = this;
  var imagesSlider = this.options.$el.find('.images-slider')[0]; // wallop takes a plain JS element, so use [0]
  var imagesWallop = new Wallop(imagesSlider);

  var textSlider = this.options.$el.find('.text-slider')[0]; // wallop takes a plain JS element, so use [0]
  var textWallop = new Wallop(textSlider);

  this.options.$el.find(".slider-dots-nav span").on("click", function(){
    var goToSlide = $(this).data("slideIndex");
    self.animateHeadings();
    imagesWallop.goTo(goToSlide);
    textWallop.goTo(goToSlide);
  });

  var slideChange = function(event) {
    var activeSlideNum = event.detail.currentItemIndex;
    self.options.$el.find('.slider-dots-nav span').removeClass('active');
    self.options.$el.find('[data-slide-index=' + activeSlideNum + ']').addClass('active');
  };

  imagesWallop.on('change', slideChange);

};

Gallery2.prototype.animateHeadings = function(){

  var animeTimeline = anime.timeline();

  var headings = this.options.$el.get(0).querySelectorAll('.text-slide .heading');
  var subheadings = this.options.$el.get(0).querySelectorAll('.text-slide .subheading');

  // hide non-active text so they don't show through when the slide starts changing
  this.options.$el.find('.text-slide:not(.Wallop-item--current) .heading, .text-slide:not(.Wallop-item--current) .subheading').css('opacity', 0);

  animeTimeline
  // fade out text
  .add({
    targets: [headings, subheadings],
    opacity: 0,
    duration: 160,
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

module.exports = Gallery2;
