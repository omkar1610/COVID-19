var canvas = document.querySelector('canvas');

// var width = window.innerWidth - 1;
// var height = window.innerHeight - 1;
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;

var c = canvas.getContext('2d');


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

function collision_detection(c1, c2){
	if((c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y) <= (c1.rad + c2.rad) * (c1.rad + c2.rad))
		return 1;
	return 0;
}

function update_collision(){
	for(var i = 0; i<circleArray.length - 1;i++){
		for(var j = i+1; j<circleArray.length;j++){
			if(collision_detection(circleArray[i], circleArray[j])){
				if(circleArray[i].colour == "red"){
					if(circleArray[j].colour == "red"){
						circleArray[i].colour = "green";
					}
					else if(circleArray[j].colour == "green"){
						circleArray[i].colour = "green";
					}
				}
				else if(circleArray[i].colour == "green"){
					if(circleArray[j].colour == "red"){
						circleArray[j].colour = "green";
					}
				}
			}
		}
	}
}

function init_circle(n){
	circleArray = [];
	for(var i = 0; i<n;i++){
		var rad, x, y, dx, dy;
		rad = 10;
		x = Math.random() * (window.width  - 2*rad) + rad;
		y = Math.random() * (window.height - 2*rad) + rad;

		dx = Math.random() - 0.5 * 5;
		dy = Math.random() - 0.5 * 5;
		circleArray.push(new Circle(x, y, dx, dy, rad));
	}
}

//For every slider input change the no of balls and restart

var slider = document.getElementById("myRange");
slider.oninput = function(){
	// console.log(this.value);
	init_circle(this.value);
}

var rad, x, y, dx, dy;

var circleArray = [];
var n = 5;
init_circle(n);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,width, height);
	for(var i = 0; i<circleArray.length;i++){
		circleArray[i].update();
	update_collision();
	}
	
}




animate();