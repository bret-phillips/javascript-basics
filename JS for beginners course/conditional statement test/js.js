
var score = 0;

var ans = prompt("what is 3+4?");
if(ans === "7")
{
    alert("Correct!");
    score++;
}
else
{
    alert("wrong");
}

var ans = prompt("what is 1+4?");
if(ans === "5")
{
    alert("Correct!");
    score++;
}
else
{
    alert("wrong");
}

var ans = prompt("what is 3+0?");
if(ans === "3")
{
    alert("Correct!");
    score++;
}
else
{
    alert("wrong");
}

if(score >= 2) {
    alert("YOU PASS!!")
}
else {
    alert("YOU FAIL!! :(")
}


console.log("succes!!");