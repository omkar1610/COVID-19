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

function isCollision_sim_2(c1, c2){
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

  if(isCollision_sim_2(circle, dot_circle)){
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
  if(isCollision_sim_2(circle, circle.old.dot_circle)){
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


// Returns x and y coordinate inside circle.row/col/radius
function square_loc(circle){
    row = circle.row
    col = circle.col
//    rad = circle.radius
  loc = {
    y:randomIntFromRange(row*side_len + 10, (row+1)*side_len - 10),
    x:randomIntFromRange(col*side_len + 10, (col+1)*side_len - 10)
  };
  return loc;
}

// Returns mid point of square
function square_mid(circle){
    row = circle.row
    col = circle.col
//    rad = circle.radius
  loc = {
    y:(row*side_len + (row+1)*side_len)/2,
    x:(col*side_len + (col+1)*side_len)/2
  };
//    console.log("mid", row, col, loc)
  return loc;
}

// Get new destination for cicrle in diff city
function get_new_dest(circle){
  
  //Dest should be different square 
//  box= randomIntFromRange(0, 8)
  rt= randomIntFromRange(0, 2)
  ct = randomIntFromRange(0, 2)
  while(circle.row==rt && circle.col==ct){
    rt= randomIntFromRange(0, 2)
    ct = randomIntFromRange(0, 2)    
  }
  circle.row = rt
  circle.col = ct
  loc = square_mid(circle)
//  console.log("get new dest", circle.row, circle.col, loc)
  
  circle.destCircle.x = loc.x;
  circle.destCircle.y = loc.y;
//    circle.destCircle.radius=1
}


function go_to_box(circle){
  destCircle = circle.destCircle
  //Reached the box
  if(isCollision_sim_2(circle, destCircle)){
//     console.log("reached dest circle") 
    // Change to move in box always
      circle.central_div = "in_box"
  }
  // Q1
  else if(circle.x<destCircle.x && circle.y<destCircle.y){
    circle.velocity.x = (Math.random()+0.1) * Speed
    circle.velocity.y = (destCircle.y - circle.y)/(destCircle.x - circle.x)*circle.velocity.x      
  }
  // Q2
  else if(circle.x>destCircle.x && circle.y<destCircle.y){
    circle.velocity.x = -(Math.random()+0.1) * Speed
    circle.velocity.y = (destCircle.y - circle.y)/(destCircle.x - circle.x)*circle.velocity.x      
  }
  // Q3
  else if(circle.x>destCircle.x && circle.y>destCircle.y){
    circle.velocity.x = -(Math.random()+0.1) * Speed
    circle.velocity.y = (destCircle.y - circle.y)/(destCircle.x - circle.x)*circle.velocity.x      
  }
  // Q4
  else if(circle.x<destCircle.x && circle.y>destCircle.y){
    circle.velocity.x = (Math.random()+0.1) * Speed
    circle.velocity.y = (destCircle.y - circle.y)/(destCircle.x - circle.x)*circle.velocity.x      
  }

}

function move_in_box(circle){
  row = circle.row
  col = circle.col
  margin = 10
  // Right 
 if(circle.x + circle.radius >= side_len*(col+1)-margin)
   circle.velocity.x = -(Math.random()+0.1) * Speed;
 // Left
 if(circle.x - circle.radius <=side_len*(col)+margin)
   circle.velocity.x = (Math.random()+0.1) * Speed;
  // Bottom
 if(circle.y + circle.radius >= side_len*(row+1)-margin)
   circle.velocity.y = -(Math.random()+0.1) * Speed
 // Top
 if(circle.y - circle.radius <=side_len*(row)+margin)
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
    
    this.old = {
      flag: false,
      vel_x: 0,
      vel_y: 0,
      dot_circle: new Object()
    };
    // whether I am in the diversion or not
    this.central_div = 'in_box'
    this.row = randomIntFromRange(0, 2)
    this.col = randomIntFromRange(0, 2)
    this.destCircle = new Object()
  }
    
    // Creates circle with radius in row col square
  form_circle(radius, row, col){
    // Square 0, 2
    this.radius = radius

    // Intital Row and COl
    this.row = row
    this.col = col
//    console.log("set row col", this.row, this.col)

    // Get location of this in its box
    loc = square_loc(this)
    this.x = loc.x
    this.y = loc.y

//    this.color = 'yellow'

    // Set the dest Circle
    this.destCircle = new Circle()
    this.destCircle.radius = this.radius;
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
  
  update_center() {
    this.draw()

    if (this.central_div=="boundry" && Math.random()<0.004) //center diversion
      this.central_div = 'to'

    if(this.central_div=='to'){
      Speed = 3
      // this.color = 'red'
      go_to_center(this)
    }
    else if(this.central_div=='from'){
      Speed = 3
      go_from_center(this)
    }
//    if(this.central_div=='boundry'){
    else{
      Speed = 1
      // this.color = 'yellow'
      boundary_bounce(this)
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
  }
    
    update_city(){
        this.draw()
        
        if(this.central_div=="in_box"){
            if(Math.random()<0.001){ //prob of going to other box 1%
                this.central_div = 'to_box'
//                console.log("To Box", this.row, this.col)
                get_new_dest(this)
            }
        }
        
        if(this.central_div=="in_box"){
            Speed = param(1, "f")
            move_in_box(this)
        }
        else if(this.central_div=="to_box"){
          Speed = 3*Speed
          go_to_box(this)
        }
        
        
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


