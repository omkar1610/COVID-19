//var mouse = {
//  x: innerWidth / 2,
//  y: innerHeight / 2
//}
//
//
//// Event Listeners
//addEventListener('mousemove', (event) => {
//  mouse.x = event.clientX
//  mouse.y = event.clientY
//})
//
//addEventListener('resize', () => {
//  canvas_sim.width = 300
//  canvas_sim.height = 300
//
//  init()
//})
//
//
//// Sliders
//
//for(let i=0;i<sldPar.length;i++){
//
//  document.getElementById(sldPar[i]).oninput = function() {
//    document.getElementById(sldPar[i].concat("_text")).innerHTML = this.value;
//
//    console.log(sldPar[i].concat(" slider"), this.value)
//    document.getElementById('reset').click()
//  }
//}
//
//
//pp = document.getElementById('playPause')
//
//// Play Reset Function
//function reset_sim(){
//
//   if (doAnim==false){
//    doAnim = true;
//    init();
//    animate_2();
//  }
//  else
//    init();
//    
//  pp.innerText = "Pause";
//  end_flag=false
//}
//
//function start(){
//  doAnim = true;
//  animate_2();
//  pp.innerText = "Pause";
//  chart.render()
//}
//
//function pause(){
//  doAnim = false;
//  pp.innerText = "Resume";
//}
//
//
//// Play Reset Butt
//
//pp.addEventListener('click', function(){
//  if (doAnim==false)
//    start()
//  else
//    pause()
//})
//
//document.getElementById('reset').addEventListener('click', function(){
//  resetChart()
//  console.log("reset");
//  // pause()
//
//  reset_sim()
//  // infect = 0;
//  // console.log(infected, N)
//})