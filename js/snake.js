const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

// initialize unit
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//Init snake
let snake =[];
snake[0] = {
    x: 9*box,
    y: 10*box
}

//food position
let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
}
//give score variable
let score = 0;

//control snake 
let dir;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    
    if(key == 37 && dir != "RIGHT"){
        dir = "LEFT";
    }else if (key == 38 && dir != "DOWN"){
        dir = "UP";
    }else if (key == 39 && dir != "LEFT"){
        dir = "RIGHT";
    }else if (key == 40 && dir != "UP"){
        dir = "DOWN";
    }

}

function collision(head,array){
    for (let i =0; i<array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.drawImage(ground,0,0);

    for (var i= 0; i<snake.length; i++){
        ctx.fillStyle = (i == 0)? "green":"white";
        ctx.fillRect(snake[i].x, snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x,food.y);
    ctx.strokeStyle = "red";
    ctx.strokeRect(food.x,food.y,box,box);

    //old snake pos
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    //move 
    if (dir=="LEFT")snakeX -=box;
    if (dir=="UP")snakeY -=box;
    if (dir=="RIGHT")snakeX +=box;
    if (dir=="DOWN")snakeY +=box;

    if (snakeX == food.x && snakeY == food.y){
        score +=Math.floor(Math.random()*10);
         food = {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }
    }else {
        snake.pop();
    }

let newHead = {
    x: snakeX,
    y:snakeY
}

if (snakeX < box || snakeX >17*box||snakeY<3*box||snakeY>17*box||collision(newHead,snake)){
    clearInterval(game);
}


snake.unshift(newHead);

ctx.fillStyle ="white";
ctx.font = "45px Changa one";
ctx.fillText(score, 2*box,1.6*box);
    
}

let game = setInterval(draw,100);
