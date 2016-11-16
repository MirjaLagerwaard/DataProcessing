/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

var data = document.getElementById("catsdata").innerHTML;
var json = JSON.parse(data);

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
    ["it", "ITA", "Italy"],
    ["nl", "NLD", "Netherlands"],
    ["no", "NOR", "Norway"],
    ["pl", "POL", "Poland"],
    ["pt", "PRT", "Portugal"],
    ["ro", "ROU", "Romania"],
    ["rs", "SRB", "Serbia"],
    ["si", "SVN", "Slovenia"],
    ["es", "ESP", "Spain"],
    ["se", "SWE", "Sweden"],
    ["ch", "CHE", "Switzerland"],
    ["ua", "UKR", "Ukraine"],
    ["gb", "GBR", "United Kingdom"] ];

window.onload = function() {

  land = document.getElementsByTagName("path");

  for (var i = 0; i < land.length; i++){
    land[i].setAttribute('fill', '#bfbfbf');
    land[i].setAttribute('stroke', 'black');
  }

  json.points.forEach(function(entry){

    if (entry.CatPopulation <= 1){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#fc9272');
        }
      });
    }

    else if (entry.CatPopulation > 1 && entry.CatPopulation <= 2){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#fb6a4a');
        }
      });
    }

    else if (entry.CatPopulation > 2 && entry.CatPopulation <= 4){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#ef3b2c');
        }
      });
    }

    else if (entry.CatPopulation > 4 && entry.CatPopulation <= 6){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#cb181d');
        }
      });
    }

    else if (entry.CatPopulation > 6 && entry.CatPopulation <= 8){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#a50f15');
        }
      });
    }

    else if (entry.CatPopulation > 8 && entry.CatPopulation <= 10){
      country_codes.forEach(function(element){
        if (entry.Country == element[2]) {
          var id = String(element[0])
          document.getElementById(id).setAttribute('fill', '#67000d');
        }
      });
    }
  });
}


// else if (entry.Catpopulation <= 2){
//
// }
//
// else if (entry.Catpopulation <= 5){
//
// }
//
// else if (entry.Catpopulation > 10){
//
// }

// data.forEach(function(entry){
//   var jsonObject = JSON.parse(entry);
//   console.log(jsonObject)
// });
