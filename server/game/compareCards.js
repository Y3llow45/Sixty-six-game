const clearSelection = require('./clearSelection')
const { cardMapping } = require('./data');

function compareCards(game) {
  let opponent = cardMapping[game.opponentSelection];
  let player = cardMapping[game.playerSelection];

  if (player.suit === opponent.suit) {
    if (player.points > opponent.points) {
      setTimeout(() => {
        clearSelection(true, player.points + opponent.points, 0, game);
      }, 500)
    } else {
      setTimeout(() => {
        clearSelection(false, 0, player.points + opponent.points, game);
      }, 500)
    }
  } else if (player.suit === game.trump.suit) {
    setTimeout(() => {
      clearSelection(true, player.points + opponent.points, 0, game);
    }, 500)
  } else if (opponent.suit === game.trump.suit) {
    setTimeout(() => {
      clearSelection(false, 0, player.points + opponent.points, game);
    }, 500)
  } else {
    if (game.isPlayerFirst) {
      setTimeout(() => {
        clearSelection(true, player.points + opponent.points, 0, game);
      }, 500)
    } else {
      setTimeout(() => {
        clearSelection(false, 0, player.points + opponent.points, game);
      }, 500)
    }
  }
}

module.exports = compareCards;