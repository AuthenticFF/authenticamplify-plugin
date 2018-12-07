var Wallop = require('Wallop');
var anime = require("animejs");
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);

var Hero1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Hero1.prototype.init = function(){

  var self = this;

  var slider = this.options.$el.find('.Wallop')[0]; // wallop takes a plain JS element, so use [0]
  var wallop = new Wallop(slider);

  this.options.$el.find(".previous-slide-btn").on("click", function(){

    self.animateHeadings();
    wallop.previous();

  });

  this.options.$el.find(".next-slide-btn").on("click", function(){
    
    self.animateHeadings();
    wallop.next();

  });

  // swipe events
  this.options.$el.on('swiperight', function() {
    self.animateHeadings();
    wallop.previous();
  });

  this.options.$el.on('swipeleft', function() {
    self.animateHeadings();
    wallop.next();
  });

};

Hero1.prototype.animateHeadings = function(){

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

module.exports = Hero1;
