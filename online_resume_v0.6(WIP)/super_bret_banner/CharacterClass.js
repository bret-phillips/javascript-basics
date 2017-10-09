
function characterClass(x,y, width,height, speed) {
    objectClass.call(this, x,y, width,height);
    
    this.speed = speed;
    this.verticalSpeed = 0;
    
    this.rising = false;
    this.onGround = false;
    this.facingRight = true;
}

characterClass.prototype = Object.create(objectClass.prototype);
characterClass.prototype.constructor = characterClass;

characterClass.prototype.reset = function(x,y) {
    this.x = x;
    this.y = y;
}