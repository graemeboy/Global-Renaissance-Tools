/*
	Author: Graeme Boy (graemeboy@gmail.com)
	Strongly based on the work at: http://neuralengr.com/asifr/journals/
	
	Description: Description: I used data from the Global Renaissance eBooks corpus to generate 
	data relating to how often certain place names were mentioned in the titles and 
	descriptions of each of the works it contains. I use this information to create the visualization.

*/

var margin = {
	top: 20,
	right: 200,
	bottom: 0,
	left: 20
},
	width = 700,
	height = 650;
var c = d3.scale.category20c(); // color
// Standardized Ordinal Values
var MIN_PUBL_YEAR = 1500;
var MAX_PUBL_YEAR = 1750;
var year_diff = MAX_PUBL_YEAR - MIN_PUBL_YEAR;
var year_steps = parseInt(year_diff / 10);
var xAxisValues = new Array();
// create the steps; we'll have ten steps
for (var i = 0; i < 10; i++) {
	start = MIN_PUBL_YEAR + (i * year_steps);
	var end = start + year_steps;
	strKey = start + '-' + end;
	xAxisValues[i] = strKey.toString();
}

var x = d3.scale.ordinal().domain(xAxisValues).rangeBands([0, width]);
var xAxis = d3.svg.axis().scale(x).orient("top");
var svg = d3.select("#circlesChart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).style("margin-left", margin.left + "px").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function getMidYear(strDateRange) {
	var dates = strDateRange.toString().split('-');
	var midYear = Math.round((parseInt(dates[0]) + parseInt(dates[1])) / 2);
	return midYear;
}
// First, get the highest value of all of the data
var highestValue = 0;
d3.json("frequencyData.json", function(data) {
	for (var j = 0; j < data.length; j++) {
		if (data[j].greatest_mentions > highestValue) {
			highestValue = data[j].greatest_mentions;
		}
	}
	var xScale = d3.scale.ordinal().range([0, width]);
	svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + 0 + ")").call(xAxis);
	for (var j = 0; j < data.length; j++) {
		x.domain(data[j]['mentions'], function(d) {
			return d[0]
		});
		var g = svg.append("g").attr("class", "journal");
		var maxInSet = d3.max(data[j]['mentions'], function(d) {
			return d[1];
		});
		var circles = g.selectAll("circle").data(data[j]['mentions']).enter().append("circle");
		var text = g.selectAll("text").data(data[j]['mentions']).enter().append("text");
		circles.attr("cx", function(d, i) {
			// find the position in the xAxisValues array, and multiply that by the range band
			return xAxisValues.indexOf(d[0]) * x.rangeBand() + 35;
			//return x.rangeBand() * i + 35 
		}) // cx
		.attr("cy", j * 30 + 20) // position of the cirlces, vertically
		.attr("r", function(d) {
			// use this for now, but should probably have logarithms and fancy math. 
			return parseInt((d[1] / highestValue) * 15);
		}) // radius scale
		.style("fill", function(d) {
			return c(j);
		});
		text.attr("y", j * 30 + 25) // position of the text vertically
		.attr("x", function(d, i) {
			return xAxisValues.indexOf(d[0]) * x.rangeBand() + 25;
		}).attr("class", "value").text(function(d) {
			return d[1];
		}).style("fill", function(d) {
			return c(j);
		}).style("display", "none");
		g.append("text").attr("y", j * 30 + 25) // position of the text, vertically
		.attr("x", width + 20).attr("class", "label").text(data[j]['name']).style("fill", function(d) {
			return c(j);
		}).on("mouseover", mouseover).on("mouseout", mouseout);
	};

	function mouseover(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("circle").style("display", "none");
		d3.select(g).selectAll("text.value").style("display", "block");
	}

	function mouseout(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("circle").style("display", "block");
		d3.select(g).selectAll("text.value").style("display", "none");
	}
});