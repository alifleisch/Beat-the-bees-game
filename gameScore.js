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