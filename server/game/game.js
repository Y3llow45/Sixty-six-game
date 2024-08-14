class Game {
  constructor() {
    this.deck = [];           // cards in the deck (draw 1 every turn)
    this.score = [0, 0];
    this.opponent = [];       // opponent's cards
    this.player = [];         // player's cards
    this.trump = '';
    this.opponentHands = 0;  // points won by opponent
    this.playerHands = 0;    // points won by player
    this.opponentSelection = '';
    this.playerSelection = '';
    this.isPlayerFirst = true;  // card placing order
    this.playerCardsClickable = true;  // disable player's card when one card is selected utill cards get compared and put away
    this.opponentCardsClickable = false;
    this.indexOfTrump = 0;
    this.isPlaying = false
    this.room;
  }
}

module.exports = Game;