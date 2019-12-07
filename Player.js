class Player {
    constructor() {
        this.x = 0;
        this.y = canvasHeight - tileSize;
    }
    MoveLeft() {
        console.log("hit");
        this.x -= tileSize;
    }
    MoveRight() {
        this.x += tileSize;
    }
    MoveUp() {
        this.y -= tileSize;
    }
    MoveDown() {
        this.y += tileSize;
    }
    Draw() {
        ctx.drawImage(rat, this.x, this.y, tileSize, tileSize);
    }
    AddBoundarys() {
        if (this.x + tileSize > canvasWidth) {
            this.x = canvasWidth - tileSize;
        }
        else if (this.x < 0) {
            this.x = 0;
        }
        else if (this.y + tileSize > canvasHeight) {
            this.y = canvasHeight - tileSize;
        }
        else if (this.y < 0) {
            this.y = 0;
        }
    }
}






