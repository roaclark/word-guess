//@flow
import React from 'react';

import Button from './Button';
import styles from './styles.css';

type Props = {
  word: ?string,
  guesser: ?string,
  username: string,
  getNewWord: () => void,
  style?: any,
};

const Content = ({ word, guesser, username, getNewWord }: Props) => {
  if (!word) {
    return <Button onClick={getNewWord}>Start the game</Button>;
  }

  if (guesser == username) {
    return (
      <>
        <div style={{ padding: '10px' }}>Try to guess the word!</div>
        <div style={{ alignSelf: 'stretch', margin: '20px' }}>
          <div className={styles.hello}>???</div>
        </div>
        <Button onClick={getNewWord}>Generate new word</Button>
      </>
    );
  }

  return (
    <>
      <div>{guesser} is trying to guess</div>
      <div style={{ alignSelf: 'stretch', margin: '20px' }}>
        <div className={styles.hello}>{word}</div>
      </div>
    </>
  );
};

const WordContent = (props: Props) => {
  return (
    <div
      style={{
        ...props.style,
        display: 'flex',
        padding: '0 20px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Content {...props} />
    </div>
  );
};

export default WordContent;
