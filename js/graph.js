var input = document.getElementById('input');
var values = document.querySelector('.values-field');

var data = [
{"date":" 8:22:777","value":28},
{"date":" 23:30:333","value":53},
{"date":" 35:30:555","value":165},
{"date":" 38:32:777","value":16}
];

$('input').keyup(function(e){
 if (e.keyCode === 13) {
 	console.log("input");
	var newValue = document.createElement("div");
  var removeButton = document.createElement("div");
  var time = new Date();
  var dateString = ' ';
  dateString += time.getMinutes() +':';
  dateString += time.getSeconds() +':';
  dateString += time.getMilliseconds();
  var valueNumber = Number(input.value);
  data.push({"date": dateString, "value" : valueNumber })
  removeButton.className = "remove-button";
  newValue.className = "new-value";
  newValue.innerHTML = input.value + dateString;
  removeButton.innerHTML = "Remove";
  newValue.appendChild(removeButton);
  values.appendChild(newValue);
  //Draw();
  //getData();
  }
})

var Vfield = document.querySelector(".values-field");

if (Vfield.contains("div")) {
  $("remove-button").click(function(e) {
    console.log("g");
  });
}
// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

// Parse the date / time
var	parseDate = d3.time.format(" %M:%S:%L").parse;

// Set the ranges
// Get the data

/*function getData(d) {
  for (var i = 0; i < data.length; i++) {
    d.date = parseDate(d.date);
    d.value = +d.value;
  }
}*/
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

x.range([0, 500]);

var newData = [];

formatDate = d3.time.format("%M:%S:%L")


function getData() {

data.forEach(function(d) {
//console.log(d);
	d.date = parseDate(d.date);
	d.value = +d.value;
  //console.log(d);
});

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.value; })]);

//var domain = x.domain();
//var maxDay = new Date(domain[1]);
//maxDay.setDate(maxDay.getDate() + 1);
//var buckets = d3.time.minutes(domain[0], maxDay);

//var newData = [];


for (var i=0;i<data.length;i++)
	{
  console.log(data[i]);
		newData[i] = {};
		newData[i]['value'] = data[i]['value'];
		newData[i]['date'] = data[i]['date'];
    console.log(newData);
	}

  Draw();
}
// Define the axes
/*var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(8);

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);*/

// Define the line
var field = document.getElementById("field-main");

var	svg = d3.select(field)
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function Draw() {
var	valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { console.log(d.value); return y(d.value); });
  //svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  //svg.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");

	// Add the valueline path.
	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(newData));
}
	// Add the X Axis
	/*svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Add the Y Axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);
*/
