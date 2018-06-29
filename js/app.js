//list of cards
const cardList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

//function run when page is opened to set up game
function startGame() {
  //pass cardList to shuffle function and return list of shuffled cards
  const cardsShuffled = shuffle(cardList);
  //select list items with card class from deck
  const classItems = document.body.querySelectorAll('.card');
  //iterate through list of shuffled cards and set each card as innerhtml of each card class element
  let index = 0;
  for (let card of cardsShuffled) {
    classItems[index].className = 'card';
    classItems[index].innerHTML = '<i class="fa ' + card + '"></i>';
    index++;
  }
  //add event listener to the card deck
  const cardDeck = document.body.querySelector('.deck');
  cardDeck.addEventListener('click', cardClicked);

  //add 3 stars to score panel
  const starPanel = document.body.querySelector('.stars');
  starPanel.innerHTML = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
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

startGame();

// listener function for card deck being clicked. Checks to make sure an actual
// card was the click target and that the click timeout for card comparison isn't running
function cardClicked(event) {
  if (event.target.nodeName === 'LI' && waiting === false){
    //starts game timer if it is the first card click of the game
    if (firstClick === true){
      startTimer();
    }
    //checks to see if target card has already been "matched", therefore saving "matched"
    //cards from being reclassified
    if (event.target.className.includes('match') === false) {
      //display the clicked card
      displayCard(event);
      //begin card comparison process
      addToList(event);
    }
  }
}

//changes class of clicked card to make it "open" and display symbol
function displayCard(event) {
  event.target.className = 'card open show';
}

//variable to see if setTimout is in process on the card comparison to prevent more cards being opened
let waiting = false;

//array variable for cards that have been "opened"
let openList = [];

//Add click target to open card list. Checks to see if two cards have been added to open card list. If two cards,
//make sure they are not the same target card (remove a card on list if same target),
//invoke card comparison function, and add a move to the move counter
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

//Compares the two cards on the openList to see if they have same class name.
//If identical, keep them open, if not, prevent other cards from being clicked (waiting=true)
//and set timer to close cards after brief period
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

//card match counter. Indicates game is won when reaching "8"
let wonGameCount = 0;

//change class of "open" cards when matched, add one to match counter,
//invoke function to see if all matches have been made, remove open cards from list
function keepCardsOpen() {
  openList[0].className = 'card match show';
  openList[1].className = 'card match show';
  wonGameCount++;
  didIWin();
  openList.splice(0, 2);
}

//change class of "open" cards to "close" when not matched, remove from openList,
//and change waiting to false to allow new cards to be clicked
function closeCards() {
  let this1 = openList[0];
  let this2 = openList[1];
  this1.className = 'card';
  this2.className = 'card';
  openList.splice(0, 2);
  waiting = false;
}

//move counter variable
let moves = 0;

//adds 1 to move counter every time 2 cards have been clicked, and removes
//stars from score panel after certain # of moves
function moveCounter() {
  moves++;
  document.body.querySelector('.moves').textContent = moves;
  //testing code to be deleted
  // if (moves === 1) {
  //   modal.style.display = "block";
  //   document.body.querySelector('.modal-moves').textContent = moves;
  //   document.body.querySelector('.modal-time').textContent = gameTimer;
  //   const currentStars = document.body.querySelector('.stars').innerHTML;
  //   document.body.querySelector('.modal-stars').innerHTML = currentStars;
  // }
  if (moves === 13) {
    const stars = document.body.querySelector('.stars').children[0];
    stars.remove();
  }
  else if (moves === 21) {
    const stars = document.body.querySelector('.stars').children[0];
    stars.remove();
  }
}

//game timer variable
let gameTimer = 0;

//function invoked by interval to add a second to game timer
function addToTimer() {
  gameTimer++;
  document.body.querySelector('.timer').textContent = gameTimer;
}

//variable to indicate if any cards have been clicked in current game
let firstClick = true;
//declare timer variable
let myTimer = null;

//invoked upon first card click to set timer interval
function startTimer() {
  myTimer = setInterval(addToTimer, 1000);
  firstClick = false;
}

//declaring modal variable
const modal = document.body.querySelector('.modal');

//start new game link when modal is displayed
const modalRestart = document.body.querySelector('.game-restart');
modalRestart.addEventListener('click', restartGame);

//functionality for close button in modal
const modalClose = document.body.querySelector('.modal-close');
modalClose.addEventListener('click', function() {
  modal.style.display = "none";
});

//functionality to close modal if background window clicked
window.addEventListener = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//determines if game is won by checking to see if all cards are matched
function didIWin() {
  if (wonGameCount === 8){
    //display modal and results of game (stars, moves, timer)
    modal.style.display = "block";
    document.body.querySelector('.modal-moves').textContent = moves;
    document.body.querySelector('.modal-time').textContent = gameTimer;
    const currentStars = document.body.querySelector('.stars').innerHTML;
    document.body.querySelector('.modal-stars').innerHTML = currentStars;
    //stop game timer
    clearInterval(myTimer);
  }
}

//add event listener to restart game button
const restart = document.body.querySelector('.restart');
restart.addEventListener('click', restartGame);

//when restart game icon is clicked (or link in modal), all variable are reset, timer restarted,
//and start game function invoked
function restartGame() {
  openList = [];
  waiting = false;
  firstClick = true;
  wonGameCount = 0;
  gameTimer = -1;
  addToTimer();
  clearInterval(myTimer);
  moves = -1;
  moveCounter();
  modal.style.display = "none";
  startGame();

}


/*
 * - page conforms to different screen size (mobile)
 * - write README file detailing the game and all dependencies
 * - comments explain all longer code procedures
 * - (optional) css animations when cards are clicked, unsuccesfully mathced, and successfully matched
 * -increase performance by creating li as new elements, setting their class, then updating innerhtml of the deck. Also make as function so it can be called for reset game
 * -change style of site
 * - change icons?
 * -additional features?
 */
