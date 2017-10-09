
function cloudClass() {
    this.x = 0;
    this.y = 0;
    this.ang = 0;
    this.speed = 0;
    this.image; // which picture to use
    
    this.setCloudImage = function(imageNum) {
        
        if(imageNum < 1) {
            imageNum = Math.floor(Math.random() *5) +1;
        }
            
        if        (imageNum <= 1) {
            this.image = cloudImage01;
        } else if (imageNum == 2) {
            this.image = cloudImage02;
        } else if (imageNum == 3) {
            this.image = cloudImage03;
        } else if (imageNum == 4) {
            this.image = cloudImage04;
        } else {
            this.image = cloudImage05;
        }
    }
    
    this.move = function() {
        if(this.x < 0 - this.image.width) {
            this.reset();
        } else {
            this.x -= this.speed;
        }
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.image, this.x, this.y, this.ang);
    }
    
    this.create = function() {
        this.setCloudImage(0);
        
        this.x = Math.floor(Math.random() *(canvas.width) ) +1;
        this.y = Math.floor(Math.random() *(canvas.height - this.image.height*2) ) +1;
        this.speed = Math.floor(Math.random() * 3) +1;
        
    }
    
    this.reset = function() {
        this.setCloudImage(0);
        
        this.x = canvas.width + this.image.width;
        this.y = Math.floor(Math.random() *(canvas.height - this.image.height*2) ) +1;
        
        this.speed = Math.floor(Math.random() *3) +1;
        
    }
    
}