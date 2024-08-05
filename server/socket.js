require('dotenv').config();
const express = require('express')
const app = express()
const SPORT = parseInt(process.env.SPORT, 10)
const Game = require('./game/game');
const handleGenerateDeck = require('./game/handleGenDeck');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const rooms = {};
const games = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('createRoom', ({ username, room }, callback) => {
    socket.join(room);
    rooms[room] = { admin: socket.id };
    console.log(`${username} created room: ${room}`);
    callback({ status: 'ok' });
  });

  socket.on('joinRoom', ({ username, room }, callback) => {
    const roomData = io.sockets.adapter.rooms.get(room);
    if (roomData) {
      const roomSize = roomData.size;
      if (roomSize === 1) {
        socket.join(room);
        console.log(`${username} joined room: ${room}`);
        io.to(rooms[room].admin).emit('readyToStart');
        callback({ status: 'ok' });
      } else {
        console.log('server is full')
        callback({ status: 'error', message: 'Room is full' });
      }
    } else {
      callback({ status: 'error', message: 'Room is full' });
      console.log('no room data')
    }
  });

  socket.on('leaveRoom', ({ username, room }, callback) => {
    if (socket.rooms.has(room)) {
      socket.leave(room);
      console.log(`${username} left room: ${room}`);
      callback({ status: 'ok' });
    } else {
      callback({ status: 'error', message: 'Not in room' });
    }
  });

  socket.on('start', (room) => {
    var game = new Game();
    handleGenerateDeck(game);
    games[room] = game;
    io.to(room).emit('start');
    console.log(JSON.stringify(games[room].trump, null, 2))
    io.to(room).emit('trump', { trump: games[room].trump, })

    const roomData = io.sockets.adapter.rooms.get(room);
    if (roomData) {
      const socketsInRoom = Array.from(roomData);

      const playerSocket = socketsInRoom[0];
      const opponentSocket = socketsInRoom[1];

      io.to(playerSocket).emit('cards', { player: games[room].player, opponent: games[room].opponent.length });
      io.to(opponentSocket).emit('cards', { player: games[room].opponent, opponent: games[room].player.length });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(SPORT, () => {
  console.log(`Socket.io server is listening on port: ${SPORT}`)
})