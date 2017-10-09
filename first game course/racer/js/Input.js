const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);
    
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    redCar.setupIntput(KEY_A, KEY_W, KEY_D, KEY_S);
    greenCar.setupIntput(KEY_LEFT_ARROW, KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    // debugging cheat
    /*
    carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;
    */
}

function keySet(keyEvent, whichCar, setTo) {
    if(keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeld_TurnRight = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeld_Gas = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt) {
    console.log("key pressed: "+evt.keyCode);
    keySet(evt, redCar, true);
    keySet(evt, greenCar, true);
    
    evt.preventDefault(); // stop window from scrolling
}

function keyReleased(evt) {
    //console.log("key released: "+evt.keyCode);
    keySet(evt, redCar, false);
    keySet(evt, greenCar, false);
}

function mouseLocationOnScreen() {
// mouse location debugging
    var mouseTrackCol = Math.floor(mouseX / TRACK_W);
    var mouseTrackRow = Math.floor(mouseY / TRACK_H);
    var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
    drawText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, 
             mouseX, mouseY, 'yellow');
}