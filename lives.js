let lives;

function setupLives() {
    lives = 3;
}

function alertGameOver() {
    if (lives < 1) {
        fill(220, 30, 30);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50);
        text("Game over. Press space to continue.", width / 2, height / 2);
        return;
    }
}

function drawLifeTokens() {
    for (i = 0; i < lives; i++) {
        fill(256, 170, 0);
        noStroke();
        ellipse(width / 2 - 50 + i * 50, 20, 25, 25)
    }
}

function decreaseLives() {
    lives -= 1;
}

function checkLives() {
    if (lives == 3) {
        resetScore();
    }
}

function checkPlayerDie() {
    if (char.y > floorPos_y && !isPlummeting && lives >= 1) {
        decreaseLives();
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