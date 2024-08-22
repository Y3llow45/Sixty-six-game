require('dotenv').config();
const express = require('express')
const app = express()
const SPORT = parseInt(process.env.SPORT, 10)
const Game = require('./game/game');
const handleGenerateDeck = require('./game/handleGenDeck');
const handleCardClick = require('./game/handleCardClick');
const compareCards = require('./game/compareCards');
const sendCards = require('./services/sendCards');
const stealTrump = require('./game/stealTrump');

const server = require('http').createServer(app);
global.io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const rooms = {};
const games = {};

//admin = player = socketsInRoom[0]
//notAdmin = opponent = socketsInRoom[1]

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

  socket.on('start', (room, isAdmin) => {
    var game = new Game();
    handleGenerateDeck(game, room);
    games[room] = game;
    io.to(room).emit('start');
    io.to(room).emit('init', { trump: games[room].trump, indexOfTrump: games[room].indexOfTrump })
    const roomData = io.sockets.adapter.rooms.get(room);
    if (!roomData) return;
    const socketsInRoom = Array.from(roomData);
    if (isAdmin) {
      io.to(socketsInRoom[0]).emit('playerCardsClickable', true);
    }
    sendCards(games[room]);
  });

  socket.on('click', ({ cardIndex, room, isAdmin }) => {
    const roomData = io.sockets.adapter.rooms.get(room);
    var game = games[room];

    if (!roomData) return;

    const socketsInRoom = Array.from(roomData);
    const playerType = isAdmin ? 'player' : 'opponent';
    const socket = isAdmin ? socketsInRoom[0] : socketsInRoom[1];
    handleCardClick(game, playerType, cardIndex, socket);
    if (isAdmin) {
      io.to(socketsInRoom[1]).emit('opponentSelection', cardIndex);
      io.to(socketsInRoom[1]).emit('playerCardsClickable', true);
    } else {
      io.to(socketsInRoom[0]).emit('opponentSelection', cardIndex);
      io.to(socketsInRoom[0]).emit('playerCardsClickable', true);
    }
    if (game.playerSelection !== '' && game.opponentSelection !== '') {
      compareCards(game);
    }
    games[room] = game;
  });

  socket.on('stealTrump', ({ card, room, isAdmin }) => {
    const roomData = io.sockets.adapter.rooms.get(room);
    var game = games[room];

    if (!roomData) return;

    const socketsInRoom = Array.from(roomData);
    const playerType = isAdmin ? game.player : game.opponent;
    const socket = isAdmin ? socketsInRoom[0] : socketsInRoom[1];

    stealTrump(game, playerType, card, isAdmin, socket);

    if (isAdmin) {
      io.to(socketsInRoom[1]).emit('opponentSelection', cardIndex);
      io.to(socketsInRoom[1]).emit('playerCardsClickable', true);
    } else {
      io.to(socketsInRoom[0]).emit('opponentSelection', cardIndex);
      io.to(socketsInRoom[0]).emit('playerCardsClickable', true);
    }
    if (game.playerSelection !== '' && game.opponentSelection !== '') {
      compareCards(game);
    }
    games[room] = game;
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(SPORT, () => {
  console.log(`Socket.io server is listening on port: ${SPORT}`)
})

module.exports = io;