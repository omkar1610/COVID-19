var canvas_sim = document.getElementById('simulation');


// var width = window.innerWidth;
// var height = window.innerHeight - 1;
var width = 350;
var height = 350;
canvas_sim.width = 350;
canvas_sim.height = 350;

canvas_sim.style.left = "0px";
canvas_sim.style.top = "0px";
canvas_sim.style.position = "absolute";

var cc = canvas_sim.getContext('2d');
 
// Implementation

var sldPar =  ["par_rad", "par_speed", "par_n", "par_init_inf", "par_inf_prob"]

function slide_val(name){
  return (document.getElementById(name).value)
}

function init() {
  

// Center Square
  cc.beginPath();
  side_len = 35
  cc.rect((canvas_sim.width - side_len)/2, 
    (canvas_sim.height-side_len)/2, side_len, side_len);
  cc.stroke();

// 

  set_param(parseInt(slide_val(sldPar[0])),parseInt(slide_val(sldPar[1])),
    parseInt(slide_val(sldPar[2])), parseFloat(slide_val(sldPar[3])),
    parseFloat(slide_val(sldPar[4])))
  // set_param(5, 2, 30, 0.05, 0.01);

  total = 0
  infected = 0
  recovered = 0
  dead = 0

  particles = [];

  // Create N Circles
  for(let i=0;i<N;i++){

    let tmpCircle = new Circle();

    // Avoid all black
    if(i==N-1 && infected==0){
      console.log('all black')
      tmpCircle.color = 'red';
      infected++;
    }

    tmpCircle.id = i;
    tmpCircle.colArray = new Array(N).fill(0);



    if(i!= 0){
      for(let j = 0;j<particles.length; j++){
        
        //Get new center till collision resolved
        if(isCollision(tmpCircle, particles[j])){
          tmpCircle.x = randomIntFromRange(tmpCircle.radius, canvas_sim.width-tmpCircle.radius); 
          tmpCircle.y = randomIntFromRange(tmpCircle.radius, canvas_sim.height-tmpCircle.radius);
          j = -1;
        }
      }
    }

    particles.push(tmpCircle);
    // tmpCircle.draw()

  }

  // doAnim = true;
  // Plot the graph
  // Plotly.newPlot('d2', data, layout);
}


// Change of color after collision
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

function animate_3() {

    requestAnimationFrame(animate_3);
    cc.clearRect(0, 0, canvas_sim.width, canvas_sim.height)

    ball.draw();

    // ball.update()
    // if(ball.central_div==true)
    //   go_to_center(ball)
    // else
    
    console.log(ball.central_div, ball.x, ball.y,  ball.velocity.x,  ball.velocity.y)
    ball.draw();
    if (ball.central_div=="boundry" && Math.random()<0.01) //center diversion
      ball.central_div = 'to'

    if(ball.central_div=='boundry'){
      ball.color = 'yellow'
      boundary_bounce(ball)
    }
    else if(ball.central_div=='to'){
      ball.color = 'red'
      go_to_center(ball)
    }
    else if(ball.central_div=='from')
      go_from_center(ball)

    
    
    console.log(ball.central_div, ball.x, ball.y,  ball.velocity.x,  ball.velocity.y)
    ball.x += ball.velocity.x
    ball.y += ball.velocity.y
}

Speed = 3
  let ball = new Circle()
    console.log(ball.central_div, ball.x, ball.y,  ball.velocity.x,  ball.velocity.y)

  ball.x = 50
  ball.y = 250
  ball.radius = 5
  ball.color = 'yellow'
  // ball.velocity.x= 2
  // ball.velocity.y=2
  ball.draw()

  Speed = 5

  var row = 3, col = 3
  // Center Square
  for(var i=0;i<row;i++){
    for(var j=0;j<col;j++){
      cc.beginPath();
      side_len = canvas_sim.height/3
      cc.rect(i*side_len, j*side_len, side_len, side_len);
      cc.stroke();
    }
  }
  

function populate_box(){
  
}


// animate_3()
// init()
// animate_2()



