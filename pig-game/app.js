/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// Hide dice
document.querySelector('.dice').style.display = 'none';

// Set default scoreboard
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
  // Generate a random dye roll
  var dice = Math.floor(Math.random() * 6) + 1;

  // Show dice result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // Update the round score IF the rolled number was NOT a 1
  if (dice != 1) {
    roundScore += dice;

    // Output the current round score value
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Reset round score and display
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    // Toggle active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  }

});