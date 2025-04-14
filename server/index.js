// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite app URL
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('create_room', (roomName) => {
    const roomId = generateRoomId();
    rooms.set(roomId, {
      name: roomName,
      players: [socket.id],
      gameState: 'waiting'
    });
    socket.join(roomId);
    io.emit('rooms_update', Array.from(rooms.entries()));
  });
  
  // Add other game event handlers
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // Handle player disconnection from rooms
  });
});

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8);
}

server.listen(3001, () => {
  console.log('listening on *:3001');
});