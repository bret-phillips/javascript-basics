// create an instance of Bret(player) class
function bretClass(x,y, width,height, speed) {
    // retrieve inheritance
    characterClass.call(this, x,y, width,height, speed);
    
    // create class variables
    this.image = bretPics[bretIdleRightImage];
    this.frameCount = 0;
    this.maxRunSpeed = 12;
    this.startJumpSpeed = -15;
    this.momentum = 1;
    
    this.controlKeyLeft;
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    
    this.keyHeld_Up = false;
    this.keyHeld_Down = false;
    this.keyHeld_Left = false;
    this.keyHeld_Right = false;
}
    
// for allowing inheritance
bretClass.prototype = Object.create(characterClass.prototype);
bretClass.prototype.constructor = bretClass;

// setup player controls
bretClass.prototype.setupIntput = function(leftKey, upKey, rightKey, downKey) {
    this.controlKeyLeft = leftKey;
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
} 

// display running image for object
bretClass.prototype.runAnimation = function() {
    if(this.frameCount > 0){
        this.frameCount--;
    } else {
        this.frameCount = 2;
        if(this.facingRight) {
            if(this.image == bretPics[bretIdleLeftImage]) {
                this.image = bretPics[bretRunRight01Image];
            } else if(this.image == bretPics[bretIdleRightImage]) {
                this.image = bretPics[bretRunRight01Image];
            } else if(this.image == bretPics[bretRunRight01Image]) {
                this.image = bretPics[bretRunRight02Image];
            } else if(this.image == bretPics[bretRunRight02Image]) {
                this.image = bretPics[bretRunRight03Image];
            } else if(this.image == bretPics[bretRunRight03Image]) {
                this.image = bretPics[bretRunRight04Image];
            } else if(this.image == bretPics[bretRunRight04Image]) {
                this.image = bretPics[bretRunRight05Image];
            } else if(this.image == bretPics[bretRunRight05Image]) {
                this.image = bretPics[bretRunRight06Image];
            } else if(this.image == bretPics[bretRunRight06Image]) {
                this.image = bretPics[bretRunRight01Image];
            } else {
                this.image = bretPics[bretRunRight01Image];
            }
        } else {

            if(this.image == bretPics[bretIdleRightImage]) {
                this.image = bretPics[bretRunLeft01Image];
            } else if(this.image == bretPics[bretIdleLeftImage]) {
                this.image = bretPics[bretRunLeft01Image];
            } else if(this.image == bretPics[bretRunLeft01Image]) {
                this.image = bretPics[bretRunLeft02Image];
            } else if(this.image == bretPics[bretRunLeft02Image]) {
                this.image = bretPics[bretRunLeft03Image];
            } else if(this.image == bretPics[bretRunLeft03Image]) {
                this.image = bretPics[bretRunLeft04Image];
            } else if(this.image == bretPics[bretRunLeft04Image]) {
                this.image = bretPics[bretRunLeft05Image];
            } else if(this.image == bretPics[bretRunLeft05Image]) {
                this.image = bretPics[bretRunLeft06Image];
            } else if(this.image == bretPics[bretRunLeft06Image]) {
                this.image = bretPics[bretRunLeft01Image];
            } else {
                this.image = bretPics[bretRunLeft01Image];
            }
        }
    }
}

// display idle image for object
bretClass.prototype.setIdleImage = function() {
    if(this.facingRight) {
        if(this.onGround) {
            this.image = bretPics[bretIdleRightImage];
        } else {
            this.image = bretPics[bretJumpRightImage];
        }
    } else {
        if(this.onGround) {
            this.image = bretPics[bretIdleLeftImage];
        } else {
            this.image = bretPics[bretJumpLeftImage];
        }
    }
}
    
// move object
bretClass.prototype.move = function() {
    // important for collision detection
    this.prevX = this.x;
    this.prevY = this.y;

    // player is not moving left or right - set to idle image
    if(this.keyHeld_Left == false && this.keyHeld_Right == false) {
        this.setIdleImage();
    }

    // move player right
    if(this.keyHeld_Right) {
        this.x += this.speed;
        if(this.facingRight == false) {
            this.facingRight = true;
        }

        // check if on ground
        if(this.onGround) {
            this.runAnimation();
        } else {
            this.image = bretPics[bretJumpRightImage];
        }
    }

    // move player left
    if(this.keyHeld_Left) {
        this.x -= this.speed;

        if(this.facingRight) {
            this.facingRight = false;
        }

        //check if on ground
        if(this.onGround) {
            this.runAnimation();
        } else {
            this.image = bretPics[bretJumpLeftImage];
        }
    }

    // check if on ground - for jumping
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
       applyGravity(bret);
    }
}
