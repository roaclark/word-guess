import express from 'express';
import path from 'path';
import socketio from 'socket.io';
import socketHandler from './socketHandler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../../client/dist')));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

const io = socketio(server, { path: '/api/events' });
io.on('connection', socketHandler(io));
