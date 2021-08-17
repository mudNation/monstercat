var subNav; 
var currentVolume;
var volumeHeight; 
var fixedShow = false; 
var trackClicked = false; 
var fixedPlay; 
var activePlaIcon; 
var audio; 
var playing = false; 
var songPercent = 0; 
var songSeconds = 0; 
var timeOut; 
var trackNumb; 
var playNumber; 
var shuffle = []; 
var isShuffle = false; 
var isRepeat = false; 
var repeatNumber = 0; 
var reset = false; 
var bottomPlayer; 
var buttonLeft = -12.5;

function start(){
	let comm = document.getElementById("comm"); 
	comm.addEventListener("click", navClick, false);  

	let radio = document.getElementById("radio"); 
	radio.addEventListener("click", navClick, false);

	document.getElementsByClassName("volumeBar")[0].addEventListener("click", volumeClick, false)
	document.getElementsByClassName("volumeBar")[1].addEventListener("click", volumeClick2, false)

	currentVolume = "fa-volume-up";
	volumeHeight = 50;

	document.getElementsByClassName("volumeIcon")[0].addEventListener("click", volumeIconClick, false);
	document.getElementsByClassName("volumeIcon")[1].addEventListener("click", volumeIconClick, false);

	document.getElementsByClassName("redoIcon")[0].addEventListener("click", redoClick, false);

	fixedPlay = document.getElementById("fixedPlay"); 

	setTrackListener(); 
	createMp3();

	document.getElementsByClassName("songTime")[0].addEventListener("click", songTimeClick, false)
	document.getElementsByClassName("bottomTime")[0].addEventListener("click", songTimeClick, false);

	setNextPrev(); 

	document.getElementsByClassName("fa-random")[0].onclick = shuffleClick;
	document.getElementsByClassName("fa-random")[1].onclick = shuffleClick; 
	document.getElementsByClassName("fa-random")[2].onclick = shuffleClick;

	document.getElementsByClassName("fa-registered")[0].onclick = repeatClick; 
	document.getElementsByClassName("fa-registered")[1].onclick = repeatClick; 
	document.getElementsByClassName("fa-registered")[2].onclick = repeatClick; 


	document.getElementsByClassName("fixedPlayIcon")[0].onclick = playClick; 
	document.getElementsByClassName("fixedPlayIcon")[1].onclick = playClick;

	playField = document.getElementsByClassName("playField")[0]; 
	playField.onclick = playFieldClick;


	bottomPlayer = document.getElementById("bottomPlayer"); 


	let bottomPlayerField = document.getElementsByClassName("bottomPlayField")[0];
	bottomPlayerField.onclick = bottomPlayClick

	responsiveStart(); 
}

function setBottomButton(){

}


function shuffleClick(){
	let randoms = document.getElementsByClassName("fa-random"); 

	if(randoms[0].classList.contains("blueColor")){

		randoms[0].classList.remove("blueColor"); 
		randoms[1].classList.remove("blueColor"); 
		randoms[2].classList.remove("blueColor")
		isShuffle = false; 

		if(playNumber != null)
			trackNumb = playNumber;
	}else{
		randoms[0].classList.add("blueColor"); 
		randoms[1].classList.add("blueColor");
		randoms[2].classList.add("blueColor");
		setShuffle();
		isShuffle = true; 
	}
}

function repeatClick(){
	let repeats = document.getElementsByClassName("fa-registered"); 

	if(repeatNumber == 0){
		repeatNumber++; 
		repeats[0].classList.add("yellowColor"); 
		repeats[1].classList.add("yellowColor"); 
		repeats[2].classList.add("yellowColor");

		repeats[0].classList.remove("blackColor"); 
		repeats[1].classList.remove("blackColor"); 
		repeats[2].classList.remove("blackColor");

	}else if(repeatNumber == 1){
		repeatNumber++; 
		repeats[0].classList.remove("yellowColor"); 
		repeats[1].classList.remove("yellowColor"); 
		repeats[2].classList.remove("yellowColor"); 

		repeats[0].classList.add("blueColor"); 
		repeats[1].classList.add("blueColor"); 
		repeats[2].classList.add("blueColor"); 
	}else if(repeatNumber == 2){
		repeatNumber = 0; 
		repeats[0].classList.remove("blueColor"); 
		repeats[1].classList.remove("blueColor"); 
		repeats[2].classList.remove("blueColor"); 

		repeats[0].classList.add("blackColor"); 
		repeats[1].classList.add("blackColor"); 
		repeats[2].classList.add("blackColor");
	}

	// alert(repeatNumber)
}

