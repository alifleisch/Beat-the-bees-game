var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var mountains_x;
var mountains_y;
var trees_x;
var treePos_y;
var clouds;
var canyons = [];
var raindrops = [];
var collectables = [];
var cameraPosX;

var game_score;
var flagpole;
var lives;

var jumpSound;
var scoreSound;
var levelSound;
var losingSound;
var gameOverSound;
var soundPlayed = false;

var platforms;
var enemies;

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    lives = 3;

    startGame();
}

function startGame() {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    cameraPosX = 0;

    canyons = [
        {
            x_pos: 180,
            width: 80,
            waterFlow: 0
        },

        {
            x_pos: 680,
            width: 80,
            waterFlow: 0
        },

        {
            x_pos: 1180,
            width: 60,
            waterFlow: 0
        },

        {
            x_pos: 1300,
            width: 100,
            waterFlow: 0
        },

        {
            x_pos: 1600,
            width: 80,
            waterFlow: 0
        },

        {
            x_pos: 2000,
            width: 60,
            waterFlow: 0
        },

        {
            x_pos: 2300,
            width: 80,
            waterFlow: 0
        },

        {
            x_pos: 2700,
            width: 100,
            waterFlow: 0
        }
    ];

    collectables = [
        {
            x_pos: 660,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 1160,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 1270,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 1270,
            y_pos: 345,
            size: 20,
            isFound: false
        },

        {
            x_pos: 1420,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 1580,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 1980,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 2150,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 2280,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 2500,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 2680,
            y_pos: 415,
            size: 20,
            isFound: false
        },

        {
            x_pos: 2830,
            y_pos: 415,
            size: 20,
            isFound: false
        }
    ];

    clouds = [
        {
            x_pos: 150,
            y_pos: 90,
            radius: 60,
            rect_width: 90,
            rect_height: 40,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 600,
            y_pos: 150,
            radius: 60 * 1.2,
            rect_width: 90 * 1.2,
            rect_height: 40 * 1.2,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 800,
            y_pos: 100,
            radius: 60,
            rect_width: 90,
            rect_height: 40,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 1200,
            y_pos: 150,
            radius: 60 * 1.2,
            rect_width: 90 * 1.2,
            rect_height: 40 * 1.2,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 1500,
            y_pos: 90,
            radius: 60,
            rect_width: 90,
            rect_height: 40,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 1800,
            y_pos: 150,
            radius: 60 * 1.2,
            rect_width: 90 * 1.2,
            rect_height: 40 * 1.2,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 2200,
            y_pos: 90,
            radius: 60,
            rect_width: 90,
            rect_height: 40,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 2600,
            y_pos: 150,
            radius: 60 * 1.2,
            rect_width: 90 * 1.2,
            rect_height: 40 * 1.2,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 2900,
            y_pos: 90,
            radius: 60,
            rect_width: 90,
            rect_height: 40,
            moveRight: true,
            distance: 0
        },

        {
            x_pos: 3200,
            y_pos: 150,
            radius: 60 * 1.2,
            rect_width: 90 * 1.2,
            rect_height: 40 * 1.2,
            moveRight: true,
            distance: 0
        }
    ];

    mountains = [
        {
            x_pos: -100,
            y_pos: floorPos_y
        },

        {
            x_pos: 300,
            y_pos: floorPos_y
        },

        {
            x_pos: 950,
            y_pos: floorPos_y
        },

        {
            x_pos: 1750,
            y_pos: floorPos_y
        },

        {
            x_pos: 2850,
            y_pos: floorPos_y
        },

        {
            x_pos: 3300,
            y_pos: floorPos_y
        }
    ];

    trees_x = [-150, 100, 300, 600, 900, 1100, 1500, 1850, 2200, 2400, 2600, 3200];
    treePos_y = floorPos_y;

    for (i = 0; i < 100; i++) {
        raindrops.push(createRaindrop());
    }
    if (lives == 3) {
        game_score = 0;
    }
    flagpole = { isReached: false, x_pos: 3100 };

    platforms = [];

    platforms.push(createPlatforms(100, floorPos_y - 100, 80));
    platforms.push(createPlatforms(500, floorPos_y - 100, 180));
    platforms.push(createPlatforms(1000, floorPos_y - 100, 150));
    platforms.push(createPlatforms(1500, floorPos_y - 100, 150));
    platforms.push(createPlatforms(2000, floorPos_y - 100, 150));
    platforms.push(createPlatforms(2500, floorPos_y - 100, 150));

    enemies = [];
    enemies.push(new Enemy(350, floorPos_y - 10, 80, 30));
    enemies.push(new Enemy(850, floorPos_y - 10, 80, 30));
    enemies.push(new Enemy(1550, floorPos_y - 10, 80, 30));
    enemies.push(new Enemy(2100, floorPos_y - 10, 80, 30));
    enemies.push(new Enemy(2600, floorPos_y - 10, 80, 30));
    enemies.push(new Enemy(3100, floorPos_y - 10, 80, 30));
}


