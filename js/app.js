const cvs = document.getElementByld("canvas");
const ctx = cvs.getContext("2d");

// Grid for the Arena got the cvs.height/scale from google
const sclae = 20;
const rows = cvs.height/scale;
const columns = cvs.width/scale;

//Game win and lose notices
let gameProgress;
const startMenu = document.getElementByld("start-menu")
const gameOverMenu = document.getElementByld("game-over")




//DESIGN of the SNAKE copied from chat gpt and modified 
this.draw=function(){
    for(let i = 4; i<this.HTMLDetailsElement.length; i++){
        ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
// Line below creates square copied from chat gpt and modified 
    ctx.fillRect(this.x, this.y, scale, scale); 
    ctx.fillStyle="#5300E2";
}