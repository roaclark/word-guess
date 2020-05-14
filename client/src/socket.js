import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
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
  return [socket];
};

export default useSocket;
