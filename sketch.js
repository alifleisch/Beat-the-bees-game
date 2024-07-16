let cameraPosX;
let char;

function setup() {
    createCanvas(1024, 576);
    setupNatureObjects();
    setupLives();
    char = new Char({ canvasWidth: width, floorPos_y });
    startGame();
}

function startGame() {
    char.reset();
    drawNatureObjects();
    setupCollectables();
    setupEnemies();
    setupCanyons();
    setupPlatforms();
    pushRaindrops();
    checkLives();
    flagpoleStartState();
}

function draw() {
    cameraPosX = char.x - width / 2;
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
    alertGameOver();
    textScore();
    drawLifeTokens();
    pop();
}

// start a new game
if (lives < 1 && key === ' ') {
    setupLives();
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