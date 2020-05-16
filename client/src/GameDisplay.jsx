//@flow
import React from 'react';

import PlayerList from './PlayerList';
import WordContent from './WordContent';

type Props = {
  room: string,
  username: string,
  players: string[],
  word: ?string,
  guesser: ?string,
  getNewWord: () => void,
};

const GameDisplay = (props: Props) => {
  const { room, username, players, guesser, word, getNewWord } = props;

  return (
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
  );
};

export default GameDisplay;
