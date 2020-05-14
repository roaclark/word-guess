import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [room, setRoom] = useState();
  const [username, setUsername] = useState();
  const [users, setUsers] = useState([]);
  const [word, setWord] = useState();
  const [guesser, setGuesser] = useState();

  const { current: socket } = useRef(io({ path: '/api/events' }));
  useEffect(() => {
    socket.on('user joined', ({ users }) => setUsers(users));
    socket.on('user left', ({ users }) => setUsers(users));
    socket.on('word', ({ guesser, word }) => {
      setWord(word);
      setGuesser(guesser);
    });

    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);

  return {
    room,
    username,
    users,
    word,
    guesser,
    joinRoom: ({ room, username }) => {
      socket.emit('join room', { room, username });
      setRoom(room);
      setUsername(username);
    },
    leaveRoom: ({ room, username }) => {
      socket.emit('leave room');
      setRoom(room);
      setUsername(username);
    },
    getNewWord: () => socket.emit('new word'),
  };
};

export default useSocket;
