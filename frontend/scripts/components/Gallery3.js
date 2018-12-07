
var Wallop = require("wallop");
var PubSub = require("underpub-js");
var anime = require("animejs");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);

var Gallery3 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery3.prototype.init = function(){

  var self = this;

  this.$galleryLeft = this.options.$el.find(".gallery-left");
  this.wallopLeft = new Wallop(this.$galleryLeft[0]);

  this.$galleryRight = this.options.$el.find(".gallery-right");
  this.wallopRight = new Wallop(this.$galleryRight[0]);

  this.$galleryMain = this.options.$el.find(".gallery-main");
  this.wallopMain = new Wallop(this.$galleryMain[0]);
  this.slideCount = this.$galleryMain.data('slideCount');

  this.$galleryContent = this.options.$el.find(".gallery-content");
  this.wallopContent = new Wallop(this.$galleryContent[0]);

  this.setPosition();

  // on window resize
  PubSub.subscribe("resized", function(){
    self.setPosition();
  });

  this.options.$el.find(".slider-dots-nav span").on("click", function(){
    var goToSlide = $(this).data("slideIndex");
    self.animateHeadings();
    self.wallopMain.goTo(goToSlide);
    self.wallopContent.goTo(goToSlide);

    // wallop left
    var leftGoToSlide = goToSlide - 1;

    if (leftGoToSlide < 0)
    {
      leftGoToSlide = self.slideCount - 1;
    }

    self.wallopLeft.goTo(leftGoToSlide);

    // wallop right
    var rightGoToSlide = goToSlide + 1;
    self.wallopRight.goTo(rightGoToSlide);
  });

  var slideChange = function(event) {

    var activeSlideNum = event.detail.currentItemIndex;
    self.options.$el.find('.slider-dots-nav span').removeClass('active');
    self.options.$el.find('[data-slide-index=' + activeSlideNum + ']').addClass('active');

  };

  this.wallopMain.on('change', slideChange);
  this.wallopContent.on('change', slideChange);
  //this.wallopLeft.on('change', slideChange);
  //this.wallopRight.on('change', slideChange);

  // swipe events
  this.options.$el.on('swiperight', function() {
    self.animateHeadings();
    self.wallopLeft.previous();
    self.wallopRight.previous();
    self.wallopMain.previous();
    self.wallopContent.previous();

  });

  this.options.$el.on('swipeleft', function() {
    self.animateHeadings();
    self.wallopLeft.next();
    self.wallopRight.next();
    self.wallopMain.next();
    self.wallopContent.next();
  });

};

Gallery3.prototype.setPosition = function(){

  var width = this.$galleryMain.width();
  var leftOffset = this.$galleryMain.offset().left;
  var leftStart = leftOffset - width - 50;

  var contentWidth = this.$galleryContent.width();
  var rightStart = this.$galleryContent.offset().left + contentWidth + 50;

  this.$galleryLeft.width(width);
  this.$galleryRight.width(width);

  this.$galleryLeft.css({
    width: width,
    left: leftStart
  });

  this.$galleryRight.css({
    width: width,
    left: rightStart
  });



};

Gallery3.prototype.animateHeadings = function(){

  var animeTimeline = anime.timeline();

  var headings = this.options.$el.get(0).querySelectorAll('.gallery-content .content .heading');
  var subheadings = this.options.$el.get(0).querySelectorAll('.gallery-content .content .text');

  // hide non-active text so they don't show through when the slide starts changing
  this.options.$el.find('.gallery-content .content:not(.Wallop-item--current) .heading, .gallery-content .content:not(.Wallop-item--current) .text').css('opacity', 0);

  var animationSpeed = 450;
  var startingOffset = 600;
  var incrementOffset = 200;

  animeTimeline
  // fade out text
  .add({
    targets: [headings, subheadings],
    opacity: 0,
    duration: 300,
    offset: 0,
    easing: window.easings.ease
  })
  // move text down while hidden
  .add({
    targets: [headings, subheadings],
    translateY: 20,
    duration: 1,
    offset: 301,
    easing: 'linear'
  })
  // animate move heading up
  .add({
    targets: [headings],
    translateY: 0,
    duration: animationSpeed,
    offset: startingOffset + (0 * incrementOffset),
    easing: window.easings.ease
  })
  // animate fade heading in
  .add({
    targets: [headings],
    opacity: 1,
    duration: animationSpeed,
    offset: startingOffset + (0 * incrementOffset),
    easing: window.easings.ease
  })
  // animate move subheading up
  .add({
    targets: [subheadings],
    opacity: 1,
    translateY: 0,
    duration: animationSpeed,
    offset: startingOffset + (1 * incrementOffset),
    easing: window.easings.ease
  })
  // animate fade subheading in
  .add({
    targets: [subheadings],
    opacity: 1,
    duration: animationSpeed,
    offset: startingOffset + (1 * incrementOffset),
    easing: window.easings.ease
  });

};

module.exports = Gallery3;
