/* Idejeeeeee:

Kampanja
Custom Game

Leveli = veći level, brže ide vreme i daje veće brojeve
padaš jedan level ideš iz početka

Settings (Dostupan u Custom game)= mogućnost menjanja svega...
Progress bar koji pokazuje napredak ka Korisnički određenom cilju...

*/


window.onload = function() {
	//console.log(Math.floor(Math.random()* (1500 - 1000) + 1000))
}

function random_number(min, max) {
	return Math.floor(Math.random()* (max - min) + min)
}

var mod = 0;

var interval;
var prvi_broj;
var drugi_broj;
var poeni = 0;
//var vreme;
var level = 1;
var Znak1;

//kampanja
var k_min = 0;
var k_max = 100;
var k_vreme = 10;



function zamena1() {
	mod = 1;
	document.getElementById("settings").style.display = "block"
	document.getElementById("select").style.display = "none"
	document.getElementById("p_poeni").style.display = "block"
	document.getElementById("p_level").style.display = "none"
	document.getElementById("dodatno").style.display = "block"
}

function promeni_mod_igre() {
	if(confirm("Da li si siguran?") == true) {
		custom_drugapodesavanja()
		document.getElementById("settings").style.display = "none"
		document.getElementById("select").style.display = "block"
	} else {
		console.log("Odustao")
	}
}

function custom() {
	if(document.getElementById("minimal").value >= document.getElementById("maximal").value){
		alert("Minimalni broj ne sme biti veći od maksimalnog")
	} else {
		Znak1 = document.getElementById("znak_select").value
		//console.log(Znak1)
		document.getElementById("settings").style.display = "none"
		run(parseFloat(document.getElementById("minimal").value), parseFloat(document.getElementById("maximal").value), document.getElementById("vreme_input").value)
		document.getElementById("content").style.display = "block"
		document.getElementById("info").style.display = "block"
	}
}

function custom_drugapodesavanja() {
	// Ovde zaustavljamo timer
	clearInterval(interval)
	// Ovo je zbog "Pauze", u slučaju da je aktivirana pre promene settings
	custom_pauza_var = 0
	document.getElementById("input").disabled = false
	document.getElementById("custom_pauza_id").innerHTML="Pauza"
	// Menjaju se Divovi
	document.getElementById("content").style.display = "none"
	document.getElementById("settings").style.display = "block"
	// Sakrije Info div
	document.getElementById("info").style.display = "none"
}

var custom_pauza_var = 0;

function custom_pauza() {
	if(custom_pauza_var == 0){
		clearInterval(interval)
		document.getElementById("input").disabled = true
		document.getElementById("custom_pauza_id").innerHTML="Nastavi"
		custom_pauza_var += 1
	} else {
		custom_pauza_var -= 1
		document.getElementById("input").disabled = false
		document.getElementById("custom_pauza_id").innerHTML="Pauza"
		run(parseFloat(document.getElementById("minimal").value), parseFloat(document.getElementById("maximal").value), document.getElementById("vreme_input").value)
	}
	
}

function run(min, max, vreme) {
	if(mod == 0){
		console.log(min)
		console.log(max)
		console.log(vreme)
		prvi_broj = random_number(min, max)
		drugi_broj = random_number(min, max)

		// Dodaj opciju da u console pokazuje rešenje
		var res = prvi_broj + drugi_broj
		console.log("Rešenje je: " + res)

		document.getElementById("prvi_broj").innerHTML = prvi_broj
		document.getElementById("drugi_broj").innerHTML = drugi_broj
		timer(vreme)
		document.getElementById("znak").innerHTML = " + "
	} else {
		console.log(min)
		console.log(max)
		prvi_broj = random_number(min, max)
		drugi_broj = random_number(min, max)
		document.getElementById("prvi_broj").innerHTML = prvi_broj
		document.getElementById("drugi_broj").innerHTML = drugi_broj
		timer(vreme)
		//console.log(document.getElementById("znak_select").value)
		if(Znak1 === "Sabiranje"){
			document.getElementById("znak").innerHTML = " + "
		} else {
			console.log(prvi_broj - drugi_broj)
			document.getElementById("znak").innerHTML = " - "
			if(prvi_broj - drugi_broj < 0){
				// Dodaj - ako je rešenje ispod nule
				//document.getElementById("input").value = /d-/
			}
		}
	}
}

