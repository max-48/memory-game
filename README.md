# Simple Card Memory Game

This browser-based card matching game (also called Concentration) is a practice project for Udacity's Front-End Web Developer course.

## Installation
Clone the project repo from github:

`$ git clone https://github.com/max-48/memory-game.git`

Open the index.html file in your browser to play the game.

## Usage

Once the page loads, the game is ready to be played. The game clock will automatically start on the first click, and increments every second. The game moves will also start with first click, and increments every second click (two card flips = one move). The star rating displayed left of "Moves" starts at three stars. After 12 moves, it changes to two stars, and after 20 moves to one star.

### How to Play

1. Click on any of the 16 black cards in the middle of the screen to reveal a symbol.
2. Click a second card to reveal another symbol.
3. If the two symbols match, the cards will animate (grow in size and background turns blue) and continue displaying. If the two symbols do not match, the cards will animate (shake to each side and background turns red), continue displaying for one second (in order to memorize their location!), then flip back over to hide the symbols.
4. At any point in the game, the restart button (clockwise arrow above and right of game deck) can be clicked to reset the cards, moves, and game clock.
4. Repeat this process, clicking cards two by two, until all symbols have been matched (remain displayed).
5. A modal window will appear, saying "Congratulations, you won!". The modal will also show the number of moves, the game clock, and the star rating. Clicking the link at the bottom of the modal restarts the game, and clicking the X in upper right corner or anywhere outside modal box exits the modal window.

## Dependencies
* Coda font from [Google Fonts](https://fonts.google.com/)
* Icons (symbols) for cards from [Font Aweseome](https://fontawesome.com/)

## Resources
* Starter code from [Udacity's memory-game github repo](https://github.com/udacity/fend-project-memory-game)
* Function to randomly shuffle the deck of cards is copied from: http://stackoverflow.com/a/2450976
* Background image obtained from [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/)
* Keyframes animation from [W3Schools tutorial](https://www.w3schools.com/css/css3_animations.asp)
* Modal box adapted from [W3Schools](https://www.w3schools.com/howto/howto_css_modals.asp)

## Authors

Max

## License

None Currently

## Contributing

This project is purely for practice purposes; therefore, contributions are not accepted at this time.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
