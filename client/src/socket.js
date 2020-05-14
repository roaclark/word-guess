import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [room, setRoom] = useState();
  const [username, setUsername] = useState();
  const [users, setUsers] = useState([]);

  const { current: socket } = useRef(io({ path: '/api/events' }));
  useEffect(() => {
    socket.on('user joined', ({ users }) => setUsers(users));
    socket.on('user left', ({ users }) => setUsers(users));

    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);

  return {
    room,
    username,
    users,
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
  };
};

export default useSocket;
