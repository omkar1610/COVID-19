var chart
window.onload = function () {

chart = new CanvasJS.Chart("chartContainer", {
	title:{
		text: "Some Title"
	},
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	animationEnabled: true,
	axisX: {
		interval: 1,
		intervalType: "days"
	},
	toolTip: {
		shared: true
	},
	data: [
    {        
      type: "stackedArea100",
      name: "Red",
//      xValueFormatString: "DD",
//      showInLegend: "true",
      color: "red",
      dataPoints: [
          { x: 00, y: 1 },
          { x: 01, y: 5 },
          { x: 02, y: 7 },
          { x: 03, y: 8 },
          { x: 04, y: 3 },
          { x: 05, y: 2 },
          { x: 06, y: 0 },
          { x: 07, y: 0 },
          { x: 08, y: 0 },
          { x: 09, y: 0 }
      ]
	},
	{        
		type: "stackedArea100",
		name: "Black",
        color: "black",
//		showInLegend: "true",
		dataPoints: [
			{ x: 00, y: 9 },
			{ x: 01, y: 5 },
			{ x: 02, y: 3 },
			{ x: 03, y: 1 },
			{ x: 04, y: 1 },
			{ x: 05, y: 1 },
			{ x: 06, y: 1 },
			{ x: 07, y: 1 },
			{ x: 08, y: 1 },
			{ x: 09, y: 1 }
		]
	},
	{        
		type: "stackedArea100",
		name: "Green",
        color: "green",
//		showInLegend: "true",
		dataPoints: [
			{ x: 00, y: 0 },
			{ x: 01, y: 0 },
			{ x: 02, y: 0 },
			{ x: 03, y: 1 },
			{ x: 04, y: 6 },
			{ x: 05, y: 7 },
			{ x: 06, y: 9 },
			{ x: 07, y: 9 },
			{ x: 08, y: 9 },
			{ x: 09, y: 9 }
		]
	}
	]
});
chart.render();	
  
  
$("#addDataPoint").click(function () {

//	var length = chart.options.data[0].dataPoints.length;
	chart.options.title.text = "New DataPoint Added at the end";
//	chart.options.data[0].dataPoints.push({ y: 25 - Math.random() * 10});
	chart.render();

	});

}
