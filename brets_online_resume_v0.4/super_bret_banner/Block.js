// tempory placement for testing - should be moved later
const TILE_SIZE = 30;

// create an instance of blockClass
function blockClass(x,y, hasItem) {
    
    // check if box has an item
    if(hasItem) { // has item
        var image = tilePics[TILE_SMILE_BLOCK];
    } else { // box is empty
        var image = tilePics[TILE_BLOCK];
    }
    
    // retrieve inheritance
    objectClass.call(this, x,y, TILE_SIZE,TILE_SIZE, image);
    
    // make variable accesable to class
    this.hasItem = hasItem;
}

// for inheritance
blockClass.prototype = Object.create(objectClass.prototype);
blockClass.prototype.constructor = blockClass;

// draw block to screen
blockClass.prototype.draw = function() {
    drawBitmapCenteredWithRotation(this.image, this.x + this.width/2 , this.y + this.height/2, 0);
}