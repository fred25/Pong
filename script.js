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
const playerSpd = 20;

const unitSize = 15;

let running = false;

let playerMov = 0;
let enemyMov = 4;

let playerPosition = gameHeight/2-playerSize/2;
let enemyPosition = gameHeight/2-playerSize/2;
let ballX = gameWidth/2;
let ballY = gameHeight/2;

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
    if(running){
        setTimeout(()=>{
            clearBoard();
            movePlayer();
            drawPlayer();
            drawEnemy();
            drawBall();
            nextTick();
        }, 0);
    }
};

function drawBall(){
    ctx.fillStyle = ballColor;
    ctx.fillRect(ballX, ballY, unitSize, unitSize);
};

function moveBall(){

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
        case(keyPressed == Up):
            playerMov = -playerSpd;
            break;
        case(keyPressed == Down):
            playerMov = playerSpd;
            break;
        default:
            playerMov = 0;
    }
    keyPressed = 0;
};

function movePlayer(){

    playerPosition += playerMov;
    playerMov = 0;

    if(playerPosition < 0){
        playerPosition = 0
    }
    else if(playerPosition >= gameHeight-playerSize){
        playerPosition = gameHeight-playerSize;
    }
}

function drawPlayer(){
    ctx.fillStyle = playerColor;
    ctx.fillRect(30, playerPosition, unitSize, playerSize);
};

function moveEnemy(){

};

function drawEnemy(){
    ctx.fillStyle = enemyColor;
    ctx.fillRect(gameWidth-unitSize*3, enemyPosition, unitSize, playerSize);
};

function restartMatch(){

};

function restartGame(){

};