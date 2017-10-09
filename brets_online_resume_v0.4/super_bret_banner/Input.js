// constants used for easier to read code
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

// setup player input
function setupInput() {
    // create event listeners
    canvas.addEventListener('mousemove', updateMousePos);
    
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    // assign keys to player object
    bret.setupIntput(KEY_LEFT_ARROW, KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW);
}

// update mouse position
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

// set keys for player
function keySet(keyEvent, player, setTo) {
    if(keyEvent.keyCode == player.controlKeyLeft) {
        player.keyHeld_Left = setTo;
    }
    if(keyEvent.keyCode == player.controlKeyRight) {
        player.keyHeld_Right = setTo;
    }
    if(keyEvent.keyCode == player.controlKeyUp) {
        player.keyHeld_Up = setTo;
    }
    if(keyEvent.keyCode == player.controlKeyDown) {
        player.keyHeld_Down = setTo;
    }
}

// key was pressed
function keyPressed(evt) {
    keySet(evt, bret, true);
    
    evt.preventDefault(); // stop window from scrolling
}

// key was released
function keyReleased(evt) {
    keySet(evt, bret, false);
}

// display x/y coordinates of mouse - for testing
function displayMouseLocationOnScreen() {
    drawText(mouseX+","+mouseY, mouseX, mouseY, 'yellow');
}