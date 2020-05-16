// @flow
import React from 'react';
import { render } from 'react-dom';

import RoomForm from './RoomForm';
import GameDisplay from './GameDisplay';
import useSocket from './socket';

const App = () => {
  const {
    room,
    username,
    players,
    guesser,
    word,
    joinRoom,
    getNewWord,
  } = useSocket();

  const content =
    room && username ? (
      <GameDisplay
        room={room}
        username={username}
        players={players}
        word={word}
        guesser={guesser}
        getNewWord={getNewWord}
      />
    ) : (
      <RoomForm onSubmit={joinRoom} />
    );

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '10%',
        fontFamily: 'system-ui',
      }}
    >
      {content}
    </div>
  );
};

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
