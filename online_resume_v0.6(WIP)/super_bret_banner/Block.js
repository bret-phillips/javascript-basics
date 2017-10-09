const TILE_SIZE = 30;

function blockClass(x,y, hasItem, images) {
    
    if(hasItem) {
        var image = images.tilePics[TILE_SMILE_BLOCK];//blockSmileyImage;
    } else {
        var image = images.tilePics[TILE_BLOCK];//blockImage;
    }
    
    objectClass.call(this, x,y, TILE_SIZE,TILE_SIZE, image);
    
    this.hasItem = hasItem;
}

blockClass.prototype = Object.create(objectClass.prototype);
blockClass.prototype.constructor = blockClass;

blockClass.prototype.draw = function() {
    drawBitmapCenteredWithRotation(this.image, this.x + this.width/2 , this.y + this.height/2, 0);
}