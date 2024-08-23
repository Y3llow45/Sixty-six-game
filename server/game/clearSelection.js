const callEnd = require('./callEnd');
const sendCards = require('../services/sendCards');
const endClosed = require('./endClosed');

function clearSelection(option, playerPoints, opponentPoints, game) {
  let removedFromPlayer = game.player.filter(num => num !== game.playerSelection);
  let removedFromOpponent = game.opponent.filter(num => num !== game.opponentSelection);
  const player = game.deck.length > 1 && !game.isClosed ? [...removedFromPlayer, game.deck[0]] : removedFromPlayer;
  const opponent = game.deck.length > 1 && !game.isClosed ? [...removedFromOpponent, game.deck[1]] : removedFromOpponent;

  game.opponentSelection = '';
  game.playerSelection = '';
  game.isPlayerFirst = option;
  game.playerHands = game.playerHands + playerPoints;
  game.opponentHands = game.opponentHands + opponentPoints;
  game.player = player;
  game.opponent = opponent;
  game.deck = game.deck.slice(2);
  if (option) {
    game.playerCardsClickable = true;
    game.opponentCardsClickable = false;
  } else {
    game.opponentCardsClickable = true;
    game.playerCardsClickable = false;
  }

  io.to(game.room).emit('deckLength', game.deck.length);

  if (player.length == 0 && opponent.length == 0) {
    if (game.isClosed) {
      endClosed(game);
    } else {
      callEnd(game);
    }
    io.to(game.room).emit('end', game.score);
  }
  sendCards(game);
}

module.exports = clearSelection