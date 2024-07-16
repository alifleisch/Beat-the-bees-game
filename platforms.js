let platforms;

function setupPlatforms() {
    platforms = createPlatforms();
}

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