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

		if (this.options.$el.find('.left-large-image img').length)
		{
			var leftLargeImgHeight = this.options.$el.find('.left-large-image img').height();
		}
		else if (this.options.$el.find('.left-large-image div.image').length)
		{
			var leftLargeImgHeight = this.options.$el.find('.left-large-image div.image').outerHeight();
		}

		var rightSmallItemHeight = this.options.$el.find('.right-four-image-grid .four-image-grid .cell:first-child').outerHeight(true);
		var rightSmallImgHeight = this.options.$el.find('.right-four-image-grid .four-image-grid .cell:first-child div.image').outerHeight();
		var rightRowOneTextHeight = rightSmallItemHeight - rightSmallImgHeight;
		var newRightImgHeight = (leftLargeImgHeight - rightRowOneTextHeight) / 2;

		this.options.$el.find('.right-four-image-grid .four-image-grid .cell div.image').css('padding-bottom', newRightImgHeight);
		this.options.$el.find('.right-four-image-grid .four-image-grid .cell img').css('height', newRightImgHeight);
	}
	else
	{
		this.options.$el.find('.right-four-image-grid .four-image-grid .cell div.image').css('padding-bottom', '');
		this.options.$el.find('.right-four-image-grid .four-image-grid .cell img').css('height', '');
	}

};

module.exports = Listings1;
