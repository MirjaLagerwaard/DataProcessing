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
d3.json("sunshine.json", function(data) {
  // set x- and y-domain
  x.domain(data.points.map(function(d) { return d.Date; }));
  y.domain([0, 100]);

  // create the d3-tip
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:#ff7f50'>" + d.Percentage + "</span> <strong style='color:#ff7f50'>%</strong>";
    })
  chart.call(tip);

  // create the x-axis
  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("x", width / 2)
    .attr("y", 42)
    .style("text-anchor", "end")
    .text("Days");

  // create the y-axis
  chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -42)
    .attr("x", -height / 2.5)
    .style("text-anchor", "end")
    .text("Percentage");

  // make the bars of the chart by using the data values
  var bar = chart.selectAll(".bar")
    .data(data.points)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Date); })
    .attr("y", function(d) { return y(d.Percentage); })
    .attr("height", function(d) { return height - y(d.Percentage); })
    .attr("width", x.rangeBand())
    // change color of the bars on mouse hover and show the data value by using the d3-tip
    .on("mouseover", function(d){
      d3.select(this)
        .style("fill", "#ffb499");
      tip.show(d)
    })
    // change the color back on mouse out and hide the d3-tip
    .on("mouseout", function(){
      d3.select(this)
        .style("fill", "#ff7f50");
      tip.hide()
    });
});

function type(d) {
  d.Percentage = +d.Percentage;
  return d;
}
