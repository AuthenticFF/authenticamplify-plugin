var PubSub = require("underpub-js");

var Listings1 = function(options){

	this.options = {
		$el: false
	};

	$.extend(true, this.options, options);

};

Listings1.prototype.init = function(){

	var self = this;

	$(window).on('load', function() {
		self.equalizeImageGrid();
	});

	// on window resize
	PubSub.subscribe("resized", function(){
		self.equalizeImageGrid();
	});

};

// this function makes the height of the image grid on the right match the large image height on the left
Listings1.prototype.equalizeImageGrid = function(){

	var self = this;

	if (Foundation.MediaQuery.atLeast('large'))
	{

		var leftLargeImgHeight = this.options.$el.find('.left-large-image img').height();
		var rightSmallItemHeight = this.options.$el.find('.right-four-image-grid .four-image-grid .cell:first-child').outerHeight(true);
		var rightSmallImgHeight = this.options.$el.find('.right-four-image-grid .four-image-grid .cell:first-child div.image').outerHeight();
		var rightRowOneTextHeight = rightSmallItemHeight - rightSmallImgHeight;
		var newRightImgHeight = (leftLargeImgHeight - rightRowOneTextHeight) / 2;

		console.log('left image height: ' + leftLargeImgHeight);

		console.log('right small item height: ' + rightSmallItemHeight);

		console.log('right small image height: ' + rightSmallImgHeight);

		this.options.$el.find('.right-four-image-grid .four-image-grid .cell div.image').css('height', newRightImgHeight);

	}

};

module.exports = Listings1;
