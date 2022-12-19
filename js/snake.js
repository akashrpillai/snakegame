console.log("js is working fine")
// "use strict";
// constant and variables
let inputDir = {x:0, y:0};
const foodsound = new Audio ('sound/foodsnake_game.mp3');
const gameOverSound = new Audio ('sound/gameoversnake_game.mp3');
const moveSound = new Audio ('sound/movesnake_game.mp3');
const musicSound = new Audio ('sound/musicsnake_game.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}


// function of game 
// let main = () =>{

// }
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime )/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake) {
    // if snake bumps into itself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if snake bumps into wall
    if (snake[0].x >=18 || snake[0].x <=0 ||  snake[0].y >=18 || snake[0].y<=0 ) {
        return true;
    }

}



function gameEngine() {
    // Part 1: Updating the Snake Array and Food 
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over ! Press Any Key To Continue");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score : 0 " 
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random()) };// code check

    }
    // if snake has eaten the food then regenerate the food and increment the score
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1;

        if (score> hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score : " + hiscoreval;
        }

        scoreBox.innerHTML = "Score : " + score
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x ,y: snakeArr[0].y + inputDir.y});
        a = 2;
        b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random()) };
    }
    // moving the snake 
    for (let i = snakeArr.length-2 ; i>=0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the  Snake  and Food

    // Display the  Snake  
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        // console.log(e,index)
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
            
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    });

    // Display the  Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




// main logic of game 


let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1}; // Start The  Game
    musicSound.play(); 
    moveSound.play();
    switch (e.key) {
        
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default :e.preventDefault();
            break;
    }
});