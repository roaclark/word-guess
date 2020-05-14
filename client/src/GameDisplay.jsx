//@flow
import React from 'react';

import PlayerList from './PlayerList';
import styles from './styles.css';

type Props = {
  room: string,
  username: string,
  players: string[],
  word: ?string,
  guesser: ?string,
  getNewWord: () => void,
};

const WordContent = ({
  word,
  guesser,
  username,
  getNewWord,
}: {
  word: ?string,
  guesser: ?string,
  username: string,
  getNewWord: () => void,
}) => {
  if (!word) {
    return (
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            getNewWord();
          }}
        >
          Start the game
        </button>
      </div>
    );
  }

  if (guesser == username) {
    return (
      <div>
        <div>Try to guess the word!</div>
        <div className={styles.hello}>???</div>
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

  return (
    <div>
      <div>{guesser} is trying to guess</div>
      <div className={styles.hello}>{word}</div>
    </div>
  );
};

const GameDisplay = (props: Props) => {
  const { room, username, players, guesser, word, getNewWord } = props;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '50%' }}>
        <WordContent
          word={word}
          guesser={guesser}
          username={username}
          getNewWord={getNewWord}
        />
      </div>
      <div style={{ flex: '50%' }}>
        <PlayerList room={room} players={players} username={username} />
      </div>
    </div>
  );
};

export default GameDisplay;
