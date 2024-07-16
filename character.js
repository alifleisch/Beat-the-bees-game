class Char {
    constructor(settings) {
        this.init_x = settings.canvasWidth / 2;
        this.init_y = settings.floorPos_y;
        this.reset();
    }

    reset() {
        debugger;

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

    drawChar() {
        noStroke();
        if (this.isLeft) {
            this.walkLeft();
        } else if (this.isRight) {
            this.walkRight();
        } else if (this.isLeft && this.isFalling) {
            this.jumpLeft();
        } else if (this.isRight && this.isFalling) {
            this.jumpRight();
        } else if (this.isFalling || this.isPlummeting) {
            this.jumpFrontFacing();
        } else {
            this.standFrontFacing();
        }
    }

    walkLeft() {
        this.x -= 4;
        //body
        fill(255, 0, 0);
        rect(this.x - 10, this.y - 50, 20, 30);
        //arm
        fill(0);
        rect(this.x - 2, this.y - 50, 5, 20, 10);
        //leg
        fill(0);
        rect(this.x - 2, this.y - 20, 5, 20, 10);
        //head
        fill(255, 218, 185);
        ellipse(this.x, this.y - 60, 30);
        //nose
        fill(0);
        triangle(this.x - 15, this.y - 64,
            this.x - 15, this.y - 56,
            this.x - 20, this.y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(this.x - 7, this.y - 65, 7, 7);
    }

    walkRight() {
        this.x += 4;
        //body
        fill(255, 0, 0);
        rect(this.x - 10, this.y - 50, 20, 30);
        //arm
        fill(0);
        rect(this.x - 2, this.y - 50, 5, 20, 10);
        //leg
        fill(0);
        rect(this.x - 2, this.y - 20, 5, 20, 10);
        //head
        fill(255, 218, 185);
        ellipse(this.x, this.y - 60, 30);
        //nose
        fill(0);
        triangle(this.x + 15, this.y - 64,
            this.x + 15, this.y - 56,
            this.x + 20, this.y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(this.x + 7, this.y - 65, 7, 7);
    }

    jumpLeft() {
        //arm left
        fill(0);
        rect(this.x - 25, this.y - 50, 20, 5, 10);
        //body
        fill(255, 0, 0);
        rect(this.x - 10, this.y - 50, 20, 30);
        //head
        fill(255, 218, 185);
        ellipse(this.x, this.y - 60, 30);
        //nose
        fill(0);
        triangle(this.x - 15, this.y - 64,
            this.x - 15, this.y - 56,
            this.x - 20, this.y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(this.x - 7, this.y - 65, 7, 7);
        //arm right
        fill(0);
        rect(this.x - 20, this.y - 50, 20, 5, 10);
        //leg left
        fill(0);
        rect(this.x - 25, this.y - 20, 20, 5, 10);
        //leg right
        fill(0);
        rect(this.x - 15, this.y - 20, 20, 5, 10);
    }

    jumpRight() {
        //arm right
        fill(0);
        rect(this.x + 5, this.y - 50, 20, 5, 10);
        //body
        fill(255, 0, 0);
        rect(this.x - 10, this.y - 50, 20, 30);
        //head
        fill(255, 218, 185);
        ellipse(this.x, this.y - 60, 30);
        //nose
        fill(0);
        triangle(this.x + 15, this.y - 64,
            this.x + 15, this.y - 56,
            this.x + 20, this.y - 60);
        //eyes
        fill(85, 137, 47);
        ellipse(this.x + 7, this.y - 65, 7, 7);
        //arm left
        fill(0);
        rect(this.x, this.y - 50, 20, 5, 10);
        //leg left
        fill(0);
        rect(this.x - 5, this.y - 20, 20, 5, 10);
        //leg right
        fill(0);
        rect(this.x + 5, this.y - 20, 20, 5, 10);
    }

    jumpFrontFacing() {
        //body
        fill(255, 0, 0);
        rect(this.x - 10, this.y - 50, 20, 30);
        //head
        fill(255, 218, 185);
        ellipse(this.x, this.y - 60, 30);
        //nose
        fill(0);
        triangle(this.x, this.y - 54,
            this.x, this.y - 60,
            this.x + 6, this.y - 57);
        //eyes
        fill(85, 137, 47);
        ellipse(this.x - 7, this.y - 65, 7, 7);
        ellipse(this.x + 7, this.y - 65, 7, 7);
        //arm left
        fill(0);
        rect(this.x - 25, this.y - 50, 15, 5, 10);
        //arm right
        fill(0);
        rect(this.x + 10, this.y - 50, 15, 5, 10);
        //leg left
        fill(0);
        rect(this.x - 25, this.y - 20, 20, 5, 10);
        //leg right
        fill(0);
        rect(this.x + 5, this.y - 20, 20, 5, 10);
    }

    standFrontFacing() {
        //body
        fill(255, 0, 0);
        rect(this.x - 10, this.y - 50, 20, 30);
        //head
        fill(255, 210, 185);
        ellipse(this.x, this.y - 60, 30);
        //eyes
        fill(85, 137, 47);
        ellipse(this.x - 7, this.y - 65, 7, 7);
        ellipse(this.x + 7, this.y - 65, 7, 7);
        //arm left
        fill(0);
        rect(this.x - 15, this.y - 50, 5, 20, 10);
        //arm right
        fill(0);
        rect(this.x + 10, this.y - 50, 5, 20, 10);
        //leg left
        fill(0);
        rect(this.x - 10, this.y - 20, 5, 20, 10);
        //leg right
        fill(0);
        rect(this.x + 5, this.y - 20, 5, 20, 10);
        //nose
        fill(0);
        triangle(this.x, this.y - 54,
            this.x, this.y - 60,
            this.x + 6, this.y - 57);
    }
}
