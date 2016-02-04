$(document).ready(function() {
  if ($('#map').length === 0) {
    return;
  }

  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhamhhcnJpcyIsImEiOiJjaWs4aXY4OTUwMnM4dTNrdzc0NDI3Mm1yIn0.2qKe8jSYKFlGRiApo2ZiVw';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/joshuajharris/cik8qfu0o00l596kpqfm842yi', //stylesheet location
      center: [-77.03238901390978, 38.913188059745586], // starting position
      zoom: 18, // starting zoom
      pitch: 75
  });

  map.on('load', function() {
    map.addSource("markers", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-77.03238901390978, 38.913188059745586]
                },
                "properties": {
                    "title": "Mapbox DC",
                    "marker-symbol": "place_label_city"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.414, 37.776]
                },
                "properties": {
                    "title": "Mapbox SF",
                    "marker-symbol": "place_label_city"
                }
            }]
        }
  });

  map.addLayer({
      "id": "markers",
      "type": "symbol",
      "source": "markers",
      "layout": {
          "icon-image": "{marker-symbol}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
      }
  });

});

});
