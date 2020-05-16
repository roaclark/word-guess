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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ padding: '10px' }}>Try to guess the word!</div>
        <div
          style={{ alignSelf: 'stretch', margin: '20px' }}
          className={styles.hello}
        >
          ???
        </div>
        <button
          style={{
            margin: '10px 10px 50px 10px',
            borderRadius: '10px',
            padding: '10px 10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
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
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        <div style={{ flex: '1 1 200px', padding: '0 20px' }}>
          <WordContent
            word={word}
            guesser={guesser}
            username={username}
            getNewWord={getNewWord}
          />
        </div>
        <div
          style={{
            flex: '1 1 200px',
            border: 'lightgray 1px solid',
            padding: '10px',
            borderRadius: '5px',
            background: '#FCFEFF',
            color: 'gray',
            maxWidth: '300px',
          }}
        >
          <PlayerList room={room} players={players} username={username} />
        </div>
      </div>
    </div>
  );
};

export default GameDisplay;
