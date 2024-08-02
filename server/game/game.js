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
    this.cardMapping = [
      { image: '0.png', card: 'A', suit: 'h', points: 11 }, { image: '1.png', card: '10', suit: 'h', points: 10 }, { image: '2.png', card: 'K', suit: 'h', points: 4 }, { image: '3.png', card: 'Q', suit: 'h', points: 3 }, { image: '4.png', card: 'J', suit: 'h', points: 2 }, { image: '5.png', card: '9', suit: 'h', points: 0.1 },
      { image: '6.png', card: 'A', suit: 'c', points: 11 }, { image: '7.png', card: '10', suit: 'c', points: 10 }, { image: '8.png', card: 'K', suit: 'c', points: 4 }, { image: '9.png', card: 'Q', suit: 'c', points: 3 }, { image: '10.png', card: 'J', suit: 'c', points: 2 }, { image: '11.png', card: '9', suit: 'c', points: 0.1 },
      { image: '12.png', card: 'A', suit: 'd', points: 11 }, { image: '13.png', card: '10', suit: 'd', points: 10 }, { image: '14.png', card: 'K', suit: 'd', points: 4 }, { image: '15.png', card: 'Q', suit: 'd', points: 3 }, { image: '16.png', card: 'J', suit: 'd', points: 2 }, { image: '17.png', card: '9', suit: 'd', points: 0.1 },
      { image: '18.png', card: 'A', suit: 's', points: 11 }, { image: '19.png', card: '10', suit: 's', points: 10 }, { image: '20.png', card: 'K', suit: 's', points: 4 }, { image: '21.png', card: 'Q', suit: 's', points: 3 }, { image: '22.png', card: 'J', suit: 's', points: 2 }, { image: '23.png', card: '9', suit: 's', points: 0.1 }
    ];
    this.specialNine = {        // steal trump card with a 9 of the same suit
      'h': 5,
      'c': 11,
      'd': 17,
      's': 23,
    };
    this.mirrage = {            // Call 20 or 40
      'h': [2, 3],
      'c': [8, 9],
      'd': [14, 15],
      's': [20, 21],
    };
    this.mirrageCards = [2, 3, 8, 9, 14, 15, 20, 21];
    this.indexOfTrump = 0;
    this.isPlaying = false
  }
}

module.exports = Game;