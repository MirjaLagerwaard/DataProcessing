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

  land = document.getElementsByTagName("path");

  // make all countries grey and give the countries a black border
  for (var i = 0; i < land.length; i++){
    land[i].setAttribute('fill', '#bfbfbf');
    land[i].setAttribute('stroke', 'black');
  }

  json.points.forEach(function(entry){

    if (entry.CatPopulation <= 0.5){
      country_codes.forEach(function(element){
        // convert country name into country code by using the array 'country_codes'
        if (entry.Country == element[2]) {
          var id = String(element[0])
          // give the country the appropriate color
          document.getElementById(id).setAttribute('fill', '#fc9272');
        }
      });
    }

    else if (entry.CatPopulation > 0.5 && entry.CatPopulation <= 1){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#fb6a4a');
        }
      });
    }

    else if (entry.CatPopulation > 1 && entry.CatPopulation <= 1.5){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#ef3b2c');
        }
      });
    }

    else if (entry.CatPopulation > 1.5 && entry.CatPopulation <= 4){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#cb181d');
        }
      });
    }

    else if (entry.CatPopulation > 4 && entry.CatPopulation <= 8){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#a50f15');
        }
      });
    }

    else if (entry.CatPopulation > 8){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#67000d');
        }
      });
    }
  });
}
