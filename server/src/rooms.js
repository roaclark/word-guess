//@flow
import categories from './categories';

type Round = { word: string, guesser: string, category?: string };

const rooms: { [string]: ?{ [string]: boolean } } = {};
const userToRoom: { [string]: ?string } = {};
const roomToRound: { [string]: ?Round } = {};

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

export const generateRound = (room: string, category?: string): ?Round => {
  const nextUser = selectRandom(getUsersInRoom(room));
  const wordCategory = (category && categories[category]) || categories.all;
  const wordList = wordCategory.wordList;
  const nextWord = selectRandom(wordList);
  if (!nextUser || !nextWord) {
    delete roomToRound[room];
  } else {
    roomToRound[room] = { guesser: nextUser, word: nextWord };
  }
  return getRoomRound(room);
};

export const getRoomRound = (room: string): ?Round => {
  return roomToRound[room];
};
