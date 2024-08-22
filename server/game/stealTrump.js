const { cardMapping } = require('./data');

function stealTrump(game, playerType, card, socket) {
  const index = playerType.indexOf(card);
  const newPlayer = [...playerType];
  newPlayer.splice(index, 1);
  newPlayer.push(game.indexOfTrump);
  const newTrump = cardMapping[card];

  game.player = newPlayer;
  game.trump = newTrump;

  io.to(socket).emit('cards', { player: game.player, opponent: game.opponent.length });
  io.to(game.room).emit('setTrump', { trump: games[room].trump, indexOfTrump: games[room].indexOfTrump })
}

module.exports = stealTrump;