//@flow
import type { Server, Socket } from 'socket.io';

import {
  addUserToRoom,
  removeUserFromRoom,
  getUsersInRoom,
  getUserRoom,
  generateRound,
  getRoomRound,
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
    const round = getRoomRound(room);
    if (round) {
      server.sockets.to(socket.id).emit('round', round);
    }
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
    const round = getRoomRound(room);
    if (round && round.guesser === username) {
      selectNewWord(room, server, round.category);
    }
  }
  delete socketToUsers[socket.id];
};

const generateNewRound = (
  { category }: { category: string },
  socket: Socket,
  server: Server,
): void => {
  const { room } = getDetailsForSocket(socket);
  if (room) {
    selectNewWord(room, server, category);
  }
};

const selectNewWord = (
  room: string,
  server: Server,
  category?: string,
): void => {
  const nextWord = generateRound(room, category);
  if (nextWord) {
    server.sockets.to(room).emit('round', nextWord);
  }
};

const setup = (server: Server) => (socket: Socket) => {
  socket.on('join room', (e) => joinRoom(e, socket, server));
  socket.on('leave room', () => leaveRoom(socket, server));
  socket.on('new round', (e) => generateNewRound(e, socket, server));
  console.log('a user connected');
  socket.on('disconnect', () => {
    leaveRoom(socket, server);
    console.log('a user disconnected');
  });
};

export default setup;
