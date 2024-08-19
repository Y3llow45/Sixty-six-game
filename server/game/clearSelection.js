const callEnd = require('./callEnd');
const sendCards = require('../services/sendCards');

function clearSelection(option, playerPoints, opponentPoints, game) {
  console.log('clearing');
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
  game.playerCardsClickable = true;

  if (player.length == 0 && opponent.length == 0) {
    console.log('call end')
    callEnd()
  }
  sendCards(game)
  console.log(`Points: ${game.playerHands} vs ${game.opponentHands} and deck: ${game.deck}`)
}

module.exports = clearSelection