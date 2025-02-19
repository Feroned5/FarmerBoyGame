function controller(event) {

    if (event.key == "Enter") {
        if (runWorkerNumber == 0) {

            run();
            runSound.play()
            moveBackground();
            updateScore();
            flameX.forEach(createFlames);
        }
    }

    if (event.key == " ") {
        if (jumpWorkerNumber == 0) {
            if (runWorkerNumber != 0) {
                clearInterval(runWorkerNumber);
                runSound.pause();
                jump();
                jumpSound.play();
            }
        }
    }

}

var runImageNumber = 1;
var runWorkerNumber = 0;
var runSound = new Audio("run.mp3")
runSound.loop = true;


function run() {


    runWorkerNumber = setInterval(() => {
        runImageNumber = runImageNumber + 1;
        if (runImageNumber == 9) {
            runImageNumber = 1;
        }
        document.getElementById("boy").src = "run" + runImageNumber + ".png";

    }, 150);
}

var jumpWorkerNumber = 0;
var jumpImageNumber = 1;
var jumpMarginTop = 615;
var jumpSound = new Audio("jump.mp3");

function jump() {

    jumpWorkerNumber = setInterval(() => {

        jumpImageNumber = jumpImageNumber + 1;
        if (jumpImageNumber < 8) {
            jumpMarginTop = jumpMarginTop - 10;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

        if (jumpImageNumber > 7) {
            jumpMarginTop = jumpMarginTop + 10;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }


        if (jumpImageNumber == 13) {
            jumpImageNumber = 1;
            clearInterval(jumpWorkerNumber);
            run();
            runSound.play();
            jumpWorkerNumber = 0;
        }

        document.getElementById("boy").src = "jump" + jumpImageNumber + ".png";

    }, 100);
}

var backgroundWorkerNumber = 0;
var moveBackgroundX = 0;

function moveBackground() {
    backgroundWorkerNumber = setInterval(() => {

        moveBackgroundX = moveBackgroundX - 10;
        document.getElementById("background").style.backgroundPositionX = moveBackgroundX + "px";


    }, 50);

}

var scoreWorkerNumber = 0;
var score = 0;

function updateScore() {

    scoreWorkerNumber = setInterval(() => {

        if (score == 1000) {
            alert("You won!Press Ok to restart")
            
            window.location.reload();
        }
        score = score + 10;
        document.getElementById("score").innerHTML = score;


    }, 200)

}

var flameX = [500, 1000, 1200, 1500, 1900, 2100, 2500,500, 1000, 1200, 1500, 1900, 2100, 2500, 1000, 1200, 1500, 1900, 2100, 2500];
var flameWorkerNumber = 0;


function createFlames(x) {
    var i = document.createElement("img");//<img/>
    i.src = "flame.gif";//<img src ="flame.gif"/>
    i.className = "flame"
    i.style.marginLeft = x + "px";

    flameWorkerNumber = setInterval(()=>{
        if(flameWorkerNumber!= 0){       
            x=x-5;
            i.style.marginLeft = x+ "px";
            
        }


        if(x==140){
            if(jumpWorkerNumber==0){

                clearInterval(runWorkerNumber);
                runSound.pause();
                clearInterval(backgroundWorkerNumber);
                clearInterval(scoreWorkerNumber);

                
            dead();
            deadSound.play();
            flameWorkerNumber =0;
            

        }
        }
    },50);

    document.getElementById("background").appendChild(i);
}


var deadWorkerNumber = 0;
var deadImageNumber = 1;
var deadSound = new Audio("dead.mp3");

function dead() {

    deadWorkerNumber = setInterval(() => {

        deadImageNumber = deadImageNumber + 1;

        if (deadImageNumber == 11) {
            //alert("You Lose! Press Ok to Try Again");
            window.location.href = "end.html";
        }

        document.getElementById("boy").src = "dead" + deadImageNumber + ".png";

    }, 100);
}





