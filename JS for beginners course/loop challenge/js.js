    
function DiceRoll(sides) {
    return Math.floor(Math.random() * sides) +1;
}

var ans = -1;
var roll = 0;
for(i = 1; ans != roll; i++) {
    ans = prompt("Guess what number I am thinking of.");
    roll = DiceRoll(10);
}

document.write(i);

console.log("succes!!");