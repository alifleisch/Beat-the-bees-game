let canyons = [];

function setupCanyons() {
    canyons = createCanyons();
}

function drawCanyons() {
    for (let i = 0; i < canyons.length; i++) {
        checkCanyon(canyons[i]);
        drawCanyon(canyons[i]);
    }
}

function createCanyons() {
    return [
        { x_pos: 180, width: 80, waterFlow: 0 },
        { x_pos: 680, width: 80, waterFlow: 0 },
        { x_pos: 1180, width: 60, waterFlow: 0 },
        { x_pos: 1300, width: 100, waterFlow: 0 },
        { x_pos: 1600, width: 80, waterFlow: 0 },
        { x_pos: 2000, width: 60, waterFlow: 0 },
        { x_pos: 2300, width: 80, waterFlow: 0 },
        { x_pos: 2700, width: 100, waterFlow: 0 }
    ]
}

function checkCanyon(t_canyon) {
    //falling down
    if (char.y < floorPos_y) {
        let isContact = false;
        for (let i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(char.x, char.y)) {
                isContact = true;
                break;
            }
        }
        if (!isContact) {
            char.y += 0.5;
            char.isFalling = false;
        }
    }
    let charIsDying = char.x > t_canyon.x_pos && char.x < t_canyon.x_pos + t_canyon.width && char.y >= floorPos_y || char.y > floorPos_y;
    if (charIsDying) {
        char.y += 0.25;
        startRaining();
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