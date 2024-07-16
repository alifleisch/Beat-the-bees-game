let lives;
let cameraPosX;
let char;

function setup() {
    createCanvas(1024, 576);
    setupNatureObjects();
    lives = 3;
    char = new Char({ canvasWidth: width, floorPos_y });
    startGame();
    setupCanyons();
}

function startGame() {
    char.reset();
    drawNatureObjects();
    setupCollectables();
    setupEnemies();
    setupPlatforms();
    cameraPosX = 0;

    pushRaindrops();
    if (lives == 3) {
        resetScore();
    }
    flagpoleStartState();
}

function draw() {
    cameraPosX = char.x - width / 2;
    background(100, 155, 255);
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);
    push();
    translate(-cameraPosX, 0);

    drawNatureObjects();
    drawFlagPole();
    drawCollectables();
    drawEnemies();
    drawCanyons();
    drawPlatforms();
    char.updatePosition();
    char.drawChar();

    checkPlayerDie();
    pop();

    if (lives < 1) {
        fill(220, 30, 30);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50);
        text("Game over. Press space to continue.", width / 2, height / 2);
        return;
    }


    fill(255);
    noStroke();
    textSize(12);
    text("Score: " + getScore(), 20, 20);
    // life tokens, how many lives have remained
    for (i = 0; i < lives; i++) {
        fill(256, 170, 0);
        noStroke();
        ellipse(width / 2 - 50 + i * 50, 20, 25, 25)
    }
}

// start a new game
if (lives < 1 && key === ' ') {
    lives = 3;
    startGame();
}

function keyPressed() {
    if (char.y > floorPos_y) {
        isPlummeting = true;
    }
    if (key == 'a' || keyCode == 37) {
        char.moveLeft();
    } else if (key == 'd' || keyCode == 39) {
        char.moveRight();
    }
    if (key == ' ' || key == 'w') {
        if (!isFalling) {
            char.jump();
        }
    }
}

function keyReleased() {
    if (keyCode == 37 || keyCode == 39) {
        char.stopMoving();
    }
}

function checkPlayerDie() {
    if (char.y > floorPos_y && !isPlummeting && lives >= 1) {
        lives -= 1;
        isPlummeting = true;
        if (!soundPlayed) {
            losingSound.play();
            soundPlayed = true;
        } else if (char.y > floorPos_y && !isPlummeting && lives < 1) {
            if (!soundPlayed) {
                gameOverSound.play();
                soundPlayed = true;
            } else {
                soundPlayed = false;
            }
        }
    }
    if (isPlummeting && char.y > floorPos_y + 200) {
        if (lives > 0) {
            startGame();
        }
    }
}