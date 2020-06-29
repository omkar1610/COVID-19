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
  
  set_param(parseInt(slide_val(sldPar[0])),parseInt(slide_val(sldPar[1])),
    parseInt(slide_val(sldPar[2])), parseFloat(slide_val(sldPar[3])),
    parseFloat(slide_val(sldPar[4])))
  // set_param(5, 2, 30, 0.05, 0.01);

  total = 0
  infected = 0
  recovered = 0
  dead = 0

  particles = [];

  side_len = canvas_sim.height/3
  // Create N Circles
  for(var i=0;i<N;i++){

    let tmpCircle = new Circle();
    tmpCircle.form_circle(radius=Radius, randomIntFromRange(0, 2), randomIntFromRange(0, 2))
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



function draw_grid(){
  cc.beginPath();
  cc.moveTo(side_len, 0);
  cc.lineTo(side_len, canvas_sim.height);

  cc.moveTo(2*side_len, 0);
  cc.lineTo(2*side_len, canvas_sim.height);

  cc.moveTo(0, 2*side_len);
  cc.lineTo(canvas_sim.height, 2*side_len);

  cc.moveTo(0, side_len);
  cc.lineTo(canvas_sim.height, side_len);

  cc.stroke();

}

// Animation Loop
var temp = 1;

function animate_2() {

  // Run until everyone is infected 
  if(infected==N){
    doAnim = false;
    document.getElementById('playPause').innerText = "Finish";
  }
  if(infected!=N && doAnim){
    // console.log(infected);
    if(doAnim){
      requestAnimationFrame(animate_2);
    // middle
      cc.clearRect(0, 0, canvas_sim.width, canvas_sim.height)
      
      draw_grid()
      particles.forEach(particle => {

        // Check with every other circle for collision
        for(var i = 0; i<particles.length;i++){

          if(particle == particles[i]){
            continue;
          } else{

            if(isCollision(particle, particles[i]))
              after_collision(particle, particles[i]);
          }
        }
        // particle.update();
        particle.update_city();
      })
    }
  }
}

init()
animate_2()


////Trial Start Here
//function animate_3() {
//
//  requestAnimationFrame(animate_3);
//  cc.clearRect(0, 0, canvas_sim.width, canvas_sim.height)
//
//  // Draw the square boundry
//  draw_grid()
//  ball.update_city()
//  ball.x += ball.velocity.x
//  ball.y += ball.velocity.y
//}
//
//Speed = 2
//side_len = canvas_sim.height/3
//
//let ball = new Circle()
//ball.form_circle(radius=2, randomIntFromRange(0, 2), randomIntFromRange(0, 2))
//
//console.log(ball, ball.row, ball.col)
//
////get_new_dest(ball)
//
//animate_3()
