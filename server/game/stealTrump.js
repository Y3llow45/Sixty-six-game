import { cardMapping } from "./data";

function stealTrump(game, playerType, card, isAdmin, socket) {
  const index = playerType.indexOf(card);
  const newPlayer = [...playerType];
  newPlayer.splice(index, 1);
  newPlayer.push(game.indexOfTrump);
  const newTrump = cardMapping[card];

  game.player = newPlayer;
  game.trump = newTrump;

  io.to(socket).emit('cards', { player: game.player, opponent: game.opponent.length });
}

module.exports = stealTrump;