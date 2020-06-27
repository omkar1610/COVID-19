
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas_sim.width = 300
  canvas_sim.height = 300

  init()
})



pp = document.getElementById('playPause')

pp.addEventListener('click', function(){
  if (doAnim==false){
    doAnim = true;
    animate_2();
    pp.innerText = "Pause";
  }
  else{
    doAnim = false;
    pp.innerText = "Resume";
  }
})

document.getElementById('reset').addEventListener('click', function(){
  console.log("reset");
   if (doAnim==false){
    doAnim = true;
    init();
    animate_2();
  }
  else
    init();
  pp.innerText = "Pause";
  // infect = 0;
  console.log(infected, N)
})

// document.getElementById('textbox_id').value