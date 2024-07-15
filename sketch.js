let floorPos_y;
let isLeft, isRight, isFalling, isPlummeting;
let canyons = [];
let raindrops = [];
let platforms;
let enemies, enemy_y;
let flagpole;
let lives;
let cameraPosX;
let jumpSound, scoreSound, levelSound, losingSound, gameOverSound;
let soundPlayed = false;

function setup() {
    createCanvas(1200, 576);
    floorPos_y = height * 3 / 4;
    lives = 3;
    startGame();
    setupNatureObjects();
}

function startGame() {
    gameCharPosition();
    drawNatureObjects();
    setupCollectables();
    platforms = createPlatforms();
    enemies = createEnemies();
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

    for (i = 0; i < 100; i++) {
        raindrops.push(createRaindrop());
    }
    if (lives == 3) {
        resetScore();
    }
    flagpole = { isReached: false, x_pos: 3100 };

    function createPlatforms() {
        return [
            createPlatform(100, floorPos_y - 100, 80),
            createPlatform(500, floorPos_y - 100, 180),
            createPlatform(1000, floorPos_y - 100, 150),
            createPlatform(1500, floorPos_y - 100, 150),
            createPlatform(2000, floorPos_y - 100, 150),
            createPlatform(2500, floorPos_y - 100, 150)
        ];
    }

    function createEnemies() {
        enemy_y = floorPos_y - 10;
        return [
            new Enemy(350, enemy_y, 80, 30),
            new Enemy(850, enemy_y, 80, 30),
            new Enemy(1550, enemy_y, 80, 30),
            new Enemy(2100, enemy_y, 80, 30),
            new Enemy(2600, enemy_y, 80, 30),
            new Enemy(3100, enemy_y, 80, 30)
        ];
    }
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
    drawNatureObjects();
    drawCollectables();
    drawGameCharacter();

    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    for (i = 0; i < canyons.length; i++) {
        checkCanyon(canyons[i]);
        drawCanyon(canyons[i]);
    }

    if (flagpole.isReached == false) {
        checkFlagpole();
    }
    renderFlagpole();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();

        let isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if (isContact) {
            if (lives > 0) {
                lives -= 1;
                startGame();
                break;
            }
        }
    }

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
    text("Score: " + getScore(), 20, 20);
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

function checkCollectable(t_collectable) {
    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20) {
        t_collectable.isFound = true;
        increaseScore(1);
        scoreSound.play();
    }
}

function checkCanyon(t_canyon) {
    //falling down
    if (gameChar_y < floorPos_y) {
        let isContact = false;
        for (let i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(gameChar_x, gameChar_y) == true) {
                isContact = true;
                break;
            }
        }
        if (!isContact) {
            gameChar_y += 0.5;
            isFalling = false;
        }
    }
    if (gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y || gameChar_y > floorPos_y) {
        gameChar_y += 0.25;
        //raining when the game is over
        for (j = 0; j < raindrops.length; j++) {
            let drop = raindrops[j];
            let gravity = map(drop.z, 0, 1000, 0, 0.2);
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


// // Canyon.js
// class Canyon {
//     width = 200;
//     x_pos = undefined;

//     constructor(options) {
//         if (options) {
//             this.x_pos = options.x_pos;
//         }
//     }

//     draw(envSettings) {
//         fill(155, 42, 42);
//         noStroke();
//         beginShape();
//         vertex(this.x_pos, envSettings.floorPos_y);
//         vertex(this.x_pos - 15, envSettings.floorPos_y + 20);
//         vertex(this.x_pos - 15, envSettings.floorPos_y + 144);
//     }
// }

// // Scene.js
// class Scene {
//     envSettings = { floorPos_y: 0 };

//     constructor() {
//         let x_pos = 100;
//         this.canyons = Array(5).fill(1).map((el, idx) => new Canyon({ x_pos: x_pos * idx }));
//     }

//     draw() {
//         for (const c of this.canyons) {
//             c.draw(this.envSettings);
//         }
//     }
// }

// // main.js
// function main() {
//     new Scene().draw();
// }

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
    let distFlag = abs(gameChar_x - flagpole.x_pos);
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

function createPlatform(x, y, length) {
    let p = {
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
            let stripeSpacing = 14;
            let stripeLength = 12;
            let offsetY = 4;
            let angleOffset = 3;
            let startOffset = 5;

            for (let i = 0; i * stripeSpacing < this.length - stripeLength - startOffset; i++) {
                let lineStartX = this.x + i * stripeSpacing + startOffset;
                let lineEndX = lineStartX + stripeLength;
                let lineY = this.y + offsetY + (i % 2) * 12;

                line(lineStartX, lineY, lineEndX, lineY - angleOffset);
            }
            noStroke();
        },
        checkContact: function (gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                let d = this.y - gc_y;
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
        let d = dist(gc_x, gc_y, this.currentX, this.currentY)

        if (d < 20) {
            return true;
        }
        return false;
    }
}