function bottomPlayClick(){
	if(!trackClicked)
		return; 


	let plays = document.getElementsByClassName("bottomPlayIcon"); 
	let icon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]; 
	if(plays[0].classList.contains("fa-play")){
		plays[0].classList.remove("fa-play")
		icon.classList.remove("fa-play");

		plays[0].classList.add("fa-pause")
		icon.classList.add("fa-pause")

		if(reset){
			reset = false; 
			audio.src = "music/song" + trackNumb + ".mp3";
			setSongTime(); 
			playing = true; 
		}

		changePlayIcon("fa-play", "fa-pause")
		audio.play(); 
	}else{
		plays[0].classList.remove("fa-pause")
		icon.classList.remove("fa-pause")

		plays[0].classList.add("fa-play")
		icon.classList.add("fa-play")

		changePlayIcon("fa-pause", "fa-play")
		audio.pause(); 
	}
}

function playFieldClick(){
	if(!trackClicked)
		return; 

	let plays = document.getElementsByClassName("albumPlayIcon"); 
	let icon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]; 
	if(plays[0].classList.contains("fa-play")){
		plays[0].classList.remove("fa-play")
		icon.classList.remove("fa-play");

		plays[0].classList.add("fa-pause")
		icon.classList.add("fa-pause")

		if(reset){
			reset = false; 
			audio.src = "music/song" + trackNumb + ".mp3";
			setSongTime(); 
			playing = true; 
		}

		changePlayIcon("fa-play", "fa-pause")
		audio.play(); 
	}else{
		plays[0].classList.remove("fa-pause")
		icon.classList.remove("fa-pause")

		plays[0].classList.add("fa-play")
		icon.classList.add("fa-play")

		changePlayIcon("fa-pause", "fa-play")
		audio.pause(); 
	}
}

function playClick(){
	if(!trackClicked)
		return; 

	let plays = document.getElementsByClassName("fixedPlayIcon"); 
	let icon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]; 
	if(plays[0].classList.contains("fa-play")){
		plays[0].classList.remove("fa-play")
		plays[1].classList.remove("fa-play")
		icon.classList.remove("fa-play");

		plays[0].classList.add("fa-pause")
		plays[1].classList.add("fa-pause")
		icon.classList.add("fa-pause")

		if(reset){
			reset = false; 
			audio.src = "music/song" + trackNumb + ".mp3";
			setSongTime(); 
			playing = true; 
		}

		changePlayIcon("fa-play", "fa-pause")
		audio.play(); 
	}else{
		plays[0].classList.remove("fa-pause")
		plays[1].classList.remove("fa-pause")
		icon.classList.remove("fa-pause")

		plays[0].classList.add("fa-play")
		plays[1].classList.add("fa-play")
		icon.classList.add("fa-play")

		changePlayIcon("fa-pause", "fa-play")
		audio.pause(); 
	}
}

function setShuffle(){
	var count = 0; 
	shuffle = []; 
	while(true){
		let randomNumber = Math.floor(Math.random() * 12) + 1; 
		// alert(randomNumber)
		if(shuffle.indexOf(randomNumber) == -1){
			shuffle.push(randomNumber); 
			count++; 
		}

		if(count == 12)
			break; 
	}
}

function setNextPrev(){
	let nexts = document.getElementsByClassName("fa-step-forward"); 
	nexts[0].onclick = nextClick; 
	nexts[1].onclick = nextClick;
	nexts[2].onclick = nextClick;

	let prevs = document.getElementsByClassName("fa-step-backward"); 
	prevs[0].onclick = prevSong; 
	prevs[1].onclick = prevSong;
	prevs[2].onclick = prevSong;
}

//changing the current time of song
function songTimeClick(event){
	let perc = (event.pageX/this.clientWidth) * 100; 
	let value = document.getElementsByClassName("songValue")[0]; 

	value.style.width = perc + "%"

	let songValue = document.getElementsByClassName("bottomSongValue")[0]; 
	document.getElementsByClassName("bottomSongValue")[0].style.width = perc + "%";
	let bottomButton = document.getElementsByClassName("bottomButton")[0]
	var buttonLeft = songValue.offsetWidth - 12.5; 
	bottomButton.style.left = buttonLeft + "px"; 

	
	if(trackClicked == true){
		let currentTime = (perc/100) * audio.duration; 
		audio.currentTime = currentTime;
	}
}


function createMp3(){
	audio = new Audio("music/song1.mp3");
	audio.volume = 0.5;
}


