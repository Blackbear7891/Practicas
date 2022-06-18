const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let result;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.textContent = userChoice;
    generateComputerChoice();
    getResult()
}));

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    computerChoiceDisplay.textContent = possibleChoices[randomNumber].textContent;
}

function getResult() {
    const computer = computerChoiceDisplay.textContent;
    const user = userChoiceDisplay.textContent
    if (user === computer) {
        result = 'its a draw';
    } else if (user === 'rock' && computer === 'scissors') {
        result = 'you win!';
    } else if (user === 'rock' && computer === 'paper') {
        result = 'you lose!';
    } else if (user === 'scissors' && computer === 'rock') {
        result = 'you lose!';
    } else if (user === 'scissors' && computer === 'paper') {
        result = 'you win!';
    } else if (user === 'paper' && computer === 'scissors') {
        result = 'you lose!';
    } else if (user === 'paper' && computer === 'rock') {
        result = 'you win!';
    }
    resultDisplay.textContent = result;
}