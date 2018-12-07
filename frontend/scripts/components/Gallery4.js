
var Wallop = require("wallop");
var PubSub = require("underpub-js");
var anime = require("animejs");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);

var Gallery4 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery4.prototype.init = function(){

  var self = this;

  this.$galleryLeft = this.options.$el.find(".gallery-left");
  this.wallopLeft = new Wallop(this.$galleryLeft[0]);

  this.$galleryRight = this.options.$el.find(".gallery-right");
  this.wallopRight = new Wallop(this.$galleryRight[0]);

  this.$galleryMain = this.options.$el.find(".gallery-main");
  this.wallopMain = new Wallop(this.$galleryMain[0]);
  this.slideCount = this.$galleryMain.data('slideCount');

  $(window).on('load', function() {
    self.setPosition();
  });

  // on window resize
  PubSub.subscribe("resized", function(){
    self.setPosition();
  });

  this.options.$el.find(".slider-dots-nav span").on("click", function(){
    var goToSlide = $(this).data("slideIndex");
    self.wallopMain.goTo(goToSlide);

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
  //this.wallopLeft.on('change', slideChange);
  //this.wallopRight.on('change', slideChange);

  // swipe events
  this.options.$el.on('swiperight', function() {

    self.wallopLeft.previous();
    self.wallopRight.previous();
    self.wallopMain.previous();

  });

  this.options.$el.on('swipeleft', function() {

    self.wallopLeft.next();
    self.wallopRight.next();
    self.wallopMain.next();
  });

};

Gallery4.prototype.setPosition = function(){

  var width = this.$galleryMain.width();
  var leftOffset = this.$galleryMain.offset().left;

  if (Foundation.MediaQuery.atLeast('xlarge')) {
    var leftStart = leftOffset - width - 50;
    var rightStart = this.$galleryMain.offset().left + this.$galleryMain.width() + 50;
  }
  else if (Foundation.MediaQuery.atLeast('large')) {
    var leftStart = leftOffset - width - 32;
    var rightStart = this.$galleryMain.offset().left + this.$galleryMain.width() + 32;
  }
  else {
    var leftStart = leftOffset - width - 28;
    var rightStart = this.$galleryMain.offset().left + this.$galleryMain.width() + 28;
  }

  console.log('left start: ' + leftStart);
  console.log('right start: ' + rightStart);

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

module.exports = Gallery4;
