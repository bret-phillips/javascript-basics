// create cloud objects
var cloudImage01 = document.createElement("img");
var cloudImage02 = document.createElement("img");
var cloudImage03 = document.createElement("img");
var cloudImage04 = document.createElement("img");
var cloudImage05 = document.createElement("img");

// load several different cloud images
cloudImage01.src = "images/cloud01.png";
cloudImage02.src = "images/cloud02.png";
cloudImage03.src = "images/cloud03.png";
cloudImage04.src = "images/cloud04.png";
cloudImage05.src = "images/cloud05.png";

// create an instance of cloudClass
function cloudClass() {
    // create class variables
    this.x = 0;
    this.y = 0;
    this.ang = 0;
    this.speed = 0;
    this.image; // which picture to use

// pick image for cloud
this.setCloudImage = function(imageNum) {
    // ensure that imageNum is within range - set to random number in range if necesary
    if(imageNum < 1) {
        imageNum = Math.floor(Math.random() *5) +1;
    }

    // set image base on imageNum
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

// move cloud
this.move = function() {
    if(this.x < 0 - this.image.width) {
        this.reset();
    } else {
        this.x -= this.speed;
    }
}

// draw cloud to screen
this.draw = function() {
    drawBitmapCenteredWithRotation(this.image, this.x, this.y, this.ang);
}

// set clouds starting variables
this.create = function() {
    this.setCloudImage(0);

    this.x = Math.floor(Math.random() *(canvas.width) ) +1;
    this.y = Math.floor(Math.random() *(canvas.height - this.image.height*2) ) +1;
    this.speed = Math.floor(Math.random() * 3) +1;
    this.speed *= 0.25;

}

// reset cloud
this.reset = function() {
    this.setCloudImage(0);

    this.x = canvas.width + this.image.width;
    this.y = Math.floor(Math.random() *(canvas.height - this.image.height*2) ) +1;

    this.speed = Math.floor(Math.random() *3) +1;

}

} // end of cloudClass