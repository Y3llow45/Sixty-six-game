

function sendCards(game) {
  console.log(game.room);
  const roomData = io.sockets.adapter.rooms.get(game.room);
  if (roomData) {
    const socketsInRoom = Array.from(roomData);
    const playerSocket = socketsInRoom[0];
    const opponentSocket = socketsInRoom[1];
    io.to(playerSocket).emit('cards', { player: game.player, opponent: game.opponent.length });
    io.to(opponentSocket).emit('cards', { player: game.opponent, opponent: game.player.length });
  }
}

module.exports = sendCards;