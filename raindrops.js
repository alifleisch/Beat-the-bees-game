let raindrops;

function pushRaindrops() {
    raindrops = [];
    for (let i = 0; i < 100; i++) {
        raindrops.push(createRaindrop());
    }
}

function startRaining() {
    //raining when the character is dying
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

function createRaindrop() {
    return {
        x: random(width * 1.5),
        y: random(-500, -50),
        z: random(0, 20),
        len: random(10, 20),
        ySpeed: random(2, 6)
    };
}