function callEnd(game) {
  game.isPlaying = false;
  game.deck = [];
  game.opponent = [];
  game.player = [];
  game.trump = '';
  game.opponentSelection = '';
  game.playerSelection = '';
  game.playerCardsClickable = true;
  game.isClosed = false;
  if (game.playerHands >= 66) {
    let points;
    if (game.opponentHands == 0) {
      console.log('3 points for player')
      points = 3;
    } else if (game.opponentHands < 33) {
      console.log('2 points for player')
      points = 2;
    } else {
      console.log('1 points for player')
      points = 1;
    }
    game.isPlayerFirst = true;
    game.score = [game.score[0] + points, game.score[1]];
  } else {
    let points;
    if (game.playerHands == 0) {
      console.log('3 points for opponent')
      points = 3;
    } else if (game.opponentHands < 33) {
      console.log('2 points for opponent')
      points = 2;
    } else {
      console.log('1 points for opponent')
      points = 1;
    }
    game.isPlayerFirst = false;
    game.score = [game.score[0], game.score[1] + points]
  }
  game.opponentHands = 0;
  game.playerHands = 0;
}

module.exports = callEnd;