// Building a Tic Tac Toe

const gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

console.log(gameBoard);

function createPlayer(name, marker) {
  return { name, marker };
}

const player1 = createPlayer("Justice", "X");
const player2 = createPlayer("Doris", "O");
console.log({ name: player1.name, marker: player1.marker });
console.log({ name: player2.name, marker: player2.marker });

let currentPlayer = player1;

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  message.textContent = `${currentPlayer.name}'s turn`;
}

// make a move
function makeMove(positon) {
  if (gameBoard[positon] === " ") {
    gameBoard[positon] = currentPlayer.marker;
    cells[positon].textContent = currentPlayer.marker; // update UI
    console.log(currentPlayer.name + " placed " + currentPlayer.marker);

    const cell = cells[positon];
    // cell.textContent = currentPlayer.marker;
    if (currentPlayer.marker === "X") {
      cell.style.backgroundColor = "red";
    } else {
      cell.style.backgroundColor = "blue";
    }
    // check winner
    let winner = checkWinner();
    if (winner) {
      console.log(winner, "wins the game");
      message.textContent = `${winner} wins`;
      console.log(gameBoard);
      disableBoard();
      return;
    }

    console.log(gameBoard);
    if (checkDraw()) {
      console.log("it's a draw!");
      message.textContent = "It's a draw!";
      console.log(gameBoard);
      disableBoard();
      return;
    }

    switchPlayer();
  } else {
    console.log("invalid move, try again!");
    message.textContent = `${currentPlayer.name}'s turn`;
  }
}

// check winner
function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo; // get the three positions
    if (
      gameBoard[a] != " " &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      if (gameBoard[a] === player1.marker) {
        return player1.name;
      } else {
        return player2.name;
      } // return the winner 'X', or 'O'
    }
  }

  return null;
}

// check draw
function checkDraw() {
  // if no empty spaces and no winner
  if (!gameBoard.includes(" ") && !checkWinner()) {
    return true;
  }
  return false;
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// makeMove(1);

// Guide
console.log(`to play call the "makeMove()" and pass in your position`);

// UI with JS
const cells = document.querySelectorAll(".cell");
console.log(cells);
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

// Handle click on a cell

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    makeMove(index);
  });
});

// Disable Board
function disableBoard() {
  cells.forEach((cell) => (cell.style.pointerEvents = "none"));
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  gameBoard.fill(" ");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.pointerEvents = "auto";
    cell.style.backgroundColor = "##1e3c72;";
  });
  currentPlayer = player1;
  message.textContent = `${currentPlayer.name}'s turn`;
  console.log("Game reset!");
  console.log(gameBoard);
}
