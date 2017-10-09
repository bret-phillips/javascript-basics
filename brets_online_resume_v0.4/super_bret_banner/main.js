// create canvas variables
var canvas, canvasContext;

// objects will hold all interactive objects
var objects = [];

// create player
var bret = new bretClass(2550,181, 26,58, 10);

// create ground
var ground = new terrainClass(0,302);

// create dixie cliff
var mountainImage = document.createElement("img");
mountainImage.src = "images/dixie_mountain02.png";
var mountainX = 0;
var mountainY = 0;

// create clouds
var cloud01 = new cloudClass();
var cloud02 = new cloudClass();
var cloud03 = new cloudClass();
var cloud04 = new cloudClass();
var cloud05 = new cloudClass();
var cloud06 = new cloudClass();
var cloud07 = new cloudClass();

// prepare clouds to display
function loadClouds() {
    cloud01.create();
    cloud02.create();
    cloud03.create();
    cloud04.create();
    cloud05.create();
    cloud06.create();
    cloud07.create();
}

// prepare dixie cliff to display
function loadMountain() {
    mountainX = 800;
    mountainY = 146;
}

// move clouds
function moveClouds() {
    cloud01.move();
    cloud02.move();
    cloud03.move();
    cloud04.move();
    cloud05.move();
    cloud06.move();
    cloud07.move();
}

// move screen right
function moveScreenRight() {
    // adjust objects/background to screen's new position
    for(var i = 1; i < objects.length; i++) {
        moveScenery(objects[i]);
    }
    moveMountain(mountainImage);
    moveBG(cloud01);
    moveBG(cloud02);
    moveBG(cloud03);
    moveBG(cloud04);
    moveBG(cloud05);
    moveBG(cloud06);
    moveBG(cloud07);
    moveScenery(ground);
    moveScreen(objects[0]);
}

// move screen left
function moveScreenLeft() {
    // adjust objects/background to screen's new position
    for(var i = 1; i < objects.length; i++){
        moveSceneryl(objects[i]);
    }
    moveMountainl(mountainImage);
    moveBGl(cloud01);
    moveBGl(cloud02);
    moveBGl(cloud03);
    moveBGl(cloud04);
    moveBGl(cloud05);
    moveBGl(cloud06);
    moveBGl(cloud07);
    moveSceneryl(ground);
    moveScreenl(objects[0]);    
}

// check if screen needs to move
function checkScreenBoundaries() {
// get browser width for screen resizing
    var screenWidth = getScreenWidth();
    
    // scroll screen/objects if necesary
    if(bret.x > screenWidth * 0.60) { // if player is past right screen boundary
        while(bret.x > screenWidth * 0.60) {
            moveScreenRight();
        }
    } else if(bret.x < screenWidth * 0.40) { // if player is past left screen boundary
        while(bret.x < screenWidth * 0.40) {
            moveScreenLeft();
        }
    }    
}

// move all objects and scenery if position has changed
function moveAll() {
    moveClouds();
    
    // check is screen needs to move - move if necesary
    checkScreenBoundaries();
    
    // move all objects
    for(var i = 0; i < objects.length; i++){
            objects[i].move();
    }
}

// draw clouds to screen
function drawClouds() {
    cloud01.draw();
    cloud02.draw();
    cloud03.draw();
    cloud04.draw();
    cloud05.draw();
    cloud06.draw();
    cloud07.draw();    
}

// draw everything to screen
function drawAll() {
    clearScreen();
    // background image that matches websites background - used to blend banner into website
    drawRect(0, 300, canvas.width, 50, '#661c0a');
    drawClouds();
    // draw dixie cliff
    drawBitmapWithOffset(mountainImage, mountainX, mountainY, 0, 0);
    
    for(var i = 0; i < objects.length; i++){
        (objects[i]).draw();
    }
    
    ground.draw();
    
}

// update everything
function updateAll() {
    moveAll();
    checkForCollisions(objects);
    drawAll();
}

// run when website loads
window.onload = function () {
    // get game window
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    // simple loading screen
    clearScreen();
    drawText("LOADING IMAGES", canvas.width/2 - 350, canvas.height/2, 'white');
    
    // load graphics for game
    loadImages();
}

// graphics ready - start game
function imageLoadingDoneSoStartGame() {
    loadClouds();
    loadMountain();

    // add player 1 into objects list
    objects.push(bret);
    
    loadMap();
    
    setupInput();
    
    // set frame rate
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
}