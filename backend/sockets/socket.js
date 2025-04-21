const { Server } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true, // Allow cookies to be sent from the frontend
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle events
    socket.on('message', (data) => {
      console.log('Received message:', data);
      io.emit('message', data); // Broadcast message to all users
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { setupSocket };
