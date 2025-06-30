const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const scale = 20;
const rows = cvs.height / scale;
const columns = cvs.width / scale;

let gameState;
const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over");
const gameMusicWhenPlaying = document.getElementById("game-music-while-playing");
const gameMusicWhenDie = document.getElementById("game-music-when-die");
gameMusicWhenDie.volume = 1.0;
gameMusicWhenPlaying.volume = 0.6;

let snake;
let fruit;
let score = 0;
let scoreAnimation = 0;

function setState(state) {
    gameState = state;
    if (state === "gameover") {
        gameMusicWhenPlaying.pause();
        gameMusicWhenPlaying.currentTime = 0;
        //chat gpt find the out the problem about why audio not playing when snake 
        //collide with itself. 
        gameOverMenu.style.visibility = "visible";
        startMenu.style.visibility = "hidden";
        gameMusicWhenDie.currentTime = 0;
        gameMusicWhenDie.play();
        document.getElementById("snake-length").innerText = snake.totalFruit - 2;
    } else if (state === "play") {
        gameMusicWhenPlaying.play();
        gameMusicWhenDie.pause();
        gameOverMenu.style.visibility = "hidden";
        startMenu.style.visibility = "hidden";
    } else if (state === "start") {
        startMenu.style.visibility = "visible";
        gameOverMenu.style.visibility = "hidden";
        gameMusicWhenPlaying.pause();
        gameMusicWhenDie.pause();
    }
}

function restart() {
    snake.x = 240;
    snake.y = 220;
    snake.totalFruit = 2;
    snake.tail = [];
    for (let i = 0; i < snake.totalFruit; i++) {
        snake.tail.push({ x: snake.x - i * scale, y: snake.y });
    }
    score = 0;
    scoreAnimation = 0;
    gameMusicWhenDie.pause();
    gameMusicWhenDie.currentTime = 0;
    setState("play");

    //set time delay before collision detection execute, next three
    //line of code done by chat gpt. 
    setTimeout(() => {
        snake.canCollide = true;
    }, 500);
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.totalFruit = 2;
    this.tail = [];
    for (let i = 0; i < this.totalFruit; i++) {
        this.tail.push({ x: this.x - i * scale, y: this.y });
    }

    this.draw = function () {
        // Draw snake body with gradient effect
        for (let i = 0; i < this.tail.length; i++) {
            const alpha = 0.6 + (i / this.tail.length) * 0.4;
            ctx.fillStyle = `rgba(83, 0, 226, ${alpha})`;
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            
            // Add glow effect
            ctx.shadowColor = '#5300E2';
            ctx.shadowBlur = 5;
            ctx.strokeStyle = `rgba(83, 0, 226, ${alpha + 0.2})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        
        // Draw snake head with special effect
        ctx.shadowColor = '#5300E2';
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#5300E2";
        ctx.fillRect(this.x, this.y, scale, scale);
        
        // Add eyes to the head
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(this.x + 4, this.y + 4, 3, 3);
        ctx.fillRect(this.x + 13, this.y + 4, 3, 3);
        
        // Reset shadow
        ctx.shadowBlur = 0;
    };

    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.totalFruit - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= cvs.width || this.x < 0 || this.y >= cvs.height || this.y < 0) {
            setState("gameover");
        }
    };

    this.changeDirection = function (direction) {
        switch (direction) {
            case "Up":
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case "Down":
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case "Left":
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case "Right":
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    this.eat = function (fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.totalFruit++;
            score++;
            scoreAnimation = 10; // Trigger score animation
            return true;
        }
        return false;
    };

    this.checkForCollision = function () {
        //line below done by chat gpt 
        if (!this.canCollide) return;
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                setState("gameover");
                return;
            }
        }
    };
}

function Fruit() {
    this.x;
    this.y;
    this.pulse = 0;

    this.randomLocation = function () {
        this.x = (Math.floor(Math.random() * rows + 1) - 1) * scale;
        this.y = (Math.floor(Math.random() * rows + 1) - 1) * scale;
    };

    this.draw = function () {
        this.pulse += 0.1;
        const pulseSize = Math.sin(this.pulse) * 2;
        
        // Draw fruit with glow effect
        ctx.shadowColor = '#00DB41';
        ctx.shadowBlur = 10 + pulseSize;
        ctx.fillStyle = "#00DB41";
        ctx.fillRect(this.x, this.y, scale, scale);
        
        // Add border
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, scale, scale);
        
        // Add shine effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(this.x + 2, this.y + 2, 4, 4);
    };
}

function drawScore() {
    const scoreElement = document.querySelector("#score");
    if (scoreAnimation > 0) {
        scoreElement.style.transform = `scale(${1 + scoreAnimation * 0.1})`;
        scoreElement.style.color = "#00ff88";
        scoreAnimation--;
    } else {
        scoreElement.style.transform = "scale(1)";
        scoreElement.style.color = "#00ffff";
    }
}

(function initSnake() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.randomLocation();

    setState("start");
//chat gpt helped for the next 6 lines
    let speed = window.setInterval(() => {
        if (gameState === "play") {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            snake.update();
            fruit.draw();
            snake.draw();
            if (snake.eat(fruit)) {
                fruit.randomLocation();
            }
            // chat gpt find out the bug line below 
            snake.checkForCollision();
            document.querySelector("#score").innerText = snake.totalFruit - 2;
            drawScore();
        }
    }, 180);
})();

// got from google keys
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        restart();
    }
};

window.addEventListener("keydown", (e) => {
    const direction = e.key.replace("Arrow", "");
    snake.changeDirection(direction);
});















