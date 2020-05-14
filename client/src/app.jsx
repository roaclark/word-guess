// @flow
import React from 'react';
import { render } from 'react-dom';

import RoomForm from './RoomForm';
import GameDisplay from './GameDisplay';
import useSocket from './socket';
import './styles.css';

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

  if (room && username) {
    return (
      <GameDisplay
        room={room}
        username={username}
        players={players}
        word={word}
        guesser={guesser}
        getNewWord={getNewWord}
      />
    );
  }

  return <RoomForm onSubmit={joinRoom} />;
};

const root = document.getElementById('app');
if (root) {
  render(<App />, root);
}
