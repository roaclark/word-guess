//@flow
import type { Server, Socket } from 'socket.io';

import {
  addUserToRoom,
  removeUserFromRoom,
  getUsersInRoom,
  getUserRoom,
} from './rooms';

const socketToUsers: { [string]: ?string } = {};

const getDetailsForSocket = (
  socket: Socket,
): { username: ?string, room: ?string } => {
  const username = socketToUsers[socket.id];
  if (!username) {
    return { username: null, room: null };
  }
  const room = getUserRoom(username);
  return { username, room };
};

const joinRoom = (
  { username, room }: { username: string, room: string },
  socket: Socket,
  server: Server,
): void => {
  console.log(`user ${username} joined ${room}`);
  addUserToRoom(username, room);
  socket.join(room, () => {
    server.sockets
      .to(room)
      .emit('user joined', { username, users: getUsersInRoom(room) });
  });
  socketToUsers[socket.id] = username;
};

const leaveRoom = (socket: Socket, server: Server): void => {
  const { username, room } = getDetailsForSocket(socket);
  if (username && room) {
    console.log(`user ${username} left ${room}`);
    removeUserFromRoom(username, room);
    server.sockets
      .to(room)
      .emit('user left', { username, users: getUsersInRoom(room) });
  }
  delete socketToUsers[socket.id];
};

const selectRandom = (lis) => {
  if (lis.length < 1) {
    return null;
  }
  const index = Math.floor(Math.random() * lis.length);
  return lis[index];
};

const selectNewWord = (socket: Socket, server: Server): void => {
  const { room } = getDetailsForSocket(socket);
  if (room) {
    const nextUser = selectRandom(getUsersInRoom(room));
    if (nextUser) {
      server.sockets.to(room).emit('word', { guesser: nextUser, word: 'foo' });
    }
  }
};

const setup = (server: Server) => (socket: Socket) => {
  socket.on('join room', (e) => joinRoom(e, socket, server));
  socket.on('leave room', () => leaveRoom(socket, server));
  socket.on('new word', () => selectNewWord(socket, server));
  console.log('a user connected');
  socket.on('disconnect', () => {
    leaveRoom(socket, server);
    console.log('a user disconnected');
  });
};

export default setup;
