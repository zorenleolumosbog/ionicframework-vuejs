const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
});

var users = [];
io.on('connection', (socket) => {
  socket.on('online', (userId, callback) => {
    console.log(`user connected: ${userId}`);

    users.push({
      socketId: socket.id,
      userId: userId
    });

    io.emit('online', users);
    callback(users);
  });

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('typing', (state) => {
    io.to(state.recipientId).emit('typing', state.senderId)
  });

  socket.on('message', (state) => {
    if(state.recipientId) {
      console.log(`${state.senderId} message to ${state.recipientId}: ${state.message}`);
      
      io.to(state.senderId).emit('message', state)
      io.to(state.recipientId).emit('message', state)
    } else {
      console.log(`message: ${state.message}`);
      
      io.emit('message', state.message);
    }
  });

  socket.on('messageSeen', (messages, messageId) => {
    messages.find(message => message.id == messageId).seen = true;
    io.emit('messageSeen', messages, messageId);
  });

  socket.on('disconnect', () => {
    // Find the index of the object you want to delete
    let index = users.findIndex(obj => obj.socketId === socket.id);
    // Use splice to remove the object from the array
    if (index !== -1) {
      console.log(`user disconnected: ${users[index].userId}`);
      users.splice(index, 1);
      io.emit('join', users);
    }
  });
})

server.listen(3000, () => {
  console.log('Server running on port 3000');
});