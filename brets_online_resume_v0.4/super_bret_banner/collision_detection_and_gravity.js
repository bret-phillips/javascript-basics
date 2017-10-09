// NOTE for future: file needs cleaning

//Create constants to represent directions - for easy reading and testing
const MOVING_LEFT = 1000;
const MOVING_LEFT_AND_UP = 1500;
const MOVING_UP = 2000;
const MOVING_RIGHT_AND_UP = 2500;
const MOVING_RIGHT = 3000;
const MOVING_RIGHT_AND_DOWN = 3500;
const MOVING_DOWN = 4000;
const MOVING_LEFT_AND_DOWN = 4500;
const NOT_MOVING = 500;

//Create constants to represent type of collisions - for easy reading and testing
const OBJECT_TOUCHED_SOLID_OBJECT = 5000;
const OBJECT_TOUCHED_NON_SOLID_OBJECT = 6000;
const PLAYER_TOUCHED_BADDIE = 7000;
const BADDIE_TOUCHED_BADDIE = 8000;
const OBJECT_IS_IN_AIR = 9000;

// set variables for gravity
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
}

// evaluate the results of a collision 
function evaluateCollisionResults(objectA, objectB, direction, collisionType) {
    // if both objects are solid
    if(collisionType == OBJECT_TOUCHED_SOLID_OBJECT) {
        // if objectA is player
        if(objectA instanceof bretClass || objectA instanceof characterClass) { // ObjectB is the solid object
            
            // player fell onto objectB - stop falling and adjust players position
            if(direction == MOVING_DOWN
            || direction == MOVING_LEFT_AND_DOWN
            || direction == MOVING_RIGHT_AND_DOWN) {
                objectA.onGround = true;
                objectA.y = objectB.y - objectA.height; //Set objectA(player) directly above objectB
                
            // player's head hit objectB - start falling
            } else if(direction == MOVING_UP
            || direction == MOVING_LEFT_AND_UP
            || direction == MOVING_RIGHT_AND_UP) {
                objectA.rising = false;
                if(objectA.verticalSpeed < 0) {
                    objectA.verticalSpeed = 0;
                }
                objectA.y = objectB.y + objectA.height; //Set objectA(player) directly bellow objectB
                
            // if player touched side of object - stop playing from walking through object
            } else if(direction == MOVING_RIGHT) {
                objectA.x = objectB.x - objectA.width -1;
            } else if(direction == MOVING_LEFT) {
                objectA.x = objectB.x + objectB.width +1;
            }
            
        } else { //ObjectA is the solid object - used for setting gravity on future baddie objects
            if(direction == MOVING_DOWN) {
                objectB.onGround = true;
                objectB.y = objectA.y - objectA.height - 1; //Set objectA directly above objectB
            }
        }
    } // end of first if statement
} // end of evaluateCollisionResults

// apply gravity to object
function applyGravity(objectA) {
    // if object is not on ground - apply gravity
    if(objectA.onGround == false && (objectA instanceof bretClass || objectA instanceof characterClass) ) {
        objectA.verticalSpeed += GRAVITY_FORCE;
        if(objectA.verticalSpeed > MAX_FALL_SPEED) {
            objectA.verticalSpeed = MAX_FALL_SPEED;
        }
        objectA.prevY = objectA.y;
        objectA.y += objectA.verticalSpeed
    }
}

// check if there are any collisions
function checkForCollisions(listOfObjects) {
    // create variables for checking collisions
    var objectA;
    var objectB;
    var indexA;
    var indexB;
    var direction;
    var directionB;
    var collisionType;
    var collision = false;
    
    // cycle through objects - for objectA
    for(indexA = 0; indexA < listOfObjects.length-1; indexA++) {
        objectA = listOfObjects[indexA];
        var objectAIsFalling = true;
        
        // cycle through objects - for objectB
        for(indexB = indexA + 1; indexB < listOfObjects.length; indexB++) {
            objectB = listOfObjects[indexB];
            
            // get boolean for if there is a collision between objects
            collision = checkForCollision(objectA, objectB);
            
            if(collision){ // if there is a collision between objects
                // get collision type
                collisionType = getCollisionType(objectA, objectB);
                
                // print object names for testing
                // objectA.print(); 
                // objectB.print();
                
                // find point of collision on objects
                direction = findSideOfCollision(objectA, objectB);
                
                // if collided object is solid - stop movement 
                if(collisionType == OBJECT_TOUCHED_SOLID_OBJECT
                && (direction == MOVING_DOWN
                ||  direction == MOVING_LEFT_AND_DOWN
                ||  direction == MOVING_RIGHT_AND_DOWN) ) {
                    objectAIsFalling = false;
                }
                
                // evaluate results of collision
                evaluateCollisionResults(objectA, objectB, direction, collisionType);
                
            }
        } // end of objectB loop
        
        // check if objectA if falling - for testing
        if(objectAIsFalling) {
            if(objectA.y >= objectA.prevY) { // object is falling
                objectA.onGround = false;
                objectA.rising = false;
            }
                //console.log('grav on');
        } else { // object is falling
                //console.log('grav off');
        }
    } // end of objectA loop
} // end of checkForCollisions function