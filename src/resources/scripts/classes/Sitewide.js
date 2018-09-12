var PubSub = require("underpub-js");
var ComponentsLoader = require("./ComponentsLoader");

var components = [
  {handle: "[data-hero-1]", require: require("../components/hero1")},
  {handle: "[data-hero-2]", require: require("../components/hero2")},
  {handle: "[data-hero-3]", require: require("../components/hero3")},
  {handle: "[data-hero-4]", require: require("../components/hero4")},
  {handle: "[data-hero-5]", require: require("../components/hero5")},
  {handle: "[data-hero-6]", require: require("../components/hero6")},
  {handle: "[data-cta-email-1]", require: require("../components/ctaEmail1")},
  {handle: "[data-cta-email-2]", require: require("../components/ctaEmail2")},
  {handle: "[data-map-1]", require: require("../components/map1")},
  {handle: "[data-map-2]", require: require("../components/map2")},
  {handle: "[data-timeline-1]", require: require("../components/timeline1")},
  {handle: "[data-gallery-1]", require: require("../components/gallery1")},
  {handle: "[data-gallery-2]", require: require("../components/gallery2")},
  {handle: "[data-gallery-3]", require: require("../components/gallery3")},
  {handle: "[data-key-intro-1]", require: require("../components/keyIntro1")},
  {handle: "[data-key-intro-2]", require: require("../components/keyIntro2")},
  {handle: "[data-key-intro-3]", require: require("../components/keyIntro3")},
  {handle: "[data-content-1]", require: require("../components/content1")},
  {handle: "[data-content-2]", require: require("../components/content2")},
  {handle: "[data-content-3]", require: require("../components/content3")},
  {handle: "[data-content-with-links-1]", require: require("../components/contentWithLinks1")},
  {handle: "[data-content-with-links-2]", require: require("../components/contentWithLinks2")},
  {handle: "[data-content-with-links-3]", require: require("../components/contentWithLinks3")},
  {handle: "[data-content-image-1]", require: require("../components/contentImage1")},
  {handle: "[data-content-image-2]", require: require("../components/contentImage2")},
  {handle: "[data-content-image-3]", require: require("../components/contentImage3")},
  {handle: "[data-cta-1]", require: require("../components/cta1")},
  {handle: "[data-cta-2]", require: require("../components/cta2")}

];

var componentsLoader = new ComponentsLoader({components: components});
componentsLoader.initScreen();

var Sitewide = function(){

};

Sitewide.prototype.init = function(){

	this.initEvents();

	// mobile navigation
	$('.mobile-nav-trigger').click(function() {
		$('[data-mobile-nav-overlay]').addClass('is-active');

		setTimeout(function() {
			$('body').addClass('small-fixed');
		}, 500);
	});

	$('[data-mobile-nav-overlay] .close').click(function() {
		$('[data-mobile-nav-overlay]').removeClass('is-active');
		$('body').removeClass('small-fixed');
	});

	// trigger an equalizer reflow after the window is resized.
	PubSub.subscribe("resized", function(){
		Foundation.reInit('equalizer');
	});

};

/**
 * Init'ing our global events, many of which we publish
 */
Sitewide.prototype.initEvents = function(){

	//
	// Resizing (at the start)
	//
	var windowThrottled = _.throttle(function(e){
		PubSub.publish('resize');
	}, 0, {trailing: false});
	window.addEventListener("resize", windowThrottled, false);

	//
	// Resized Event (at the end)
	//
	var windowResizeDebounce = _.debounce(function(e) {
		PubSub.publish('resized');
	}, 400);
	window.addEventListener("resize", windowResizeDebounce, false);

};

module.exports = Sitewide;