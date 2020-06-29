var canvas = document.getElementById("gravity");
var c = canvas.getContext('2d')

canvas.width = 600
canvas.height = 600

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


var gravity = 1;
var friction = 0.99;

// Utility Function
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', function(){
  init();
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if(this.y + this.radius + this.dy> canvas.height){
      this.dy = -this.dy * friction;
    }else {
      this.dy += gravity;
      // console.log(this.dy); 
    }

    if(this.x + this.radius + this.dx> canvas.width || this.x - this.radius <= 0){
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

var ballArray ;
// var radius = 30;
var n = 400;


function init(){
  ballArray = [];
  for(var i = 0; i< n; i++){
    var radius = randomIntFromRange(8, 20);
    ballArray.push(new Ball(randomIntFromRange(radius, canvas.width-radius), randomIntFromRange(radius, canvas.height - radius), randomIntFromRange(-2,2),  randomIntFromRange(-2, 2), radius, randomColor(colors)));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  for(var i = 0; i<ballArray.length; i++){
    ballArray[i].update();
  }
}

init();
animate();
