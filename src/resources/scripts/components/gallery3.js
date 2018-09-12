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
