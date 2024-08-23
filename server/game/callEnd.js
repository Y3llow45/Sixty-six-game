function callEnd(game) {
  game.isPlaying = false;
  game.deck = [];
  game.opponent = [];
  game.player = [];
  game.trump = '';
  game.opponentSelection = '';
  game.playerSelection = '';
  game.isClosed = false;
  if (game.playerHands >= 66) {
    let points;
    if (game.opponentHands == 0) {
      points = 3;
    } else if (game.opponentHands < 33) {
      points = 2;
    } else {
      points = 1;
    }
    game.isPlayerFirst = true;
    game.playerCardsClickable = true;
    game.opponentHandsClickable = false;
    game.score = [game.score[0] + points, game.score[1]];
  } else {
    let points;
    if (game.playerHands == 0) {
      points = 3;
    } else if (game.opponentHands < 33) {
      points = 2;
    } else {
      points = 1;
    }
    game.isPlayerFirst = false;
    game.playerCardsClickable = false;
    game.opponentHandsClickable = true;
    game.score = [game.score[0], game.score[1] + points]
  }
  game.opponentHands = 0;
  game.playerHands = 0;
  score[game.room] = { score: game.score, isPlayerFirst: game.isPlayerFirst };
}

module.exports = callEnd;