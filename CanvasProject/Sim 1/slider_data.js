// Param Sliders

for(let i=0;i<sldPar.length;i++){

  document.getElementById(sldPar[i]).oninput = function() {
    document.getElementById(sldPar[i].concat("_text")).innerHTML = this.value;

    console.log(sldPar[i].concat(" slider"), this.value)
    document.getElementById('reset').click()
  }
}

// document.getElementById("par_inf_prob").disabled = true;
