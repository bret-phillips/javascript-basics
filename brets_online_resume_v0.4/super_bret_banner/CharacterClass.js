// create an instance of characterClass
function characterClass(x,y, width,height, speed) {
    // get inheritance
    objectClass.call(this, x,y, width,height);
    
    // create class variables
    this.speed = speed;
    this.verticalSpeed = 0;
    
    this.rising = false;
    this.onGround = false;
    this.facingRight = false;
}

// for inheritance
characterClass.prototype = Object.create(objectClass.prototype);
characterClass.prototype.constructor = characterClass;

// reset object position to given variables
characterClass.prototype.reset = function(x,y) {
    this.x = x;
    this.y = y;
}