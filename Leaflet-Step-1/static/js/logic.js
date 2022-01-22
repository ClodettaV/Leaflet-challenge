// Store our API endpoint inside queryUrl
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';


//Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
   }

   function createMap(earthquakes) {

var satellite_map = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/*satellite-v9*/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='https://docs.mapbox.com/mapbox-gl-js/example/setstyle/'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
// }).addTo(myMap);
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Satellite map": satellite_map
  };

// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3,
  layers: [satellite_map]
});

L.control.layers(baseMaps,{
  // collapsed: false
}).addTo(myMap);
}
