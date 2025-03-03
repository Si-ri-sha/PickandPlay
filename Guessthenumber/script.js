let randomNumber = Math.floor(Math.random() * 100) + 1;
let hints = generateHints(randomNumber);

// Display hints when the game starts
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("hints").innerHTML = `<strong>Hints:</strong> <br> ${hints.join("<br>")}`;
});

function checkGuess() {
  let userGuess = Number(document.getElementById("userGuess").value);
  let message = document.getElementById("message");

  if (userGuess < randomNumber) {
    message.textContent = "Too low! Try again.";
    message.style.color = "red";
  } else if (userGuess > randomNumber) {
    message.textContent = "Too high! Try again.";
    message.style.color = "red";
  } else {
    message.textContent = "Congratulations! You guessed it right!";
    message.style.color = "green";
  }
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  hints = generateHints(randomNumber);

  document.getElementById("userGuess").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("hints").innerHTML = `<strong>Hints:</strong> <br> ${hints.join("<br>")}`;
}

function generateHints(number) {
  let hintList = [];

  // Hint 1: Number range
  if (number <= 50) {
    hintList.push("The number is between 1 and 50.");
  } else {
    hintList.push("The number is between 51 and 100.");
  }

  // Hint 2: Even or Odd
  hintList.push(`The number is ${number % 2 === 0 ? "even" : "odd"}.`);

  // Hint 3: Divisibility
  if (number % 5 === 0) {
    hintList.push("The number is divisible by 5.");
  } else if (number % 3 === 0) {
    hintList.push("The number is divisible by 3.");
  } else {
    hintList.push("The number is not divisible by 3 or 5.");
  }

  return hintList;
}
