/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

var data = document.getElementById("catsdata").innerHTML;
var json = JSON.parse(data);

// array for converting country names into country codes
var country_codes = [
    ["al", "ALB", "Albania"],
    ["at", "AUT", "Austria"],
    ["be", "BEL", "Belgium"],
    ["ba", "BIH", "Bosnia and Herzegovina"],
    ["bg", "BGR", "Bulgaria"],
    ["hr", "HRV", "Croatia"],
    ["cz", "CZE", "Czech Republic"],
    ["dk", "DNK", "Denmark"],
    ["fi", "FIN", "Finland"],
    ["fr", "FRA", "France"],
    ["de", "DEU", "Germany"],
    ["gr", "GRC", "Greece"],
    ["hu", "HUN", "Hungary"],
    ["is", "ISL", "Iceland"],
    ["ie", "IRL", "Ireland"],
    ["it", "ITA", "Italy"],
    ["mk", "MKD", "Macedonia"],
    ["nl", "NLD", "Netherlands"],
    ["no", "NOR", "Norway"],
    ["pl", "POL", "Poland"],
    ["pt", "PRT", "Portugal"],
    ["ro", "ROU", "Romania"],
    ["si", "SVN", "Slovenia"],
    ["es", "ESP", "Spain"],
    ["se", "SWE", "Sweden"],
    ["ch", "CHE", "Switzerland"],
    ["ua", "UKR", "Ukraine"],
    ["gb", "GBR", "United Kingdom"]
  ];

// color the map when the window is loaded
window.onload = function() {

  // make all countries grey and give all countries a black border
  land = document.getElementsByTagName("path");
  for (var i = 0; i < land.length; i++){
      land[i].setAttribute('fill', '#bfbfbf');
      land[i].setAttribute('stroke', 'black');
  }

  var amount_bounds = 6;
  // array for the used colors
  var color = ['#67000d', '#a50f15', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272']
  // array for the used bounds
  var bounds = [Infinity, 8, 4, 1.5, 1, 0.5]

  // iterte over each datapoint
  json.points.forEach(function(entry){
    for (var i = 0; i < amount_bounds; i++) {
      // search for the countries within the bound
      if (entry.CatPopulation <= bounds[i]){
        // iterate over each country in 'country_codes'
        country_codes.forEach(function(element){
          // convert country name into country code by using the array 'country_codes'
          if (entry.Country == element[2]) {
            // get country ID
            var id = String(element[0])
            // give the country the appropriate color
            document.getElementById(id).setAttribute('fill', color[i])
          }
        })
      }
    }
  });
}
