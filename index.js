const tileSize = 40;
const canvas = document.getElementById("canvas");
const canvasWidth = 520;
const canvasHeight = 520;
const columns = 13;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");
const gameBoard = [
    ["g","g","p","g","g","p","g","g","g","p","g","p","g"],
    ["w","w","w","l","l","l","w","w","l","l","l","w","w","w","w","w","l","l","l","w","w","l","l","l","w","w","t","w","w","w","t","w","w","w","w","w","w","t","t"],
    ["w","w","w","w","t","t","w","w","w","w","l","l","l","w","w","l","l","l","w","w","w","w","w","w","t","t","t","w","w","w","t","t","w","w","w","w","t","t","t"],
    ["w","w","w","w","l","l","w","w","t","w","w","w","t","t","w","w","w","w","t","t","t","l","l","l","w","w","t","w","w","w","t","w","w","w","l","l","l","w","w"],
    ["w","w","w","w","l","l","l","w","w","l","l","l","w","t","w","w","w","t","t","w","w","w","w","l","l","l","w","w","w","w","t","t","w","w","t","w","t","t","t"],
    ["w","w","w","w","l","w","w","l","l","w","w","w","t","t","w","w","w","w","t","t","t","w","w","l","w","w","t","w","w","w","t","w","w","w","l","l","l","w","w"],
    ["g","g","g","g","g","g","g","g","g","g","g","g","g"],
    ["r","c","r","r","r","r","c","r","r","r","r","r","b","b","r","r","r","r","c","r","r","r","r","r","r","r","b","b","r","r","c","r","r","r","r","r","r","r","r"],
    ["r","r","r","r","r","r","r","r","b","b","r","r","r","r","c","r","r","r","r","r","r","r","b","b","r","r","b","b","r","r","r","r","c","r","r","r","r","r","r"],
    ["r","r","r","r","r","r","c","r","b","b","r","r","r","r","c","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","b","b","r","r","r","r","r","r"],
    ["r","r","r","r","r","b","b","r","c","r","r","r","r","r","c","r","r","r","r","r","r","c","r","r","r","r","r","r","r","r","r","r","r","r","r","c","r","r","r"],
    ["r","r","b","b","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","r","b","b","r","r","r","r","r","r","r","r","c","r","r","r","r","c","r","r","r"],
    ["g","g","g","g","g","g","g","g","g","g","g","g","g"],
]
const velocitys = [0,1000,700,900,800,700,0,900,800,900,1000,700,0]
const startTimes = new Array(13).fill(Date.now());
const directions = [null,"right","left","right","left","right",null,"left","right","left","right","left"];
const player = new Player();

let water;
let grass;
let log;
let turtle;
let road;
let car;
let rat;
let bus;
let pizza;
setUp();
async function setUp(){
    log = await createTile("./images/log.svg");
    grass = await createTile("./images/grass.svg");
    water = await createTile("./images/water.svg");
    turtle = await createTile("./images/turtle.svg");
    road = await createTile("./images/road.svg");
    car = await createTile("./images/car.svg");
    rat = await createTile("./images/rat.svg");
    bus = await createTile("./images/bus.svg");
    pizza = await createTile("./images/pizza.svg");
    loop();
}

function loop(){
    moveLanes();
    drawGame();
    player.Draw();
    checkForCollision();
    requestAnimationFrame(loop)
}

function moveLanes(){
    for(let r = 0; r < gameBoard.length; r++){
        if(Date.now() - startTimes[r] >= velocitys[r]){
            if(gameBoard[r] === gameBoard[player.y / tileSize]){
                moveFrog();
            }
            if(directions[r] === "right"){
                const last = gameBoard[r].pop()
                gameBoard[r].unshift(last)
            } else if(directions[r] === "left"){
                const first = gameBoard[r].shift();
                gameBoard[r].push(first);
            }
            startTimes[r] = Date.now();
        }
    }
}


function createTile(src){
    return new Promise((resolve)=>{
        const tile = new Image();
        tile.src = src
        tile.onload = () => resolve(tile)
    })
}




function drawGame(){
    for(let r = 0; r < gameBoard.length; r++){
        for(let c = 0; c < columns; c++){
           const tile = getTile(gameBoard[r][c]);
           ctx.drawImage(tile, c * tileSize, r * tileSize, tileSize, tileSize);
        }
    }
}

function getTile(key){
    switch(key){
        case "g" :
        return grass
        break;
        case "w" :
        return water 
        break;
        case "l" :
        return log
        break;
        case "t":
        return turtle
        break;
        case "r" :
        return road
        break;
        case "c" :
        return car
        break;
        case "b" :
        return bus
        break;
        case "p" :
        return pizza
        break;
    }
}









document.addEventListener("keydown", (e)=>{
    switch(e.key){
        case "ArrowLeft" :
        player.MoveLeft();
        break;
        case "ArrowRight" :
        player.MoveRight();
        break;
        case "ArrowUp" :
        player.MoveUp();
        break;
        case "ArrowDown" :
        player.MoveDown();
        break;
    }
    player.AddBoundarys();
})

function moveFrog(){
    const frogX = player.x / tileSize;
    const frogY = player.y / tileSize;
    if(gameBoard[frogY][frogX] === "l" || gameBoard[frogY][frogX] === "t"){
        if(directions[frogY] === "left"){
            player.MoveLeft();
        } else if (directions[frogY] === "right"){
            player.MoveRight();
        }
    }
}

function checkForCollision(){
    const frogPosition = gameBoard[player.y / tileSize][player.x / tileSize]
    switch(frogPosition){
        case "b" :
        case "c" :
        case "w" :
        case "p" :
        gameOver();
        break;
    }
     
}

function gameOver(){
    player.y = canvasHeight - tileSize;
    player.x = 0
}