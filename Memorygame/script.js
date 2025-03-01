// script.js

// DOM Elements
const gameGrid = document.querySelector('.game-grid');
const restartButton = document.getElementById('restart');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

// Game Variables
const symbols = ['<div>', '</div>', '{', '}', '()', '[]', '<>', '</>']; // Symbols to match
let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];
let timer = 0;
let score = 0;
let timerInterval;

// Shuffle the symbols and duplicate them to create pairs
function shuffleCards() {
  const cards = [...symbols, ...symbols]; // Duplicate array for pairs
  return cards.sort(() => Math.random() - 0.5);
}

// Generate the game grid
function generateGrid() {
  shuffledCards = shuffleCards();
  gameGrid.innerHTML = ''; // Clear existing grid
  shuffledCards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerHTML = `<span>${symbol}</span>`; // Hidden initially
    card.addEventListener('click', () => flipCard(card));
    gameGrid.appendChild(card);
  });
}

// Handle card flipping
function flipCard(card) {
  if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.innerHTML = `<span>${card.dataset.symbol}</span>`;
  flippedCards.push(card);

  if (flippedCards.length === 2) checkMatch();
}

// Check for a match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedCards.push(card1, card2);
    score += 10; // Increment score for correct match
    scoreElement.textContent = score;

    if (matchedCards.length === shuffledCards.length) endGame(); // Check for win
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.innerHTML = '';
      card2.innerHTML = '';
    }, 1000); // Flip back after a delay
  }

  flippedCards = []; // Reset flipped cards
}

// Start the timer
function startTimer() {
  timer = 0;
  timerElement.textContent = timer;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = timer;
  }, 1000);
}

// End the game
function endGame() {
  clearInterval(timerInterval);
  alert(`Congratulations! You completed the game in ${timer} seconds with a score of ${score}.`);
}

// Restart the game
function restartGame() {
  matchedCards = [];
  flippedCards = [];
  score = 0;
  scoreElement.textContent = score;
  generateGrid();
  startTimer();
}

// Initialize the game
restartButton.addEventListener('click', restartGame);
window.addEventListener('load', () => {
  generateGrid();
  startTimer();
});
