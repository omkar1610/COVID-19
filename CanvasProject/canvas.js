var canvas = document.querySelector('canvas');

// var width = window.innerWidth - 1;
// var height = window.innerHeight - 1;
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;

var c = canvas.getContext('2d');


// c.fillStyle = 'rgba(255,0,0,0.5)';
// c.fillRect(100, 100, 100, 240);
// console.log(canvas)


// //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 700);
// c.strokeStyle = "blue";
// c.stroke();


//Arc/Circle
// for(var i = 0; i<50; i++){
// 	var rad = 5;
// 	var x = Math.random() * window.width;
// 	var y = Math.random() * window.height;

// 	c.beginPath();
// 	c.arc(x, y, rad, 0, Math.PI * 2, false);
// 	c.strokeStyle = "gray";
// 	c.stroke();
// }

function Circle(x, y, dx, dy, rad){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.rad = rad;
	// this.colour = "#"+((1<<24)*Math.random()|0).toString(16);
	this.colour = 'red';


	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
		c.stroke();
		c.fillStyle = this.colour;
		c.fill();
	}

	this.update = function(){
		if(this.x + this.rad> width || this.x - this.rad <0){
			this.dx = -this.dx;
		}
		if(this.y + this.rad> height || this.y - rad <0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}



var rad, x, y, dx, dy;

var circleArray = [];
var n = 20;

for(var i = 0; i<n;i++){
	rad = 30;
	x = Math.random() * (window.width  - 2*rad) + rad;
	y = Math.random() * (window.height - 2*rad) + rad;

	dx = Math.random() - 0.5 * 5;
	dy = Math.random() - 0.5 * 5;
	circleArray.push(new Circle(x, y, dx, dy, rad));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,width, height);
	for(var i = 0; i<circleArray.length;i++){
		circleArray[i].update();
	}
	
}


animate();