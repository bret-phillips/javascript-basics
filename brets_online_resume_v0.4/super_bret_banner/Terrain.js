// temporary placement for testing
var groundImage = document.createElement("img");
groundImage.src = "images/ground_banner.png";

// create an instance of terrainClass
function terrainClass(x,y) {
    objectClass.call(this, x,y, 5000,10, groundImage);
    
}

// for inheritance
terrainClass.prototype = Object.create(objectClass.prototype);
terrainClass.prototype.constructor = terrainClass;

// draw object to screen
terrainClass.prototype.draw = function() {
    drawBitmapWithOffset(this.image, this.x, this.y, 0, 29);
}