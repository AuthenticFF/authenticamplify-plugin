var Slick = require('slick-carousel');

var Gallery1 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Gallery1.prototype.init = function(){

  var self = this;

  this.options.$el.find('.slick-slider').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    centerPadding: '910px',

    responsive: [
      {
        breakpoint: 2300,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '840px'
        }
      },
      {
        breakpoint: 2200,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '810px'
        }
      },
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '780px'
        }
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '730px'
        }
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '695px'
        }
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '620px'
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '520px'
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '420px'
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '350px'
        }
      },
      {// medium
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '260px'
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '220px'
        }
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '180px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '120px'
        }
      },
      {//small
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '100px'
        }
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '80px'
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '60px'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]

  });

};

module.exports = Gallery1;
