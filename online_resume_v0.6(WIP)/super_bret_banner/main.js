var canvas, canvasContext;

function loadCanvas() { //Setup canvas
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
}

function drawLoadingScreen() { //Display loading screen
    clearScreen();
    drawText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
}

function loadImages() { //Load all images
    //create image class
    //load images
    //assign images to array sets
}

function createMap() { //Create and populate map
    //create map handling class
    //read in textfile
    //convert textfile into map objects
    //store objects in array
}

function loadObjects() { //Load all objects
    //create special objects
}

function moveAll(objects) { // move all objects/scenery

}

function checkAll(objects) { // check if new locations are valid/else adjust movement

}

function drawAll(objects) { // draw all objects in final positions
    
}

function updateAll(objects) { //Updates all objects each frame
    moveAll(objects);
    checkAll(objects);
    drawAll(objects);
}

/*
--------------------------------------------------
------------------------Main----------------------
--------------------------------------------------
*/

window.onload = function () { //Main part I - starts when website loads
    loadCanvas();
    
    drawLoadingScreen();
    
    loadImages();
}

function startGame() { //Main part II - starts when images are done loading
    objects = loadObjects();
    
    setupInput(objects);
    
    createMap(objects);
    
    startGameLogicLoop(objects);
}

function startGameLogicLoop(objects) { //Main part III - starts looping when game is ready to play
    var framesPerSecond = 30;
    setInterval(updateAll(objects), 1000 / framesPerSecond);
}