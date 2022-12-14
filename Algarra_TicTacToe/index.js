
//Create global variables by taking ID's from the CSS.
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

//Lists all possible winning conditions for if there is 3 of one letter in a row. 
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Variable options are the value of blank spaces in the cells. 
//Player who gets first turn is always player X, game begins with not running.
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

//Runs the game.
intializeGame();

//For each cell, or box, it can be clicked to run the cellClicked function.
//Restart button is also placed below the board, runs the restartGame function when clicked.
//Displays the starting message, game is running at this point (running = true).
function intializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame)
    statusText.textContent = `Player ${currentPlayer} may start!`;
    running = true;
}

//Function that updates a cell when it's clicked. 
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    //If the space is not blank and is already taken, the player cannot place a mark over it.
    //It will alert the player to pick another spot then return to the game. 
    if(options[cellIndex] != "" || !running){
        alert("This space is taken. Please select another!");
        return; 
    }


    //Update the cell value and check if it's a winning play.
    updateCell(this, cellIndex);
    checkWinner();
}

//When clicked, the cell value updates/displays whatever the player is (X or O).
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer; 
}

//(Had to look up how to use a ternary for this because it looks cleaner than an if else statement)
//Checks if the currentPlayer = X is true, then it changes to player O.
//But if currentPlayer = X is false, then it changes to player X.
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

//Variable roundWon starts off as false. If winConditions are met with the correctly filled cells
//then roundWon returns as true. 
function checkWinner(){
    let roundWon = false;
    
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        //If 3 of 9 cells are still blank then the game continues.
        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        //If the 3 of 9 cells are equal to the same value (X or O) then the round is won and stops.
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    //Displays the winning message if roundWon is true. Game stops running. 
    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} wins!`;
        running = false;
    }
    //If the game is a cat's eye or draw, game ends and no winner is declared. 
    else if (!options.includes("")){
        statusText.textContent = `Draw! A cat's eye game. Play again!`;
        running = false;
    }
    //Runs the changePlayer function so the next player can take their turn if game isn't done. 
    else{
        changePlayer();
    }
}

//Once restart button is pressed, the game board refreshes back to blank spaces.
//Player X will begin the game. 
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer} may start!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}