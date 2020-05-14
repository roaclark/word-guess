// @flow
import React from 'react';
import { render } from 'react-dom';

import styles from './styles.css';
import RoomForm from './RoomForm';
import useSocket from './socket';

const App = () => {
  const { room, username, users, joinRoom } = useSocket();

  if (room && username) {
    return (
      <div>
        <div className={styles.hello}>{`${username} in room ${room}`}</div>
        <div>{users.join(', ')}</div>
      </div>
    );
  }

  return <RoomForm onSubmit={joinRoom} />;
};

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