function createRaindrop() {
    return {
        x: random(width * 1.5),
        y: random(-500, -50),
        z: random(0, 20),
        len: random(10, 20),
        ySpeed: random(2, 6)
    };
}

function draw() {
    cameraPosX = gameChar_x - width / 2;

    background(100, 155, 255);
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);
    push();
    translate(-cameraPosX, 0);
    drawClouds();
    drawMountains();
    drawTrees();

    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    for (i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            checkCollectable(collectables[i]);
            drawCollectable(collectables[i]);
        }
    }

    for (i = 0; i < canyons.length; i++) {
        checkCanyon(canyons[i]);
        drawCanyon(canyons[i]);
    }

    if (flagpole.isReached == false) {
        checkFlagpole();
    }
    renderFlagpole();

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();

        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if (isContact) {
            if (lives > 0) {
                lives -= 1;
                startGame();
                break;
            }
        }
    }

    checkPlayerDie();

    //the game character
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

    pop();

    if (lives < 1) {
        fill(220, 30, 30);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50);
        text("Game over. Press space to continue.", width / 2, height / 2);
        return;
    }

    if (flagpole.isReached == true) {
        fill(0, 255, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50);
        text("Level complete", width / 2, height / 2);
        return;
    }

    fill(255);
    noStroke();
    textSize(12);
    text("Score: " + game_score, 20, 20);
    // life tokens, how many lives have remained
    for (i = 0; i < lives; i++) {
        fill(256, 170, 0);
        noStroke();
        ellipse(width / 2 - 50 + i * 50, 20, 25, 25)
    }

    //INTERACTION

    // going to the left and right
    if (isLeft == true) {
        gameChar_x -= 4;
    } else if (isRight == true) {
        gameChar_x += 4;
    }
}

function keyPressed() {
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if (gameChar_y > floorPos_y) {
        isPlummeting = true;
    }
    if (!isPlummeting) {
        if (key == 'a' || keyCode == 37) {
            isLeft = true;
        } else if (key == 'd' || keyCode == 39) {
            isRight = true;
        }

        //jump
        if (key == ' ' || key == 'w') {
            if (!isFalling) {
                gameChar_y -= 150;
                jumpSound.play();
            }
        }
    }

    // start a new game
    if (lives < 1 && key === ' ') {
        lives = 3;
        startGame();
    }
}

function keyReleased() {
    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    // if statements to control the animation of the character when keys are released
    if (keyCode == 37) {
        isLeft = false;
    } else if (keyCode == 39) {
        isRight = false;
    }
}

function drawClouds() {
    for (i = 0; i < clouds.length; i++) {
        if (clouds[i].moveRight) {
            clouds[i].x_pos += 0.5;
            clouds[i].distance += 0.5;
        } else {
            clouds[i].x_pos -= 0.5;
            clouds[i].distance -= 0.5;
        }

        if (clouds[i].distance >= 30) {
            clouds[i].moveRight = false;
        } else if (clouds[i].distance <= -30) {
            clouds[i].moveRight = true;
        }

        fill(255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].radius);
        rect(clouds[i].x_pos - 50, clouds[i].y_pos - 5,
            clouds[i].rect_width, clouds[i].rect_height, 50);
    }
}

function drawMountains() {
    for (i = 0; i < mountains.length; i++) {
        fill(150, 150, 150);
        triangle(mountains[i].x_pos, mountains[i].y_pos,
            mountains[i].x_pos + 70, mountains[i].y_pos - 300,
            mountains[i].x_pos + 140, mountains[i].y_pos);
        fill(170, 170, 170);
        triangle(mountains[i].x_pos + 40, mountains[i].y_pos,
            mountains[i].x_pos + 120, mountains[i].y_pos - 250,
            mountains[i].x_pos + 200, mountains[i].y_pos);

        fill(255);
        beginShape();
        vertex(mountains[i].x_pos + 70, mountains[i].y_pos - 300);
        vertex(mountains[i].x_pos + 40, mountains[i].y_pos - 172);
        vertex(mountains[i].x_pos + 65, mountains[i].y_pos - 192);
        vertex(mountains[i].x_pos + 75, mountains[i].y_pos - 182);
        vertex(mountains[i].x_pos + 93, 230);
        endShape(CLOSE);

        beginShape();
        vertex(mountains[i].x_pos + 120, mountains[i].y_pos - 250);
        vertex(mountains[i].x_pos + 89, mountains[i].y_pos - 152);
        vertex(mountains[i].x_pos + 115, mountains[i].y_pos - 172);
        vertex(mountains[i].x_pos + 125, mountains[i].y_pos - 162);
        vertex(mountains[i].x_pos + 142, mountains[i].y_pos - 182);
        endShape(CLOSE);
    }
}

