var carPic = document.createElement("img");
var redCarPic = document.createElement("img");
var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if(picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady();
    imgVar.src = "images/"+fileName;
}

function loadImagesForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
    var imageList = [
        {varName: carPic, theFile: "car01.png"},
        {varName: redCarPic, theFile: "car02.png"},
        
        {trackType: TRACK_ROAD, theFile: "track_road.png"},
        {trackType: TRACK_WALL, theFile: "track_wall.png"},
        {trackType: TRACK_GOAL, theFile: "track_goal.png"},
        {trackType: TRACK_TREES, theFile: "track_trees.png"},
        {trackType: TRACK_FLAG, theFile: "track_flag.png"}
    ];
    
    picsToLoad = imageList.length;
    
    var i;
    for(i = 0; i < imageList.length; i++) { 
        if(imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImagesForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    }
}