var PubSub = require("underpub-js");
var ComponentsLoader = require("./ComponentsLoader");
// var QRious = require('qrious');

var Sitewide = function(){

};

/**
 * Kicking off the sitewide method
 */
Sitewide.prototype.init = function(components){

  // Getting our components loading going
  var componentsLoader = new ComponentsLoader({components: components});
  componentsLoader.initScreen();

	this.initEvents();
	this.initArModals();

	// mobile navigation
	$('.mobile-nav-trigger').click(function() {
		$('[data-mobile-nav-overlay]').addClass('is-active');

		setTimeout(function() {
			$('body').addClass('disable-scroll');
		}, 500);
	});

	$('[data-mobile-nav-overlay] .close').click(function() {
		$('[data-mobile-nav-overlay]').removeClass('is-active');
		$('body').removeClass('disable-scroll');
	});

	// trigger an equalizer reflow after the window is resized.
	/*
	PubSub.subscribe("resized", function(){
		Foundation.reInit('equalizer');
	});
	*/

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

Sitewide.prototype.initArModals = function(){

	$('[data-modal-ar-1]').each(function() {

		var $this = $(this);

		var qrToken = $this.data('token');
		var canvasElement = $this.find('.js_qrcode canvas').get(0);

		// Generate the QR code
		var qr = new QRious({
			element: canvasElement,
			value: qrToken,
			size: 120
		});

		$this.find('.background-overlay').click(function() {

			$this.removeClass('active').addClass('no-longer-shown');

		});

	});

	$('a[href*="#open-ar-modal-"]').click(function(event) {

		event.preventDefault();

		var thisHref = $(this).attr('href');

		var hrefArray = thisHref.split('#open-ar-modal-');

		var token = hrefArray[hrefArray.length - 1];

		$('[data-modal-ar-1][data-token=' + token + ']').addClass('active').removeClass('no-longer-shown');

	});

};

module.exports = Sitewide;
