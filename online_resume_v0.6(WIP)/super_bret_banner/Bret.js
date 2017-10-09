
function bretClass(x,y, width,height, speed, images) {
    
    characterClass.call(this, x,y, width,height, speed);
    
    this.image = images.bretPics[bretIdleRightImage];
    this.frameCount = 0;
    this.maxRunSpeed = 12;
    this.startJumpSpeed = -15;
    this.momentum = 1;
    
    this.images = images;
    
    this.controlKeyLeft;
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    
    this.keyHeld_Up = false;
    this.keyHeld_Down = false;
    this.keyHeld_Left = false;
    this.keyHeld_Right = false;
}
    
bretClass.prototype = Object.create(characterClass.prototype);
bretClass.prototype.constructor = bretClass;

bretClass.prototype.setupIntput = function(leftKey, upKey, rightKey, downKey) {
    this.controlKeyLeft = leftKey;
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
} 

bretClass.prototype.runAnimation = function() {
    if(this.frameCount > 0){
        this.frameCount--;
    } else {
        this.frameCount = 2;
        if(this.facingRight) {
            if(this.image == this.images.bretPics[bretIdleLeftImage]) {
                this.image = this.images.bretPics[bretRunRight01Image];
            } else if(this.image == this.images.bretPics[bretIdleRightImage]) {
                this.image = this.images.bretPics[bretRunRight01Image];
            } else if(this.image == this.images.bretPics[bretRunRight01Image]) {
                this.image = this.images.bretPics[bretRunRight02Image];
            } else if(this.image == this.images.bretPics[bretRunRight02Image]) {
                this.image = this.images.bretPics[bretRunRight03Image];
            } else if(this.image == this.images.bretPics[bretRunRight03Image]) {
                this.image = this.images.bretPics[bretRunRight04Image];
            } else if(this.image == this.images.bretPics[bretRunRight04Image]) {
                this.image = this.images.bretPics[bretRunRight05Image];
            } else if(this.image == this.images.bretPics[bretRunRight05Image]) {
                this.image = this.images.bretPics[bretRunRight06Image];
            } else if(this.image == this.images.bretPics[bretRunRight06Image]) {
                this.image = this.images.bretPics[bretRunRight01Image];
            } else {
                this.image = this.images.bretPics[bretRunRight01Image];
            }
        } else {

            if(this.image == this.images.bretPics[bretIdleRightImage]) {
                this.image = this.images.bretPics[bretRunLeft01Image];
            } else if(this.image == this.images.bretPics[bretIdleLeftImage]) {
                this.image = this.images.bretPics[bretRunLeft01Image];
            } else if(this.image == this.images.bretPics[bretRunLeft01Image]) {
                this.image = this.images.bretPics[bretRunLeft02Image];
            } else if(this.image == this.images.bretPics[bretRunLeft02Image]) {
                this.image = this.images.bretPics[bretRunLeft03Image];
            } else if(this.image == this.images.bretPics[bretRunLeft03Image]) {
                this.image = this.images.bretPics[bretRunLeft04Image];
            } else if(this.image == this.images.bretPics[bretRunLeft04Image]) {
                this.image = this.images.bretPics[bretRunLeft05Image];
            } else if(this.image == this.images.bretPics[bretRunLeft05Image]) {
                this.image = this.images.bretPics[bretRunLeft06Image];
            } else if(this.image == this.images.bretPics[bretRunLeft06Image]) {
                this.image = this.images.bretPics[bretRunLeft01Image];
            } else {
                this.image = this.images.bretPics[bretRunLeft01Image];
            }
        }
    }
}

bretClass.prototype.setIdleImage = function() {
    if(this.facingRight) {
        if(this.onGround) {
            this.image = this.images.bretPics[bretIdleRightImage];
        } else {
            this.image = this.images.bretPics[bretJumpRightImage];
        }
    } else {
        if(this.onGround) {
            this.image = this.images.bretPics[bretIdleLeftImage];
        } else {
            this.image = this.images.bretPics[bretJumpLeftImage];
        }
    }
}
    
bretClass.prototype.move = function() {
        this.prevX = this.x;
        this.prevY = this.y;
        
        if(this.keyHeld_Left == false && this.keyHeld_Right == false) {
            this.setIdleImage();
        }
        
        if(this.keyHeld_Right) {
            this.x += this.speed;
            if(this.facingRight == false) {
                this.facingRight = true;
            }
            
            if(this.onGround) {
                this.runAnimation();
            } else {
                this.image = this.images.bretPics[bretJumpRightImage];
            }
        }
    
        if(this.keyHeld_Left) {
            this.x -= this.speed;
            
            if(this.facingRight) {
                this.facingRight = false;
            }
            
            if(this.onGround) {
                this.runAnimation();
            } else {
                this.image = this.images.bretPics[bretJumpLeftImage];
            }
        }
        
        if(this.onGround) { // on ground
            
            if(this.keyHeld_Up) { // jump is pushed
                this.rising = true;
                this.onGround = false;
                this.verticalSpeed = this.startJumpSpeed;
                this.y += this.verticalSpeed;
            }
            
        } else if(this.rising) { // in air - rising
            
            if(this.keyHeld_Up) { // if key is still held
                applyGravity(bret);
            } else { // if key is released
                this.rising = false;
                if(this.verticalSpeed < 0){
                    this.verticalSpeed = 0;
                }
            }
        } else { // in air - falling
           applyGravity(this);
        }
}
