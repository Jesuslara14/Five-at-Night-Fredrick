//classes

class Camera
{
    constructor(value, state, name){
		this.state = state;
		this.value = value;
		this.name = name;
    }
}

class Vent
{
	constructor(buttonElement, state){
		this.buttonElement = buttonElement;
		this.state = state;
	}
}

//Global Use Variables

var monitorView = document.getElementById('monitor');
var doorFrame = document.getElementById('doorBox');
var animatronicAtDoor = document.getElementById('animatronicAtDoor');
var vent1 = new Vent(document.getElementById('vent1'), false);
var vent2 = new Vent(document.getElementById('vent2'), false);
var doorClosed = false;
var lightOn = false;
var permissionState = true;
var power = 100;
var powerMultiplier = 1;
var time = 12;
var night = 1;

//sounds

var doorScareSound = new Audio('fnaf-door-sound.mp3');
var powerOutSound = new Audio('outage.mp3');
var powerOutSongSound = new Audio('powerout.mp3');
var ambianceSound = new Audio('ambiance.mp3');
var beepSound = new Audio('beep.mp3');
var doorSlamSound = new Audio ('door-slam.mp3');
var doorOpenSound = new Audio ('door-slam.mp3');
var jumpscareSound = new Audio ('jumscare.mp3');
var freddyLaughSound = new Audio ('freddy-laugh.mp3');
var ventSound = new Audio ('vent-noises.mp3');

ambianceSound.loop = "true";

//Menu

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('backToMenu').addEventListener('click', endGame);

function startGame(){
	startNight();
	document.getElementById('nightName').innerHTML = "Night " + night;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
}

function endGame(){
	document.getElementById('menu').style.display = 'block';
	document.getElementById('gameOverScreen').style.display = 'none';
}

//cameras

var cam1 = new Camera("url('stageViewAll.png')", false, "Stage");
var cam2 = new Camera("url('dinnerViewNone.png')", false, "Dining Room");
var cam3 = new Camera("url('arcadeViewNone.png')", false, "Arcade Room");
var cam4 = new Camera("url('maintenanceViewNone.png')", false, "Maintenance");
var cam5 = new Camera("url('officeHallViewNone.png')", false, "Office Hallway");
var cam6 = new Camera("url('coveViewNone.png')", false, "Pirate's Cove");
var cam7 = new Camera("url('kitchenViewNone.png')", false, "Kitchen");

function openCam(camera){
	resetAllCameras();
	beepSound.play();
	camera.state = true;
	monitorView.style.backgroundImage = camera.value;
	document.getElementById('roomName').innerHTML = camera.name;
}

function resetAllCameras(){
	monitorView.style.backgroundImage = "none";
	cam1.state = false;
	cam2.state = false;
	cam3.state = false;
	cam4.state = false;
	cam5.state = false;
	cam6.state = false;
	cam7.state = false;
}

function resetAllViews(){
	cam1.value = "url('stageViewAll.png')";
	cam2.value = "url('dinnerViewNone.png')";
	cam3.value = "url('arcadeViewNone.png')";
	cam4.value = "url('maintenanceViewNone.png')";
	cam5.value = "url('officeHallViewNone.png')";
	cam6.value = "url('coveViewNone.png')";
	cam7.value = "url('kitchenViewNone.png')";
}

//Locks

var doorElement = document.getElementById('door');
var lightButton = document.getElementById('lightButton');

function toggleVent(vent){
	doorSlamSound.play();
	switch(vent.state){
		case false:
			vent.state = true;
			vent.buttonElement.style.backgroundColor = "red";
			powerMultiplier = powerMultiplier + 1;
		break;
		case true:
			vent.state = false;
			vent.buttonElement.style.backgroundColor = "blue";
			powerMultiplier = powerMultiplier - 1;
		break;
	}
}

function toggleDoor(){
	doorSlamSound.play();
	switch(doorClosed){
		case false:
			doorClosed = true;
			doorElement.style.height = "560px";
			powerMultiplier = powerMultiplier + 1;
		break;
		case true:
			doorClosed = false;
			doorElement.style.height = "0px";
			powerMultiplier = powerMultiplier - 1;
		break;
	}
}


