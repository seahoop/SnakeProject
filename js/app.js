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
    gameMusicWhenDie.pause();
    gameMusicWhenDie.currentTime = 0;
    setState("play");
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
        ctx.fillStyle = "#5300E2";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
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
            return true;
        }
        return false;
    };

    this.checkForCollision = function () {
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

    this.randomLocation = function () {
        this.x = (Math.floor(Math.random() * rows + 1) - 1) * scale;
        this.y = (Math.floor(Math.random() * rows + 1) - 1) * scale;
    };

    this.draw = function () {
        ctx.fillStyle = "#00DB41";
        ctx.fillRect(this.x, this.y, scale, scale);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(this.x, this.y, scale, scale);
        ctx.lineWidth = 2;
    };
}

(function initSnake() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.randomLocation();

    setState("start");

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
        }
    }, 180);
})();

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        restart();
    }
};

window.addEventListener("keydown", (e) => {
    const direction = e.key.replace("Arrow", "");
    snake.changeDirection(direction);
});















