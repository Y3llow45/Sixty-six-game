require('dotenv').config();
const express = require('express')
const app = express()
const SPORT = parseInt(process.env.SPORT, 10)

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('createRoom', ({ username, room }, callback) => {
    socket.join(room);
    rooms[room] = { admin: socket.id };
    console.log(`${username} created room: ${room}`);
    callback({ status: 'ok' });
  });

  socket.on('joinRoom', ({ username, room }) => {
    const roomData = io.sockets.adapter.rooms.get(room);
    if (roomData) {
      const roomSize = roomData.size;
      if (roomSize === 1) {
        if (io.sockets.adapter.rooms[room]) {
          socket.join(room);
          console.log(`${username} joined room: ${room}`);
          io.to(rooms[room].admin).emit('readyToStart');
          callback({ status: 'ok' });
        } else {
          callback({ status: 'error', message: 'Room does not exist' });
        }
      } else {
        callback({ status: 'error', message: 'Room is full' });
      }
    }
  });

  socket.on('leaveRoom', ({ username, room }) => {
    if (socket.rooms.has(room)) {
      socket.leave(room);
      console.log(`${username} left room: ${room}`);
      callback({ status: 'ok' });
    } else {
      callback({ status: 'error', message: 'Not in room' });
    }
  });

  socket.on('startGame', (room) => {
    io.to(room).emit('gameStarted');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(SPORT, () => {
  console.log(`Socket.io server is listening on port: ${SPORT}`)
})