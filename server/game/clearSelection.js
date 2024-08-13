const callEnd = require('./callEnd')

function clearSelection(option, playerPoints, opponentPoints, game) {
  const player = game.deck.length > 1 && !game.isClosed ? [...player, game.deck[0]] : player;
  const opponent = game.deck.length > 1 && !game.isClosed ? [...opponent, game.deck[1]] : opponent;

  game.opponentSelection = '';
  game.playerSelection = '';
  game.isPlayerFirst = option;
  game.playerHands = playerHands + playerPoints;
  game.opponentHands = opponentHands + opponentPoints;
  game.player = player;
  game.opponent = opponent;
  game.deck = deck.slice(2);
  game.playerCardsClickable = true;

  if (player.length == 0 && opponent.length == 0) {
    callEnd()
  }
  console.log(`Points: ${playerHands} vs ${opponentHands} and deck: ${deck}`)
}

module.exports = clearSelection