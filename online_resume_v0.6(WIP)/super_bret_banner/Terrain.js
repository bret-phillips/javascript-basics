
function terrainClass(x,y) {
    objectClass.call(this, x,y, 5000,10, groundImage);
    
}

terrainClass.prototype = Object.create(objectClass.prototype);
terrainClass.prototype.constructor = terrainClass;

terrainClass.prototype.draw = function() {
    drawBitmapWithOffset(this.image, this.x, this.y, 0, 29);
}