var gameBoardImgs = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
];

var zombieX = Math.floor(Math.random() * 5);
var zombieY = Math.floor(Math.random() * 5);
var TresureX = Math.floor(Math.random() * 5);
var TresureY = Math.floor(Math.random() * 5);

var playerX = 3; // Starting position
var playerY = 3; // Starting position

var player = "X";

function startGame() {
    console.log("Game started"); // Debugging


    zombieX = Math.floor(Math.random() * 5);
    zombieY = Math.floor(Math.random() * 5);
    TresureX = Math.floor(Math.random() * 5);
    TresureY = Math.floor(Math.random() * 5);

    playerX = 4; // Starting position
    playerY = 2; // Starting position

    drawGameboard(); // Initial draw of the gameboard
    drawcompass(); // Initial draw of the compass
}

// cursor = this.input.keyboard.createCursorKeys();

function move(row, col) {
    console.log("Moving player", (row === 1 ? "down" : row == -1 ? "up" : col == 1 ? "right" : "left")); // Debugging

    // Check if the move is valid
    if (playerX + row < 0 || playerX + row >= gameBoardImgs.length || playerY + col < 0 || playerY + col >= gameBoardImgs[0].length) {
        alert("Invalid move! Out of bounds.");
        console.log("Invalid move");
        return; // Invalid move, do nothing
    }
    playerX += row; // Update player's position
    playerY += col; // Update player's position

    drawGameboard(); // Redraw the gameboard after each move
    drawcompass(); // Redraw the compass after each move
    // checkGameOver(); // Check if the game is over after each move
}

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
            } else{
                cell.classList.add("empty"); // Add class for empty cell
                cell.innerText = "O"; // Display empty cell
            }
            row.appendChild(cell); // Add the cell to the row
        }

        gameboard.appendChild(row); // Add the row to the gameboard
    }
}

function drawcompass() {

}
console.log("js file loaded");  // Debugging
startGame(); // Initialize the gameboard

