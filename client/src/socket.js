import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [room, setRoom] = useState();
  const [username, setUsername] = useState();

  const { current: socket } = useRef(io({ path: '/api/events' }));
  useEffect(() => {
    socket.on('user joined', ({ username, users }) =>
      console.log(`${username} joined (${users})`),
    );
    socket.on('user left', ({ username, users }) =>
      console.log(`${username} left (${users})`),
    );

    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);

  return {
    room,
    username,
    joinRoom: ({ room, username }) => {
      socket.emit('join room', { room, username });
      setRoom(room);
      setUsername(username);
    },
  };
};

export default useSocket;
