
var Wallop = require("wallop");
var PubSub = require("underpub-js");
var anime = require("animejs");

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
    self.wallopLeft.goTo(goToSlide);
    self.wallopRight.goTo(goToSlide);
  });

  var slideChange = function(event) {
    var activeSlideNum = event.detail.currentItemIndex;
    self.options.$el.find('.slider-dots-nav span').removeClass('active');
    self.options.$el.find('[data-slide-index=' + activeSlideNum + ']').addClass('active');
  };

  this.wallopMain.on('change', slideChange);
  this.wallopContent.on('change', slideChange);
  this.wallopLeft.on('change', slideChange);
  this.wallopRight.on('change', slideChange);

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

module.exports = Gallery3;



















/*
var PubSub = require("underpub-js");
var Slick = require('slick-carousel');

var Gallery3 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery3.prototype.init = function(){

  var self = this;

  this.options.$el.find('.slick-slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    centerPadding: '340px',
    draggable: false,

    responsive: [
      {
        breakpoint: 1740,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '248px',
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '200px'
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '132px'
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '72px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '42px'
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]

  });

  window.onload = function() { 
    self.positionContentBlock();
  };

  // on window resize
  PubSub.subscribe("resized", function(){
    self.positionContentBlock();
  });

};


// this function determines the correct position of the content block between the slides
// and sets a position:left to position the content
Gallery3.prototype.positionContentBlock = function() {

  var self = this;

  var slideRightOffset = this.options.$el.find('.slick-current').offset().left + this.options.$el.find('.slick-current').width();
  
  this.options.$el.find('.content-wrap').css('left', slideRightOffset + 'px');

};

module.exports = Gallery3;
*/