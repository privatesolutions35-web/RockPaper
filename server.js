const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

function generateDeck() {
  const types = ['rock', 'scissors', 'paper'];
  const deck = [];
  for (let i = 0; i < 9; i++) {
    deck.push(types[Math.floor(Math.random() * 3)]);
  }
  deck.push('joker');
  return deck;
}

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('createRoom', (roomCode) => {
    rooms.set(roomCode, {
      host: socket.id,
      guest: null,
      gameStarted: false
    });
    socket.join(roomCode);
    socket.emit('roomCreated', { roomCode });
    console.log('Room created:', roomCode);
  });

  socket.on('joinRoom', (roomCode) => {
    const room = rooms.get(roomCode);
    if (room && !room.guest && !room.gameStarted) {
      room.guest = socket.id;
      room.gameStarted = true;
      socket.join(roomCode);
      
      // Generate decks for both players
      const playerHand = generateDeck();
      const enemyHand = generateDeck();
      
      // Send game start to both players
      io.to(room.host).emit('playerJoined', { playerNumber: 1 });
      io.to(room.guest).emit('playerJoined', { playerNumber: 2 });
      
      // Start game for both
      io.to(room.host).emit('gameAction', {
        type: 'gameStart',
        playerHand: playerHand,
        enemyHand: enemyHand,
        currentTurn: 1
      });
      io.to(room.guest).emit('gameAction', {
        type: 'gameStart',
        playerHand: enemyHand,
        enemyHand: playerHand,
        currentTurn: 1
      });
      
      console.log('Game started in room:', roomCode);
    } else {
      socket.emit('roomError', { message: 'Room not found, full, or game already started' });
    }
  });

  socket.on('gameAction', (data) => {
    const roomCode = Array.from(socket.rooms).find(r => r !== socket.id);
    if (roomCode) {
      socket.to(roomCode).emit('gameAction', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    
    for (const [code, room] of rooms.entries()) {
      if (room.host === socket.id || room.guest === socket.id) {
        io.to(code).emit('playerDisconnected');
        rooms.delete(code);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});