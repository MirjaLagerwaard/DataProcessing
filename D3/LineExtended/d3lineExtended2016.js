/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/

function loadData2016() {

  // clear the content of the svg
  d3.selectAll("svg > *").remove();

  // disable the 2016 button and enable the 2015 button
  document.getElementById("year2015").disabled = false;
  document.getElementById("year2016").disabled = true;

  //set the margin
  var margin = {top: 20, right: 50, bottom: 45, left: 55},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set scale for x
  var x = d3.scale.linear()
    .range([0, width]);

  // set scale for y
  var y = d3.scale.linear()
    .range([height, 0]);

  // set x-axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(30)
    .tickFormat(d => { if(d == 0) {return ""} else {return d}}) // ensures that the zero will not be printed double
    .orient("bottom");

  // set y-axis
  var yAxis = d3.svg.axis()
    .scale(y)
    .ticks([20])
    .orient("left")

  // set the height and with of the chart with margin
  var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // load data from the json file into d3
  d3.json("temp_nov_2016.json", data => {

    // set x- and y-domain
    x.domain([0, d3.max(data.points, d => {return +d.Date})]);
    y.domain([d3.min(data.points, function(d) {return +d.MinTemperature;}), d3.max(data.points, function(d) {return +d.MaxTemperature;})]);

    // set line of graph for mean temperature
  	var meanTempLine = d3.svg.line()
        .x(function(d) { return x(d.Date); })
  			.y(function(d) { return y(d.MeanTemperature); })
  			.interpolate("linear");

    // draw the line of the mean temperature
  	chart.append("path")
  			.attr("class", "line")
  			.attr("d", meanTempLine(data.points))
        .style("stroke", "#66c2a4");

    // set name of line
    chart.append("text")
        .attr("transform", "translate(" + x(30) + "," + y(data.points[29].MeanTemperature) + ")")
        .text("Mean")

    // set line of graph for minimum temperature
  	var minTempLine = d3.svg.line()
        .x(function(d) { return x(d.Date); })
  			.y(function(d) { return y(d.MinTemperature); })
  			.interpolate("linear");

    // draw the line of the minimun temperature
  	chart.append("path")
  			.attr("class", "line")
  			.attr("d", minTempLine(data.points))
        .style("stroke", "#ccece6");;

    // set name of line
    chart.append("text")
        .attr("transform", "translate(" + x(30) + "," + y(data.points[29].MinTemperature) + ")")
        .text("Minimun")

    // set line of graph for maximum temperature
  	var maxTempLine = d3.svg.line()
        .x(function(d) { return x(d.Date); })
  			.y(function(d) { return y(d.MaxTemperature); })
  			.interpolate("linear");

    // draw the line of the maximum temperature
  	chart.append("path")
  			.attr("class", "line")
  			.attr("d", maxTempLine(data.points))
        .style("stroke", "#ccece6")

    // set name of line
    chart.append("text")
        .attr("transform", "translate(" + x(30) + "," + y(data.points[29].MaxTemperature) + ")")
        .text("Maximum")

    // create the x-axis
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(xAxis)
    .append("text")
      .attr("x", width)
      .attr("y", 42)
      //.style("text-anchor", "end")
      .text("Days of November");

    // create the y-axis
    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -42)
      .attr("x", -height / 3.5)
      //.style("text-anchor", "end")
      .text("Temperature (degrees Celcius)");

      // make the cross hair
      var crossHair = chart.append("g").attr("class", "crosshair");

      // horizontal cross hair
      crossHair.append("line").attr("id", "h_crosshair")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", 0)
          .style("stroke", "gray")
          .style("stroke-width", "2px")
          .style("stroke-dasharray", "5,5");

      // vertical cross hair
      crossHair.append("line").attr("id", "v_crosshair")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", 0)
          .style("stroke", "gray")
          .style("stroke-width", "2px")
          .style("stroke-dasharray", "5,5");

      // text label for cross hair
      crossHair.append("text").attr("id", "crosshair_text")
          .style("font", "13px sans-serif")
          .style("stroke", "black")
          .style("stroke-width", "0.25px");

      // add cross hair on moveover, hide on mouseout
      chart.on("mousemove", function () {
          var xCoord = d3.mouse(this)[0],
              yCoord = d3.mouse(this)[1];
              addCrossHair(xCoord, yCoord, data);
          })
          .on("mouseover", function () {d3.selectAll(".crosshair").style("display", "block");})
          .on("mouseout", function () {d3.selectAll(".crosshair").style("display", "none");});

      // function for analyzing which data line is nearest the mouse coordinates
      function nearby(xCoord, yCoord, data) {

        x1 = data.points[Math.round(x.invert(xCoord)) - 1].MeanTemperature
        x2 = data.points[Math.round(x.invert(xCoord)) - 1].MinTemperature
        x3 = data.points[Math.round(x.invert(xCoord)) - 1].MaxTemperature

        y1 = y(x1)
        y2 = y(x2)
        y3 = y(x3)

        // calculate the distance between the graph line and mouse coordinates
        delta_y1 = Math.abs(yCoord - y1)
        delta_y2 = Math.abs(yCoord - y2)
        delta_y3 = Math.abs(yCoord - y3)

        // return the value of the line which is nearest the mouse coordinates
        if (delta_y1 < delta_y2 && delta_y1 < delta_y3) {
          return x1
        }
        if (delta_y2 < delta_y1 && delta_y2 < delta_y3) {
          return x2
        }
        else {
          return x3
        }
      }

      function addCrossHair(xCoord, yCoord, data) {
          // Update horizontal cross hair
          d3.select("#h_crosshair")
              .attr("x1", x(0))
              .attr("y1", yCoord)
              .attr("x2", x(d3.max(data.points, d => {return +d.Date})))
              .attr("y2", yCoord)
              .style("display", "block");
          // Update vertical cross hair
          d3.select("#v_crosshair")
              .attr("x1", xCoord)
              .attr("y1", y(d3.min(data.points, d => {return +d.MinTemperature})))
              .attr("x2", xCoord)
              .attr("y2", y(d3.max(data.points, d => {return +d.MaxTemperature})))
              .style("display", "block");

          // Update text label
          if (x.invert(xCoord) < 1) {
            xCoord = x(1)
          }

          result = nearby(xCoord, yCoord, data)
          d3.select("#crosshair_text")
              .attr("transform", "translate(" + (xCoord + 5) + "," + (yCoord - 5) + ")")
              .text("(" + Math.round(x.invert(xCoord)) + " , " + result + ")");
      }

  });

  function type(d) {
    d.MeanTemperature = +d.MeanTemperature;
    return d;
  }
};
