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

function setupInput(bret) {
    canvas.addEventListener('mousemove', updateMousePos);
    
    document.addEventListener('keydown', keyPressed(bret));
    document.addEventListener('keyup', keyReleased(bret));

    bret.setupIntput(KEY_LEFT_ARROW, KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

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

function keyPressed(evt, bret) {
    keySet(evt, bret, true);
    
    evt.preventDefault(); // stop window from scrolling
}

function keyReleased(evt, bret) {
    keySet(evt, bret, false);
}

function displayMouseLocationOnScreen() {
    drawText(mouseX+","+mouseY, mouseX, mouseY, 'yellow');
}