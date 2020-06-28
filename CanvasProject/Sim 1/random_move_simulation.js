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
  // set_param(15, 5, 10, 0.05, 0.1);

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

  // doAnim = true;
  // Plot the graph
  // Plotly.newPlot('d2', data, layout);
}


// Change of color after collision
function after_collision(c1, c2){

  if(c1.color == 'black' && c2.color == 'red'){
    if(Math.random()<infection_prob){
      infected++; total--;
      if(c1.color!='red')
        c1.infect_time = new Date()
      c1.color = 'red';
    }

  } else  if(c1.color == 'red' && c2.color == 'black'){
    if(Math.random()<infection_prob){
      infected++; total--;
      if(c2.color!='red')
        c2.infect_time = new Date()
      c2.color = 'red';
    }
  }
}

// Animation Loop
var temp = 1;

function animate_2() {
infected = 0
// Run until everyone is infected 
  if(infected==N){
    doAnim = false;
    document.getElementById('playPause').innerText = "Finish";
  }
  if(infected!=N && doAnim){
    // console.log(infected);
    // if(doAnim){

    requestAnimationFrame(animate_2);
    cc.clearRect(0, 0, canvas_sim.width, canvas_sim.height)
      black = 0; red=0; green=0;

    // The graph updation
    
    
    
    particles.forEach(particle => {
      
      //Start Recovering after 2 days of start
      if(daysPassed>2){
        if(particle.color=='red' && (new Date() - particle.infect_time)/1000 > 3){
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
        // Calculate day

    if((new Date()-startTime)/1000>day){
      daysPassed++;
      console.log(daysPassed, black, red, green)
      startTime = new Date()
    }
  }

}

init()
doAnim=true
 animate_2()



// The graph updation
    // if(total!=0 ){//&& infected!=data[0]['y'][temp-2]){
    //   data[0]['x'].push(temp++)
    //   data[0]['y'].push(infected)
    //   // data[1]['type'] = 'bar'
    //   Plotly.redraw('d2');
    //   console.log(total, infected, temp, data[0]['y'][temp-2])
    // }
    // addData(myChart, temp++, infected);