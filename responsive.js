var bars;
var close;
var mobNav;
var set = false; 

function responsiveStart(){
	bars = document.getElementsByClassName("bars")[0];
	bars.onclick = barsClick

	mobNav = document.getElementsByClassName("mobNav")[0]; 

	close = document.getElementsByClassName("closeHolder")[0]; 
	close.onclick = closeClick;

	setTrackWidth();
	// setAnimation()
}

function setTrackWidth(){
	let tracks = document.getElementsByClassName("track"); 
	let albumTrack = document.getElementsByClassName("albumTracks")[0]

	for(var i = 0; i < tracks.length; i++){
		let number = tracks[i].getElementsByClassName("trackNumber")[0]; 
		let play = tracks[i].getElementsByClassName("trackPlay")[0];
		let artist = tracks[i].getElementsByClassName("trackArtist")[0]
		let name = tracks[i].getElementsByClassName("trackName")[0];
		let length = tracks[i].getElementsByClassName("trackLength")[0];
		let credit = tracks[i].getElementsByClassName("trackCredit")[0];

		// var ovWidth = albumTrack.offsetWidth;
		let self = 0.95 * document.body.clientWidth; 
		var ovWidth = 0.9 * self; 

		if(document.body.clientWidth > 1230){
			let self = 1230
			ovWidth = 0.63 * self; 
		}
			

		let two = 0.02* ovWidth;
		let four = 0.04 * ovWidth;
		let three = 0.03 * ovWidth;
		let one = 0.01 * ovWidth;



		if(i == 0)
			// alert(self + ":::" + document.getElementsByClassName("uniWidth")[0].clientWidth);

		var width;

		if(window.innerWidth <= 980){
			width = play.offsetWidth + credit.offsetWidth;
			width += two + two + four + one;
			if(i == 0){
				// alert("in here" + width)
			}
		}else{
			width = 50 + play.offsetWidth + 100 + 50 + credit.offsetWidth;
			width += two + two + four + four + four;

			if(i == 0){
				// alert("in here" + width)
			}
		}

		let newWidth = ovWidth - width; 
		name.style.width = newWidth + "px"
	}


	let trackNames = document.getElementsByClassName("track3rd"); 
	for(var i = 0; i < trackNames.length; i++){
		let name = trackNames[i].getElementsByClassName("trackName")[0]; 
		
		

		if(window.innerWidth < 1500 && window.innerWidth > 980 || window.innerWidth <= 450){
			trackNames[i].style.height = (70) + "px"
		}else{
			trackNames[i].style.height = "50px";
		}


		
	}
	// alert(document.body.clientWidth)
}

function setAnimation(){
	if(window.innerWidth <= 980){
		document.getElementsByClassName("bar1")[0].style.animation = "bar1anim 1s"
		document.getElementsByClassName("bar3")[0].style.animation = "bar3anim 1s";
	}
}

function barsClick(){
	mobNav.style.display = "block"
	document.getElementsByClassName("barHolder")[0].style.display = "none";
}

function closeClick(){
	mobNav.style.display = "none"
	setAnimation();
	document.getElementsByClassName("barHolder")[0].style.display = "block";
}

function responsiveResize(){
	if(window.innerWidth <= 980){
		// alert(close.style.display)
		if(mobNav.style.display != "block"){
			document.getElementsByClassName("barHolder")[0].style.display = "block";
		}

		document.getElementsByClassName("nav")[0].style.display = "none";
		document.getElementsByClassName("navBottom")[0].style.display = "none"
	}else if(window.innerWidth > 980){
		document.getElementsByClassName("barHolder")[0].style.display = "none";
		document.getElementsByClassName("nav")[0].style.display = "block";
		document.getElementsByClassName("navBottom")[0].style.display = "block"

		document.getElementsByClassName("bar1")[0].style.animation = ""
		document.getElementsByClassName("bar3")[0].style.animation = "";
		mobNav.style.display = "none"
	}

	setTrackWidth();
}
