console.log("js file loaded"); // Debugging

var backgrounds = [
    "/images/Castle.png",
    "/images/Cave.png",
    "/images/Courtyard.png",
    "/images/Ruins.png",
];

var elements = [
    "/images/altar.png",
    "/images/altar2.png",
    "/images/altar3.png",
    "/images/altars.png",
    "/images/altars2.png",
    "/images/Book.png",
    "/images/Crystals.png",
    "/images/Potion.png",
    "/images/Statue.png",
];

var chests = ["/images/Chest1.png", "/images/Chest2.png", "/images/Chest3.png"];

var zombies = [
    "/images/Zombie.png",
    "/images/Zombie2.png",
    "/images/Zombie3.png",
];

var playerX, playerY, zombieX, zombieY, TresureX, TresureY;
var CompassTarget;

// Generate the 5x5 game board
var gameRows = 5;
var gameCols = 5;
var gameBoardImgs;

startGame(); // Initialize the game

/**
 * * Generates a 5x5 game board with random images for each room.
 * * Each room contains a background, three elements, a chest, and a zombie.
 */
function generateGameBoard(){
    gameBoardImgs = [];
    
    for (var row = 0; row < gameRows; row++) {
        var boardRow = [];
        for (var col = 0; col < gameCols; col++) {
            var room = [
                randomItem(backgrounds), // background
                randomItem(elements), // element1
                randomItem(elements), // element2
                randomItem(elements), // element3
                '', // chest
                '', // zombie
            ];
            boardRow.push(room);
        }
        gameBoardImgs.push(boardRow);
    }
    CompassTarget = "zombie"; // The target for the compass
    zombieX = Math.floor(Math.random() * 5);
    zombieY = Math.floor(Math.random() * 5);
    TresureX = Math.floor(Math.random() * 5);
    TresureY = Math.floor(Math.random() * 5);
    console.log("Zombie position:", zombieX, zombieY); // Debugging
    console.log("Treasure position:", TresureX, TresureY); // Debugging
    
    gameBoardImgs[zombieX][zombieY][5] = randomItem(zombies); // Assign a random zombie to the zombie's position
    gameBoardImgs[TresureX][TresureY][4] = randomItem(chests); // Assign a random chest to the treasure's position
    
    playerX = 4; // Starting position
    playerY = 2; // Starting position
}

// web api to enter fullscreen mode 
const game = document.getElementById("game");
const gameImage = document.getElementById("game-Background");
gameImage.addEventListener("click", () => {
    enterFullscreen(game);
});

/** 
 * * Starts the game by generating the game board, checking available directions,
 * * loading room images, and drawing the gameboard and compass.
 */
function startGame() {
    console.log("Game started"); // Debugging
    
    generateGameBoard(); // Generate the gameboard
    
    checkDirections(playerX, playerY); // Check available directions
    loadRoomImages(gameBoardImgs[playerX][playerY]); // Load the room images
    drawGameboard(); // Initial draw of the gameboard
    drawcompass(); // Initial draw of the compass
}
/**
 * Returns a random item from an array.
 * @param {Array} arr - The array to pick a random item from.
 * @returns {*} A random element from the given array.
 */
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
/**
 * Changes the compass target to either "zombie" or "treasure".
 * @param {string} target - The target to track ("zombie" or "treasure").
 */
function track(target){
    CompassTarget = target; // Set the target for the compass
    drawcompass(); // Draw the compass with the new target
    // console.log("Tracking", target); // Debugging
}
/**
 * Moves the player in the specified direction. 
 * @param {number} row - The row offset (-1, 0, 1).
 * @param {number} col - The column offset (-1, 0, 1).
 */
function move(row, col) {
    console.log(
        "Moving player",
        row === 1 ? "down" : row == -1 ? "up" : col == 1 ? "right" : "left"
    ); // Debugging
    
    // Check if the move is valid
    if (
        playerX + row < 0 ||
        playerX + row >= gameBoardImgs.length ||
        playerY + col < 0 ||
        playerY + col >= gameBoardImgs[0].length
    ) {
        alert("Invalid move! Out of bounds.");
        console.log("Invalid move");
        return;
    }
    playerX += row; // Update player's position
    playerY += col; // Update player's position
    
    // checkGameOver(); // Check if the game is over after each move
    checkDirections(playerX, playerY); // Check available directions
    loadRoomImages(gameBoardImgs[playerX][playerY]); // Load the room images
    drawGameboard(); // Redraw the gameboard after each move
    drawcompass(); // Redraw the compass after each move
}
/**
 * Checks the available directions based on the player's position.
 * * Disables the buttons for directions that are out of bounds.
 * @param {number} x - The player's current row position.
 * @param {number} y - The player's current column position.
 * */
