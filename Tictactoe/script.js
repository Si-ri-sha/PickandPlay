const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");

const strike = document.createElement("div");
strike.classList.add("strike");
board.appendChild(strike);

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(event) {
    const index = event.target.dataset.index;

    if (!gameActive || gameState[index] !== "") return;

    gameState[index] = "X"; 
    event.target.innerText = "X";

    const winningCombo = checkWinner();
    if (winningCombo) {
        status.innerText = "You win! 🎉";
        gameActive = false;
        drawStrike(winningCombo);
        return;
    }

    if (!gameState.includes("")) {
        status.innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    status.innerText = "System is thinking...";
    
    setTimeout(systemMove, 500);
}

function systemMove() {
    if (!gameActive) return;

    const emptyCells = gameState
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = "O";
    cells[randomIndex].innerText = "O";

    const winningCombo = checkWinner();
    if (winningCombo) {
        status.innerText = "System wins! 🤖";
        gameActive = false;
        drawStrike(winningCombo);
        return;
    }

    if (!gameState.includes("")) {
        status.innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    status.innerText = "Your turn!";
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return combination; 
        }
    }
    return null;
}

function drawStrike(combination) {
    const [a, b, c] = combination;
    const firstCell = cells[a];
    const lastCell = cells[c];

    const boardRect = board.getBoundingClientRect();
    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();

    const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
    const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;
    const x2 = lastRect.left + lastRect.width / 2 - boardRect.left;
    const y2 = lastRect.top + lastRect.height / 2 - boardRect.top;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    strike.style.width = `${length}px`;
    strike.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
    strike.style.display = "block";
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    status.innerText = "Your turn!";
    cells.forEach(cell => cell.innerText = "");
    strike.style.display = "none";
}

cells.forEach((cell, index) => {
    cell.dataset.index = index; 
    cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetGame);
status.innerText = "Your turn!";