//setListener for track play icon
function setTrackListener(){
	let tracks = document.getElementsByClassName("trackPlay"); 

	for(var i = 0; i < tracks.length; i++){
		trackPlayClick(tracks[i], i+1); 
	}
}

//when play is clicked from tracklist
function trackPlayClick(trackIcon, trackNumber){
	trackIcon.addEventListener("click", function(){
		// createMp3(); 

		if(!trackClicked){
			trackClicked = true; 
			showFixedPlay();
		}

		let fixedPlay = document.getElementById("fixedPlay")
		if(fixedPlay.style.display != "block" && fixedShow){
			fixedPlay.style.display = "block"; 
		}

		let trackIcon = this.getElementsByClassName("trackPlayIcon")[0] 
		let fixedPlayIcon = document.getElementsByClassName("fixedPlayIcon"); 

		if(trackIcon.classList.contains("fa-play")){
			trackIcon.classList.remove("fa-play")
			trackIcon.classList.add("fa-pause")

			fixedPlayIcon[0].classList.remove("fa-play"); 
			fixedPlayIcon[0].classList.add("fa-pause")

			fixedPlayIcon[1].classList.remove("fa-play"); 
			fixedPlayIcon[1].classList.add("fa-pause")

			document.getElementsByClassName("albumPlayIcon")[0].classList.remove("fa-play");
			document.getElementsByClassName("albumPlayIcon")[0].classList.add("fa-pause");
			document.getElementsByClassName("bottomPlayIcon")[0].classList.remove("fa-play");
			document.getElementsByClassName("bottomPlayIcon")[0].classList.add("fa-pause");

			if(this != activePlaIcon){
				audio.src = "music/song" + trackNumber + ".mp3";
				document.getElementsByClassName("songValue")[0].style.width = 0 + "%";
				songSeconds = 0; 
				clearTimeout(timeOut); 

				if(activePlaIcon != null){
					let icon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]; 
					icon.classList.remove("fa-pause")
					icon.classList.add("fa-play"); 
				} 
			}

			let trackName = document.getElementsByClassName("ssName")[trackNumber - 1]; 
			let names = document.getElementsByClassName("fixedTrackName"); 
			names[0].innerHTML = "Blaqbones - " + trackName.textContent; 
			names[1].innerHTML = "Blaqbones - " + trackName.textContent;

			
			playing = true; 
			setSongTime(); 
			audio.play(); 
		}else{
			playing = false; 
			trackIcon.classList.remove("fa-pause")
			trackIcon.classList.add("fa-play")

			document.getElementsByClassName("albumPlayIcon")[0].classList.remove("fa-pause");
			document.getElementsByClassName("albumPlayIcon")[0].classList.add("fa-play");

			document.getElementsByClassName("bottomPlayIcon")[0].classList.remove("fa-pause");
			document.getElementsByClassName("bottomPlayIcon")[0].classList.add("fa-play");

			fixedPlayIcon[0].classList.remove("fa-sync")
			fixedPlayIcon[0].classList.remove("fa-pause")
			fixedPlayIcon[0].classList.add("fa-play");

			fixedPlayIcon[1].classList.remove("fa-sync")
			fixedPlayIcon[1].classList.remove("fa-pause")
			fixedPlayIcon[1].classList.add("fa-play");

			changePlayIcon("fa-pause", "fa-play")
			audio.pause();
		}

		activePlaIcon = this; 
		trackNumb = trackNumber; 
	}, false);
}

function setSongTime(){
	// let timeValue = document.getElementsByClassName("timeValue")[0]; 
	

	timeOut = setTimeout(function(){
		let percentage = calculateSongPerc(); 
		let songValue = document.getElementsByClassName("bottomSongValue")[0]; 
		document.getElementsByClassName("songValue")[0].style.width = percentage + "%";
		document.getElementsByClassName("bottomSongValue")[0].style.width = percentage + "%";
		let bottomButton = document.getElementsByClassName("bottomButton")[0]
		var buttonLeft = songValue.offsetWidth - 12.5; 
		bottomButton.style.left = buttonLeft + "px"; 
		

		if(percentage == 100){
			if(repeatNumber == 0 && trackNumb != 12){
				trackNumb++;
				nextSong();
			}
			
			if(repeatNumber == 0 && trackNumb == 12){
				stopNextPlay();
			}

			if(repeatNumber == 1 || repeatNumber == 2){
				nextSong();
			}
		}

		if(playing)
			setSongTime(); 
	}, 1000)
}

