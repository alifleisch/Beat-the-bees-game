let floorPos_y;
let mountains = [], trees_x, treePos_y, clouds = [];
trees_x = [-150, 100, 300, 600, 900, 1100, 1500, 1850, 2200, 2400, 2600, 3200];

function setupNatureObjects() {
    floorPos_y = height * 3 / 4;
    mountains = createMountains();
    clouds = createClouds();
    treePos_y = floorPos_y;
}

function drawNatureObjects() {
    drawClouds();
    drawMountains();
    drawTrees();
}

function createMountains() {
    return [
        { x_pos: -100, y_pos: floorPos_y },
        { x_pos: 300, y_pos: floorPos_y },
        { x_pos: 950, y_pos: floorPos_y },
        { x_pos: 1750, y_pos: floorPos_y },
        { x_pos: 2850, y_pos: floorPos_y },
        { x_pos: 3300, y_pos: floorPos_y }
    ];
}

function createClouds() {
    return [
        { x_pos: 150, y_pos: 90, radius: 60, rect_width: 90, rect_height: 40, moveRight: true, distance: 0 },
        { x_pos: 600, y_pos: 150, radius: 72, rect_width: 108, rect_height: 48, moveRight: true, distance: 0 },
        { x_pos: 800, y_pos: 100, radius: 60, rect_width: 90, rect_height: 40, moveRight: true, distance: 0 },
        { x_pos: 1200, y_pos: 150, radius: 72, rect_width: 108, rect_height: 48, moveRight: true, distance: 0 },
        { x_pos: 1500, y_pos: 90, radius: 60, rect_width: 90, rect_height: 40, moveRight: true, distance: 0 },
        { x_pos: 1800, y_pos: 150, radius: 72, rect_width: 108, rect_height: 48, moveRight: true, distance: 0 },
        { x_pos: 2200, y_pos: 90, radius: 60, rect_width: 90, rect_height: 40, moveRight: true, distance: 0 },
        { x_pos: 2600, y_pos: 150, radius: 72, rect_width: 108, rect_height: 48, moveRight: true, distance: 0 },
        { x_pos: 2900, y_pos: 90, radius: 60, rect_width: 90, rect_height: 40, moveRight: true, distance: 0 },
        { x_pos: 3200, y_pos: 150, radius: 72, rect_width: 108, rect_height: 48, moveRight: true, distance: 0 }
    ];
}

function drawBackground() {
    background(100, 155, 255);
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);
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