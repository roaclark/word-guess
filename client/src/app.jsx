// @flow
import React, { useRef, useEffect, useState } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

import styles from './styles.css';
import RoomForm from './RoomForm';

const App = () => {
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

  if (room && username) {
    return (
      <div>
        <div className={styles.hello}>{`${username} in room ${room}`}</div>
      </div>
    );
  }

  return (
    <RoomForm
      onSubmit={({ room, username }) => {
        socket.emit('join room', { room, username });
        setRoom(room);
        setUsername(username);
      }}
    />
  );
};

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
