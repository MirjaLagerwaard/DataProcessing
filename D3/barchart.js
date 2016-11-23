/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

var width = 960,
    height = 500;

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);


// load data from the json file into d3
d3.json("sunshine.json", function(data) {

  console.log(data.points)
  y.domain([0, d3.max(data.points, function(d) { return d.Percentage; })]);

  var barWidth = width / data.points.length;

  var bar = chart.selectAll("g")
      .data(data.points)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d.Percentage); })
      .attr("height", function(d) { return height - y(d.Percentage); })
      .attr("width", barWidth - 1);

  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.Percentage) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.Percentage; });
});

function type(d) {
  d.Percentage = +d.Percentage;
  return d;
}
