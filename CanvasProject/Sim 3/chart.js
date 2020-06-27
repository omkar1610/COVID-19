var chart_div = document.getElementById('d2');
var infect = {
  x: [],  y: [],
  mode: 'lines',  type: 'bar'
};



var trace2 = {
  x: [2, 3, 4, 5],  y: [16, 5, 11, 9],
  mode: 'lines',  type: 'scatter'
};

var layout = {
  title: 'Data',
  xaxis: {
    title: 'Time',showgrid: false,zeroline: false
  },
  yaxis: {
    title: 'Number',showline: false
  },
  height: 600,
  width: 600
};

var data = [infect];

// Plotly.newPlot('d2', data, layout);