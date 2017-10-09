

//handles animations for objects
function AnimationPlayer(lengthOfImageDuration, arrayOfAnimationKeywords) {
    this.lengthOfImageDuration = lengthOfImageDuration;
    this.framesElapsed = 0;
    this.currentFrameIndex = 0;
    this.currentAnimationIndex = 0;
    this.currentAnimationKey = 0;
    
    this.animations = [];
    
    var i;
    for(i = 0; i < arrayOfAnimationKeywords; i++) {
        this.animations[i] = [];
    }
    
}

//select animation
AnimationPlayer.prototype.selectAnimation = function(animationKey) {
    this.currentAnimationIndex = animationKey;
    this.currentAnimationKey = animation[animationKey];
    this.currentFrameIndex = 0;
    this.framesElapsed = 0;
}

//get key for current animation
AnimationPlayer.prototype.getCurrentAnimationKey() {
    return this.currentAnimationKey;
}

//play current animation
AnimationPlayer.prototype.playAnimation = function() {
    this.framesElapsed++;
    if(this.framesElapsed >= this.lengthOfImageDuration) {
        this.framesElapsed = 1;
        if(this.currentFrameIndex < this.currentAnimation.length) {
            this.currentFrameIndex++;
        } else {
            this.currentFrameIndex = 0;
        }
    }
}

function imageHandlingClass() {
    this.tilePics = [];
    this.bretPics = [];
    this.bretRightPics = [];
    this.
    this.imagesToLoad = 0;
    
}

imageHandlingClass.prototype.getBretPics = function(){
    return this.bretPics;
}

imageHandlingClass.prototype.getTilePics = function(){
    return this.tilePics;
}

imageHandlingClass.prototype.countLoadedImagesAndLaunchIfReady = function() {
    imagesToLoad--;
    if(imagesToLoad == 0) {
        imageLoadingDoneSoStartGame(this);
    }
}

imageHandlingClass.prototype.beginLoadingImage = function(imgVar, fileName) {
    imgVar = document.createElement("img");
    imgVar.onload = this.countLoadedImagesAndLaunchIfReady();
    imgVar.src = fileName;
}

imageHandlingClass.prototype.loadImagesForBret = function(bretCode, fileName) {
    this.bretPics[bretCode] = document.createElement("img");
    this.bretPics[bretCode].onload = this.countLoadedImagesAndLaunchIfReady();
    this.bretPics[bretCode].src = fileName;
}


imageHandlingClass.prototype.loadImagesForTileCode = function(tileCode, fileName) {
    this.tilePics[tileCode] = document.createElement("img");
    this.tilePics[tileCode].onload = this.countLoadedImagesAndLaunchIfReady();
    this.tilePics[tileCode].src = fileName;
}

imageHandlingClass.prototype.loadImages = function() {

    var imageList = [
    /*{varName: cloudImage01, fileName: "images/cloud01.png"},
    {varName: cloudImage02, fileName: "images/cloud02.png"},
    {varName: cloudImage03, fileName: "images/cloud03.png"},
    {varName: cloudImage04, fileName: "images/cloud04.png"},
    {varName: cloudImage05, fileName: "images/cloud05.png"},
    */
    
    {tileType: TILE_BLOCK, fileName: "images/block02.png"},
    {tileType: TILE_SMILE_BLOCK, fileName: "images/smiley_block02.png"},
    
    //{varName: mountainImageImage, fileName: "images/dixie_mountain02.png"},

    //{varName: groundImage, fileName: "images/ground_banner.png"},

    {bretSprite: bretIdleLeftImage, fileName: "images/bret/idle_left01.png"},
    {bretSprite: bretRunLeft01Image, fileName: "images/bret/run_left01.png"},
    {bretSprite: bretRunLeft02Image, fileName: "images/bret/run_left02.png"},
    {bretSprite: bretRunLeft03Image, fileName: "images/bret/run_left03.png"},
    {bretSprite: bretRunLeft04Image, fileName: "images/bret/run_left04.png"},
    {bretSprite: bretRunLeft05Image, fileName: "images/bret/run_left05.png"},
    {bretSprite: bretRunLeft06Image, fileName: "images/bret/run_left06.png"},
    {bretSprite: bretJumpLeftImage, fileName: "images/bret/jump_left01.png"},
    //{bretSprite: bretDuckLeftImage, fileName: "images/bret/duck_left01.png"},
    
    {bretSprite: bretIdleRightImage, fileName: "images/bret/idle_right01.png"},
    {bretSprite: bretRunRight01Image, fileName: "images/bret/run_right01.png"},
    {bretSprite: bretRunRight02Image, fileName: "images/bret/run_right02.png"},
    {bretSprite: bretRunRight03Image, fileName: "images/bret/run_right03.png"},
    {bretSprite: bretRunRight04Image, fileName: "images/bret/run_right04.png"},
    {bretSprite: bretRunRight05Image, fileName: "images/bret/run_right05.png"},
    {bretSprite: bretRunRight06Image, fileName: "images/bret/run_right06.png"},
    {bretSprite: bretJumpRightImage, fileName: "images/bret/jump_right01.png"}
    //{bretSprite: bretDuckRightImage, fileName: "images/bret/duck_right01.png"},
    ];


imagesToLoad = imageList.length;

   
    var i;
    for(i = 0; i < imageList.length; i++) { 
        if(imageList[i].varName != undefined) {
            this.beginLoadingImage(imageList[i].varName, imageList[i].fileName);
        } else if(imageList[i].bretSprite != undefined) {
            this.loadImagesForBret(imageList[i].bretSprite, imageList[i].fileName);
        } else {
            this.loadImagesForTileCode(imageList[i].tileType, imageList[i].fileName);
        }
    }
}
