const callEnd = require('./callEnd')

function clearSelection(option, playerPoints, opponentPoints, deck, isClosed,) {
  const player = deck.length > 1 && !isClosed ? [...player, deck[0]] : player;
  const opponent = deck.length > 1 && !isClosed ? [...opponent, deck[1]] : opponent;

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
  if (!option && opponent.length > 0) {
    this.opponentTurn();
  }
}

module.exports = clearSelection