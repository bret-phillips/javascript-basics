// constants used to easier read/access image in array
const TILE_SMILE_BLOCK = 0;
const TILE_BLOCK = 1;

const    bretIdleLeftImage = 0;
const    bretRunLeft01Image = 1;
const    bretRunLeft02Image = 2;
const    bretRunLeft03Image = 3;
const    bretRunLeft04Image = 4;
const    bretRunLeft05Image = 5;
const    bretRunLeft06Image = 6;
const    bretJumpLeftImage = 7;
    
const    bretIdleRightImage = 8;
const    bretRunRight01Image = 9;
const    bretRunRight02Image = 10;
const    bretRunRight03Image = 11;
const    bretRunRight04Image = 12;
const    bretRunRight05Image = 13;
const    bretRunRight06Image = 14;
const    bretJumpRightImage = 15;

// create arrays for holding the images
var tilePics = [];
var bretPics = [];
var imagesToLoad = 0;

// launch game if images are done loading
function countLoadedImagesAndLaunchIfReady() {
    imagesToLoad--;
    if(imagesToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

// load basic images - combine in future
function beginLoadingImage(imgVar, fileName) {
    imgVar = document.createElement("img");
    imgVar.onload = countLoadedImagesAndLaunchIfReady();
    imgVar.src = fileName;
}

// load images for player - combine in future
function loadImagesForBret(bretCode, fileName) {
    bretPics[bretCode] = document.createElement("img");
    bretPics[bretCode].onload = countLoadedImagesAndLaunchIfReady();
    bretPics[bretCode].src = fileName;
}

// load images for tiles - combine in future
function loadImagesForTileCode(tileCode, fileName) {
    tilePics[tileCode] = document.createElement("img");
    tilePics[tileCode].onload = countLoadedImagesAndLaunchIfReady();
    tilePics[tileCode].src = fileName;
}

// load images
function loadImages() {
    // array of images for game
    var imageList = [
    /*{varName: cloudImage01, fileName: "images/cloud01.png"},
    {varName: cloudImage02, fileName: "images/cloud02.png"},
    {varName: cloudImage03, fileName: "images/cloud03.png"},
    {varName: cloudImage04, fileName: "images/cloud04.png"},
    {varName: cloudImage05, fileName: "images/cloud05.png"},
    */
    
    // tile images
    {tileType: TILE_BLOCK, fileName: "images/block02.png"},
    {tileType: TILE_SMILE_BLOCK, fileName: "images/smiley_block02.png"},
    
    //{varName: mountainImageImage, fileName: "images/dixie_mountain02.png"},

    //{varName: groundImage, fileName: "images/ground_banner.png"},

    // player images
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

    // number of images that need to load
    imagesToLoad = imageList.length;

   // load images
    var i;
    for(i = 0; i < imageList.length; i++) { 
        if(imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].fileName);
        } else if(imageList[i].bretSprite != undefined) {
            loadImagesForBret(imageList[i].bretSprite, imageList[i].fileName);
        } else {
            loadImagesForTileCode(imageList[i].tileType, imageList[i].fileName);
        }
    }
}
