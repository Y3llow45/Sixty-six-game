require('dotenv').config();
const express = require('express')
const app = express()
const SPORT = parseInt(process.env.SPORT, 10)
const Game = require('./game/game');
const handleGenerateDeck = require('./game/handleGenDeck');
const { cardMapping, specialNine, mirrage, mirrageCards, suits } = require('./game/data');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
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

  socket.on('start', (room) => {
    var game = new Game();
    handleGenerateDeck(game);
    games[room] = game;
    io.to(room).emit('start');
    io.to(room).emit('init', { trump: games[room].trump, indexOfTrump: games[room].indexOfTrump })
    const roomData = io.sockets.adapter.rooms.get(room);
    if (roomData) {
      const socketsInRoom = Array.from(roomData);
      const playerSocket = socketsInRoom[0];
      const opponentSocket = socketsInRoom[1];
      io.to(playerSocket).emit('cards', { player: games[room].player, opponent: games[room].opponent.length });
      io.to(opponentSocket).emit('cards', { player: games[room].opponent, opponent: games[room].player.length });
    }
  });

  socket.on('click', ({ cardIndex, room, isAdmin }) => {
    const roomData = io.sockets.adapter.rooms.get(room);
    var game = games[room];
    if (roomData) {
      const socketsInRoom = Array.from(roomData);
      if (isAdmin) {
        if (!game.playerCardsClickable) return;
        const player = socketsInRoom[0]; //playerSocket
        game.playerSelection = cardIndex;
        game.playerCardsClickable = false;
        if (game.playerHands > 0 && game.isPlayerFirst && mirrageCards.includes(cardIndex)) {
          for (const suit of suits) {
            if (game.player.includes(mirrage[suit][0]) && game.player.includes(mirrage[suit][1])) {
              if (game.trump.suit === suit) {
                game.playerHands = game.playerHands + 40;
                io.to(player).emit('hands', { hands: 40 });
              } else {
                game.playerHands = game.playerHands + 20;
                io.to(player).emit('hands', { hands: 20 });
              }
              break;
            }
          }
        }
      } else {
        if (!game.opponentCardsClickanle) return;
        const opponent = socketsInRoom[1]; //opponentSocket
        game.opponentSelection = cardIndex;
        game.opponentCardsClickable = false;
        if (game.opponentHands > 0 && !game.isPlayerFirst && mirrageCards.includes(cardIndex)) {
          for (const suit of suits) {
            if (game.opponent.includes(mirrage[suit][0]) && game.opponent.includes(mirrage[suit][1])) {
              if (game.trump.suit === suit) {
                game.opponentHands = game.opponentHands + 40;
                io.to(opponent).emit('hands', { hands: 40 });
              } else {
                game.opponentHands = game.opponentHands + 20;
                io.to(opponent).emit('hands', { hands: 20 });
              }
              break;
            }
          }
        }
      }
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