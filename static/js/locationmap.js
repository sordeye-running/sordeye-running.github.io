const markermap = function (lat, lon, markercolor = 'red', mainmap='OpenStreetMap.Mapnik') {
  var map = L.map('map', {fullscreenControl: true}).setView([lat, lon], 13);

  var baseMaps = {
  	"CartoDB": L.tileLayer.provider('CartoDB.Positron'),
	"CyclOSM": L.tileLayer.provider('CyclOSM'),
  	"OpenStreetMap": L.tileLayer.provider('OpenStreetMap.Mapnik'),
	"ESRI World Imagery": L.tileLayer.provider('Esri.WorldImagery'),
  };

  L.tileLayer.provider(mainmap).addTo(map);
  var marker = L.marker([lat, lon]).addTo(map);

  L.control.layers(baseMaps, [], {autoZIndex:false, collapsed:false}).addTo(map);
  return 
}