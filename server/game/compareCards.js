const clearSelection = require('./clearSelection')

function compareCards(cardMapping, opponentSelection, playerSelection, trump, isPlayerFirst) {
  let opponent = cardMapping[opponentSelection];
  let player = cardMapping[playerSelection];
  if (player.suit === opponent.suit) {
    if (player.points > opponent.points) {
      console.log('player takes')
      setTimeout(() => {
        clearSelection(true, player.points + opponent.points, 0);
      }, 500)
    } else {
      console.log('opponent takes')
      setTimeout(() => {
        clearSelection(false, 0, player.points + opponent.points);
      }, 500)
    }
  } else if (player.suit === trump.suit) {
    console.log('player takes')
    setTimeout(() => {
      clearSelection(true, player.points + opponent.points, 0);
    }, 500)
  } else if (opponent.suit === trump.suit) {
    console.log('opponent takes')
    setTimeout(() => {
      clearSelection(false, 0, player.points + opponent.points);
    }, 500)
  } else {
    if (isPlayerFirst) {
      console.log('player takes')
      setTimeout(() => {
        clearSelection(true, player.points + opponent.points, 0);
      }, 500)
    } else {
      console.log('opponent takes')
      setTimeout(() => {
        clearSelection(false, 0, player.points + opponent.points);
      }, 500)
    }
  }
}

module.exports = compareCards;