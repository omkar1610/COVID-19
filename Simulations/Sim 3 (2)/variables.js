var particles, Radius, Speed, N, initial_infect, infection_prob
var total, infected, recovered, dead;

var doAnim = false;
var startTime;
var daysPassed, black, red, green;
var temp = 1;
var sldPar =  ["par_rad", "par_speed", "par_n", 
			"par_init_inf", "par_inf_prob", "par_day_per_sec",
			"par_rec_start", "par_rec_time", 
               "par_n_inf_box", "par_move_box"]
var chart

var day = 1// 1 sec = 1day
var revory_start_day = 2 //Start Recovering after 2 days of start
var days_for_recovery = 4 // Infected guy gets well or dead in 4 days


var end_flag = false

var infect_rad;
var randArray;

var init_infected_box, prob_move_box

var sim_data = []