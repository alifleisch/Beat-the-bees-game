let gameChar_x, gameChar_y;

function gameCharPosition() {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
}

function drawGameCharacter() {
    noStroke();
    if (isLeft && isFalling) {
        //jumping-left      
        //arm left
        fill(0);
        rect(gameChar_x - 25, gameChar_y - 50, 20, 5, 10);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30);
        //head
        fill(255, 218, 185);
        ellipse(gameChar_x, gameChar_y - 60, 30);
        //nose
        fill(0);
        triangle(gameChar_x - 15, gameChar_y - 64,
            gameChar_x - 15, gameChar_y - 56,
            gameChar_x - 20, gameChar_y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(gameChar_x - 7, gameChar_y - 65, 7, 7);
        //arm right
        fill(0);
        rect(gameChar_x - 20, gameChar_y - 50, 20, 5, 10);
        //leg left
        fill(0);
        rect(gameChar_x - 25, gameChar_y - 20, 20, 5, 10);
        //leg right
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 20, 20, 5, 10);
    }
    else if (isRight && isFalling) {
        //jumping-right      
        //arm right
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 50, 20, 5, 10);
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30);
        //head
        fill(255, 218, 185);
        ellipse(gameChar_x, gameChar_y - 60, 30);
        //nose
        fill(0);
        triangle(gameChar_x + 15, gameChar_y - 64,
            gameChar_x + 15, gameChar_y - 56,
            gameChar_x + 20, gameChar_y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(gameChar_x + 7, gameChar_y - 65, 7, 7);
        //arm left
        fill(0);
        rect(gameChar_x, gameChar_y - 50, 20, 5, 10);
        //leg left
        fill(0);
        rect(gameChar_x - 5, gameChar_y - 20, 20, 5, 10);
        //leg right
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 20, 20, 5, 10);
    }
    else if (isLeft) {
        //walking left   
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30);
        //arm
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 50, 5, 20, 10);
        //leg
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 20, 5, 20, 10);
        //head
        fill(255, 218, 185);
        ellipse(gameChar_x, gameChar_y - 60, 30);
        //nose
        fill(0);
        triangle(gameChar_x - 15, gameChar_y - 64,
            gameChar_x - 15, gameChar_y - 56,
            gameChar_x - 20, gameChar_y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(gameChar_x - 7, gameChar_y - 65, 7, 7);
    }
    else if (isRight) {
        //walking right   
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30);
        //arm
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 50, 5, 20, 10);
        //leg
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 20, 5, 20, 10);
        //head
        fill(255, 218, 185);
        ellipse(gameChar_x, gameChar_y - 60, 30);
        //nose
        fill(0);
        triangle(gameChar_x + 15, gameChar_y - 64,
            gameChar_x + 15, gameChar_y - 56,
            gameChar_x + 20, gameChar_y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(gameChar_x + 7, gameChar_y - 65, 7, 7);
    }
    else if (isFalling || isPlummeting) {
        //jumping facing forwards   
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30);
        //head
        fill(255, 218, 185);
        ellipse(gameChar_x, gameChar_y - 60, 30);
        //nose
        fill(0);
        triangle(gameChar_x, gameChar_y - 54,
            gameChar_x, gameChar_y - 60,
            gameChar_x + 6, gameChar_y - 57);
        //eyes
        fill(85, 137, 47);
        ellipse(gameChar_x - 7, gameChar_y - 65, 7, 7);
        ellipse(gameChar_x + 7, gameChar_y - 65, 7, 7);
        //arm left
        fill(0);
        rect(gameChar_x - 25, gameChar_y - 50, 15, 5, 10);
        //arm right
        fill(0);
        rect(gameChar_x + 10, gameChar_y - 50, 15, 5, 10);
        //leg left
        fill(0);
        rect(gameChar_x - 25, gameChar_y - 20, 20, 5, 10);
        //leg right
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 20, 20, 5, 10);
        pop();
    }
    else {
        //standing front facing  
        //body
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 50, 20, 30);
        //head
        fill(255, 210, 185);
        ellipse(gameChar_x, gameChar_y - 60, 30);
        //eyes
        fill(85, 137, 47);
        ellipse(gameChar_x - 7, gameChar_y - 65, 7, 7);
        ellipse(gameChar_x + 7, gameChar_y - 65, 7, 7);
        //arm left
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 50, 5, 20, 10);
        //arm right
        fill(0);
        rect(gameChar_x + 10, gameChar_y - 50, 5, 20, 10);
        //leg left
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 20, 5, 20, 10);
        //leg right
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 20, 5, 20, 10);
        //nose
        fill(0);
        triangle(gameChar_x, gameChar_y - 54,
            gameChar_x, gameChar_y - 60,
            gameChar_x + 6, gameChar_y - 57);
    }
}
