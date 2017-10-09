const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var trackGrid = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 0, 1,
                 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 4, 1, 1, 0, 0, 0, 1, 1,
                 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4,];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREES = 4;
const TRACK_FLAG = 5;

function isObstacleAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS &&
       row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
    } else {
        return false;
    }
}

function carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x / TRACK_W);
    var carTrackRow = Math.floor(whichCar.y / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    
    if(carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
       carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
        
        if(isObstacleAtColRow(carTrackCol, carTrackRow)) {
            whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
            whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
            
            whichCar.speed *= -0.5;
        } // end of track found
    } // end of valid col and row
} // end of carTrackHandling func

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks() {
    
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    var eachRow, eachCol;
    for(eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for(eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
            var tileKindHere = trackGrid[arrayIndex];
            var useImg = trackPics[tileKindHere];
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            
            drawTileX += TRACK_W;
            arrayIndex++;
        }// end of col for loop
        drawTileY += TRACK_H;
        drawTileX = 0;
    }// end of row for loop
}// end of drawTracks
