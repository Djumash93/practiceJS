'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const currentZeroEl = document.getElementById('current--0'); //current score player 1
const currentOneEl = document.getElementById('current--1'); //current score player 2

const diceEl = document.querySelector('.dice');

// score0El.textContent = 0; //setting scores for both players to 0;
// score1El.textContent = 0;

diceEl.classList.add('hidden'); //hiding the dice

const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentZeroEl.textContent = 0;
  currentOneEl.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
const switchPlayer = function () {
  //switch to next player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //toggling:adding or removing if there/not there
  player1El.classList.toggle('player--active');
};

const game = buttonRoll.addEventListener('click', function () {
  //1.Generate a random dice roll
  //2. Display the dice
  //3. Check for a rolled 1. if true switch to player two
  if (playing) {
    // playing is set to true
    const diceThrow = Math.trunc(Math.random() * 6) + 1; // get  random number between 0 and 6
    diceEl.classList.remove('hidden');
    //display one of the images
    diceEl.src = `dice-${diceThrow}.png`;

    //check if 1 is rolled. if so, switch to player two.
    if (diceThrow !== 1) {
      currentScore += diceThrow;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
buttonHold.addEventListener('click', function () {
  if (playing) {
    //1 add current score of active player
    scores[activePlayer] += currentScore;
    //scores[1] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2 check if score is at least 100
    //3 if so, finish game.
    //4, if not switch to other player
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`) //don't forget the dot
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
buttonNew.addEventListener('click', init);
