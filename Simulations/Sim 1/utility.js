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
// Instead of radius it should check for infection radius
function isCollision(c1, c2){
  if(c1.isInfecting || c2.isInfecting)
    if((c1.x-c2.x)*(c1.x-c2.x) + (c1.y-c2.y)*(c1.y-c2.y) <= (c1.radius + c2.radius)*(c1.radius + c2.radius))
      return 1;
  return 0;
}

// Change of color after collision
function after_collision(c1, c2){

  if(c1.color == 'black' && c2.color == 'red' ){
    if(Math.random()<infection_prob){
      infected++; total--;
      if(c1.color!='red')
        c1.infect_time = new Date()
      c1.color = 'red';
    }

  } else  if(c1.color == 'red' && c2.color == 'black' ){
    if(Math.random()<infection_prob){
      infected++; total--;
      if(c2.color!='red')
        c2.infect_time = new Date()
      c2.color = 'red';
    }
  }
}

// give new Speed on bounce
function boundary_bounce(circle){
 if(circle.x + circle.radius >= canvas_sim.width)
   circle.velocity.x = -(Math.random()+0.1) * Speed;
 if(circle.x - circle.radius <=0)
   circle.velocity.x = (Math.random()+0.1) * Speed;

 if(circle.y + circle.radius >= canvas_sim.height)
   circle.velocity.y = -(Math.random()+0.1) * Speed
 if(circle.y - circle.radius <=0)
     circle.velocity.y = (Math.random()+0.1) * Speed 
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
    if(this.color=='red')
      this.infect_time = new Date()
    else
      this.infect_time = 0;
    
    this.isInfecting = false //Will infect a black only if is infecting = true
  }
  // Draw each circle
  draw() {
    cc.beginPath()
    cc.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)

    // Dont fill if red and not infecting
    if(this.color!='red' || this.isInfecting!=true)
      cc.fillStyle = this.color
    else
      cc.fillStyle = 'purple';
    
    cc.fill();
    cc.strokeStyle = this.color;
    cc.stroke()
    cc.closePath()
  }

  // Speed change on bounce, update speed
  update() {
    this.draw();

    boundary_bounce(this)

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}


function set_param(rad, speed, n, init_inf, inf_prob, day_per_sec,
      rec_start, rec_tim) {
  Radius = rad;
  Speed = speed;
  N = n;

  initial_infect = init_inf; //These many already infected before simulation
  infection_prob = inf_prob; //This is probability a passing by human will get infected
  day = day_per_sec
  recovery_start_day = rec_start
  days_for_recovery = rec_tim


}


