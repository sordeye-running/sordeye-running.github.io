const makemap = function (center,gpxfile,linecolor = 'red') {
  var map = L.map('map', {fullscreenControl: true}).setView(center, 13);

  var baseMaps = {
  	"CartoDB": L.tileLayer.provider('CartoDB.Positron'),
	  "CyclOSM": L.tileLayer.provider('CyclOSM'),
  	"OpenStreetMap": L.tileLayer.provider('OpenStreetMap.Mapnik'),
	  "ESRI World Imagery": L.tileLayer.provider('Esri.WorldImagery'),
  };

  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

  var customLayer = L.geoJson(null, {
  	style: function(feature) {
  		return {
  			color: linecolor,
  			weight: 3,
  			opacity: .75
  			};
  	}
  });

  var Parcours = omnivore.gpx(gpxfile, null, customLayer);
  Parcours.addTo(map);

  L.control.layers(baseMaps, [], {autoZIndex:false, collapsed:false}).addTo(map);
  return 
}