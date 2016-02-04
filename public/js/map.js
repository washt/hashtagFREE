$(function () {
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhamhhcnJpcyIsImEiOiJjaWs4aXY4OTUwMnM4dTNrdzc0NDI3Mm1yIn0.2qKe8jSYKFlGRiApo2ZiVw';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v8', //stylesheet location
      center: [-76.3065812, 36.8860153], // starting position
      zoom: 18, // starting zoom
      pitch: 75
  });
});
