const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const result = document.getElementById('result');
const rollButton = document.getElementById('rollButton');

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}


rollButton.addEventListener('click', () => {

  const dice1Value = rollDice();
  const dice2Value = rollDice();

  dice1.src = `images/dice${dice1Value}.png`;
  dice2.src = `images/dice${dice2Value}.png`;

  result.textContent = `You rolled ${dice1Value} and ${dice2Value}. Total: ${dice1Value + dice2Value}`;
  
  if (dice1Value === dice2Value) {
    result.textContent += ' - You rolled a double!';
  }
});
