//@flow
import { useState, useEffect } from 'react';
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
  retryConnection: () => void,
};

const useSocket = (): GameStatus => {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState();
  const [username, setUsername] = useState();
  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState();
  const [guesser, setGuesser] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    setSocket(io({ path: '/api/events' }));
  }, []);
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('connect', () => {
      console.log('connected');
      setConnected(true);

      // Join room if already set, usually the case for reconnects
      if (room && username) {
        socket.emit('join room', { room, username });
      }
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

    // Handle connection state that may have changed before listeners were registered
    setConnected(socket.connected);

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
      if (!socket) {
        return;
      }
      socket.emit('join room', { room, username });
      setRoom(room);
      setUsername(username);
    },
    leaveRoom: () => {
      if (!socket) {
        return;
      }
      socket.emit('leave room');
      setRoom(null);
      setUsername(null);
      setPlayers([]);
      setWord(null);
      setGuesser(null);
    },
    getNewWord: (category) => {
      if (!socket) {
        return;
      }
      socket.emit('new round', { category });
    },
    retryConnection: () => {
      if (socket) {
        socket.open();
      }
    },
  };
};

export default useSocket;
