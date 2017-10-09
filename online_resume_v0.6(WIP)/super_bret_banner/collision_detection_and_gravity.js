
//Create constants to represent directions - for easy reading
const MOVING_LEFT = 1000;
const MOVING_LEFT_AND_UP = 1500;
const MOVING_UP = 2000;
const MOVING_RIGHT_AND_UP = 2500;
const MOVING_RIGHT = 3000;
const MOVING_RIGHT_AND_DOWN = 3500;
const MOVING_DOWN = 4000;
const MOVING_LEFT_AND_DOWN = 4500;
const NOT_MOVING = 500;

//Create constants to represent type of collisions - for easy reading
const OBJECT_TOUCHED_SOLID_OBJECT = 5000;
const OBJECT_TOUCHED_NON_SOLID_OBJECT = 6000;
const PLAYER_TOUCHED_BADDIE = 7000;
const BADDIE_TOUCHED_BADDIE = 8000;
const OBJECT_IS_IN_AIR = 9000;

//Create constants to represent possible errors - for easy reading
//const ERROR_UNEXPECTED_VALUE = 9000;

const GRAVITY_FORCE = 1.5;
const MAX_FALL_SPEED = 30;


//Check if there is a collision between objectA and objectB
function checkForCollision(objectA, objectB) {
    
    //Define sides of objectA
    var leftSideOfObjectA = objectA.x;
    var rightSideOfObjectA = objectA.x + objectA.width;
    var topSideOfObjectA = objectA.y;
    var bottomSideOfObjectA = objectA.y + objectA.height;
    
    //Define sides of objectB
    var leftSideOfObjectB = objectB.x;
    var rightSideOfObjectB = objectB.x + objectB.width;
    var topSideOfObjectB = objectB.y;
    var bottomSideOfObjectB = objectB.y + objectB.height;
    
    //Check for overlaping sides
    if(rightSideOfObjectA >= leftSideOfObjectB
    && leftSideOfObjectA <= rightSideOfObjectB
    && bottomSideOfObjectA >= topSideOfObjectB
    && topSideOfObjectA <= bottomSideOfObjectB) {
        return true;
    } else {
        return false;
    }
    
}

function findSideOfCollision(objectA, objectB) {
    
    //Define sides of objectA
    var leftSideOfObjectA = objectA.prevX;
    var rightSideOfObjectA = objectA.prevX + objectA.width;
    var topSideOfObjectA = objectA.prevY;
    var bottomSideOfObjectA = objectA.prevY + objectA.height;
    
    //Define sides of objectB
    var leftSideOfObjectB = objectB.prevX;
    var rightSideOfObjectB = objectB.prevX + objectB.width;
    var topSideOfObjectB = objectB.prevY;
    var bottomSideOfObjectB = objectB.prevY + objectB.height;
    
    //Compare previous positions of both objects to decide the side of impact
    if(rightSideOfObjectA <= leftSideOfObjectB && bottomSideOfObjectA <= topSideOfObjectB) {
        return MOVING_RIGHT_AND_DOWN;
    } else if(leftSideOfObjectA >= rightSideOfObjectB && bottomSideOfObjectA <= topSideOfObjectB) {
        return MOVING_LEFT_AND_DOWN;
    } else if(leftSideOfObjectA >= rightSideOfObjectB && topSideOfObjectA >= bottomSideOfObjectB) {
        return MOVING_LEFT_AND_UP;
    } else if(rightSideOfObjectA <= leftSideOfObjectB && topSideOfObjectA >= bottomSideOfObjectB) {
        return MOVING_RIGHT_AND_UP;
    } else if(rightSideOfObjectA <= leftSideOfObjectB) {
        return MOVING_RIGHT;
    } else if(leftSideOfObjectA >= rightSideOfObjectB) {
        return MOVING_LEFT;
    } else if(bottomSideOfObjectA <= topSideOfObjectB) {
        return MOVING_DOWN;
    } else if(topSideOfObjectA >= bottomSideOfObjectB) {
        return MOVING_UP;
    }
    
}