lightButton.addEventListener('mouseover', function(){
	lightOn = true;
	doorFrame.style.backgroundImage = "url('doorwhenitsopsn.png')";
	powerMultiplier = powerMultiplier + 1;
	animatronicAtDoor.style.display = "block";
	if (animatronicAtDoor.style.backgroundImage != "none"){
		doorScareSound.play();
	}
});

lightButton.addEventListener('mouseout', function(){
	lightOn = false;
	doorFrame.style.backgroundImage = "none";
	powerMultiplier = powerMultiplier - 1;
	animatronicAtDoor.style.display = "none";
});

function resetSwitches(){
	vent1.state = false;
	vent1.buttonElement.style.backgroundColor = "blue";
	vent2.state = false;
	vent2.buttonElement.style.backgroundColor = "blue";
	lightOn = false;
	doorFrame.style.backgroundImage = "none";
	animatronicAtDoor.style.display = "none";
	doorClosed = false;
	doorElement.style.height = "0px";
	powerMultiplier = 1;
}

//Power

	var powerChecker;
	var powerInterval;

function startPowerCountdown(){
	powerMultiplier = 1;
	powerInterval = setInterval(function(){
		if(power < 0){
			clearInterval(powerInterval);
			document.getElementById('power').innerHTML = "0%";
			powerOutSystem();
		}else{
			power = power - (0.25 * powerMultiplier);
			document.getElementById('power').innerHTML = Math.floor(power) + "%";
		}
	}, 1000);
	powerChecker = setInterval(function(){if(permissionState == false){clearInterval(powerInterval); return 0;}}, 1000);
}

function powerOutSystem(){
	ambianceSound.pause();
	permissionState = false;
	resetUtilities();
	document.getElementsByClassName('monitorControls')[0].style.display = "none";
	document.getElementsByClassName('stats')[0].style.display = "none";
	document.getElementsByClassName('officeBackground')[0].style.opacity = "50%";
	monitorView.style.backgroundImage = "none";
	monitorView.style.backgroundColor = "black";
	lightButton.style.display = "none";
	document.getElementById('doorButton').style.display = "none";
	powerOutSound.play();
	setTimeout(function(){powerOutSongSound.play();}, 7000);
	setTimeout(function(){
		animatronicAtDoor.style.backgroundImage = "url('fazbender.png')";
		animatronicAtDoor.style.display = "block";
	}, 34000);
	setTimeout(function(){gameOver("url('fazbender.png')");}, 67000);
}

//Jumpscares

function gameOver(winningCharacter){
	ambianceSound.pause();
	permissionState = false;
	resetUtilities();
	resetOffice();
	resetAllCameras();
	resetSwitches();
	resetAllViews();
	clearInterval(nightChecker);
	clearInterval(powerChecker);
	clearInterval(changeTimeChecker);
	clearInterval(powerInterval);
	document.getElementById('gameArea').style.display = "none";
	document.getElementById('gameOverScreen').style.display = "block";
	document.getElementById('jumpscareScreen').style.backgroundImage = winningCharacter;
	document.getElementById('jumpscareScreen').style.display = "block";
	jumpscareSound.play();
	setTimeout(function(){document.getElementById('jumpscareScreen').style.display = "none";}, 1100);	
}

function resetUtilities(){
	resetAllCameras();
	resetSwitches();
	resetPositions();
	power = 100;
	powerMultiplier = 1;
	time = 12;
}

function resetOffice() {
	document.getElementsByClassName('monitorControls')[0].style.display = "block";
	document.getElementsByClassName('stats')[0].style.display = "block";
	document.getElementsByClassName('officeBackground')[0].style.opacity = "100%";
	document.getElementById('lightButton').style.display = "block";
	document.getElementById('doorButton').style.display = "block";
	document.getElementById('power').innerHTML = "100%";
	document.getElementById('time').innerHTML = "12:00 AM";
	document.getElementById('roomName').innerHTML = "NULL";
	animatronicAtDoor.style.backgroundImage = "none";
	animatronicAtDoor.style.display = "none";
}

