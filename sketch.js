let floorPos_y;
let isLeft, isRight, isFalling, isPlummeting;
let canyons = [];
let raindrops = [];
let flagpole;
let lives;
let cameraPosX;
let char;

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    lives = 3;
    char = new Char({ canvasWidth: width, floorPos_y });
    startGame();
    setupNatureObjects();
}

function startGame() {
    char.reset();
    drawNatureObjects();
    setupCollectables();
    setupEnemies();
    setupPlatforms();
    cameraPosX = 0;

    canyons = [
        { x_pos: 180, width: 80, waterFlow: 0 },
        { x_pos: 680, width: 80, waterFlow: 0 },
        { x_pos: 1180, width: 60, waterFlow: 0 },
        { x_pos: 1300, width: 100, waterFlow: 0 },
        { x_pos: 1600, width: 80, waterFlow: 0 },
        { x_pos: 2000, width: 60, waterFlow: 0 },
        { x_pos: 2300, width: 80, waterFlow: 0 },
        { x_pos: 2700, width: 100, waterFlow: 0 }
    ];

    raindrops = [];
    for (let i = 0; i < 100; i++) {
        raindrops.push(createRaindrop());
    }
    if (lives == 3) {
        resetScore();
    }
    flagpole = { isReached: false, x_pos: 3100 };
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
    cameraPosX = char.x - width / 2;

    background(100, 155, 255);
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);
    push();
    translate(-cameraPosX, 0);

    drawNatureObjects();
    drawCollectables();
    drawEnemies();
    char.updatePosition();
    char.drawChar();

    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    for (i = 0; i < canyons.length; i++) {
        checkCanyon(canyons[i]);
        drawCanyon(canyons[i]);
    }

    if (!flagpole.isReached) {
        checkFlagpole();
    }
    renderFlagpole();
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

function checkCanyon(t_canyon) {
    //falling down
    if (char.y < floorPos_y) {
        let isContact = false;
        for (let i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(char.x, char.y) == true) {
                isContact = true;
                break;
            }
        }
        if (!isContact) {
            char.y += 0.5;
            isFalling = false;
        }
    }
    if (char.x > t_canyon.x_pos && char.x < t_canyon.x_pos + t_canyon.width && char.y >= floorPos_y || char.y > floorPos_y) {
        char.y += 0.25;
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
    let distFlag = abs(char.x - flagpole.x_pos);
    if (distFlag < 15) {
        flagpole.isReached = true;
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