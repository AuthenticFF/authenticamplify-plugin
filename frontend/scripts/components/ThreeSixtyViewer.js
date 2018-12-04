var anime = require('animejs');


/**
 * Creating the class
 */
var ThreeSixtyViewer = function(options){

  var self = this;

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

  this.isShown = false;
  this.isEnabled = true;

};

/**
 * Init'ing the viewer
 */
ThreeSixtyViewer.prototype.init = function(){

  var self = this;

  console.log("go");

  window.onerror = function(errorMsg, url, lineNumber){
    console.log("ERROR", errorMsg, url, lineNumber);
  };

  // Disable the viewer if necessary
  if(! this.isEnabled){
    this.disable360();
    return;
  }

  // are there 360 images on the page?
  if($(".has-360-image").length){
    $.getScript("https://cdn.rawgit.com/aframevr/aframe/62f131a7f4e75472b12a965cac4bf0d40d5ff1c3/dist/aframe-master.min.js", function(){
      self.initScene();
    });
  }

};

/**
 * Init'ing our scene after our script has been loaded
 */
ThreeSixtyViewer.prototype.initScene = function(){

  var self = this;

  // starting our preloading of images
  this.preloadImages();

  //
  // Event handlers
  //
  $(".has-360-image").on("click", function(e){

    e.preventDefault();

    var image360 = $(this).data("360-image");
    var scene = self.getScene(image360);
    self.options.$el.append(scene);

    setTimeout(function(){
      self.show();
    },600);

  });

  $(document).keyup(function(e){
    if(e.keyCode === 27){
      self.hide();
    }
  });


  //
  // Adding close button
  //
  var $closeButton = $("<a href='javascript:;'>close</a>");
  $closeButton.on("click", function(){
    self.hide();
  });

  $closeButton.css({
    "position":"absolute",
    "top":40,
    "right":40,
    "background-color": "#fff",
    "color": "#000",
    "opacity": 0.7,
    "padding": "2px 14px",
    "border-radius": 20,
    "z-index":100,
    "font-family": "monospace",
    "font-size": 12,
    "text-transform": "uppercase",
    "letter-spacing": 2
  });

  this.options.$el.append($closeButton);

}

/**
 * Disabling our 360 images if necessary
 */
ThreeSixtyViewer.prototype.disable360 = function(){

  $(".has-360-image").each(function(){
     $(this).addClass("is-disabled");
  });

};

/**
 * Preloading 360 image assets
 */
ThreeSixtyViewer.prototype.preloadImages = function(){

  $(".has-360-image").each(function(){
     var imageSrc = $(this).data("360-image");
     $('<img/>')[0].src;
  });

};

ThreeSixtyViewer.prototype.getScene = function(imageSrc){

  return `
    <a-scene embedded="true">
      <a-sky src="${imageSrc}" rotation="0 -130 0"></a-sky>
    </a-scene>
  `;

};

ThreeSixtyViewer.prototype.show = function(){

  if(this.isShown) return;

  this.options.$el.css({
    "opacity": 0,
    "z-index": 100
  });

  anime({
    targets: this.options.$el[0],
    easing: window.easings.ease,
    duration: 300,
    opacity: [0,1]
  });

  this.isShown = true;

};

ThreeSixtyViewer.prototype.hide = function(){

  if(! this.isShown) return;

  var self = this;

  anime({
    targets: this.options.$el[0],
    easing: window.easings.ease,
    duration: 300,
    opacity: [1,0],
    complete: function(){

      self.options.$el.css({
        "opacity": 0,
        "z-index": -1
      });

      self.options.$el.find("a-scene").remove();

    }
  });

  this.isShown = false;

};

module.exports = ThreeSixtyViewer;
