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
 
//var particle_grid


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
// Implementation

function param(no, ivf){
  if(ivf=='i')
    return parseInt(document.getElementById(sldPar[no]).value)
  else
    return parseFloat(document.getElementById(sldPar[no]).value)
}

function init() {
  set_param(param(0, "f"), param(1, "f"),
            param(2, "i"), param(3, "f"),
            param(4, "f"), param(5, "f"),
            param(6, "i"), param(7, "i"),
           param(8, "i"),
           param(9, "f"),)

	total = 0
	infected = 0
	recovered = 0
	dead = 0
  
    startTime = new Date()
    daysPassed = 0
    black = 0; red = 0; green = 0
    
    
    particles_grid = []
    side_len = canvas_sim.height/3
    
    // Put balls in each box and make everything black
    for(var qq=0;qq<3;qq++){
        for(var pp=0;pp<3;pp++){
          particles = []
          for(var i=0;i<N;i++){

          let tmpCircle = new Circle();
          tmpCircle.form_circle(radius=Radius, qq, pp)

          // Make all black
          tmpCircle.color = 'black'

          tmpCircle.id = i;
          tmpCircle.colArray = new Array(N).fill(0);



          if(i!= 0){
            for(let j = 0;j<particles.length; j++){

              //Get new center till collision resolved
              if(isCollision(tmpCircle, particles[j])){
                loc = square_loc(tmpCircle)
                tmpCircle.x = loc.x; 
                tmpCircle.y = loc.y;
                j = -1;
              }
            }
          }

          particles.push(tmpCircle);
          // tmpCircle.draw()

          }
          particles_grid.push(particles)
        }
      }
    
    // Choose initial infect no of sqaures and make 
    var inf_box = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    var com1
    for(var i=0;i<init_infected_box;i++){
        com1 = randomIntFromRange(0, 9)
        while(inf_box[com1]==1)
            com1 = randomIntFromRange(0,9)
        inf_box[com1] = 1
        infect_box(com1)
//        console.log("Infected", com1)
    }

    
  updateChart()
}


function animate_2() {
  infected = 0
  
  if(doAnim){
    

    requestAnimationFrame(animate_2);
    cc.clearRect(0, 0, canvas_sim.width, canvas_sim.height)
    draw_grid()
    // For each day every infected is spreading or not with prob
    // Each sec is day days
    if((new Date()-startTime)/1000>1/day){
      daysPassed++;

      // Check if a red particle will infect today or not
      for(var pp=0;pp<9;pp++){
          particles = particles_grid[pp]
          for(var i = 0; i<N; i++) {
            if(particles[i].color=='red' && Math.random()<infection_prob)
              particles[i].isInfecting = true;
            else
              particles[i].isInfecting = false;
          }
        }
      startTime = new Date()
      updateChart()
    }

    black = 0; red=0; green=0;
    // For each Paticle
      particles_grid.forEach(particles =>{
        particles.forEach(particle => {

          // For recovery
          if(particle.color=='red' && (new Date() - particle.infect_time)/1000 > days_for_recovery/day){
            console.log("recovered")
              particle.color = 'green'
          }

          // Check with every other circle for collision
          for(var i = 0; i<particles.length;i++){

            if(particle == particles[i])
              continue;
            else{
              if(isCollision(particle, particles[i]))
                after_collision(particle, particles[i]);
            }
          }

          if(particle.color == 'black')
            black++
          if(particle.color=='green')
            green++
          if(particle.color=='red')
            red++

          particle.update_city();
        })
      })

    if(green!=0 && red==0){
      pause()
      console.log("Pause", green, red, black)
    }    
  }
    
}


init()
 doAnim=true
 animate_2()


function get_data(){
  tmp = {
    red : red,
    black : black,
    green : green
  }
  return tmp
}
