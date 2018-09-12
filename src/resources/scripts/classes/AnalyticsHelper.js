//
// Analytics Helper
//

// ga('ec:setAction', 'click', {       // click action.
//   'list': 'Search Results'          // Product list (string).
// });

var AnalyticsHelper = function(){

  if(typeof ga !== "undefined"){
    ga('require', 'ec');
  }

};

AnalyticsHelper.prototype.sendEvent = function(category, action, label, value){

  label = typeof label === "undefined" ? "" : label;
  value = typeof value === "undefined" ? "1" : value;

  console.log('category: ' + category);
  console.log('action: ' + action);
  console.log('label: ' + label);
  console.log('value: ' + value);

  if( ! this._shouldSendData() ) return;

  console.log('analytics helper send');
  
  ga('send', 'event', category, action, label, value, {nonInteraction: 1});

};

/**
 *
 *  Internal methods
 *
 */

 /**
  * Determining if we should send information to Google Analytis
  */
 AnalyticsHelper.prototype._shouldSendData = function(){

    var shouldSend = true;

    if(window.environment !== "live"){
      shouldSend = false;
    }

    return shouldSend;

 }

module.exports = AnalyticsHelper;
