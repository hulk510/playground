import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors()); // Enable CORS for all routes

app.get('/api/image', (req, res) => {
  // out.pngを返す
  res.sendFile(__dirname + '/out.png');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages
  socket.on('message', (message) => {
    console.log('Received message:', message);

    io.emit('message', message);
  });

  socket.on('image', (image) => {
    console.log('Received image:', image);

    // Broadcast the image to all connected clients
    io.emit('image', image);

    // imageを保存する
    const fs = require('fs');
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    fs.writeFile('src/out.png', base64Data, 'base64', function (err: any) {
      if (err) {
        console.log(err);
      }
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
