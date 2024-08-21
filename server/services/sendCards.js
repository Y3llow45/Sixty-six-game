function sendCards(game) {
  const roomData = io.sockets.adapter.rooms.get(game.room);
  if (roomData) {
    const socketsInRoom = Array.from(roomData);
    const playerSocket = socketsInRoom[0];
    const opponentSocket = socketsInRoom[1];
    io.to(playerSocket).emit('cards', { player: game.player, opponent: game.opponent.length });
    io.to(opponentSocket).emit('cards', { player: game.opponent, opponent: game.player.length });
    io.to(playerSocket).emit('hands', game.playerHands);
    io.to(opponentSocket).emit('hands', game.opponentHands);
    if (game.isPlayerFirst) {
      io.to(playerSocket).emit('playerCardsClickable', true);
      io.to(opponentSocket).emit('playerCardsClickable', false);
    } else {
      io.to(opponentSocket).emit('playerCardsClickable', true);
      io.to(playerSocket).emit('playerCardsClickable', false);
    }
  }
}

module.exports = sendCards;