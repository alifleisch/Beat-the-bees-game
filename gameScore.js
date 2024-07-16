let game_score;

function increaseScore(amount) {
    game_score += amount;
}

function resetScore() {
    game_score = 0;
}

function getScore() {
    return game_score;
}

function textScore() {
    fill(255);
    noStroke();
    textSize(12);
    text("Score: " + getScore(), 20, 20);
}