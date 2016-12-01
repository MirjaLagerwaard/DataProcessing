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

var data_glob;
d3.json("cat.json", function(data) {
  var amount_bounds = 6;

  // array for the used bounds
  var bounds = [Infinity, 8, 4, 1.5, 1, 0.5];
  var fillkeys = ['> 8', '4 - 8', '1.5 - 4', '1 - 1.5', '0.5 - 1', '0 - 0.5'];


  str = '{'
  data.data.forEach(function(entry){
    country_codes.forEach(function(element){

      // convert country name into country code by using the array 'country_codes'
      if (entry.Country == element[2]) {

        // get country ID
        str += '"' + String(element[1]) + '":{'

        color = ''
        for (var i = 0; i < amount_bounds; i++) {
          if (entry.Population <= bounds[i]){
            color = '"fillKey":"' + fillkeys[i] + '",'
          }
        }

        str += color

        str += '"population":' + entry.Population + '},'
      }
    })
  })
  str = str.substr(0, str.length-1) + '}'

  data_glob = JSON.parse(str)

  var map = new Datamap({
      element: document.getElementById('container'),
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

      fills: {
          '0 - 0.5': '#d4f7f6',
          '0.5 - 1': '#67e4de',
          '1 - 1.5': '#1fada6',
          '1.5 - 4': '#17827d',
          '4 - 8': '#0f5753',
          '> 8': '#082b2a',
          defaultFill: '#808080'
      },

      data: data_glob,

      geographyConfig: {
          borderColor: '#999999',
          highlightFillColor: false,
          highlightBorderColor: '#595959',
          popupOnHover: true,
          popupTemplate: function(geo, data) {
              if (data) {
                return ['<div class="hoverinfo"><strong>' +
                      geo.properties.name + '</strong><br>' +
                      data.population + ' million domestic cats']
              }
              else {
                return ['<div class="hoverinfo"><strong>' +
                      geo.properties.name +
                      '</strong><br>']
              }
          }
      }
  });

  map.legend();
});
