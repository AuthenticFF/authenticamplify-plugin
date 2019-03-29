"use strict";
global._ = window._ = require('underscore');

// The sitewide include, for modules and things happening on multiple pages
var Sitewide = require('./classes/Sitewide.js');
var sitewide = new Sitewide();

// All of our default components
var defaultComponents = [
  {handle: "[data-cta-email-1]", require: require("./components/CtaEmail1")},
  {handle: "[data-cta-email-2]", require: require("./components/CtaEmail2")},
  {handle: "[data-map-1]", require: require("./components/Map1")},
  {handle: "[data-map-2]", require: require("./components/Map2")},
  {handle: "[data-timeline-1]", require: require("./components/Timeline1")},
  {handle: "[data-gallery-1]", require: require("./components/Gallery1")},
  {handle: "[data-gallery-2]", require: require("./components/Gallery2")},
  {handle: "[data-gallery-3]", require: require("./components/Gallery3")},
  {handle: "[data-gallery-4]", require: require("./components/Gallery4")},
  {handle: "[data-gallery-5]", require: require("./components/Gallery5")},
  {handle: "[data-gallery-6]", require: require("./components/Gallery6")},
  {handle: "[data-gallery-7]", require: require("./components/Gallery7")},
  {handle: "[data-key-intro-1]", require: require("./components/KeyIntro1")},
  {handle: "[data-key-intro-2]", require: require("./components/KeyIntro2")},
  {handle: "[data-key-intro-3]", require: require("./components/KeyIntro3")},
  {handle: "[data-content-1]", require: require("./components/Content1")},
  {handle: "[data-content-2]", require: require("./components/Content2")},
  {handle: "[data-content-3]", require: require("./components/Content3")},
  {handle: "[data-content-with-links-1]", require: require("./components/ContentWithLinks1")},
  {handle: "[data-content-with-links-2]", require: require("./components/ContentWithLinks2")},
  {handle: "[data-content-with-links-3]", require: require("./components/ContentWithLinks3")},
  {handle: "[data-content-image-1]", require: require("./components/ContentImage1")},
  {handle: "[data-content-image-2]", require: require("./components/ContentImage2")},
  {handle: "[data-content-image-3]", require: require("./components/ContentImage3")},
  {handle: "[data-cta-1]", require: require("./components/Cta1")},
  {handle: "[data-cta-2]", require: require("./components/Cta2")},
  {handle: "[data-listings-1]", require: require("./components/Listings1")},
  {handle: "[data-listings-2]", require: require("./components/Listings2")},
  {handle: "[data-contact-1]", require: require("./components/Contact1")},
  {handle: "[data-image-cards-3]", require: require("./components/ImageCards3")},
  {handle: "[data-three-sixty-viewer]", require: require("./components/ThreeSixtyViewer")},
];

/**
 * Our Amplify object returned to the instance
 */
var Amplify = {

  isFirstLoad: true,

  /**
   * The method called from our instance onPageLoad function
   */
  init: function(options){

    var mergedComponents = this.mergeComponents(defaultComponents, options.components);

    if(this.isFirstLoad){
      Foundation.addToJquery($);
      sitewide.init(mergedComponents);
      this.isFirstLoad = false;
    }

    $(document).foundation();

  },

  /**
   * A helper method to load and merge default and instance supplied components.
   */
  mergeComponents: function(arr1, arr2){

    var arr3 = [];

    for(var i in arr1){
       var shared = false;
       for (var j in arr2)
           if (arr2[j].handle == arr1[i].handle) {
               shared = true;
               break;
           }
       if(!shared) arr3.push(arr1[i])
    }

    arr3 = arr3.concat(arr2);

    return arr3;

  }

}

module.exports = {
  Amplify: Amplify
}
