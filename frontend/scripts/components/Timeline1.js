var PubSub = require("underpub-js");

var Timeline1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Timeline1.prototype.init = function(){

  var self = this;

  this.offsetTimelineItems();

  window.onload = function() { 
    self.offsetTimelineItems();
  };

  // on window resize
  PubSub.subscribe("resized", function(){
    self.offsetTimelineItems();
  });

};

Timeline1.prototype.offsetTimelineItems = function() {

  var self = this;

  if (Foundation.MediaQuery.atLeast('medium'))
  {

    // this block aligns the left side timeline items
    // it works by settings a margin-top proportional to the previous right side items height
    this.options.$el.find('.timeline-cell:nth-child(2n + 3)').each(function() {

      var prevSiblingLeftHeight = $(this).prevAll('.timeline-cell').eq(1).find('.timeline-item').outerHeight();
      var prevSiblingRightHeight = $(this).prev('.timeline-cell:nth-child(2n + 2)').find('.timeline-item').outerHeight();

      if (prevSiblingLeftHeight < prevSiblingRightHeight)
      {
        // this case makes up for foundation cells being aligned under the tallest preceding row's cell
        var newMarginTop = prevSiblingLeftHeight - 180;
      }
      else
      {
        var newMarginTop = prevSiblingRightHeight - 180;
      }

      $(this).css('margin-top', newMarginTop + 'px');

    });

    // this block aligns the right side timeline items
    // it works by setting a position:top relative to the previous items height
    this.options.$el.find('.timeline-cell:nth-child(2n + 2)').each(function() {

      var prevHeight = $(this).prev('.timeline-cell').find('.timeline-item').outerHeight();
      var prevMarginTop = parseInt($(this).prev('.timeline-cell').css('margin-top'));
      var newTop = prevHeight + prevMarginTop - 90;

      $(this).css('top', newTop + 'px');

      if (!$(this).next('.timeline-cell').length)
      {
        $(this).css('margin-bottom', newTop + 'px');
      }

    });

  }
  else
  {
    // reset the timeline cells for mobile
    $('.timeline-cell').css('margin-top', '0px');
    $('.timeline-cell').css('top', '0px')
    $('.timeline-cell:last-child').css('margin-bottom', '0px');
  }

};

module.exports = Timeline1;