function drawTrees() {
    for (i = 0; i < trees_x.length; i++) {
        noStroke();
        //trunk
        fill(125, 100, 40);
        rect(trees_x[i] - 15, treePos_y - 72, 30, 72);
        //leaves
        fill(0, 155, 0);
        ellipse(trees_x[i] - 25, treePos_y - 80, 65, 65);
        fill(0, 160, 0);
        ellipse(trees_x[i] + 25, treePos_y - 80, 65, 65);
        fill(0, 165, 0);
        ellipse(trees_x[i], treePos_y - 114, 60, 60);
    }
}

function drawCollectable(t_collectable) {
    if (!t_collectable.isFound) {
        fill(255, 225, 0);
        ellipse(t_collectable.x_pos, t_collectable.y_pos,
            t_collectable.size, t_collectable.size * 1.5);
        fill(218, 165, 32);
        textAlign(LEFT, BASELINE);
        textSize(12);
        text("$", t_collectable.x_pos - 3, t_collectable.y_pos + 4);
    }
}


function checkCollectable(t_collectable) {
    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20) {
        t_collectable.isFound = true;
        game_score++;
        scoreSound.play();
    }
}

function checkCanyon(t_canyon) {
    //falling down
    if (gameChar_y < floorPos_y) {
        var isContact = false;
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(gameChar_x, gameChar_y) == true) {
                isContact = true;
                break;
            }
        }
        if (isContact == false) {
            gameChar_y += 0.5;
            isFalling = false;
        }
    }
    if (gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y || gameChar_y > floorPos_y) {
        gameChar_y += 0.25;
        //raining when the game is over
        for (j = 0; j < raindrops.length; j++) {
            var drop = raindrops[j];
            var gravity = map(drop.z, 0, 1000, 0, 0.2);
            drop.ySpeed = drop.ySpeed + gravity;
            stroke(138, 153, 236);
            strokeWeight(map(drop.z, 0, 20, 1, 3));
            line(drop.x, drop.y, drop.x, drop.y + drop.len); drop.y += drop.ySpeed;

            if (drop.y > height) {
                raindrops[j] = createRaindrop();
            }
        }
    }
}

function drawCanyon(t_canyon) {
    //earth
    fill(155, 42, 42);
    noStroke();
    beginShape();
    vertex(t_canyon.x_pos, floorPos_y);
    vertex(t_canyon.x_pos - 15, floorPos_y + 20);
    vertex(t_canyon.x_pos - 15, floorPos_y + 144);
    vertex(t_canyon.x_pos + t_canyon.width + 15, floorPos_y + 144);
    vertex(t_canyon.x_pos + t_canyon.width + 15, floorPos_y + 20);
    vertex(t_canyon.x_pos + t_canyon.width, floorPos_y);
    endShape(CLOSE);
    //river
    fill(20, 124, 225);
    rect(t_canyon.x_pos, floorPos_y,
        t_canyon.width, floorPos_y + 144)
    //flowing water
    for (y = floorPos_y + 5; y < floorPos_y + 144; y += 20) {
        stroke(200, 200, 255, 150);
        line(t_canyon.x_pos + t_canyon.waterFlow, y + 5, t_canyon.x_pos + t_canyon.waterFlow + 25, y - 3);
    }
    noStroke();
    t_canyon.waterFlow += 1.2;
    if (t_canyon.waterFlow > t_canyon.width - 25) {
        t_canyon.waterFlow = 0;
    }
    //sky
    fill(100, 155, 255);
    rect(t_canyon.x_pos, floorPos_y,
        t_canyon.width, floorPos_y - 415);
}

function renderFlagpole() {
    push();
    strokeWeight(5);
    stroke(100)
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
    fill(255, 0, 255);
    noStroke();
    if (flagpole.isReached) {
        rect(flagpole.x_pos, floorPos_y - 200, 50, 50);
        if (!soundPlayed) {
            levelSound.play();
            soundPlayed = true;
        }
    } else {
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
        soundPlayed = false;
    }
    pop();
}

