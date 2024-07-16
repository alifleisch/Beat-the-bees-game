
let isLeft, isRight, isFalling, isPlummeting;

class Char {
    constructor(settings) {
        this.init_x = settings.canvasWidth / 2;
        this.init_y = settings.floorPos_y;
        this.reset();
    }

    reset() {
        this.x = this.init_x;
        this.y = this.init_y;
        this.isLeft = false;
        this.isRight = false;
        this.isFalling = false;
        this.isPlummeting = false;
    }

    moveLeft() {
        if (!this.isPlummeting) {
            this.isLeft = true;
            this.isRight = false;
        }
    }

    moveRight() {
        if (!this.isPlummeting) {
            this.isRight = true;
            this.isLeft = false;
        }
    }

    stopMoving() {
        this.isLeft = false;
        this.isRight = false;
    }

    jump() {
        if (!this.isFalling && !this.isPlummeting) {
            this.y -= 150;
            jumpSound.play();
        }
    }

    updatePosition() {
        if (this.isLeft) {
            this.x -= 4;
        }
        if (this.isRight) {
            this.x += 4;
        }
        if (this.isFalling || this.isPlummeting) {
            this.y += 2.5;
        }
    }

    drawChar() {
        noStroke();
        if (isLeft) {
            walkLeft();
        } else if (isRight) {
            walkRight();
        } else if (isLeft && isFalling) {
            jumpLeft();
        } else if (isRight && isFalling) {
            jumpRight();
        } else if (isFalling || isPlummeting) {
            jumpFrontFacing();
        } else {
            standFrontFacing();
        }
    }
}

function walkLeft() {

    this.x -= 4;
    //body
    fill(255, 0, 0);
    rect(char.x - 10, char.y - 50, 20, 30);
    //arm
    fill(0);
    rect(char.x - 2, char.y - 50, 5, 20, 10);
    //leg
    fill(0);
    rect(char.x - 2, char.y - 20, 5, 20, 10);
    //head
    fill(255, 218, 185);
    ellipse(char.x, char.y - 60, 30);
    //nose
    fill(0);
    triangle(char.x - 15, char.y - 64,
        char.x - 15, char.y - 56,
        char.x - 20, char.y - 60);
    //eyes
    fill(85, 137, 47);
    ellipse(char.x - 7, char.y - 65, 7, 7);
}

function walkRight() {
    this.x += 4;
    //body
    fill(255, 0, 0);
    rect(char.x - 10, char.y - 50, 20, 30);
    //arm
    fill(0);
    rect(char.x - 2, char.y - 50, 5, 20, 10);
    //leg
    fill(0);
    rect(char.x - 2, char.y - 20, 5, 20, 10);
    //head
    fill(255, 218, 185);
    ellipse(char.x, char.y - 60, 30);
    //nose
    fill(0);
    triangle(char.x + 15, char.y - 64,
        char.x + 15, char.y - 56,
        char.x + 20, char.y - 60);
    //eyes
    fill(85, 137, 47);
    ellipse(char.x + 7, char.y - 65, 7, 7);
}

function jumpLeft() {
    //arm left
    fill(0);
    rect(char.x - 25, char.y - 50, 20, 5, 10);
    //body
    fill(255, 0, 0);
    rect(char.x - 10, char.y - 50, 20, 30);
    //head
    fill(255, 218, 185);
    ellipse(char.x, char.y - 60, 30);
    //nose
    fill(0);
    triangle(char.x - 15, char.y - 64,
        char.x - 15, char.y - 56,
        char.x - 20, char.y - 60);
    //eyes
    fill(85, 137, 47);
    ellipse(char.x - 7, char.y - 65, 7, 7);
    //arm right
    fill(0);
    rect(char.x - 20, char.y - 50, 20, 5, 10);
    //leg left
    fill(0);
    rect(char.x - 25, char.y - 20, 20, 5, 10);
    //leg right
    fill(0);
    rect(char.x - 15, char.y - 20, 20, 5, 10);
}

function jumpRight() {
    //arm right
    fill(0);
    rect(char.x + 5, char.y - 50, 20, 5, 10);
    //body
    fill(255, 0, 0);
    rect(char.x - 10, char.y - 50, 20, 30);
    //head
    fill(255, 218, 185);
    ellipse(char.x, char.y - 60, 30);
    //nose
    fill(0);
    triangle(char.x + 15, char.y - 64,
        char.x + 15, char.y - 56,
        char.x + 20, char.y - 60);
    //eyes
    fill(85, 137, 47);
    ellipse(char.x + 7, char.y - 65, 7, 7);
    //arm left
    fill(0);
    rect(char.x, char.y - 50, 20, 5, 10);
    //leg left
    fill(0);
    rect(char.x - 5, char.y - 20, 20, 5, 10);
    //leg right
    fill(0);
    rect(char.x + 5, char.y - 20, 20, 5, 10);
}

function jumpFrontFacing() {
    //body
    fill(255, 0, 0);
    rect(char.x - 10, char.y - 50, 20, 30);
    //head
    fill(255, 218, 185);
    ellipse(char.x, char.y - 60, 30);
    //nose
    fill(0);
    triangle(char.x, char.y - 54,
        char.x, char.y - 60,
        char.x + 6, char.y - 57);
    //eyes
    fill(85, 137, 47);
    ellipse(char.x - 7, char.y - 65, 7, 7);
    ellipse(char.x + 7, char.y - 65, 7, 7);
    //arm left
    fill(0);
    rect(char.x - 25, char.y - 50, 15, 5, 10);
    //arm right
    fill(0);
    rect(char.x + 10, char.y - 50, 15, 5, 10);
    //leg left
    fill(0);
    rect(char.x - 25, char.y - 20, 20, 5, 10);
    //leg right
    fill(0);
    rect(char.x + 5, char.y - 20, 20, 5, 10);
}

function standFrontFacing() {
    //body
    fill(255, 0, 0);
    rect(char.x - 10, char.y - 50, 20, 30);
    //head
    fill(255, 210, 185);
    ellipse(char.x, char.y - 60, 30);
    //eyes
    fill(85, 137, 47);
    ellipse(char.x - 7, char.y - 65, 7, 7);
    ellipse(char.x + 7, char.y - 65, 7, 7);
    //arm left
    fill(0);
    rect(char.x - 15, char.y - 50, 5, 20, 10);
    //arm right
    fill(0);
    rect(char.x + 10, char.y - 50, 5, 20, 10);
    //leg left
    fill(0);
    rect(char.x - 10, char.y - 20, 5, 20, 10);
    //leg right
    fill(0);
    rect(char.x + 5, char.y - 20, 5, 20, 10);
    //nose
    fill(0);
    triangle(char.x, char.y - 54,
        char.x, char.y - 60,
        char.x + 6, char.y - 57);
}