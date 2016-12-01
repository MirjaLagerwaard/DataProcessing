/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

// array to get the country codes to colorfill the countries
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

// global variable for data
var data_glob;

// load the data as json
d3.json("cat.json", function(data) {

  var amount_bounds = 6;
  var bounds = [Infinity, 8, 4, 1.5, 1, 0.5];
  var fillkeys = ['> 8', '4 - 8', '1.5 - 4', '1 - 1.5', '0.5 - 1', '0 - 0.5'];

  // building the data_glob variable
  str = '{'

  data.data.forEach(function(entry){
    country_codes.forEach(function(element){

      // convert country name into country code by using the array 'country_codes'
      if (entry.Country == element[2]) {

        // get country ID
        str += '"' + String(element[1]) + '":{'

        // add fillKey for the country
        color = ''
        for (var i = 0; i < amount_bounds; i++) {
          if (entry.Population <= bounds[i]){
            color = '"fillKey":"' + fillkeys[i] + '",'
          }
        }

        // add fillkey to string
        str += color

        // add data value to string
        str += '"population":' + entry.Population + '},'
      }
    })
  })

  // delete the '}' from end of string
  str = str.substr(0, str.length-1) + '}'

  // parse the string as an json object and store in data_glob
  data_glob = JSON.parse(str)

  // make new datamap
  var map = new Datamap({
      element: document.getElementById('container'),
      // zoom into Europe
      setProjection: function(element) {
        var projection = d3.geo.equirectangular()
          .center([12.5, 52])
          .rotate([4.4, 0])
          .scale(885)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path()
          .projection(projection);

        return {path: path, projection: projection};
      },

      // define the colors for the fillkeys
      fills: {
          '0 - 0.5': '#F3FBE6',
          '0.5 - 1': '#CFF09E',
          '1 - 1.5': '#A8DBA8',
          '1.5 - 4': '#79BD9A ',
          '4 - 8': '#3B8686',
          '> 8': '#0B486B',
          defaultFill: '#999999'
      },

      // add the data to the map
      data: data_glob,

      // add geogrpahy configuration
      geographyConfig: {
          borderColor: 'grey',
          highlightFillColor: false,
          highlightBorderColor: '#595959',
          popupOnHover: true,
          // template for popupOnHover
          popupTemplate: function(geo, data) {
              if (data) {
                return ['<div class="hoverinfo"><strong>' +
                      geo.properties.name + '</strong><br>' +
                      data.population + ' million domestic cats']
              }
              // show only name of country when there is no data
              else {
                return ['<div class="hoverinfo"><strong>' +
                      geo.properties.name +
                      '</strong><br>']
              }
          }
      }
  });

  // make legend
  map.legend();
});
