class Game {
  constructor(data) {
    this.deck = [];           // cards in the deck (draw 1 every turn)
    this.score = data.score;
    this.opponent = [];       // opponent's cards
    this.player = [];         // player's cards
    this.trump = '';
    this.opponentHands = 0;  // points won by opponent
    this.playerHands = 0;    // points won by player
    this.opponentSelection = '';
    this.playerSelection = '';
    this.isPlayerFirst = data.isPlayerFirst;  // card placing order
    this.playerCardsClickable = true;  // disable player's card when one card is selected utill cards get compared and put away
    this.opponentCardsClickable = false;
    this.indexOfTrump = 0;
    this.isPlaying = false;
    this.playerTypeWhoClosed; // player who closed the deck
    this.playerTypeWhoCalled; // player who called 66
    this.room;
  }
}

module.exports = Game;