//Evaluates the type of collision between objectA and objectB
function getCollisionType(objectA, objectB) {
    if(objectA instanceof bretClass && objectB instanceof blockClass) { //Player touched a solid object
        return OBJECT_TOUCHED_SOLID_OBJECT;
    } else if(objectA instanceof characterClass && objectB instanceof blockClass) { //Baddie touched a solid object
        return OBJECT_TOUCHED_SOLID_OBJECT;
    } else if(objectA instanceof bretClass && objectB instanceof characterClass) { //Player touched a baddie
        return PLAYER_TOUCHED_BADDIE;
    } else if(objectA instanceof characterClass && objectB instanceof bretClass) { //Baddie touched a player
        return PLAYER_TOUCHED_BADDIE;
    } else {
        return -1;
    }
} //End of evaluateCollisionType function

function evaluateCollisionResults(objectA, objectB, direction, collisionType) {
    
    if(collisionType == OBJECT_TOUCHED_SOLID_OBJECT) {
        if(objectA instanceof bretClass || objectA instanceof characterClass) { //ObjectB is the solid object
            
            if(direction == MOVING_DOWN
            || direction == MOVING_LEFT_AND_DOWN
            || direction == MOVING_RIGHT_AND_DOWN) {
                objectA.onGround = true;
                objectA.y = objectB.y - objectA.height; //Set objectA directly above objectB
            } else if(direction == MOVING_UP
            || direction == MOVING_LEFT_AND_UP
            || direction == MOVING_RIGHT_AND_UP) {
                objectA.rising = false;
                if(objectA.verticalSpeed < 0) {
                    objectA.verticalSpeed = 0;
                }
                objectA.y = objectB.y + objectA.height; //Set objectA directly bellow objectB
            } else if(direction == MOVING_RIGHT) {
                objectA.x = objectB.x - objectA.width -1;
            } else if(direction == MOVING_LEFT) {
                objectA.x = objectB.x + objectB.width +1;
            }
            
        } else { //ObjectA is the solid object
            if(direction == MOVING_DOWN) {
                objectB.onGround = true;
                objectB.y = objectA.y - objectA.height - 1; //Set objectA directly above objectB
            }
        }
    }
}

function applyGravity(objectA) {
    if(objectA.onGround == false && (objectA instanceof bretClass || objectA instanceof characterClass) ) {
        objectA.verticalSpeed += GRAVITY_FORCE;
        if(objectA.verticalSpeed > MAX_FALL_SPEED) {
            objectA.verticalSpeed = MAX_FALL_SPEED;
        }
        objectA.prevY = objectA.y;
        objectA.y += objectA.verticalSpeed
    }
}

function checkForCollisions(listOfObjects) {
    
    var objectA;
    var objectB;
    var indexA;
    var indexB;
    var direction;
    var directionB;
    var collisionType;
    var collision = false;
    for(indexA = 0; indexA < listOfObjects.length-1; indexA++) {
        objectA = listOfObjects[indexA];
        var objectAIsFalling = true;
        
        for(indexB = indexA + 1; indexB < listOfObjects.length; indexB++) {
            objectB = listOfObjects[indexB];
            
            collision = checkForCollision(objectA, objectB);
            if(collision){
                collisionType = getCollisionType(objectA, objectB);
                objectA.print();
                objectB.print();
                
                
                direction = findSideOfCollision(objectA, objectB);
                
                if(collisionType == OBJECT_TOUCHED_SOLID_OBJECT
                && (direction == MOVING_DOWN
                ||  direction == MOVING_LEFT_AND_DOWN
                ||  direction == MOVING_RIGHT_AND_DOWN) ) {
                    objectAIsFalling = false;
                }
                
                evaluateCollisionResults(objectA, objectB, direction, collisionType);
                
            }
        }
        if(objectAIsFalling) {
            if(objectA.y >= objectA.prevY) {
                objectA.onGround = false;
                objectA.rising = false;
            }
                //console.log('grav on');
            
            
        } else {
                //console.log('grav off');
        }
    }
} //End of checkForCollisions function