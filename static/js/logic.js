// Creating of a Map Object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4
});

// Addition of Title Layer to the Map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// URL with earthquake data for the past week
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to define Colors
function markersColor(magnitude) {
  // Return LawnGreen for magnitude
  // between 0 and 1
  if (magnitude <= 1) {
      return "#7CFC00"
  }
  // Return Gold for magnitude
  // between 1 and 2
  else if (magnitude <= 2) {
      return "#FFD700"
  }
  // Return LightCoral for magnitude
  // between 2 and 3
  else if (magnitude <= 3) {
      return "#F08080"
  }
  // Return IndianRed for magnitude
  // between 3 and 4
  else if (magnitude <= 4) {
      return "#CD5C5C"
  }
  //Return Crimson for magnitude
  //between 4 and 5
  else if (magnitude <= 5) {
      return "#DC143C"
  }
  // Returning Darkred for 
  // magnitude greater than 5
  else {
      return "#8B0000"
  };
};

//Grabbing our GeoJSON data..
d3.json(link, function(response) {
  var data = response.features;
  console.log(data);
  // Creating an array where the relevant information will be stored
  var earthquakeArray = [];

  for (var i = 0; i < data.length; i++) {

    // var features = response[i].features;
    //If "features" exist in the JSON data
    // if (features) {
      //Get the following data point per feature
      var magnitude = data[i].properties.mag;
      var place = data[i].properties.place;
      var time = data[i].properties.time;
      var updated = data[i].properties.updated;
      var lat = data[i].geometry.coordinates[1];
      var long = data[i].geometry.coordinates[0];
      
      //Change Formats for Time and Updated
      var timeNew = new Date(data[i].properties.time);
      // var updatedNew = ;

      //Adding relevant data to Array for each feature
      // earthquakeArray.push([magnitude, place, lat, long]);

      // Create a circle for each marker
      // Passing relevant latitude and longitude
      // as well as using the function to fill color based on magnitude
      L.circle([lat, long], {
        fillColor: markersColor(magnitude),
        fillOpacity: 0.75,
        stroke:false,
        dashArray: '3',
        radius: magnitude * 20000,
      }).bindPopup("<h1>" + "Information </h1> <hr>" + 
                  "<h3>Magnitude: " + magnitude + "</h3>" +
                  "<h3>Location: " + place + "</h3>" +
                  "<h3>Time: " + timeNew + "</h3>"
                  ).addTo(myMap);

                  // "<br><h3>Beginning Time: " + timeNew + "</h3>"+
                  // "<br> End Time: " + updatedNew
    };
    // }
    // console.log(earthquakeArray);
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            labels = ["0-1","1-2","2-3","3-4","4-5","5+"],
            grades = [0,1,2,3,4,5];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markersColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                console.log(markersColor(grades[i] + 1))
        }
    
        return div;
    };
    
    legend.addTo(myMap);

    // CreateLegend();

    // function CreateLegend(){
    //    var legend = L.control({position: "bottomright"});
    //    legend.onAdd = function(){
    //        var div = L.DomUtil.create("div","info legend");
    //        var labels = ["0-1","1-2","2-3","3-4","4-5","5+"];
    //        var legends = [];
    
    //        for(var i=0;i<labels.length;i++){
    //            legends.push("<li style=\"list-style-type:none;\"><div style=\"background-color: " + markersColor(i) + "\">&nbsp;</div> " +
    //            "<div>" + labels[i] + "</div></li>");}
    //            div.innerHTML += "<ul class='legend'>" + legends.join("") + "</ul>";
    //            return div;
    //        };
    
    //        legend.addTo(myMap);
    
    // }


});
