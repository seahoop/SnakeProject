# Project Choice 
Snake Project 

# Project Description
The Snake Game is an exciting web game controlled by four keys on end users keyboard ```Up, Left, Right```. The Game features an extendible Snake starting at default as 4 blocks, the Snake will be caged in an square shaped arena which the size will be 20*20(refer to example below)

![some alt text](https://i.postimg.cc/jSpXmDrh/Screenshot-2024-07-12-at-11-53-02-AM.png)

The game will start when user press on any four keys ```Up, Left, Right```. Simultananeously the program will execute the pre-programmed action, which start randomly showing apple in random blocks one at an time. The end user will try to use ```Up, Left, Right``` to direct the snake to eat the apple. When succesfully comeplete the action of going through an apple, the apple will automatically dissapear and the snake will become one block longer. The user wins when all 20*20 arena is occupied by the Snakes Body, if the snake's head run into any part of the wall on each side of the arena. The user loses the Game and the game reset. 


# File Structure Of the Proposed Project 
![some alt text](https://i.postimg.cc/jq71jYM2/Screenshot-2024-07-12-at-11-38-42-AM.png)


# Game Visual 

### Proposed Sketch image of Snake and Apple
![some alt text](https://i.postimg.cc/50rPpnps/3681720805003-pic.jpg)

### Proposed Sketch image when player win 
![some alt text](https://i.postimg.cc/PrggdrWS/3641720804452-pic.jpg)

### Proposed Sketch image of the Arena 
![some alt text](https://i.postimg.cc/nr6PV0DX/3671720804476-pic.jpg)

### Proposed Sketch of the Start game block
![some alt text](https://i.postimg.cc/pr9StgpN/3661720804474-pic.jpg)

### Proposed sketch of when player lost the game block
![some alt text](https://i.postimg.cc/63bPg96L/3651720804469-pic.jpg)

### Proposed sketch of Full view when player win
![some al text](https://i.postimg.cc/KY2hDv41/3611720804440-pic.jpg)

### Proposed sketch of Full view of start screen 
![some alt text](https://i.postimg.cc/D0m9wSpM/3621720804445-pic.jpg)


### Proposed sketch of Full view when player lose
![some alt text](https://i.postimg.cc/6qSD2BD5/3631720804447-pic.jpg)




# User Stories
1. As a player, when I press ```Up, Left, Right``` Keys I want the snake's head to turn to that direction immediately. 
2. As a player, when I enter the game URL and gets directed to the game.  I want their to be clear direction/button to click so I can start the game. 
3. As a player, if I direct the snake into any side of the wall in the arena, I want to be told that I have lost the game and show me how long or how many blocks my snake has grown to. I also want their to be an restart button for me to restart immediately.  
4. As a player, if I win the game I want to be told that I have win the game and the game pause immediately. After the pause I want to be told how many blocks my snake has grown to. 
5. As a player, when I press the start button I want the snake to be at an defuault position with four blocks in length and the first apple randomly appear in the 20*20 arena. 
6. As a player, I want the snake to move continouously till I press another command. 
7. As a player, I want when an apple is eaten an new apple will randomly generate in another block of the arena. 
8. the snake can not move back ward only forward, left and right. 






# Pseudocode
### Start Button and Start Block dissapear, actions before game start
1. When startButton clicked->Start Block Dissapear->The snake shows at its default position(this position should be the same everytime)->apple should be randomly generated in the arena-> only snake and randomly generated apple shown in the arena waiting for action when player click on one of the buttons ```up, left, right```.

### Game start command 
1. When player click on one of the command ```up, left, right``` -- the game began and snake start moving forward at an constant speed(adjust accordingly)

### up, right,left command
1. when ```up``` pressed the snake move towards north, when ```left``` pressed the snake move toward west, when ```right```pressed the snake move toward east. 
2. When command is given, the snake shall move to that direction immediately, so when command given-snake move to the direction given in the same block. 

### Apple randomly generate when game begans, snake extend length
1. When snake go through an apple - apple dissapear - immediately newly generated apple shows up at random location in arena
2. Each apple snake eat, one block length of snake body extend until 400 blocks or fill all 20 * 20 arena. Extended snake body go behind exisiting blocks, and follows it at same speed. 







