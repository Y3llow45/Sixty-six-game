const { cardMapping } = require('./data');

function stealTrump(game, playerType, card, socket, isAdmin) {
  const index = playerType.indexOf(card);
  const newPlayer = [...playerType];
  newPlayer.splice(index, 1);
  newPlayer.push(game.indexOfTrump);
  const newTrump = cardMapping[card];

  if (isAdmin) {
    game.player = newPlayer;
    io.to(socket).emit('cards', { player: game.player, opponent: game.opponent.length });
  } else {
    game.opponent = newPlayer;
    io.to(socket).emit('cards', { player: game.opponent, opponent: game.player.length });
  }
  game.trump = newTrump;
  io.to(game.room).emit('setTrump', { trump: game.trump })
}

module.exports = stealTrump;