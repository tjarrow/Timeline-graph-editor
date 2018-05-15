
var jsonData = localStorage.getItem("data");

var data = [];
data = JSON.parse(jsonData);
// var newData = JSON.parse(localStorage.newData);
 // var svg = localStorage.getItem("svg");

// var leftPanel = document.getElementById('panel-1'),
//     leftArrow = document.getElementById('arrow-left'),
//     rightPanel = document.getElementById('panel-3'),
//     mainPanel = document.getElementById('panel-2'),
//     rightArrow = document.getElementById('arrow-right'),
var  field = document.getElementById("field-main");

$("#arrow-left").on("click",  function() {
  console.log("A");
  $("#panel-1").toggleClass('side-panel__hidden');
  $("#arrow-left").toggleClass('arrow-left__hidden');
  //leftArrow.classList.toggle("arrow-left__hidden");
  $("#panel-2").toggleClass("main-pannel__to-side");
  $('#field-main').toggleClass("field-main__to-side");
  $(".line").toggleClass("graph-wide");
  // if ($('#panel-2').hasClass("main-pannel__to-side")) {
  //   $('#panel-2').toggleClass("main-pannel__wide");
  //   $('#panel-2').toggleClass("main-pannel__to-side");
  //   $("#field-main").toggleClass("field-main__wide");
  //   $("#field-main").removeClass("field-main__to-side");
  // }
})

$("#arrow-right").on("click",  function() {
  $("#panel-3").toggleClass('side-panel__hidden');
  $("#arrow-right").toggleClass('arrow-right__hidden');
  $("#panel-2").toggleClass("main-pannel__to-side");
  // document.querySelector(".line").classList.toggle("graph-wide");
  $('#field-main').toggleClass("field-main__to-side");
  $(".line").toggleClass(".graph-wide");
})


var input = document.getElementById('input');
var values = document.querySelector('.values-field');

$('input').keyup(function(e){
 if (e.keyCode === 13) {

	var newValue = document.createElement("div"),
      removeButton = document.createElement("div"),
      time = new Date(),
      dateString = ' ',
      valueNumber = Number(input.value);

  dateString += time.getMinutes() +':';
  dateString += time.getSeconds() +':';
  dateString += time.getMilliseconds();
  data.push({"date": dateString, "value" : valueNumber })
  removeButton.className = "remove-button";
  removeButton.setAttribute("data-index",data.length - 1);
  removeButton.innerHTML = "Remove";
  newValue.className = "new-value";
  newValue.innerHTML = input.value + dateString;
  newValue.appendChild(removeButton);
  values.appendChild(newValue);

  getData();
  }
})

$('.values-field').on('click',".remove-button", function(){
  var arrIndex = $(this).attr("data-index");
   data.splice(arrIndex,1);
   newData.splice(arrIndex,1);
   length--;
   $(this).parent().remove();
   Clear();
   Draw();
});

$("#input").on('focus', function() {
  $(".change-input").addClass("change-input--visible");
})

$(".inc").on('click', function() {
  input.value++;
})

$(".dec").on('click', function() {
  input.value--;
})

var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 600 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

var	parseDate = d3.time.format(" %M:%S:%L").parse,
	  x = d3.time.scale().range([0, width]),
	  y = d3.scale.linear().range([height, 0]);

x.range([0, 500]);

var newData = [];

formatDate = d3.time.format("%M:%S:%L")

function getData() {

  Clear();

  data[length].date = parseDate(data[length].date);
  data[length].value = +data[length].value;
  length++;

  x.domain(d3.extent(data, function(data) { return data.date; }));
  y.domain([0, d3.max(data, function(data) { return data.value; })]);

  for (var i=0;i<data.length;i++)
  	{
  		newData[i] = {};
  		newData[i]['value'] = data[i]['value'];
  		newData[i]['date'] = data[i]['date'];
  	}

    Draw();

    localStorage.setItem("data", JSON.stringify(data));

}


var svg = d3.select(field)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function Draw() {

  var	valueline = d3.svg.line()
  	.x(function(data) { return x(data.date); })
  	.y(function(data) { console.log(data.value); return y(data.value); });
  	svg.append("path")
  		.attr("class", "line")
  		.attr("d", valueline(newData));
    //  localStorage.setItem("svg", JSON.stringify(svg));

}

function Clear() {
  d3.selectAll("g > *").remove();
}

//localStorage.setItem("data", JSON.stringify(data));
// localStorage.newData = JSON.stringify(newData);
