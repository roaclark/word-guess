//@flow
import React from 'react';

import styles from './styles.css';

type Props = {
  room: string,
  username: string,
  players: string[],
  word: ?string,
  guesser: ?string,
  getNewWord: () => void,
};

const getGuessStatus = (guesser, word, username) => {
  if (!guesser || !word) {
    return 'Waiting for new word...';
  }
  if (guesser == username) {
    return 'Try to guess the word!';
  }
  return `${guesser} is trying to guess ${word}`;
};

const GameDisplay = (props: Props) => {
  const { room, username, players, guesser, word, getNewWord } = props;

  return (
    <div>
      <div className={styles.hello}>{`${username} in room ${room}`}</div>
      <div>{players.join(', ')}</div>
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
};

export default GameDisplay;
