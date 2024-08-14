const generateShuffledDeck = require('./generateShuffledDeck');

const handleGenerateDeck = (game, room) => {
  const shuffledDeck = generateShuffledDeck();
  game.opponent = shuffledDeck.slice(0, 6);
  game.player = shuffledDeck.slice(6, 12);
  game.trump = game.cardMapping[shuffledDeck[12]];
  game.deck = [...shuffledDeck.slice(13), shuffledDeck[12]];
  game.opponentHands = 0;
  game.indexOfTrump = shuffledDeck[12];
  game.playerHands = 0;
  game.isPlaying = true;
  game.isClosed = false;
  game.room = room;
}

module.exports = handleGenerateDeck;