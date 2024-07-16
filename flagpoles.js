let flagpole;

function flagpoleStartState() {
    flagpole = { isReached: false, x_pos: 3100 };
}

function drawFlagPole() {
    if (!flagpole.isReached) {
        checkFlagpole();
    }
    renderFlagpole();

    if (flagpole.isReached == true) {
        fill(0, 255, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50);
        text("Level complete", width / 2, height / 2);
        return;
    }
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