const callEnd = require('./callEnd');
const sendCards = require('../services/sendCards');

function clearSelection(option, playerPoints, opponentPoints, game) {
  console.log('clearing')
  const player = game.deck.length > 1 && !game.isClosed ? [...game.player, game.deck[0]] : game.player;
  const opponent = game.deck.length > 1 && !game.isClosed ? [...game.opponent, game.deck[1]] : game.opponent;

  game.opponentSelection = '';
  game.playerSelection = '';
  game.isPlayerFirst = option;
  game.playerHands = game.playerHands + playerPoints;
  game.opponentHands = game.opponentHands + opponentPoints;
  game.player = player;
  game.opponent = opponent;
  game.deck = game.deck.slice(2);
  game.playerCardsClickable = true;

  if (player.length == 0 && opponent.length == 0) {
    callEnd()
  }
  sendCards(game)
  console.log(`Points: ${game.playerHands} vs ${game.opponentHands} and deck: ${game.deck}`)
}

module.exports = clearSelection