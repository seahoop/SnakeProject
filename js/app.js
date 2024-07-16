const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// Grid for the Arena got the cvs.height/scale from google
const scale = 40;
const rows = cvs.height/scale;
const columns = cvs.width/scale;

//Game win and lose notices
let gameProgress;
const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over");


//variable declaration
let snake;
let fruit; 


//Game progress gameover menu
function setState(progress){
    gameProgress = progress;
    if(progress === "gameover"){
        gameOverMenu.style.visibility = "visible";
        document.getElementById("snake-length").innerText = snake.tail.length;
    } else if (progress === "play"){
        gameOverMenu.style.visibility = "hidden"
    }   if (progress === "start"){
        startMenu.style.visibility = "visible"
    }   else if (progress !== "start"){
        startMenu.style.visibility = "hidden"
    }
    }






//Restart funciton
function restart(){
    snake.x = 240;
    snake.y = 220;
    snake.totalFruit = 0;
    snake.tail =[];
    gameOverMenu.style.visibility = "hidden";
    setState("play")
    startTune.play();
}
function Snake(){

    this.x = 0;
    this.y = 0;
    this.xSpeed = scale*1;
    this.ySpeed = 0;
    this.totalFruit = 0;
    this.tail =[];

    //design of snake chat gpt generated design the snake out 
    this.draw = function() {
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        };

        ctx.fillRect(this.x, this.y, scale, scale);
        ctx.fillStyle = "#5300E2";
    };

 //snake position chat gpt generated net 9 lines of code. 
 this.update = function(){
    for(let i=0; i<this.tail.length-1; i++){
        this.tail[i]=this.tail[i+1];
    }
    this.tail[this.totalFruit-1]={x:this.x, y:this.y};

    //border boundaries funciton 
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x>cvs.width){
        setState("gameover")
    }
    if(this.x<0){
        setState("gameover")
    }
    if(this.y>cvs.height){
        setState("gameover")
    }
    if(this.y<0){
        setState("gameover")
    }



    }
    //Key direction programming 
    this.changeDirection = function(direction){
        switch(direction){
            case "Up":
                if(!this.ySpeed>0){
                    this.xSpeed = 0;
                    this.ySpeed = -scale*1;
                }
                break;
                case "Down":
                    if(!this.ySpeed>0){
                        this.xSpeed = 0;
                        this.ySpeed = scale*1;
                    }
                    break;
                case "Left":
                    if(!this.xSpeed>0){
                        this.xSpeed = -scale*1;
                        this.ySpeed = 0;
                    }
                    break;
                    case "Right":
                        if(!this.xSpeed>0){
                            this.xSpeed = scale *1;
                            this.ySpeed = 0;

                        }
                        break;
        }
    };
    // SNAKE EATING THE FRUIT 
    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
        this.totalFruit++;
            return true;
        }
        return false;
    };
    // IF SNAKE COLLIDES WITH ITSELF
    this.checkForCollision = function() {
        for (var i=0; i < this.tail.length; i++) {
            if(this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.totalFruit = 0;
                this.tail = [];
                setState("gameover"); 
            }
        }
    };

}
// ~~~~~~~FRUIT~~~~~~~~~
function Fruit() {
    this.x;
    this.y;

    this.randomLocation = function() {
        this.x = (Math.floor(Math.random() * rows +1) - 1) *scale;
        this.y = (Math.floor(Math.random() * rows +1) - 1) *scale;
    };

this.draw = function() {
    ctx.fillRect(this.x, this.y, scale, scale); 
    ctx.fillStyle = "#00DB41";
        ctx.strokeStyle = "#000";
        ctx.strokeRect(this.x, this.y, scale, scale); 
        ctx.lineWidth = 2;
    };
}


// Start snake funciton 
(function initSnake(){

    snake = new Snake();
    fruit = new Fruit();

    fruit.randomLocation();

    let speed = window.setInterval(() =>{
        if (gameState === "play"){
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            snake.update();
            fruit.draw();
            snake.draw();
        }
        if(snake.eat(fruit)){
            fruit.randomLocation();
            fruitPop.play();
        }
        snake.checkForCollision();
        document.querySelector("#score").innerText =snake.totalFruit;
    }, 180);
    //snake is created moved and cleard every 180 
    }());

     //Control
     document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            restart();
        }
    }

    window.addEventListener("keydown", ((e) =>{
        const direction = e.key.replace("Arrow", "");
        snake.changeDirection(direction);
    }));



















