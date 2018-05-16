
var data = [];
var clickCountLeft = 0;
var clickCountRight = 0;

$("#arrow-left").on("click",  function() {

  clickCountLeft++;

  $("#panel-1").toggleClass('side-panel__hidden');
  $("#arrow-left").toggleClass('arrow-left__hidden');
  $("#panel-2").toggleClass("main-pannel__to-side");
  $('#panel-2').toggleClass("shadow-right");
  $('#field-main').toggleClass("field-main__to-side");

  if (clickCountLeft % 2 == 0) {
    Clear();
    $("svg").attr("width","700");
    Draw();
  } else {
    Clear();
    $("svg").attr("width","900");
    drawWide();
  }

  if ((clickCountLeft % 2 != 0) && (clickCountRight % 2 != 0) && (clickCountRight > 0) && (("#panel-2:has(main-pannel__wide)")) ) {
    Clear();
    $("svg").attr("width","1100");
    drawFull();
  }

  if ($('#panel-3').hasClass("side-panel__hidden")) {

    $('#panel-2').toggleClass("main-pannel__wide");
    $('#panel-2').removeClass("main-pannel__to-side");
    $("#field-main").toggleClass("field-main__wide");
    $("#field-main").removeClass("field-main__to-side");

  }

   if ($("#panel-2:has(main-pannel__wide)")) {

     $('#panel-2').removeClass("main-pannel__wide");
     $('#panel-2').addClass("main-pannel__to-side");
     $("#field-main").removeClass("field-main__wide");
     $("#field-main").addClass("field-main__to-side");

   }

})

$("#arrow-right").on("click",  function() {

  clickCountRight++;

  $("#panel-3").toggleClass('side-panel__hidden');
  $("#arrow-right").toggleClass('arrow-right__hidden');
  $("#panel-2").toggleClass("main-pannel__to-side");
  $('#panel-2').toggleClass("shadow-left");
  $('#field-main').toggleClass("field-main__to-side");

  if (clickCountRight % 2 == 0) {
    Clear();
    $("svg").attr("width","700");
    Draw();
  } else {
    Clear();
    $("svg").attr("width","900");
    drawWide();
  }

  if ((clickCountLeft % 2 != 0) && (clickCountRight % 2 != 0) && (clickCountLeft > 0) && (("#panel-2:has(main-pannel__wide)")) ) {
    Clear();
    $("svg").attr("width","1100");
    drawFull();
  }

  if ($('#panel-1').hasClass("side-panel__hidden")) {

    $('#panel-2').toggleClass("main-pannel__wide");
    $('#panel-2').removeClass("main-pannel__to-side");
    $("#field-main").toggleClass("field-main__wide");
    $("#field-main").removeClass("field-main__to-side");

  }

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

  data.push({"date": dateString, "value" : valueNumber });

  removeButton.className = "remove-button";
  removeButton.setAttribute("data-index",data.length - 1);
  removeButton.innerHTML = "Remove";

  newValue.className = "new-value";
  newValue.innerHTML = dateString + "<b>" + input.value + "</b>";
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
   $(".dots:eq(arrIndex)").remove();
   $(".dots-value:eq(arrIndex)").remove();
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

}

var field = document.getElementById("field-main");

var svg = d3.select(field)
  .append("svg")
  .attr("width", "700")
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function Draw() {

  var	valueline = d3.svg.line()

	.x(function(data) { return x(data.date); })
	.y(function(data) { return y(data.value); });

  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(newData));

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class","dots")
    .attr("r", 0)
    .attr("cx", function(data) { return x(data.date); })
    .attr("cy", function(data) { return y(data.value); });

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("text")
    .attr("font-size","15px")
    .attr("class","dots-value")
    .attr("dx", function(data) { return x(data.date); })
    .attr("dy", function(data) { return y(data.value); })
    .text(function(data) { return data.value });
}

function drawWide() {
  var	valueline = d3.svg.line()

  .x(function(data) { return x(data.date)*1.5; })
  .y(function(data) { return y(data.value); });

  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(newData));

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class","dots")
    .attr("r", 0)
    .attr("cx", function(data) { return x(data.date)*1.5; })
    .attr("cy", function(data) { return y(data.value); });

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("text")
    .attr("font-size","15px")
    .attr("class","dots-value")
    .attr("dx", function(data) { return x(data.date)*1.5; })
    .attr("dy", function(data) { return y(data.value); })
    .text(function(data) { return data.value });
}

function drawFull() {
  var	valueline = d3.svg.line()

  .x(function(data) { return x(data.date)*2; })
  .y(function(data) { return y(data.value); });

  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(newData));

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class","dots")
    .attr("r", 0)
    .attr("cx", function(data) { return x(data.date)*2; })
    .attr("cy", function(data) { return y(data.value); });

  svg.selectAll("dot")
    .data(data)
    .enter()
    .append("text")
    .attr("font-size","15px")
    .attr("class","dots-value")
    .attr("dx", function(data) { return x(data.date)*2; })
    .attr("dy", function(data) { return y(data.value); })
    .text(function(data) { return data.value });
}

function Clear() {
  d3.selectAll("g > *").remove();
}
