//@flow
import React from 'react';

type Props = {
  room: string,
  username: string,
  players: string[],
};

const PlayerList = ({ room, players, username }: Props) => {
  return (
    <div>
      <div>Room {room}</div>
      <ul>
        {players.map((player) => (
          <li key={player}>
            {player}
            {username === player && ' (you)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
