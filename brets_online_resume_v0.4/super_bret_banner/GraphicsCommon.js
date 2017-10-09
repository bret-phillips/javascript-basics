// draws image centered at coordinates with an angle
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
}

// draws images with an offset to acount for collisions
function drawBitmapWithOffset(bitmap, atX, atY, offsetX, offsetY) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.drawImage(bitmap, -offsetX, -offsetY);
    canvasContext.restore();
}

// draws a simple rectangle
function drawRect(topLeftX, topLeftY, width, height, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, width, height);
}

// draws a simple circle
function drawCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

// draws simple text
function drawText(text, x, y, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y,);
}

// clears screen for new frame
function clearScreen() {
    drawRect(0, 0, canvas.width, canvas.height, '#7EC0EE');
}