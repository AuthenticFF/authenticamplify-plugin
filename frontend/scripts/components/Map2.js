var Map2 = function(options){

  this.options = {
    $el: false
  };

  $.extend(true, this.options, options);

};

Map2.prototype.init = function(){

  var self = this;

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0aGVudGljZmYiLCJhIjoiY2ppYmt1d2I4MWdsMTNxcDBpY2FoY3hveSJ9.t_E3qC1Z5bKMoCW3y4XkdQ';

  var MapLat = this.options.$el.data('mapLat');
  var MapLong = this.options.$el.data('mapLong');
  var MapZoom = this.options.$el.data('mapZoom');

  var dragPanSetting = true;
  if (window.screen.width <= 768)
  {
    dragPanSetting = false;
  }

  var map = new mapboxgl.Map({
    container: self.options.$el.find('#map-container')[0],
    style: 'mapbox://styles/authenticff/cjkwrz5g03klr2rs897f61z3f',
    center: [MapLong,MapLat],
    zoom: MapZoom,
    dragPan: dragPanSetting
  });

  // create DOM element for the marker
  var el = document.createElement('div');
  el.className = "map-marker";

  var marker = new mapboxgl.Marker(el, {offset: [0,-33]})
  .setLngLat([MapLong,MapLat])
  .addTo(map);

  // disable scroll to zoom
  map.scrollZoom.disable();

  // fix for map size on load
  map.resize();

  map.addControl(new mapboxgl.NavigationControl());

};

module.exports = Map2;
