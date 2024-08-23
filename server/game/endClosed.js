function endClosed(game) {
  game.deck = [];
  game.isPlaying = false;
  game.opponent = [];
  game.player = [];
  game.trump = '';
  game.opponentSelection = '';
  game.playerSelection = '';
  game.isClosed = false;

  if (game[`${game.playerType}Hands`] >= 66 && game.playerType == 'player') {
    game.isPlayerFirst = true;
    game.playerCardsClickable = true;
    game.opponentHandsClickable = false;
    game.score = [game.score[0] + 3, game.score[1]]; // +3 points
  } else {
    game.isPlayerFirst = false;
    game.playerCardsClickable = false;
    game.opponentHandsClickable = true;
    game.score = [game.score[0], game.score[1] + 3] // +3 points
  }
  game.opponentHands = 0;
  game.playerHands = 0;
  score[game.room] = { score: game.score, isPlayerFirst: game.isPlayerFirst };
}

module.exports = endClosed;