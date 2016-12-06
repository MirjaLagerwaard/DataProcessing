/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

//set the margin
var margin = {top: 20, right: 50, bottom: 45, left: 55},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// set scale for x
var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

// set scale for y
var y = d3.scale.linear()
  .range([height, 0]);

// set x-axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

// set y-axis
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")

// set the height and with of the chart
var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data from the json file into d3
d3.json("temp_nov_2016.json", function(data) {
  // set x- and y-domain
  x.domain(data.points.map(function(d) { return d.Date; }));
  y.domain([-5, 20]);

	var valueline = d3.svg.line()
			.x(function(d) { return x(d.Date); })
			.y(function(d) { return y(d.MeanTemperature); })
			.interpolate("linear");

	chart.append("path")
			.attr("class", "line")
			.attr("d", valueline(data.points));

  // create the x-axis
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("x", width / 2)
    .attr("y", 42)
    .style("text-anchor", "end")
    .text("Days (November 2016)");

  // create the y-axis
  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -42)
    .attr("x", -height / 2.5)
    .style("text-anchor", "end")
    .text("Temperature (degrees Celcius)");


});

function type(d) {
  d.MeanTemperature = +d.MeanTemperature;
  return d;
}

// queue()
// 	.defer(d3.json, 'temp_nov_2015.json')
// 	.defer(d3.json, 'temp_nov_2016.json')
// 	.await(makeLine);
//
// function makeLine(error, temp_nov_2015, temp_nov_2016) {
//
// }
