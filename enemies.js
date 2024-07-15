let enemies, enemy_y;

function setupEnemies() {
    enemies = createEnemies();
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();

        let isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if (isContact) {
            if (lives > 0) {
                lives -= 1;
                startGame();
                break;
            }
        }
    }
}

function createEnemies() {
    enemy_y = floorPos_y - 10;
    return [
        new CreateEnemy(350, enemy_y, 80, 30),
        new CreateEnemy(850, enemy_y, 80, 30),
        new CreateEnemy(1550, enemy_y, 80, 30),
        new CreateEnemy(2100, enemy_y, 80, 30),
        new CreateEnemy(2600, enemy_y, 80, 30),
        new CreateEnemy(3100, enemy_y, 80, 30)
    ];
}

class CreateEnemy {
    constructor(x, y, rangeX, rangeY) {
        this.x = x;
        this.y = y;
        this.rangeX = rangeX;
        this.rangeY = rangeY;
        this.currentX = x;
        this.currentY = y;
        this.incX = 1;
        this.incY = 1;

        this.update = function () {
            this.currentX += this.incX;
            if (this.currentX >= this.x + this.rangeX) {
                this.incX = -1;
            } else if (this.currentX < this.x) {
                this.incX = 1;
            }
            this.currentY += this.incY;
            if (this.currentY >= this.y) {
                this.incY = -Math.abs(this.incY);
            } else if (this.currentY <= this.y - this.rangeY) {
                this.incY = Math.abs(this.incY);
            }
        };
        this.draw = function () {
            this.update();
            // body of the bee
            noStroke();
            fill(255, 255, 0);
            ellipse(this.currentX, this.currentY, 20, 30);
            // stripes on the body
            fill(0, 0, 0);
            rect(this.currentX - 10, this.currentY - 6, 20, 5);
            rect(this.currentX - 9, this.currentY + 5, 18, 5);
            // wings
            fill(220, 220, 220);
            // left wing
            ellipse(this.currentX - 10, this.currentY - 10, 20, 10);
            // right wing
            ellipse(this.currentX + 10, this.currentY - 10, 20, 10);
            // antennae
            stroke(0, 0, 0);
            line(this.currentX - 5, this.currentY - 10, this.currentX - 15, this.currentY - 20);
            line(this.currentX + 5, this.currentY - 10, this.currentX + 15, this.currentY - 20);
        };
        this.checkContact = function (gc_x, gc_y) {
            let d = dist(gc_x, gc_y, this.currentX, this.currentY);

            if (d < 20) {
                return true;
            }
            return false;
        };
    }
}