function checkFlagpole() {
    var distFlag = abs(gameChar_x - flagpole.x_pos);
    if (distFlag < 15) {
        flagpole.isReached = true;
    }
}

function checkPlayerDie() {
    if (gameChar_y > floorPos_y && !isPlummeting && lives >= 1) {
        lives -= 1;
        isPlummeting = true;
        if (!soundPlayed) {
            losingSound.play();
            soundPlayed = true;
        } else if (gameChar_y > floorPos_y && !isPlummeting && lives < 1) {
            if (!soundPlayed) {
                gameOverSound.play();
                soundPlayed = true;
            } else {
                soundPlayed = false;
            }
        }
    }
    if (isPlummeting && gameChar_y > floorPos_y + 200) {
        if (lives > 0) {
            startGame();
        }
    }
}

function preload() {
    soundFormats('mp3', 'wav');
    //sounds
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    scoreSound = loadSound('assets/score.wav');
    scoreSound.setVolume(0.1);
    levelSound = loadSound('assets/completion-of-a-level.wav');
    levelSound.setVolume(0.1);
    losingSound = loadSound('assets/player-losing.wav');
    losingSound.setVolume(0.1);
    gameOverSound = loadSound('assets/game-over.wav');
    gameOverSound.setVolume(0.1);
}

function createPlatforms(x, y, length) {
    var p = {
        x: x,
        y: y,
        originalX: x,
        length: length,
        range: 40,
        moveDirection: 0.7,
        length: length,
        draw: function () {
            this.x += this.moveDirection;
            if (this.x > this.originalX + this.range || this.x < this.originalX) {
                this.moveDirection *= -1;
            }
            fill(222, 184, 135);
            rect(this.x, this.y, this.length, 17, 10);

            stroke(160, 82, 45);
            strokeWeight(2);
            var stripeSpacing = 14;
            var stripeLength = 12;
            var offsetY = 4;
            var angleOffset = 3;
            var startOffset = 5;

            for (var i = 0; i * stripeSpacing < this.length - stripeLength - startOffset; i++) {
                var lineStartX = this.x + i * stripeSpacing + startOffset;
                var lineEndX = lineStartX + stripeLength;
                var lineY = this.y + offsetY + (i % 2) * 12;

                line(lineStartX, lineY, lineEndX, lineY - angleOffset);
            }
            noStroke();
        },
        checkContact: function (gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                var d = this.y - gc_y;
                if (d >= 0 && d < 5) {
                    return true;
                }
            }
            return false;
        }
    };
    return p;
}

function Enemy(x, y, rangeX, rangeY) {
    this.x = x;
    this.y = y;
    this.rangeX = rangeX;
    this.rangeY = rangeY;
    this.currentX = x;
    this.currentY = y;
    this.incX = 1;
    this.incY = 1;

    this.update = function () {
        this.currentX += this.incX;
        if (this.currentX >= this.x + this.rangeX) {
            this.incX = -1;
        } else if (this.currentX < this.x) {
            this.incX = 1;
        }

        this.currentY += this.incY;
        if (this.currentY >= this.y) {
            this.incY = -Math.abs(this.incY);
        } else if (this.currentY <= this.y - this.rangeY) {
            this.incY = Math.abs(this.incY);
        }
    }


    this.draw = function () {
        this.update();
        // body of the bee
        noStroke();
        fill(255, 255, 0);
        ellipse(this.currentX, this.currentY, 20, 30);

        // stripes on the body
        fill(0, 0, 0);
        rect(this.currentX - 10, this.currentY - 6, 20, 5);
        rect(this.currentX - 9, this.currentY + 5, 18, 5);

        // wings
        fill(220, 220, 220);
        // left wing
        ellipse(this.currentX - 10, this.currentY - 10, 20, 10);
        // right wing
        ellipse(this.currentX + 10, this.currentY - 10, 20, 10);

        // antennae
        stroke(0, 0, 0);
        line(this.currentX - 5, this.currentY - 10, this.currentX - 15, this.currentY - 20);
        line(this.currentX + 5, this.currentY - 10, this.currentX + 15, this.currentY - 20);
    }
    this.checkContact = function (gc_x, gc_y) {
        var d = dist(gc_x, gc_y, this.currentX, this.currentY)

        if (d < 20) {
            return true;
        }
        return false;
    }
}