function checkDirections(x, y) {
    // console.log("Checking directions"); // Debugging    
    var north = document.getElementById("north");
    var south = document.getElementById("south");
    var west = document.getElementById("west");
    var east = document.getElementById("east");
    
    // Remove disabled class and enable all directions first
    north.disabled = false;
    north.classList.remove("disabled");
    south.disabled = false;
    south.classList.remove("disabled");
    west.disabled = false;
    west.classList.remove("disabled");
    east.disabled = false;
    east.classList.remove("disabled");
    
    // Logic to disable directions
    if (x <= 0) {
        north.disabled = true; // Disable north
        north.classList.add("disabled");
    }
    if (x >= gameRows - 1) {
        south.disabled = true; // Disable south
        south.classList.add("disabled");
    }
    if (y <= 0) {
        west.disabled = true; // Disable west
        west.classList.add("disabled");
    }
    if (y >= gameCols - 1) {
        east.disabled = true; // Disable east
        east.classList.add("disabled");
    }
}
/**
 * Loads the images for the current room based on the player's position.
 * * @param {Array} arr - The array containing the images for the current room.
 * */
function loadRoomImages(arr) {
    var background = document.getElementById("game-Background");
    var element1 = document.getElementById("element1");
    var element2 = document.getElementById("element2");
    var element3 = document.getElementById("element3");
    var chest = document.getElementById("chest");
    var zombie = document.getElementById("zombie");
    
    background.style.backgroundImage = `url('${arr[0]}')`;
    element1.style.backgroundImage = `url('${arr[1]}')`;
    element2.style.backgroundImage = `url('${arr[2]}')`;
    element3.style.backgroundImage = `url('${arr[3]}')`;
    chest.style.backgroundImage = `url('${arr[4]}')`;
    zombie.style.backgroundImage = `url('${arr[5]}')`;
    
}
/**
 * Draws the gameboard based on the current player's position.
 * * Each cell is represented by a table cell (td) element.
 * * The player's position is marked with a class "player" and an "X".
 * * Empty cells are marked with a class "empty" and an "O".
 * */
function drawGameboard() {
    // console.log("Drawing gameboard"); // Debugging
    
    var gameboard = document.getElementById("gameboard");
    gameboard.innerHTML = ""; // Clear the previous gameboard
    
    for (var i = 0; i < gameBoardImgs.length; i++) {
        var row = document.createElement("tr");
        row.className = "row";
        
        for (var j = 0; j < gameBoardImgs[i].length; j++) {
            var cell = document.createElement("td");
            cell.className = "cell";
            
            if (i === playerX && j === playerY) {
                cell.classList.add("player");
                cell.innerText = "X"; // Display player
            } else {
                cell.classList.add("empty"); // Add class for empty cell
                cell.innerText = "O"; // Display empty cell
            }
            row.appendChild(cell); // Add the cell to the row
        }
        
        gameboard.appendChild(row); // Add the row to the gameboard
    }
}
/**
 * Draws the compass dot based on the player's position and the target (zombie or treasure).
 * * The compass dot is positioned relative to the target's position.
 * * The compass dot is represented by a div element with the id "compass-dot".
 * * */
function drawcompass() {
    // console.log(playerX, playerY); // Debugging
    // console.log(targetX, targetY); // Debugging
    var targetX, targetY;
    if(CompassTarget == "zombie"){
        targetX = zombieX; // Target zombieX
        targetY = zombieY; // Target zombieY
    }
    else if(CompassTarget == "treasure"){
        targetX = TresureX; // Target TresureX
        targetY = TresureY; // Target TresureY
    }
    var compassDot = document.getElementById("compass-dot");

    // Reset compass position
    compassDot.style.left = "0";
    compassDot.style.top = "0";

    if(playerX == targetX && playerY == targetY){ // Player is on the target
        compassDot.style.left = "50%";
        compassDot.style.top = "50%";
        return;
    }
    if (playerX < targetX){
        compassDot.style.top = "75%"; // left
    }else if (playerX > targetX){
        compassDot.style.top = "25%"; // right
    }else{
        compassDot.style.top = "50%"; // middle
    }
    if (playerY < targetY){
        compassDot.style.left = "75%"; // top
    }else if (playerY > targetY){
        compassDot.style.left = "25%"; // bottom
    }else{
        compassDot.style.left = "50%"; // middle
    }
    
}
/** 
 * * Enters fullscreen mode for the specified element.
 * * @param {Element} element - The element to enter fullscreen mode.
 * */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
    }
}