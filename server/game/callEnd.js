function callEnd(game) {
  console.log(`Points: ${game.playerHands} and ${game.opponentHands}}`)
  game.deck = [];
  game.isPlaying = false;
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
  } else if (game.opponentHands >= 66) {
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
  } else {
    if (game.playerTypeWhoCalled == 'player') {
      game.isPlayerFirst = false;
      game.playerCardsClickable = false;
      game.opponentHandsClickable = true;
      game.score = [game.score[0], game.score[1] + 2] // wins 2 points because of wrong call
    } else if (game.playerTypeWhoCalled == 'opponent') {
      game.isPlayerFirst = true;
      game.playerCardsClickable = true;
      game.opponentHandsClickable = false;
      game.score = [game.score[0] + 2, game.score[1]]; // wins 2 points because of wrong call
    }
  }
  game.opponentHands = 0;
  game.playerHands = 0;
  score[game.room] = { score: game.score, isPlayerFirst: game.isPlayerFirst };
}

module.exports = callEnd;