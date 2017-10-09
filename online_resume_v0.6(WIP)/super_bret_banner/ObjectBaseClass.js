
function objectClass(x,y, width,height, image) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.width = width;
    this.height = height;
    
}

objectClass.prototype.draw = function() {
    drawBitmapWithOffset(this.image, this.x, this.y, 15, 6);
}
    
objectClass.prototype.print = function() {
    //console.log(this.name);
    var blank = 0;
}

objectClass.prototype.move = function() {
    var temp = 0;
}