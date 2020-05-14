import express from 'express';
import path from 'path';
import socketio from 'socket.io';
import socketHandler from './socketHandler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../../client/dist')));

app.get('/api', (req, res) => {
  res.send('Hello from the server!');
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}!`); // eslint-disable-line no-console
});
const io = socketio(server, { path: '/api/events' });

io.on('connection', socketHandler(io));
