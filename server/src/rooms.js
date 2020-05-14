//@flow
const rooms: { [string]: ?{ [string]: boolean } } = {};
const userToRoom: { [string]: ?string } = {};

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
