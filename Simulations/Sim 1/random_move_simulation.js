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

function param(no, ivf){
  if(ivf=='i')
    return parseInt(document.getElementById(sldPar[no]).value)
  else
    return parseFloat(document.getElementById(sldPar[no]).value)
}

function init() {
  set_param(param(0, "i"), param(1, "i"),
            param(2, "i"), param(3, "f"),
            param(4, "f"), param(5, "f"),
            param(6, "i"), param(7, "i"))

	total = 0
	infected = 0
	recovered = 0
	dead = 0
  
    startTime = new Date()
    daysPassed = 0
    black = 0; red = 0; green = 0

	particles = [];

    // Create N Circles
	for(let i=0;i<N;i++){

  	let tmpCircle = new Circle();

    // Avoid all black
    if(i==N-1 && infected==0){
      console.log('all black')
      tmpCircle.color = 'red';
      tmpCircle.infect_time = new Date()
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

	}
  updateChart()
}


function animate_2() {
  infected = 0
  
  if(doAnim){
    

    requestAnimationFrame(animate_2);
    cc.clearRect(0, 0, canvas_sim.width, canvas_sim.height)
    
    // Each sec is day days
    if((new Date()-startTime)/1000>1/day){
      daysPassed++;
      startTime = new Date()
      updateChart()
    }

    black = 0; red=0; green=0;
    // For each Paticle
    particles.forEach(particle => {
      
      //Start Recovering after 2 days of start
      if(daysPassed>revory_start_day){
        if(particle.color=='red' && (new Date() - particle.infect_time)/1000 > days_for_recovery/day){
          particle.color = 'green'
        }
      }
      // Check with every other circle for collision
      for(var i = 0; i<particles.length;i++){

        if(particle == particles[i]){
          continue;
        } else{
          
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
      
      particle.update();
    })

    if(green!=0 && red==0){
      pause()
      console.log("Pause", green, red)
    }    
  }
}

init()
// doAnim=true
// animate_2()


function get_data(){
  tmp = {
    red : red,
    black : black,
    green : green
  }
  return tmp
}
