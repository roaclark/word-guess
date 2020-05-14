// @flow
import React, { useState } from 'react';
import { render } from 'react-dom';

import styles from './styles.css';
import RoomForm from './RoomForm';
import useSocket from './socket';

const App = () => {
  const [room, setRoom] = useState();
  const [username, setUsername] = useState();
  const [socket] = useSocket();

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
