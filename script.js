//objects
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const playerScoreText = document.querySelector("#playerScoreText");
const enemyScoreText = document.querySelector("#enemyScoreText");
const restartBtn = document.querySelector("#restartBtn");

//width and height
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

//colors
const boardBackground = "black";
const playerColor = "cyan";
const enemyColor = "red";
const ballColor = "yellow";

const playerSize = 75;
const playerSpd = 5;
const enemySpd = 2;

const unitSize = 15;

let running = false;

let playerMov = 0;
let enemyMov = 4;

let playerPosition = gameHeight/2-playerSize/2;
let enemyPosition = gameHeight/2-playerSize/2;

const ballSpd = 5;
let ballAngle = 0;
let ballX = gameWidth/2;
let ballY = gameHeight/2;
let ballYDirection = ballSpd;
let ballXDirection = ballSpd;


let playerScore = 0;
let enemyScore = 0;

window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);

gameStart();

function gameStart(){
    running = true;
    nextTick();
};

function nextTick(){
        setTimeout(()=>{
            clearBoard();
            movePlayer();
            drawPlayer();
            moveEnemy();
            drawEnemy();
            checkCollisionWalls();
            checkCollisionPlayer();
            checkCollisionEnemy();
            moveBall();
            drawBall();
            checkGoals();
            nextTick();
     10}, 10)
};

function drawBall(){
    ctx.fillStyle = ballColor;
    ctx.fillRect(ballX, ballY, unitSize, unitSize);
};

function moveBall(){
    ballX += ballXDirection * Math.cos(ballAngle);
    ballY -= ballYDirection * Math.sin(ballAngle);
}

function checkCollisionWalls(){
    if(ballY < 0 || ballY >= gameHeight-unitSize){ 
        ballYDirection *= -1;
    }
}

function checkCollisionPlayer(){
    if(ballX <= 45 && ballX >= 30 && ballY > playerPosition && ballY < playerPosition+playerSize){
        let min = -Math.PI/3;
        let max = Math.PI/3
        ballAngle = Math.random()*(max-min)+min;
    }
}

function checkCollisionEnemy(){
    if(ballX + unitSize >= gameWidth-unitSize*3 && ballX + unitSize <= gameWidth-unitSize*2 && ballY > enemyPosition && ballY < enemyPosition+playerSize){
        let min = 2*Math.PI/3;
        let max = 4*Math.PI/3
        ballAngle = Math.random()*(max-min)+min;
    }
}

function checkGoals(){
    if(ballX < 0){
        enemyScore++;
        enemyScoreText.innerHTML = enemyScore;
        restartMatch();
    }else if(ballX > gameWidth){
        playerScore++;
        playerScoreText.innerHTML = playerScore;
        restartMatch();
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function changeDirection(event){
    const keyPressed = event.keyCode;

    const Up = 38;
    const Down = 40;

    switch(true){
        case keyPressed == Down:
            playerMov = 1;
            break;
        case keyPressed == Up:
            playerMov = -1;
            break;
        default:
            playerMov = 0;
    } 

};

function movePlayer(){

    playerPosition += playerSpd*playerMov;

    if (playerPosition <= 0 ){
        playerPosition = 0
    }else if (playerPosition + playerSize >= gameHeight){
        playerPosition = gameHeight-playerSize;
    }

}

function drawPlayer(){
    ctx.fillStyle = playerColor;
    ctx.fillRect(30, playerPosition, unitSize, playerSize);
};

function moveEnemy(){
    if(enemyPosition +playerSize/2 < ballY){
        enemyPosition += enemySpd;
    }
    else if(enemyPosition+playerSize/2 >= ballY){
        enemyPosition -= enemySpd;
    }
};

function drawEnemy(){
    ctx.fillStyle = enemyColor;
    ctx.fillRect(gameWidth-unitSize*3, enemyPosition, unitSize, playerSize);
};

function restartMatch(){
    ballX = gameWidth/2;
    ballY = gameHeight/2;
    playerPosition = gameHeight/2-playerSize/2;
    enemyPosition = gameHeight/2-playerSize/2;
    ballAngle = Math.PI;
};

function restartGame(){
    playerScore = 0;
    enemyScore = 0;
    playerScoreText.innerHTML = playerScore;
    enemyScoreText.innerHTML = enemyScore;
    restartMatch();
};