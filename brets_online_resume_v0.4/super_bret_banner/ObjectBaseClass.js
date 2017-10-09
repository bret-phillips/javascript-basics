// create an instance of objectBaseClass - this class is mostly used for inheritance purposes
function objectClass(x,y, width,height, image) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.width = width;
    this.height = height;
    
}

// for inheritance
objectClass.prototype.draw = function() {
    drawBitmapWithOffset(this.image, this.x, this.y, 15, 6);
}
    
// for testing - print objects name to console
objectClass.prototype.print = function() {
    console.log(this.name);
 }

// used to move objects in future - not used yet
objectClass.prototype.move = function() {
    var temp = 0; // placeholder to stop game from crashing when object.move() is called
}