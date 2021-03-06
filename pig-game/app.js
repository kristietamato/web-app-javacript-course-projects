/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

3 CHALLENGES:
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, isGameActive, winningScore;

var dice1DOM = document.getElementById('dice-1');
var dice2DOM = document.getElementById('dice-2');
var p1PanelDOM = document.querySelector('.player-0-panel');
var p2PanelDOM = document.querySelector('.player-1-panel');
var currentP1DOM = document.getElementById('current-0');
var currentP2DOM = document.getElementById('current-1');

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isGameActive) {
    // Generate random dice roll
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Show dice results
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice + '.png';
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';

    // If two 6s are rolled, set the score to 0
    if (dice === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = '0';
    } else if (dice != 1 && dice2 != 1) {
      // Update the round score IF the rolled number was NOT a 1
      roundScore += dice + dice2;

      // Output the current round score value
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      togglePlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (isGameActive) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update user interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    winningScore = document.querySelector('.final-score').value;

    if(!winningScore) {
      winningScore = 100;
    }

    // Check if player won game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      dice1DOM.style.display = 'none';
      dice2DOM.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      isGameActive = false;
    } else {
      togglePlayer();
    }
  }
});

function togglePlayer() {
  // Switch to other player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Reset round score and display
  roundScore = 0;

  currentP1DOM.textContent = '0';
  currentP2DOM.textContent = '0';

  p1PanelDOM.classList.toggle('active');
  p2PanelDOM.classList.toggle('active');

  dice1DOM.style.display = 'none';
  dice2DOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  isGameActive = true;

  // Hide dice
  dice1DOM.style.display = 'none';
  dice2DOM.style.display = 'none';


  // Set default scoreboard
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  currentP1DOM.textContent = '0';
  currentP2DOM.textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  p1PanelDOM.classList.remove('winner');
  p2PanelDOM.classList.remove('winner');
  p1PanelDOM.classList.remove('active');
  p2PanelDOM.classList.remove('active');
  p1PanelDOM.classList.add('active');
}