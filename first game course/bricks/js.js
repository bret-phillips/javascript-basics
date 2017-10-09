
var canvas, canvasContext;

var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;
var ballRadius = 10;

var ballsLeft = 3;

var insidePaddle = false;

var paddleWidth = 100;
var paddleHeight = 10;
var paddleX =  350;
var paddleY = 540;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = 0;

var mouseX = 0;
var mouseY = 0;

function ballReset() {
    ballX = canvas.width / 2;
    ballY = 300;
    ballSpeedX = 0;
    ballSpeedY = 7;
    ballsLeft--;
}

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballX > canvas.width - ballRadius && ballSpeedX > 0.0) { // right
        ballSpeedX *= -1;
    }
    if (ballX < 0 + ballRadius && ballSpeedX < 0.0) { // left
        ballSpeedX *= -1;
    }
    if (ballY > canvas.height - ballRadius) { // bottom
        if(ballsLeft <= 0){
            ballsLeft = 3;
            brickReset();
        }
        ballReset();
    }
    if (ballY < 0 + ballRadius && ballSpeedY < 0.0) {  // top
        ballSpeedY *= -1;
    }
}

function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS &&
       row >= 0 && row < BRICK_ROWS) {
        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];
    } else {
        return false;
    }
}

function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    
    if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
       ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
        
        if(isBrickAtColRow(ballBrickCol, ballBrickRow)) {
            brickGrid[brickIndexUnderBall] = false;
            bricksLeft--;
            
            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W)
            var prevBrickRow = Math.floor(prevBallY / BRICK_H)
            
            var bothTestsFailed = true;
            
            if(prevBrickCol != ballBrickCol) {
                if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if(prevBrickRow != ballBrickRow) {
                if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }
            
            if(bothTestsFailed) { // armpit case
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
            
        } // end of brick found
    } // end of valid col and row
} // end of ballBrickHandling func
    
function ballPaddleHandling() {
    var paddleTopY = paddleY;
    var paddleLeftX = paddleX;
    var paddleBottomY = paddleY + paddleHeight;
    var paddleRightX = paddleX +paddleWidth;
    
    if (ballY + ballRadius > paddleTopY &&
        ballY < paddleBottomY &&
        ballX + ballRadius > paddleLeftX &&
        ballX - ballRadius < paddleRightX) {
        
        // var ballDistanceFromPaddleLeft = (ballX + ballRadius) - paddleLeftX;
        // var ballDistanceFromPaddleRight = paddleRightX - (ballX - ballRadius);
        
        if(insidePaddle == false) {
            ballSpeedY *= -1;
            insidePaddle = true;
            
            var centerOfPaddleX = paddleX + paddleWidth / 2;
            var ballDistanceFromPaddleCenterX = ballX - centerOfPaddleX;
            ballSpeedX = ballDistanceFromPaddleCenterX * 0.35;
            
        } 
        
        if(bricksLeft <= 0) {
            brickReset();
        } // out of bricks
        
        /*
        else if( ballX < paddleX + (paddleWidth/2)) {
                ballX = ballX - ballDistanceFromPaddleLeft;
        } else if( ballX > paddleX + (paddleWidth/2)) {
                ballX = ballX + ballDistanceFromPaddleRight;
        }
        */
        
    } else if(ballY + ballRadius < paddleTopY) {
        insidePaddle = false;
    } // above paddle

}

function moveAll() {
    ballMove();
    
    ballBrickHandling();
    
    ballPaddleHandling();
        
}

function drawRect(topLeftX, topLeftY, width, height, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, width, height);
}

function drawCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function brickReset() {
    bricksLeft = 0;
    var brickIndex;
    for(brickIndex = 0; brickIndex < 3*BRICK_COLS; brickIndex++) {
        brickGrid[brickIndex] = false;
    }
    for(brickIndex = 3*BRICK_COLS; brickIndex < BRICK_COLS * BRICK_ROWS; brickIndex++) {
        brickGrid[brickIndex] = true;
        bricksLeft++;
    }// end of for loop
}// end of brickReset

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}

function drawBricks() {
    var eachRow, eachCol;
    for(eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for(eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
            
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            
            if(brickGrid[arrayIndex]) {
                drawRect(1 + BRICK_W*eachCol, 1 + BRICK_H*eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
            }// end of if
        }// end of col for loop
    }// end of row for loop
}// end of drawBricks

function drawText(text, x, y, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y,);
}
 
function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    
    drawRect(paddleX, paddleY, paddleWidth, paddleHeight, 'white');
    
    drawCircle(ballX, ballY, ballRadius, 'white');
    
    drawBricks();
    
    // mouse location debugging
    /*
    var mouseBrickCol = Math.floor(mouseX / BRICK_W);
    var mouseBrickRow = Math.floor(mouseY / BRICK_H);
    var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow);
    drawText(mouseBrickCol+","+mouseBrickRow+":"+brickIndexUnderMouse, 
             mouseX, mouseY, 'yellow');
    */
}

function updateAll() {
    moveAll();
    drawAll();
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    paddleX = mouseX - paddleWidth / 2;
    
    // debugging cheat
    /*
    ballX = mouseX;
    ballY = mouseY;
    ballSpeedX = 4;
    ballSpeedY = -4;
    */
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    
    canvas.addEventListener('mousemove', updateMousePos);
    
    brickReset();
    ballReset();
};