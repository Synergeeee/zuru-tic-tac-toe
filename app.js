// Building a Tic Tac Toe

const gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

console.log(gameBoard);

function createPlayer(name, marker) {
  return { name, marker };
}

const justice = createPlayer("Justice", "X");
const doris = createPlayer("Doris", "O");
console.log({ name: justice.name, marker: justice.marker });
console.log({ name: doris.name, marker: doris.marker });

let currentPlayer = justice;

// Switch player
function switchPlayer() {
  if (currentPlayer == justice) {
    currentPlayer = doris;
  } else {
    currentPlayer = justice;
  }
}

// make a move
function makeMove(positon) {
  if (gameBoard[positon] === " ") {
    gameBoard[positon] = currentPlayer.marker;
    console.log(currentPlayer.name + " placed " + currentPlayer.marker);

    // check winner
    let winner = checkWinner();
    if (winner) {
      console.log(winner, "wins the game");
    }

    console.log(gameBoard);

    switchPlayer();
  } else {
    console.log("invalid move, try again!");
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
      if (gameBoard[a] === justice.marker) {
        return justice.name;
      } else {
        return doris.name;
      } // return the winner 'X', or 'O'
    }
  }

  return null;
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
makeMove(1);
