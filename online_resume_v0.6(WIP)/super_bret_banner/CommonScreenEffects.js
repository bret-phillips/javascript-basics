
var screenX = 0;
var screenY = 0;
var screenSpeed = 10;

function getScreenWidth(){
    
    canvas.setAttribute('width', window.innerWidth);
    
    return canvas.width;
}

function moveScenery(object) {
    
    object.x -= screenSpeed;
    object.prevX -= screenSpeed
    //moveBGl();
}

function moveScreen(object) {

    screenX += screenSpeed;
    
    object.x -= screenSpeed;
    object.prevX -= screenSpeed
}

function moveBG(backgroundObject) {
    mountainX += 0.1;
}

function moveBGl(backgroundObject) {
    mountainX -= 0.1;
}

function moveSceneryl(object) {
    
    if(screenX > 0) {
        object.x += screenSpeed;
        object.prevX += screenSpeed
        //moveBG();
    }
}

function moveScreenl(object) {
    
    if(screenX > 0) {
        screenX -= screenSpeed;

        object.x += screenSpeed;
        object.prevX += screenSpeed
    } else {
        screenX = 0;
    }
}