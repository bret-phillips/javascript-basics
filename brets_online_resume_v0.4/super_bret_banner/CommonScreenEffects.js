// variables for moving screen
var screenX = 0;
var screenY = 0;
var screenSpeed = 10;

// get width of screen in browser
function getScreenWidth(){
    canvas.setAttribute('width', window.innerWidth);
    return canvas.width;
}

// move scenery left - screen is moving right
function moveScenery(object) {    
    object.x -= screenSpeed;
    object.prevX -= screenSpeed
}

// move screen right - move objects left
function moveScreen(object) {
    screenX += screenSpeed;
    
    object.x -= screenSpeed;
    object.prevX -= screenSpeed
}

// move background object right - screen is moving left
function moveBGl(backgroundObject) {
    backgroundObject.x += screenSpeed / 2;
}

// move background object left - screen is moving right
function moveBG(backgroundObject) {
    backgroundObject.x -= screenSpeed / 2;
}

// move dixie cliff right - screen is moving left
function moveMountainl(backgroundObject) {
    mountainX += screenSpeed / 2;
}

// move dixie cliff left - screen is moving right
function moveMountain(backgroundObject) {
    mountainX -= screenSpeed / 2;
}

// move object right - screen is moving left
function moveSceneryl(object) {
    
    if(screenX > 0) {
        object.x += screenSpeed;
        object.prevX += screenSpeed
        //moveBG();
    }
}

// move screen left - move objects right
function moveScreenl(object) {
    
    if(screenX > 0) {
        screenX -= screenSpeed;

        object.x += screenSpeed;
        object.prevX += screenSpeed
    } else {
        screenX = 0;
    }
}