//The Night

var BCdone = false;
var bDone = false;
var cDone = false;
var bRand;
var cRand;
var animatronicChecker;
var changeTimeChecker;
var nightChecker;
var fPosition = 1;
var bPosition = 1;
var cPosition = 1;
var xPosition = 1;

function startNight(){
	ambianceSound.play();
	permissionState = true;
	startPowerCountdown();
	BC();
	changeTimeChecker = setInterval(function(){changeTime();}, 47000);
	nightChecker = setInterval(function(){if(permissionState == false){clearInterval(changeTimeChecker); return 0; }else if(BCdone == true){console.log("they went back"); BCdone = false; BC();}}, 500);
}

function changeTime(){
	console.log("timeout")
	switch (time){
		case 12:
			time = 1;
		break;
		default:
			time += 1;
		break;
	}
	document.getElementById('time').innerHTML = time + ":00 AM";
	if (time == 6)
	{
		winGame();
		return 0;
	}
}

function BC()
{
	//Reminder that you can store all timeouts in an array to cancel them at the end;
	console.log("These two started movin");
	bDone = false;
	cDone = false;
	//Start Path
	setTimeout(function(){
		//Move Chica and Bonnie to the dinner room
		cam1.value = "url('stageViewF.png')";
		if(cam1.state == true){
		monitorView.style.backgroundImage =  "url('stageViewF.png')";
		}
		cam2.value = "url('dinnerViewBC.png')";
		if(cam2.state == true){
			monitorView.style.backgroundImage =  "url('dinnerViewBC.png')";
		}
		bPosition = 2;
		cPosition = 2;
		setTimeout(function(){
			//Move Bonnie to the arcade
			cam2.value = "url('dinnerViewC.png')";
			if(cam2.state == true){
				monitorView.style.backgroundImage =  "url('dinnerViewC.png')";
			}
			cam3.value = "url('arcadeViewB.png')";
			if(cam3.state == true){
				monitorView.style.backgroundImage =  "url('arcadeViewB.png')";
			}
			bPosition = 3;
			setTimeout(function(){
				//Move Bonnie to the Maintenance room
				if(cPosition == 3){
					cam3.value = "url('arcadeViewC.png')";
					if(cam3.state == true){
					monitorView.style.backgroundImage =  "url('arcadeViewC.png')";
					}
				}else{
					cam3.value = "url('arcadeViewNone.png')";
					if(cam3.state == true){
					monitorView.style.backgroundImage =  "url('arcadeViewNone.png')";
					}
				}
				cam4.value = "url('maintenanceViewB.png')";
				if(cam4.state == true){
				monitorView.style.backgroundImage =  "url('maintenanceViewB.png')";
				}
				bPosition = 4;
				setTimeout(function(){
					//30% Chance of Bonnie entering the vent, 70% Chance of Bonnie entering the Office hall
					bRand = Math.random();
					if (bRand > 0.3)
					{
						//Bonnie enters the office door
						cam4.value = "url('maintenanceViewNone.png')";
						if(cam4.state == true){
						monitorView.style.backgroundImage =  "url('maintenanceViewNone.png')";
						}
						animatronicAtDoor.style.backgroundImage = "url('bonniette.png')";
						bPosition = 5;
						setTimeout(function(){
							if(doorClosed == true){
								animatronicAtDoor.style.backgroundImage = "none";
								cam2.value = "url('dinnerViewBC.png')";
								if(cam2.state == true){
									monitorView.style.backgroundImage =  "url('dinnerViewBC.png')";
								}
								bDone = true;
							}else if(doorClosed == false){
								gameOver("url('bonniette.png')");
							}
						}, 10000);
					}else if (bRand < 0.3){
						//Bonnie vents (sus)
						bPosition = 6;
						cam4.value = "url('maintenanceViewB-V.png')";
						if(cam4.state == true){
						monitorView.style.backgroundImage =  "url('maintenanceViewB-V.png')"
						}
						setTimeout(function(){
							if(vent1.state == true){
								cam4.value = "url('maintenanceViewNone.png')";
								if(cam4.state == true){
								monitorView.style.backgroundImage =  "url('maintenanceViewNone.png')";
								cam2.value = "url('dinnerViewBC.png')";
								if(cam2.state == true){
									monitorView.style.backgroundImage =  "url('dinnerViewBC.png')";
								}
								bDone = true;
							}else if(vent1.state == false){
								cam4.value = "url('maintenanceViewNone.png')";
								if(cam4.state == true){
									monitorView.style.backgroundImage =  "url('maintenanceViewNone.png')";
								}
								ventSound.play();
								setTimeout(function(){gameOver("url('bonniette.png')");}, 7000);
							}
						}}, Math.round((Math.random()*20000) + 7000));
					}
				}, Math.round((Math.random()*25000) + 7000));
			}, Math.round((Math.random()*25000) + 7000)); 
			setTimeout(function(){
				//70% chance move Chica to kitchen, 30% chance move Chica with Bonnie
				cRand = Math.random();
				if(cRand <= 0.7){
					//Move Chica to Kitchen
					cam2.value = "url('dinnerViewNone.png')";
					if(cam2.state == true){
					monitorView.style.backgroundImage =  "url('dinnerViewNone.png')";
					}
					cam7.value = "url('kitchenViewC.png')";
					if(cam7.state == true){
					monitorView.style.backgroundImage =  "url('kitchenViewC.png')";
					}
					cPosition = 7;
					setTimeout(function(){
						//Move Chica near Vent
						cam7.value = "url('kitchenViewC-V.png')";
						if(cam7.state == true){
							monitorView.style.backgroundImage =  "url('kitchenViewC-V.png')";
						}
						setTimeout(function(){
							if(vent2.state == true){
								cam7.value = "url('kitchenViewNone.png')";
								if(cam7.state == true){
									monitorView.style.backgroundImage =  "url('kitchenViewNone.png')";
								}
								cDone = true;
							}else if(vent2.state == false){
								cam7.value = "url('kitchenViewNone.png')";
								if(cam7.state == true){
									monitorView.style.backgroundImage =  "url('kitchenViewNone.png')";
								}
								ventSound.play();
								setTimeout(function(){gameOver("url('amogus-chica.png')");}, 7000);
							}
						}, Math.round((Math.random()*15000) + 7000));
					}, Math.round((Math.random()*25000) + 10000));
				}else if(cRand >= 0.7)
				{
					//Move Chica with Bonnie
					cam2.value = "url('dinnerViewNone.png')";
					if(cam2.state == true){
					monitorView.style.backgroundImage =  "url('dinnerViewNone.png')";
					}
					if(bPosition == 3){
						cam3.value = "url('arcadeViewCB.png')";
						if(cam3.state == true){
						monitorView.style.backgroundImage =  "url('arcadeViewCB.png')";
						}
					}else{
						cam3.value = "url('arcadeViewC.png')";
						if(cam3.state == true){
						monitorView.style.backgroundImage =  "url('arcadeViewC.png')";
						}
					}
					cPosition = 3;
				}
			}, 10000)
		}, Math.round((Math.random()*25000) + 10000));
	}, Math.round((Math.random()*30000) + 10000));
	animatronicChecker = setInterval(function(){if(permissionState == false){return 0;}}, 500);
	setInterval(function(){if(bDone == true && cDone == true){bPosition = 2; cPosition = 2;BCdone = true; return 0;}}, 1000);
}

function winGame(){
	ambianceSound.pause();
	permissionState = false;
	resetOffice();
	resetAllCameras();
	resetSwitches();
	resetUtilities();
	resetAllViews();
	clearInterval(nightChecker);
	clearInterval(powerChecker);
	clearInterval(changeTimeChecker);
	clearInterval(powerInterval);
	document.getElementById('gameArea').style.display = "none";
	document.getElementById('gameWonScreen').style.display = "block";
	setTimeout(function(){document.getElementById('gameWonScreen').style.display = "none";}, 1000);
	setTimeout(function(){document.getElementById('menu').style.display = "block";}, 1000);
}

function resetPositions(){
	bPosition = 1;
	cPosition = 1;
	fPosition = 1;
	xPosition = 1;
}

//test

