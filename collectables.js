let collectables;

function setupCollectables() {
    collectables = createCollectables();
}

function createCollectables() {
    return [
        { x_pos: 660, y_pos: 415, size: 20, isFound: false },
        { x_pos: 1160, y_pos: 415, size: 20, isFound: false },
        { x_pos: 1270, y_pos: 415, size: 20, isFound: false },
        { x_pos: 1270, y_pos: 345, size: 20, isFound: false },
        { x_pos: 1420, y_pos: 415, size: 20, isFound: false },
        { x_pos: 1580, y_pos: 415, size: 20, isFound: false },
        { x_pos: 1980, y_pos: 415, size: 20, isFound: false },
        { x_pos: 2150, y_pos: 415, size: 20, isFound: false },
        { x_pos: 2280, y_pos: 415, size: 20, isFound: false },
        { x_pos: 2500, y_pos: 415, size: 20, isFound: false },
        { x_pos: 2680, y_pos: 415, size: 20, isFound: false },
        { x_pos: 2830, y_pos: 415, size: 20, isFound: false }
    ];
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

function drawCollectables() {
    for (i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            checkCollectable(collectables[i]);
            drawCollectable(collectables[i]);
        }
    }
}

function checkCollectable(t_collectable) {
    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20) {
        t_collectable.isFound = true;
        increaseScore(1);
        scoreSound.play();
    }
}