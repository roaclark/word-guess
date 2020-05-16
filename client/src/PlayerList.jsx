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
      <div
        style={{
          borderBottom: '1px lightgray solid',
          padding: '5px 10px 10px 10px',
        }}
      >
        Room — {room}
      </div>
      <ul
        style={{
          listStyleType: 'none',
          padding: '0 10px',
        }}
      >
        {players.map((player) => (
          <li key={player} style={{ paddingBottom: '3px' }}>
            {player}
            {username === player && ' (you)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
