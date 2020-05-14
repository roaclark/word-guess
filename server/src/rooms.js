//@flow
import words from './words';

const rooms: { [string]: ?{ [string]: boolean } } = {};
const userToRoom: { [string]: ?string } = {};
const roomToRound: { [string]: ?{ word: string, guesser: string } } = {};

export const addUserToRoom = (username: string, room: string): void => {
  const users = rooms[room];
  if (users) {
    users[username] = true;
  } else {
    rooms[room] = { [username]: true };
  }
  userToRoom[username] = room;
};

export const removeUserFromRoom = (username: string, room: string): void => {
  if (rooms[room]) {
    delete rooms[room][username];
  }
  delete userToRoom[username];
};

export const getUsersInRoom = (room: string): string[] => {
  const users = rooms[room];
  if (!users) {
    return [];
  }
  return Object.keys(users);
};

export const getUserRoom = (username: string): ?string => {
  return userToRoom[username];
};

const selectRandom = (lis) => {
  if (lis.length < 1) {
    return null;
  }
  const index = Math.floor(Math.random() * lis.length);
  return lis[index];
};

export const generateRound = (
  room: string,
): ?{ guesser: string, word: string } => {
  const nextUser = selectRandom(getUsersInRoom(room));
  const nextWord = selectRandom(words);
  if (!nextUser || !nextWord) {
    delete roomToRound[room];
  } else {
    roomToRound[room] = { guesser: nextUser, word: nextWord };
  }
  return getRoomRound(room);
};

export const getRoomRound = (
  room: string,
): ?{ word: string, guesser: string } => {
  return roomToRound[room];
};
