let randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  let userGuess = document.getElementById("userGuess").value;
  let message = document.getElementById("message");

  if (userGuess < randomNumber) {
    message.textContent = "Too low ! Try again.";
    message.style.color = "red";
  } else if (userGuess > randomNumber) {
    message.textContent = "Too high! Try again.";
    message.style.color = "red";
  }else {
    message.textContent = "Congratulations! You guessed it right!";
    message.style.color = "green";
  }
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("userGuess").value = "";
  document.getElementById("message").textContent = "";
}