function stopNextPlay(){
	let value = document.getElementsByClassName("songValue")[0]; 
	value.style.width = 0 + "%"; 

	changePlayIcon("fa-pause", "fa-play")

	trackNumb = 1; 
	playNumber = 1;
	playing = false;

	let trackName = document.getElementsByClassName("ssName")[playNumber - 1]; 
	let names = document.getElementsByClassName("fixedTrackName"); 
	names[0].innerHTML = "Blaqbones - " + trackName.textContent; 
	names[1].innerHTML = "Blaqbones - " + trackName.textContent;

	activePlaIcon = document.getElementsByClassName("trackPlay")[0];
	clearTimeout(timeOut)

	reset = true;
}

function nextClick(){
	if(!trackClicked)
		return; 

	if(repeatNumber == 0 || repeatNumber == 2){
		trackNumb = (trackNumb + 1) == 13 ? 1 : trackNumb + 1;  
	}

	nextSong();

	changePlayIcon("fa-play", "fa-pause")
}

function nextSong(){
	document.getElementsByClassName("songValue")[0].style.width = "0%"; 

	var pIcon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]; 
	pIcon.classList.remove("fa-pause")
	pIcon.classList.add("fa-play")

	if(repeatNumber == 1)
		trackNumb = (trackNumb + 1) == 13 ? 1 : trackNumb + 1; 
	

	playNumber = trackNumb; 

	if(isShuffle)
		playNumber = shuffle[trackNumb-1]

	playSong(playNumber); 
}

function prevSong(){
	if(!trackClicked)
		return; 

	document.getElementsByClassName("songValue")[0].style.width = "0%"; 

	var pIcon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]; 
	pIcon.classList.remove("fa-pause")
	pIcon.classList.add("fa-play")

	trackNumb = (trackNumb - 1) == 0 ? 12 : trackNumb - 1; 
	playNumber = trackNumb; 

	if(isShuffle)
		playNumber = shuffle[trackNumb-1]

	playSong(playNumber)
	changePlayIcon("fa-play", "fa-pause")
}

//pause song and change icons
function changePlayIcon(play1, play2){
	let plays = document.getElementsByClassName("fixedPlayIcon"); 
	plays[0].classList.remove(play1);
	plays[1].classList.remove(play1);
	document.getElementsByClassName("albumPlayIcon")[0].classList.remove(play1); 
	document.getElementsByClassName("bottomPlayIcon")[0].classList.remove(play1);

	let icon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0]
	icon.classList.remove(play1)

	plays[0].classList.add(play2)
	plays[1].classList.add(play2)
	document.getElementsByClassName("albumPlayIcon")[0].classList.add(play2); 
	document.getElementsByClassName("bottomPlayIcon")[0].classList.add(play2)
	icon.classList.add(play2)
}

function playSong(playNumber){
	if(playNumber == 13){
		trackNumb = 1; 
		playNumber = 1; 
		// audio.stop();

		let plays = document.getElementsByClassName("fixedPlayIcon"); 
		plays[0].classList.remove("fa-pause");
		plays[0].classList.add("fa-play")

		plays[1].classList.remove("fa-pause");
		plays[1].classList.add("fa-play")
		return; 
	}

	activePlaIcon = document.getElementsByClassName("trackPlay")[playNumber-1]; 
	pIcon = activePlaIcon.getElementsByClassName("trackPlayIcon")[0];
	pIcon.classList.remove("fa-play")
	pIcon.classList.add("fa-pause")

	let trackName = document.getElementsByClassName("ssName")[playNumber - 1]; 
	let names = document.getElementsByClassName("fixedTrackName"); 
	names[0].innerHTML = "Blaqbones - " + trackName.textContent; 
	names[1].innerHTML = "Blaqbones - " + trackName.textContent;

	audio.src = "music/song" + playNumber + ".mp3";
	audio.play(); 
}

//calculate song time percentage
function calculateSongPerc(duration){
	let perc = (audio.currentTime/audio.duration) * 100; 

	return perc; 
}

//when navigation is clicked
function navClick(){
	if(subNav != null && subNav.id != "nav" + this.id){
		// alert(subNav)
		subNav.style.display = "none";
	}else if(subNav != null && subNav.id == "nav" + this.id){
		subNav.style.display = "none"; 
		subNav = null;
		return;
	}

	// alert(this.id); 

	let nav = document.getElementById("nav" + this.id); 
	nav.style.display = "block";
	subNav = nav; 
}

//volume click listener
function volumeClick(e){
	volumeHeight = 200 - e.pageY; 
	

	volumeHelper(volumeHeight)
}

