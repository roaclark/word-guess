//@flow
import React from 'react';

import Button from './Button';
import styles from './styles.css';

type Props = {
  word: ?string,
  guesser: ?string,
  username: string,
  getNewWord: () => void,
};

const WordContent = ({ word, guesser, username, getNewWord }: Props) => {
  if (!word) {
    return <Button onClick={getNewWord}>Start the game</Button>;
  }

  if (guesser == username) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ padding: '10px' }}>Try to guess the word!</div>
        <div style={{ alignSelf: 'stretch', margin: '20px' }}>
          <div className={styles.hello}>???</div>
        </div>
        <Button onClick={getNewWord}>Generate new word</Button>
      </div>
    );
  }

  return (
    <div>
      <div>{guesser} is trying to guess</div>
      <div className={styles.hello}>{word}</div>
    </div>
  );
};

export default WordContent;
