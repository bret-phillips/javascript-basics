


var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var ballRadius = 10;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
var paddle2SpeedY = 8;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}




/*
function DiceRoll(sides) {
    return Math.floor(Math.random() * sides) +1;
}

var ans = -1;
var roll = 0;
for(i = 1; ans != roll; i++) {
    ans = prompt("Guess what number I am thinking of.");
    roll = DiceRoll(10);
}

document.write(i);
*/

function handleMouseClick(evt) {
    if(showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload = function() {
    console.log("Loaded...");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
    
    canvas.addEventListener('mousedown', handleMouseClick);
    
    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePosition(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    });
    
}

function ballReset() {
    if(player1Score >= WINNING_SCORE ||
       player2Score >= WINNING_SCORE) {
        showingWinScreen = true        
    }
    ballSpeedX = - ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY-35) {
        paddle2Y += paddle2SpeedY;
    } else if(paddle2YCenter > ballY+35){
        paddle2Y -= paddle2SpeedY;
    }
}

function moveEverything() {
    if(showingWinScreen) {
        return;
    }
    
    computerMovement();
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // check right side of screen
    if(ballX > canvas.width-ballRadius) {
        if(ballY > paddle2Y &&
           ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = - ballSpeedX;
            
            var deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            
        } else {
            player1Score++;
            ballReset();
        }
    }
    
    // check left side of screen
    if(ballX < 0+ballRadius) {
        if(ballY > paddle1Y &&
           ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = - ballSpeedX;
            
            var deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            
        } else {
            player2Score++;
            ballReset();
        }
    }
    
    // check bottom of screen
    if(ballY > canvas.height-ballRadius) {
        ballSpeedY = - ballSpeedY;
    }
    
    // check top of screen
    if(ballY < 0+ballRadius) {
        ballSpeedY = - ballSpeedY;
    }
}

function drawNet() {
    var i;
    for(i = 10; i < canvas.height; i += 40){
        colorRect(canvas.width/2 -1, i, 2, 20, 'white');
    }
}

function drawEverything() {
    // background
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    
    if(showingWinScreen) {
        canvasContext.fillStyle = 'white';
        
        if(player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Left player won!", 350, 200);
        } else if(player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Right player won!", 350, 200);
        }
        
        canvasContext.fillText("Click to continue", 350, 500);
        return;
    }
    
    drawNet();
    
    // left paddle
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    
    // right paddle
    colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    
    // ball
    coloreCircle(ballX, ballY, ballRadius, 'white');
    
    // score
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function coloreCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}






