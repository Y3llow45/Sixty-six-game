const { mirrage, suits } = require('./game/data');

function handleCardClick() {
  if (!game[`${playerType}CardsClickable`]) return;

  game[`${playerType}Selection`] = cardIndex;
  game[`${playerType}CardsClickable`] = false;

  if (game[`${playerType}Hands`] > 0 && shouldCheckMirage(game, playerType)) {
    const handsWon = calculateHands(game, playerType, cardIndex);
    game[`${playerType}Hands`] += handsWon;
    io.to(socket).emit('hands', { hands: handsWon });
  }
}

function shouldCheckMirage(game, playerType) {
  return (playerType === 'player' && game.isPlayerFirst) ||
    (playerType === 'opponent' && !game.isPlayerFirst);
}

function calculateHands(game, playerType) {
  for (const suit of suits) {
    if (game[playerType].includes(mirrage[suit][0]) && game[playerType].includes(mirrage[suit][1])) {
      return game.trump.suit === suit ? 40 : 20;
    }
  }
  return 0;
}

module.exports = handleCardClick;