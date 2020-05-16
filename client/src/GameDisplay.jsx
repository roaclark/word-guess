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
      <WordContent
        word={word}
        guesser={guesser}
        username={username}
        getNewWord={getNewWord}
        style={{ flex: '1 1 200px' }}
      />
      <PlayerList
        room={room}
        players={players}
        username={username}
        style={{ flex: '1 1 200px' }}
      />
    </div>
  );
};

export default GameDisplay;
