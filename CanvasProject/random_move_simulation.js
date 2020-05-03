// var canvas3 = document.getElementById("chart");
// var ctx = canvas3.getContext('2d')


// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: [],
//         datasets: [{
//           label: 'First',
//           backgroundColor: 'red',
//           borderColor: 'red',
//           data: [],
//           fill: false,
//         }]
//       },
// });

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }


// *********************************************************************************************************************)

var canvas2 = document.getElementById('simulation');


// var width = window.innerWidth - 1;
// var height = window.innerHeight - 1;
var width = 600;
var height = 600;
canvas2.width = width;
canvas2.height = height;

var cc = canvas2.getContext('2d');


var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas2.width = innerWidth
  canvas2.height = innerHeight

  init()
})

addEventListener('click', function(){
  init();
})


//Utility Function
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  // return colors[Math.floor(Math.random() * colors.length)]
  if(Math.random()<initial_infect){
    infected++;
    return 'red';
  }
  else{
    total++;
    return 'black';
  }
}
function isCollision(c1, c2){
  if((c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y) <= (c1.radius + c2.radius)*(c1.radius + c2.radius))
    return 1;
  return 0;
}

function boundary_bounce(circle){
 if(circle.x + circle.radius >= canvas2.width)
   circle.velocity.x = -(Math.random()+0.1) * Speed;
 if(circle.x - circle.radius <=0)
   circle.velocity.x = (Math.random()+0.1) * Speed;

 if(circle.y + circle.radius >= canvas2.height)
   circle.velocity.y = -(Math.random()+0.1) * Speed
 if(circle.y - circle.radius <=0)
     circle.velocity.y = (Math.random()+0.1) * Speed 
}

// Objects
class Circle {
  constructor() {
    this.id;
    this.radius = Radius;
    this.x = randomIntFromRange(this.radius, canvas2.width-this.radius);
    this.y = randomIntFromRange(this.radius, canvas2.height-this.radius);
    this.velocity = {
      x: (Math.random() - 0.5) * Speed,
      y: (Math.random() - 0.5) * Speed
    };

    this.color = randomColor(colors)
    this.collision = 0;
  }

  draw() {
    cc.beginPath()
    cc.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    cc.fillStyle = this.color
    cc.fill();
    // cc.strokeStyle = "blue";
    cc.stroke()
    // cc.fillStyle = 'black'
    // cc.fillText(this.id, this.x, this.y);
    cc.closePath()
  }

  update() {
    this.draw();

    boundary_bounce(this)

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
// =====================================================================================================================================================================================================================================
// Implementation
let particles, Radius, Speed, N, initial_infect, infection_prob, total, infected, recovered, dead;


function init() {
	particles;
	Radius = 2;
	Speed = 5;
	N = 1000;
	initial_infect = 0.05 //These many already infected before simulation
	infection_prob = 0.01//This is probability a passing by human will get infected
	total = 0
	infected = 0
	recovered = 0
	dead = 0
	particles = [];

	for(let i = 0;i<N;i++){

	let tmpCircle = new Circle();
	tmpCircle.id = i;
	tmpCircle.colArray = new Array(N).fill(0);

	if(i!= 0){
	  for(let j = 0;j<particles.length; j++){
	    //Get new center till collision resolved
	    if(isCollision(tmpCircle, particles[j])){
	      tmpCircle.x = randomIntFromRange(tmpCircle.radius, canvas2.width-tmpCircle.radius); 
	      tmpCircle.y = randomIntFromRange(tmpCircle.radius, canvas2.height-tmpCircle.radius);
	      j = -1;
	    }
	  }
	}
	particles.push(tmpCircle);
	}
}



function after_collision(c1, c2){
  if(c1.color == 'black' && c2.color == 'red'){
    if(Math.random()<infection_prob){
      infected++; total--;
      c1.color = 'red';
    }

  } else  if(c1.color == 'red' && c2.color == 'black'){
    if(Math.random()<infection_prob){
      infected++; total--;
      c2.color = 'red';
    }
  }
}

// Animation Loop
var temp = 1;
function animate_2() {
  requestAnimationFrame(animate_2);

  cc.clearRect(0, 0, canvas2.width, canvas2.height)
  
  // console.log(total, infected)
  // if(infected == 400){
  //   break;
  // }
  // addData(myChart, temp++, infected);
  particles.forEach(particle => {
    for(var i = 0; i<particles.length;i++){

      if(particle === particles[i]){
        continue;
      } else{
        
        if(isCollision(particle, particles[i]))
          after_collision(particle, particles[i]);

      }
    }

    particle.update();
  })
}

init()
animate_2()
