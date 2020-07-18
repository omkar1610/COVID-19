
function get_chart(){
  return new CanvasJS.Chart("chartContainer", {
//    title:{
//      text: "Just the Title"
//    },
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    animationEnabled: true,
    // axisX: {
    //   intervalType: "days"
    // },
    toolTip: {
      shared: true
    },
    data: [
      {        
        type: "stackedArea100",
        name: "Infected",
       // showInLegend: "true",
        color: "red",
        dataPoints: []
      },
      {        
        type: "stackedArea100",
        name: "Uninfected",
        color: "black",
        // showInLegend: "true",
        dataPoints: []
      },
      {        
        type: "stackedArea100",
        name: "Recovered",
        color: "green",
        // showInLegend: "true",
        dataPoints: []
      }
    ]
  })
}

chart = get_chart();
// chart.render(); 
var updateCount = 0;

//Update Chart
var updateChart = function () {

  updateCount++;
  
  tmpData = get_data()
  // console.log(updateCount, tmpData)
    sim_data.push(tmpData)

  chart.options.data[0].dataPoints.push({y : tmpData.red})
  chart.options.data[1].dataPoints.push({y : tmpData.black})
  chart.options.data[2].dataPoints.push({y : tmpData.green})
      
  // chart.options.title.text = "Update " + updateCount;
  chart.render();   
};

var resetChart = function () {
  console.log("reset Graph")
  chart = get_chart()
  updateCount = 0
  // chart.destroy()
  chart.options.data[0].dataPoints = [];
  chart.options.data[1].dataPoints = [];
  chart.options.data[2].dataPoints = [];
  // chart.render();        
};

function write_file(){
    var blob = new Blob(sim_data, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello_world.txt");
}




// update chart every second

// setInterval(function(){updateChart()}, 1000);
