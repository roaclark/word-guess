//@flow
import type { Server, Socket } from 'socket.io';

import {
  addUserToRoom,
  removeUserFromRoom,
  getUsersInRoom,
  getUserRoom,
} from './rooms';

const socketToUsers: { [string]: ?string } = {};

const joinRoom = ({ username, room }, socket, server) => {
  console.log(`user ${username} joined ${room}`);
  addUserToRoom(username, room);
  socket.join(room, () => {
    server.sockets
      .to(room)
      .emit('user joined', { username, users: getUsersInRoom(room) });
  });
  socketToUsers[socket.id] = username;
};

const leaveRoom = (socket, server) => {
  const username = socketToUsers[socket.id];
  if (username) {
    const room = getUserRoom(username);
    if (room) {
      console.log(`user ${username} left ${room}`);
      removeUserFromRoom(username, room);
      server.sockets
        .to(room)
        .emit('user left', { username, users: getUsersInRoom(room) });
    }
  }
  delete socketToUsers[socket.id];
};

const setup = (server: Server) => (socket: Socket) => {
  socket.on('join room', (e) => joinRoom(e, socket, server));
  socket.on('leave room', () => leaveRoom(socket, server));
  console.log('a user connected');
  socket.on('disconnect', () => {
    leaveRoom(socket, server);
    console.log('a user disconnected');
  });
};

export default setup;
