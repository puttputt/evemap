// var spaceCircles = [30, 70, 110];

// var systems = [ {
//   x: 30,
//   y: 30,
// },
// {
//   x: 70,
//   y: 70,
// }
//               ];

// var svgContainer = d3.select("body").append("svg")                                    .attr("width", 500)
//     .attr("height", 500)
//     .style("border", "1px solid black");

// var circles = svgContainer.selectAll("rect")
//   .data(systems)
//   .enter()
//   .append("rect");

// var circlAttr = circles
//   .attr("x", function(d) { return d.x;} )
//   .attr("y", function(d) { return d.y; })
//   .attr("width", 5)
//   .attr("height", 5)
//   .style("fill", "gray");

//https://www.evepanel.net/blog/eve-online/static-data-dump/creating-a-map-of-the-universe.html

import * as d3 from "d3";

let container = d3.select("body").append("svg").attr("height");