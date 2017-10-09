var canvas, canvasContext;

var redCar = new carClass();
var greenCar = new carClass();

function moveAll() {
    redCar.move();
    greenCar.move();
}

function drawAll() {
    drawTracks();
    redCar.draw();
    greenCar.draw();
}

function updateAll() {
    moveAll();
    drawAll();
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    clearScreen();
    drawText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
    
    loadImages();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    
    setupInput();
    redCar.reset(redCarPic);
    greenCar.reset(carPic);
};