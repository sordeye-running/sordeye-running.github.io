const makemap2 = function (gpxfile,linecolor = 'red', mainmap='OpenStreetMap.Mapnik') {
  var map2 = L.map('map2', {fullscreenControl: true});

  var baseMaps = {
  	"CartoDB": L.tileLayer.provider('CartoDB.Positron'),
	"CyclOSM": L.tileLayer.provider('CyclOSM'),
  	"OpenStreetMap": L.tileLayer.provider('OpenStreetMap.Mapnik'),
	"ESRI World Imagery": L.tileLayer.provider('Esri.WorldImagery'),
  };

  L.tileLayer.provider(mainmap).addTo(map2);
  var latlon = [];


  var onEachFeature = function (feature, layer) {
	coords = feature.geometry.coordinates;
	for ( var i=0; i < coords.length; ++i ){
		latlon.push(L.latLng(coords[i][1], coords[i][0]));
	}	
  };

  var customLayer = L.geoJson(null, {
  	style: function(feature) {
  		return {
  			color: linecolor,
  			weight: 3,
  			opacity: .75
  			};
  	},
	onEachFeature: onEachFeature
  });

  omnivore.gpx(gpxfile, null, customLayer).on('ready', function() {
	line = L.polyline(latlon, { color: linecolor, showAll: 11, offset: 1600, distanceMarkers: true });
	L.marker(latlon[0]).addTo(map2);
	map2.addLayer(line);
	map2.fitBounds(line.getBounds());
  });


  L.control.layers(baseMaps, [], {autoZIndex:false, collapsed:false}).addTo(map2);
  return 
}