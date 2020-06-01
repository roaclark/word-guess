//@flow
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

type GameStatus = {
  connected: boolean,
  room: ?string,
  username: ?string,
  players: string[],
  word: ?string,
  guesser: ?string,
  category: ?string,
  joinRoom: ({ room: string, username: string }) => void,
  leaveRoom: () => void,
  getNewWord: (?string) => void,
};

const useSocket = (): GameStatus => {
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState();
  const [username, setUsername] = useState();
  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState();
  const [guesser, setGuesser] = useState();
  const [category, setCategory] = useState();

  const { current: socket } = useRef(io({ path: '/api/events' }));
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      setConnected(true);
    });
    socket.on('disconnect', (reason) => {
      console.log(`disconnected: ${reason}`);
      setConnected(false);
    });
    socket.on('connect_failed', () => {
      console.log('failed to connect');
    });
    socket.on('reconnect_failed', () => {
      console.log('failed to reconnect');
    });

    socket.on('user joined', ({ users }) => setPlayers(users));
    socket.on('user left', ({ users }) => setPlayers(users));
    socket.on('round', ({ guesser, word, category }) => {
      setWord(word);
      setGuesser(guesser);
      setCategory(category);
    });

    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);

  return {
    connected,
    room,
    username,
    players,
    word,
    guesser,
    category,
    joinRoom: ({ room, username }) => {
      socket.emit('join room', { room, username });
      setRoom(room);
      setUsername(username);
    },
    leaveRoom: () => {
      socket.emit('leave room');
      setRoom(null);
      setUsername(null);
      setPlayers([]);
      setWord(null);
      setGuesser(null);
    },
    getNewWord: (category) => socket.emit('new round', { category }),
  };
};

export default useSocket;
