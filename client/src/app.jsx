// @flow
import React from 'react';
import { render } from 'react-dom';

import styles from './styles.css';
import RoomForm from './RoomForm';
import useSocket from './socket';

const getGuessStatus = (guesser, word, username) => {
  if (!guesser) {
    return 'Waiting for new word...';
  }
  if (guesser == username) {
    return 'Try to guess the word!';
  }
  return `${guesser} is trying to guess ${word}`;
};

const App = () => {
  const {
    room,
    username,
    users,
    guesser,
    word,
    joinRoom,
    getNewWord,
  } = useSocket();

  if (room && username) {
    return (
      <div>
        <div className={styles.hello}>{`${username} in room ${room}`}</div>
        <div>{users.join(', ')}</div>
        <div>{getGuessStatus(guesser, word, username)}</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            getNewWord();
          }}
        >
          Generate new word
        </button>
      </div>
    );
  }

  return <RoomForm onSubmit={joinRoom} />;
};

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
