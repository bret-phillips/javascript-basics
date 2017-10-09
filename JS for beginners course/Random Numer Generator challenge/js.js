var user_number = prompt("type a number");

user_number = parseInt(user_number);

var random_num = Math.floor(Math.random() *user_number) +1;

document.write(random_num);