//Utility Function
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Gives random color
function randomColor() {
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

// If two circles collide or not |c1-c2|<=r1+r2
function isCollision(c1, c2){
  if((c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y) <= (c1.radius + c2.radius)*(c1.radius + c2.radius))
    return 1;
  return 0;
}

// give new Speed on bounce
function boundary_bounce(circle){
  // Right 
 if(circle.x + circle.radius >= canvas_sim.width)
   circle.velocity.x = -(Math.random()+0.1) * Speed;
 // Left
 if(circle.x - circle.radius <=0)
   circle.velocity.x = (Math.random()+0.1) * Speed;
  // Bottom
 if(circle.y + circle.radius >= canvas_sim.height)
   circle.velocity.y = -(Math.random()+0.1) * Speed
 // Top
 if(circle.y - circle.radius <=0)
     circle.velocity.y = (Math.random()+0.1) * Speed 
}

// give new speed for going to center
function go_to_center(circle) {
  // save old center
  if (circle.old.flag==false){
    circle.old.flag = true
    circle.old.vel_x = circle.velocity.x
    circle.old.vel_y = circle.velocity.y
    circle.old.dot_circle = new Circle()
    circle.old.dot_circle.x = circle.x
    circle.old.dot_circle.y = circle.y
    circle.old.dot_circle.radius = 0.1
  }

  if(isCollision(circle, dot_circle)){
    circle.velocity.x = 0
    circle.velocity.y = 0
    circle.central_div = 'from'    
    console.log("go to center change") 
  }
  // Q1
  else if(circle.x<canvas_sim.height/2 && circle.y<canvas_sim.width/2){
    circle.velocity.x = (Math.random()+0.1) * Speed
    circle.velocity.y = (canvas_sim.width/2 - circle.y)/(canvas_sim.height/2 - circle.x)*circle.velocity.x      
  }
  // Q2
  else if(circle.x>canvas_sim.height/2 && circle.y<canvas_sim.width/2){
    circle.velocity.x = -(Math.random()+0.1) * Speed
    circle.velocity.y = (canvas_sim.width/2 - circle.y)/(canvas_sim.height/2 - circle.x)*circle.velocity.x      
  }
  // Q3
  else if(circle.x>canvas_sim.height/2 && circle.y>canvas_sim.width/2){
    circle.velocity.x = -(Math.random()+0.1) * Speed
    circle.velocity.y = (canvas_sim.width/2 - circle.y)/(canvas_sim.height/2 - circle.x)*circle.velocity.x      
  }
  // Q4
  else if(circle.x<canvas_sim.height/2 && circle.y>canvas_sim.width/2){
    circle.velocity.x = (Math.random()+0.1) * Speed
    circle.velocity.y = (canvas_sim.width/2 - circle.y)/(canvas_sim.height/2 - circle.x)*circle.velocity.x      
  }
  

}

// give new speed for going out from center
function go_from_center(circle) {
  // restore old data once reach the previous position
  if(isCollision(circle, circle.old.dot_circle)){
    circle.old.flag = false
    circle.velocity.x = circle.old.vel_x
    circle.velocity.y = circle.old.vel_y
    circle.x = circle.old.dot_circle.x
    circle.y = circle.old.dot_circle.y
    circle.central_div = 'boundry' //Set diversion boundry to do random walk
  }
  // Q1
  else if(circle.x<circle.old.dot_circle.x && circle.y<circle.old.dot_circle.y){
    circle.velocity.x = (Math.random()+0.1) * Speed
    circle.velocity.y = (circle.old.dot_circle.y - circle.y)/(circle.old.dot_circle.x - circle.x)*circle.velocity.x      
  }
  // Q2
  else if(circle.x>circle.old.dot_circle.x && circle.y<circle.old.dot_circle.y){
    circle.velocity.x = -(Math.random()+0.1) * Speed
    circle.velocity.y = (circle.old.dot_circle.y - circle.y)/(circle.old.dot_circle.x - circle.x)*circle.velocity.x      
  }
  // Q3
  else if(circle.x>circle.old.dot_circle.x && circle.y>circle.old.dot_circle.y){
    circle.velocity.x = -(Math.random()+0.1) * Speed
    circle.velocity.y = (circle.old.dot_circle.y - circle.y)/(circle.old.dot_circle.x - circle.x)*circle.velocity.x      
  }
  // Q4
  else if(circle.x<circle.old.dot_circle.x && circle.y>circle.old.dot_circle.y){
    circle.velocity.x = (Math.random()+0.1) * Speed
    circle.velocity.y = (circle.old.dot_circle.y - circle.y)/(circle.old.dot_circle.x - circle.x)*circle.velocity.x      
  }

}


// Objects
class Circle {
  constructor() {
    this.id;
    this.radius = Radius;
    this.x = randomIntFromRange(this.radius, canvas_sim.width-this.radius);
    this.y = randomIntFromRange(this.radius, canvas_sim.height-this.radius);
    this.velocity = {
      x: (Math.random() - 0.5) * Speed,
      y: (Math.random() - 0.5) * Speed
    };

    this.color = randomColor()
    this.collision = 0;
    // old data helps to get back in track when come back from central loc
    this.old = {
      flag: false,
      vel_x: 0,
      vel_y: 0,
      dot_circle: new Object()
    };
    // whether I am in the diversion or not
    this.central_div = 'boundry'
  }
  // Draw each circle
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

  // Speed change on bounce, update speed
  update() {
    this.draw();

    boundary_bounce(this)

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update_center() {
    this.draw()

    if (this.central_div=="boundry" && Math.random()<0.01) //center diversion
      this.central_div = 'to'

    if(this.central_div=='boundry'){
      Speed = 1
      // this.color = 'yellow'
      boundary_bounce(this)
    }
    else if(this.central_div=='to'){
      Speed = 3
      // this.color = 'red'
      go_to_center(this)
    }
    else if(this.central_div=='from')
      go_from_center(this)

    
    
    console.log(this.central_div, this.x, this.y,  this.velocity.x,  this.velocity.y)
    this.x += this.velocity.x
    this.y += this.velocity.y

  }
}

let particles, Radius, Speed, N, initial_infect, infection_prob, total, infected, recovered, dead;
var doAnim = false;


function set_param(rad, speed, n, init_inf, inf_prob) {
  Radius = rad;
  Speed = speed;
  N = n;

  initial_infect = init_inf; //These many already infected before simulation
  infection_prob = inf_prob; //This is probability a passing by human will get infected

}