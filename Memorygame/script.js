const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const leaderboardContainer = document.getElementById('leaderboard-container');

const emojis = ['😊', '😂', '😎', '🥺', '😜', '😳', '😍', '😇'];
let timer = 0;
let flippedCards = [];
let matchedPairs = 0;
let interval;
let playerName = '';

function askPlayerName() {
    playerName = prompt('Welcome to the Memory Card Game! Please enter your name to start:');
    while (!playerName || playerName.trim() === '') {
        playerName = prompt('Name cannot be empty. Please enter your name:');
    }
    alert(`Hello, ${playerName}! Let the game begin.`);
    initializeGame();
}

function initializeGame() {
    const cards = [...emojis, ...emojis]; 
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(emoji => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.emoji = emoji; 
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
    resetTimer();
    startTimer();
    matchedPairs = 0;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;
    card.classList.add('flipped');
    card.innerHTML = `<span>${card.dataset.emoji}</span>`;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === emojis.length) endGame();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    timer = 0;
    timerDisplay.textContent = timer;
}

function endGame() {
    clearInterval(interval);
    saveScore(playerName);
    showLeaderboard();
}

function saveScore(name) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const date = new Date().toLocaleDateString();
    leaderboard.push({ name, score: timer, date });
    leaderboard.sort((a, b) => a.score - b.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardTable = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    leaderboardTable.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
            <td>${entry.date}</td>`;
        leaderboardTable.appendChild(row);
    });
    leaderboardContainer.style.display = 'block';
}

function resetLeaderboard() {
    if (confirm('Are you sure you want to reset the leaderboard?')) {
        localStorage.removeItem('leaderboard');
        showLeaderboard();
    }
}

document.getElementById('restart').addEventListener('click', askPlayerName);
document.getElementById('show-leaderboard').addEventListener('click', showLeaderboard);
document.querySelector('#leaderboard-container button').addEventListener('click', () => {
    leaderboardContainer.style.display = 'none';
});

// askPlayerName(); //