function timer(vreme) {
	var time = vreme
	document.getElementById("timer").innerHTML = time
	interval = setInterval(function() {
		document.getElementById("timer").innerHTML = time
		//console.log(time)
		if(time == 0) {
			if(mod == 0){
				clearInterval(interval)
				level = 1
				document.getElementById("level_span").innerHTML = level
				if(confirm("Vreme je isteklo, da li želiš da počneš ponovo?") == true) {
					k_min = 0;
					k_max = 100;
					k_vreme = 10;
					run(k_min, k_max, k_vreme)
				} else {
					console.log("Odustao")
					promeni_mod_igre()
				}
			}
			if(mod == 1){
				clearInterval(interval)
				alert("Vreme je isteklo, gubiš 1 poen!")
				poeni -= 1;
				poeni_color()
				document.getElementById("poeni").innerHTML = poeni
				run(parseFloat(document.getElementById("minimal").value), parseFloat(document.getElementById("maximal").value), document.getElementById("vreme_input").value)
			}
		}
		time -= 1;
	} ,1000)
}

function check(value) {
	var resenje;
	if(Znak1 === "Sabiranje"){
		resenje = prvi_broj + drugi_broj 
	} else {
		resenje = prvi_broj - drugi_broj 
	}
	
	if(value == resenje){
		alert("Bravooo!")
		document.getElementById("input").value = ""
		clearInterval(interval)
		run(parseFloat(document.getElementById("minimal").value), parseFloat(document.getElementById("maximal").value), document.getElementById("vreme_input").value)
		poeni += 1;
		poeni_color()
		document.getElementById("poeni").innerHTML = poeni
	}
}

function poeni_color() {
	if(poeni < 0){
		document.getElementById("poeni").style.color = "red"
		console.log("jesam")
	} if(poeni > 0){
		document.getElementById("poeni").style.color = "cyan"
	} if(poeni == 0){
		document.getElementById("poeni").style.color = "#0f0"
	} 
}

//

function minimal_value(value) {
	document.getElementById("minimal_value").innerHTML = value
}

function maximal_value(value) {
	document.getElementById("maximal_value").innerHTML = value
}

function vreme_value(value) {
	document.getElementById("vreme_value").innerHTML = value + " sekundi"
}



// Kampanjaaa

function kampanja() {
	mod = 0;
	document.getElementById("select").style.display = "none"
	document.getElementById("p_poeni").style.display = "none"
	document.getElementById("dodatno").style.display = "none"
	document.getElementById("p_level").style.display = "block"
	document.getElementById("content").style.display = "block"
	document.getElementById("info").style.display = "block"
	document.getElementById("input").setAttribute("oninput", "check_kampanja(this.value)")
	run(k_min, k_max, k_vreme)
}

function check_kampanja(value) {
	var resenje = prvi_broj + drugi_broj 
	if(value == resenje){
		alert("Prelaziš na " + level + " level!")
		document.getElementById("input").value = ""
		clearInterval(interval)
		// ponovo run funkcija
		if(level <= 5){
			k_max += 50
		} else if(level >5 && level<=10){
			k_min += 50
			k_max += 50
			k_vreme += 1
		} else if(level >10 && level<=20){
			k_min += 25
			k_max += 200
		} else if(level >20 && level<=25){
			k_max += 250
			k_vreme += 1
		} else if(level >25 && level<=30){
			k_min += 25
			k_vreme -= 1
		} else if(level >30 && level<=35){
			k_vreme = 10
		} else if(level >35 && level<=40){
			k_max += 1000
			k_min += 100
			k_vreme = 7
		}

		run(k_min, k_max, k_vreme)
		// Povećaj level
		level += 1
		document.getElementById("level_span").innerHTML = level
	}
}