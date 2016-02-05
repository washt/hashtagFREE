$(document).ready(function() {
  if ($('#map').length === 0) {
    return;
  }

  var mapStyle = 0;

	$("#map_button").click(function(){
		if ( mapStyle == 0 ) {
      $('.main_div').hide(1000);
			$("#map").animate({opacity: 1});
			mapStyle = 1;
		} else {
      $('.main_div').show(1000);
			$("#map").animate({opacity: 0});
			mapStyle = 0;
		}
	});


  // mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhamhhcnJpcyIsImEiOiJjaWs4aXY4OTUwMnM4dTNrdzc0NDI3Mm1yIn0.2qKe8jSYKFlGRiApo2ZiVw';
  mapboxgl.accessToken = 'pk.eyJ1IjoiamlhbmNhcmxvIiwiYSI6ImNpazhram1taTAzMGp1aGt3NWJ6MjQ4OTQifQ.h-EKdAtNeq0bwfdf4O_cwA';
  // var map = new mapboxgl.Map({
  //     container: 'map', // container id
  //     style: 'mapbox://styles/joshuajharris/cik8qfu0o00l596kpqfm842yi', //stylesheet location
  //     center: [-77.03238901390978, 38.913188059745586], // starting position
  //     zoom: 18, // starting zoom
  //     pitch: 75
  // });

var features = [];
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  var html = $('body>#marker-template').html();
  $('#events div').each(function(i, event) {
  var markerTemp = _.template(html);
    var marker = {
      name: $(event).children('input[name=name]').val(),
      description: $(event).children('input[name=description]').val(),
      lat: $(event).children('input[name=lat]').val(),
      long: $(event).children('input[name=long]').val()
    };
    // var lat = $(event).children('input[name=lat]').val();
    // var long = $(event).children('input[name=long]').val();
    var feature = {
        "type": "Feature",
        "properties": {
            "description": markerTemp(marker),
            "marker-symbol": "restaurant"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [marker.lat, marker.long]
        }
    };
    features.push(feature);
  });

  var markers = {
      "type": "FeatureCollection",
      "features": features
  };

  var map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/mapbox/streets-v8',
      // style: 'mapbox://styles/joshuajharris/cik91dyhk000f9fm1aogokton',
      style: 'mapbox://styles/jiancarlo/cik9zskbd00239fm1r8akwpj2',
      // center: [-77.020945, 38.878241],
      center: [-76.305396,36.886563],
      zoom: 18, // starting zoom
      pitch: 60
  });

  map.on('style.load', function () {
      // Add marker data as a new GeoJSON source.
      map.addSource("markers", {
          "type": "geojson",
          "data": markers
      });

      // Add a layer showing the markers.
      map.addLayer({
          "id": "markers",
          "interactive": true,
          "type": "symbol",
          "source": "markers",
          "layout": {
              "icon-image": "{marker-symbol}-15"
          }
      });
  });

  // When a click event occurs near a marker icon, open a popup at the location of
  // the feature, with description HTML from its properties.
  map.on('click', function (e) {
      map.featuresAt(e.point, {layer: 'markers', radius: 50, includeGeometry: true}, function (err, features) {
          if (err || !features.length)
              return;

          var feature = features[0];

          new mapboxgl.Popup()
              .setLngLat(feature.geometry.coordinates)
              .setHTML(feature.properties.description)
              .addTo(map);
      });
  });

  // Use the same approach as above to indicate that the symbols are clickable
  // by changing the cursor style to 'pointer'.
  map.on('mousemove', function (e) {
      map.featuresAt(e.point, {layer: 'markers', radius: 50}, function (err, features) {
          map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
      });
  });

  map.on('click', function(e) {
    console.log(e.lngLat);
  });
  //
  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth()+1; //January is 0!
  // var yyyy = today.getFullYear();
  //
  // if(dd<10) {
  //     dd='0'+dd
  // }
  //
  // if(mm<10) {
  //     mm='0'+mm
  // }
  //
  // today = yyyy + '-' + mm+'-'+dd;
  // console.log(today);
  // document.getElementById("eventDate").valueAsDate = new Date();
  // $('#eventDate').val(today);
});
