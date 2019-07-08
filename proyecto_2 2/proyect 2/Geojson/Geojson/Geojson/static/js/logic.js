
for (let i = 0; i < mexicoestados.features.length; i++) {
  poligonoActual =   mexicoestados.features[i].properties.admin_name;
  for (let t = 0; t < roboHabitacion.length; t++) { 
    if(roboHabitacion[t].Entidad==poligonoActual){
      mexicoestados.features[i].properties.robHabitacion2018 = roboHabitacion[t]["Robo Habitación 2018"]; 
      mexicoestados.features[i].properties.robHabitacion2019 = roboHabitacion[t]["Robo Habitación 2019"]
      console.log(mexicoestados.features[i].properties)
    }
  }
}

createFeatures(mexicoestados);

function obtienecolor(estado) {
  console.log(estado);
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.admin_name +
      "</h3><hr><p>" + "Robo Habitación 2018: " + feature.properties.robHabitacion2018 + "<br/>" +
      "Robo Habitación 2019: " + feature.properties.robHabitacion2019 + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      // switch (feature.properties.admin_name) {
      //   case "Queretaro": return {color: "#ff0000"};
      // }
      return  {color:obtienecolor(feature.properties.admin_name)};
    }
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Mexico: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      19.432608, -99.133209
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
