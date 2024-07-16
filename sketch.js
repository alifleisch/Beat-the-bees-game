/// <reference path="./soundEffects.js"/>
/// <reference path="./gameScore.js"/>
/// <reference path="./staticNatureObjects.js"/>
/// <reference path="./collectables.js"/>
/// <reference path="./enemies.js"/>
/// <reference path="./platforms.js"/>
/// <reference path="./canyons.js"/>
/// <reference path="./flagpoles.js"/>
/// <reference path="./raindrops.js"/>
/// <reference path="./character.js"/>
/// <reference path="./lives.js"/>

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
    drawBackground();
    push();
    translate(-cameraPosX, 0);
    drawNatureObjects();
    drawFlagPole();
    drawCollectables();
    drawEnemies();
    drawCanyons();
    drawPlatforms();
    char.drawChar();

    checkPlayerDie();
    pop();

    alertGameOver();
    drawLifeTokens();
    textScore();
}

function keyPressed() {
    if (char.y > floorPos_y) {
        char.isPlummeting = true;
    }
    if (key == 'a' || keyCode == 37) {
        char.moveLeft();
    } else if (key == 'd' || keyCode == 39) {
        char.moveRight();
    }
    if (key == ' ' || key == 'w') {
        if (!char.isFalling) {
            char.jump();
        }
    }

    if (key === ' ' && lives < 1) {
        setupLives();
        startGame();
    }
}

function keyReleased() {
    if (keyCode == 37 || keyCode == 39) {
        char.stopMoving();
    }
}