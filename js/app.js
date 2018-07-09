//list of symbols
const symbolList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
//double symbols to creat 16 cards
const cardList = symbolList.concat(symbolList);

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
    //reset animation if game was restarted
    classItems[index].style.animation = 'none 0s ease 0s 1 normal none running';
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
  let currentIndex = array.length, temporaryValue, randomIndex;

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

//clicked cards is animated and changes class to make it "open" and display symbol
function displayCard(event) {
  event.target.style.animation = 'moveopen 0.25s ease 0s 1 normal forwards running';
  event.target.className = 'card open show';
}

//variable to see if setTimout is in process on the card comparison to prevent more cards being opened
let waiting = false;

//array variable for cards that have been "opened"
let openList = [];

//Add click target to open card list. Checks to see if two cards have been added to open card list. If two cards,
//make sure they are not the same target card (remove a card on list if same target)
function addToList(event) {
  openList.push(event.target);
  if (openList.length === 2) {
    if (openList[0] !== openList[1]) {
      //insure clicks don't invoke functions during animation and card comparison
      waiting = true;
      moveCounter();
      //wait for card rotate animation then begin card comparison
      setTimeout(cardCompare, 250);
    }
    else {
      openList.splice(0, 1);
    }
  }
}

//Compares the two cards on the openList to see if they have same class name (icon type).
//If identical, invoke function to keep them open
function cardCompare() {
  let card1 = openList[0].firstChild.className;
  let card2 = openList[1].firstChild.className;
  if (card1 === card2) {
    keepCardsOpen();
  } else {
    //add class to turn red for incorrect match
    openList[0].classList.add('wrong');
    openList[1].classList.add('wrong');
    //wrong choice animation
    openList[0].style.animation = 'movewrong 0.5s ease 0s 1 normal none running';
    openList[1].style.animation = 'movewrong 0.5s ease 0s 1 normal none running';
    //wait 1second to view/memorize open cards before closing
    setTimeout(closeCards, 1000);
  }
}

//card match counter. Indicates game is won when reaching "8"
let wonGameCount = 0;

//change class of matched cards to continuing showing icon
function keepCardsOpen() {
  openList[0].className = 'card match show';
  openList[1].className = 'card match show';
  //correct match animation
  openList[0].style.animation = 'movecorrect 0.75s ease 0s 1 normal none running';
  openList[1].style.animation = 'movecorrect 0.75s ease 0s 1 normal none running';
  //add one to game counter
  wonGameCount++;
  //invoke function to see if all matches have been made
  didIWin();
  //remove open cards from list
  openList.splice(0, 2);
  //allow other cards to be clicked again
  waiting = false;
}

//function to reverse all open card changes
function closeCards() {
  let this1 = openList[0];
  let this2 = openList[1];
  //animate closing of cards
  this1.style.animation = 'moveclose 0.25s ease 0s 1 normal forwards running';
  this2.style.animation = 'moveclose 0.25s ease 0s 1 normal forwards running';
  //change class of "open" cards to default "card" when not matched
  this1.className = 'card';
  this2.className = 'card';
  //remove from openList
  openList.splice(0, 2);
  //change waiting to false to allow new cards to be clicked
  waiting = false;
}

//move counter variable
let moves = 0;

//adds 1 to move counter every time 2 cards have been clicked, and removes
//stars from score panel after certain # of moves
function moveCounter() {
  moves++;
  document.body.querySelector('.moves').textContent = moves;
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
