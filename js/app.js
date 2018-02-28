//list of cards
const cardList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

//add event listener to restart game button
const restart = document.body.querySelector('.restart');
restart.addEventListener('click', restartGame);

startGame();

//function run when page is opened to set up game
function startGame() {
  //list of shuffled cards
  const cardsShuffled = shuffle(cardList);
  //select list items with card class
  const classItems = document.body.querySelectorAll('.card');
  //iterate through shuffled cards and set to innerhtml of each card class element
  let index = 0;
  for (let card of cardsShuffled) {
    classItems[index].className = 'card';
    classItems[index].innerHTML = '<i class="fa ' + card + '"></i>';
    index++;
  }
  //add event listener to the card deck
  const cardDeck = document.body.querySelector('.deck');
  cardDeck.addEventListener('click', cardClicked);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function cardClicked(event) {
  if (event.target.nodeName === 'LI' && waiting === false){
    displayCard(event);
    addToList(event);
  }
}

function displayCard(event) {
  event.target.className = 'card open show';
}

let openList = [];

//variable to see if setTimout is in process on the card compariso to prevent more cards being opened
let waiting = false;

function addToList(event) {
  openList.push(event.target);
  if (openList.length === 2) {
    if (openList[0] !== openList[1]) {
      cardCompare();
      moveCounter();
    }
    else {
      openList.splice(0, 1);
    }
  }
}

function cardCompare() {
  let card1 = openList[0].firstChild.className;
  let card2 = openList[1].firstChild.className;
  if (card1 === card2) {
    keepCardsOpen();
  } else {
    waiting = true;
    setTimeout(closeCards, 1200);
  }
}

let wonGameCount = 0;

function keepCardsOpen() {
  openList[0].className = 'card match show';
  openList[1].className = 'card match show';
  wonGameCount++;
  didIWin();
  openList.splice(0, 2);
}

function closeCards() {
  let this1 = openList[0];
  let this2 = openList[1];
  this1.className = 'card';
  this2.className = 'card';
  openList.splice(0, 2);
  waiting = false;
}


let moves = 0;

function moveCounter() {
  moves++;
  document.body.querySelector('.moves').textContent = moves;
}

function didIWin() {
  if (wonGameCount === 8)
  alert("You won the game!");
}

function restartGame() {
  openList = [];
  waiting = false;
  wonGameCount = 0;
  moves = -1;
  moveCounter();
  startGame();

}

/*
 * done- set up the event listener for a card. If a card is clicked:
 * done- display the card's symbol (put this functionality in another function that you call from this one)
 * done- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * done- if the list already has another card, check to see if the two cards match
 * done- if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * done- if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * done- increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * make better- flashier message with option to restart right away if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 * -increase performance by creating li as new elements, setting their class, then updating innerhtml of the deck. Also make as function so it can be called for reset game
 * -change style of site
 * - change icons?
 * -additional features?
 */
