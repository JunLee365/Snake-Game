// create the unit
let score = 0;  
const box = 20; // scale
const row = 36; // 36
const col = 21; // 21
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
cvs.width = box * (row + 2);
cvs.height = box * (col + 4);
    
// Make and shuffle array
let HW2 = [101,114,160,161,214,215,216,220,300,303];
//let HW2 = [101,114,160,161,214,215,216,220,300,303,306,307,310,311,312,316,320,327,334,337,351,352,354,371,373,376,380,385,416,506,512,526,527,532,540,541,544,545,548,550,555,564,566,600,645];
for (i = 0; i < HW2.length; i++){
    let random_num = Math.floor(Math.random()*HW2.length);
    let swap = HW2[random_num];
    HW2[random_num] = HW2[i];
    HW2[i] = swap;
}

// create the snake, food, and set head position
let snake = [{x : Math.floor(row/2) * box, y : Math.floor((col+4)/2) * box}];
let food = {
    x : Math.floor(Math.random()*row+1) * box,
    y : Math.floor(Math.random()*col+3) * box
}
let snakeX = snake[0].x;
let snakeY = snake[0].y;

//control the snake Reacts to user input by key
let dir;
document.addEventListener("keydown",direction);
function direction(event){
    switch(event.key){
        case 'a':
        case 'ArrowLeft':
            if(dir != "RIGHT"){dir = "LEFT";} break;
        case 'w':
        case 'ArrowUp':
            if(dir != "DOWN"){dir = "UP";} break;
        case 'd':
        case 'ArrowRight':
            if(dir != "LEFT"){dir = "RIGHT";} break;
        case 's':
        case 'ArrowDown':
            if(dir != "UP"){dir = "DOWN";} break;
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw(){
    // Draw the boxes
    ctx.fillStyle = '#E44236';
    ctx.fillRect(0, 0, box * (row + 2), box * 2);

    ctx.fillStyle = '#D63031';
    ctx.fillRect(0, box * 2, box * (row + 2), box * (col+2));

    ctx.fillStyle = '#FF3E4D';
    ctx.fillRect(box, box * 3, box * row, box * col);
    
    // Draw the food
    ctx.fillStyle = 'orange';
    ctx.fillRect(food.x, food.y,box,box);
    ctx.strokeRect(food.x, food.y,box,box);

    // Write the class #
    ctx.fillStyle = 'black';
    ctx.font = .5 *box +"px arial";
    if (score < HW2.length){
        ctx.fillText(HW2[score],food.x + .10 * box, food.y + .70 * box);
    }
    
    // Draw the snake's head and body
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = (i == 0) ? "blue" : "skyblue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    // if the snake eats the food don't remove the tail
    if(snakeX == food.x && snakeY == food.y){ 
        score++;
        food = {
            x : Math.floor(Math.random()*row+1) * box,
            y : Math.floor(Math.random()*col+3) * box
        }
    }
    else{ // remove the tail [take out the end of the array]
        snake.pop();    
    }
    
    // gets direction and adds new Head 
    if( dir == "LEFT") snakeX -= box;
    else if( dir == "UP") snakeY -= box;
    else if( dir == "RIGHT") snakeX += box;
    else if( dir == "DOWN") snakeY += box;
    let newHead = { x : snakeX, y : snakeY}

    // Game over
    if(snakeX < box || snakeX > row * box ||
        snakeY < 3*box || snakeY > (col+2)*box || collision(newHead,snake)){
        clearInterval(game);
        alert("You died...");
    }
    // Winning condition 
    else if(score == HW2.length){
        clearInterval(game);
        alert("You Won!");
    }
    
    // write the score
    ctx.fillStyle = "white";
    ctx.font = box +"px arial";
    ctx.fillText("Score: " + score + "\t\t Number of classes left: " + (HW2.length - score),2*box,1.5*box);

    // Insert new head at the start of the array
    snake.unshift(newHead);
}

// call draw function every 250 ms
let game = setInterval(draw,250);