//volume click listener for fixed nav
function volumeClick2(e){
	let parent = this.parentNode; 
	let top = parent.offsetTop + this.offsetTop; 
	volumeHeight = 100 - (e.clientY - top); 

	// alert(e.clientY + ":::" + top + ":::" + volumeHeight)
	volumeHelper(volumeHeight)
}

function volumeHelper(volumeHeight){
	let volumeValue = document.getElementsByClassName("volumeValue")[0]; 
	let volumeValue2 = document.getElementsByClassName("volumeValue")[1]; 

	volumeValue.style.height = volumeHeight + "px";
	volumeValue2.style.height = volumeHeight + "px";

	if(audio != null)
		audio.volume = 0.01 * volumeHeight; 

	setVolumeIcon(volumeHeight);
}

// Set the volume icon after volume change
function setVolumeIcon(height){
	let volumeIcon = document.getElementsByClassName("volumeIcon")[0]; 
	let volumeIcon2 = document.getElementsByClassName("volumeIcon")[1]
	let classList = volumeIcon.classList;

	if(height >= 50){
		 
		if(classList.contains("fa-volume-down")){
			volumeIcon.classList.remove("fa-volume-down"); 
			volumeIcon.classList.add("fa-volume-up"); 

			volumeIcon2.classList.remove("fa-volume-down"); 
			volumeIcon2.classList.add("fa-volume-up"); 

			currentVolume = "fa-volume-up"
		}
		
	}else if(height < 50){
		if(classList.contains("fa-volume-up")){
			volumeIcon.classList.remove("fa-volume-up"); 
			volumeIcon.classList.add("fa-volume-down");

			volumeIcon2.classList.remove("fa-volume-up"); 
			volumeIcon2.classList.add("fa-volume-down");
			currentVolume = "fa-volume-down";
		}
	}
}

//Muting and unmuting volume when speaker icon is clicked
function volumeIconClick(){
	let volumeIcon = document.getElementsByClassName("volumeIcon")[0]; 
	let volumeIcon1 = document.getElementsByClassName("volumeIcon")[1]; 
	let classList = volumeIcon.classList;
	let volumeValue = document.getElementsByClassName("volumeValue")[0]; 
	let volumeValue1 = document.getElementsByClassName("volumeValue")[1]; 

	if(classList.contains("fa-volume-off")){
		volumeIcon.classList.remove("fa-volume-off")
		volumeIcon.classList.add(currentVolume);
		volumeIcon1.classList.remove("fa-volume-off")
		volumeIcon1.classList.add(currentVolume);

		volumeValue.style.height = volumeHeight + "px";
		volumeValue1.style.height = volumeHeight + "px"; 

		if(audio != null)
			audio.volume = 0.01 * volumeHeight;
	}else{
		volumeIcon.classList.remove(currentVolume);
		volumeIcon.classList.add("fa-volume-off");
		volumeValue.style.height = "5px";

		volumeIcon1.classList.remove(currentVolume);
		volumeIcon1.classList.add("fa-volume-off");
		volumeValue1.style.height = "5px";

		if(audio != null)
			audio.volume = 0.0
	}
}

//changing redo icon when clicked
function redoClick(){
	let redo = document.getElementsByClassName("redoIcon")[0]; 
	let redo1 = document.getElementsByClassName("redoIcon")[1];

	if(redo.classList.contains("navRightIcon")){
		redo.classList.remove("navRightIcon")
		redo.classList.add("redoClick")

		redo1.classList.remove("navRightIcon")
		redo1.classList.add("redoClick")
	}else{
		redo.classList.remove("redoClick")
		redo.classList.add("navRightIcon");

		redo1.classList.remove("redoClick")
		redo1.classList.add("navRightIcon");
	}
}

//show and hide fixed play at top right
function showFixedPlay(){
	if(fixedPlay != null){
		if(window.window.innerWidth > 980){
			if(window.pageYOffset >= 165 && trackClicked){
	 			// alert(window.pageYOffset)
		    	fixedPlay.style.display = "block"; 
		    	fixedShow = true; 
		    }else if(window.pageYOffset < 165){
		    	fixedShow = false; 
		    	fixedPlay.style.display = "none";
		    }

		    bottomPlayer.style.display = "none"
		}else if(trackClicked){
			bottomPlayer.style.display = "block"
			fixedPlay.style.display = "none"; 
		}
 	}
}


window.addEventListener("scroll", function(){
 	showFixedPlay(); 

}, false);


window.addEventListener("resize", function(){
	showFixedPlay();
})

window.addEventListener("load", start, false);