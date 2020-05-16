//@flow
import React from 'react';

type Props = {
  room: string,
  username: string,
  players: string[],
  style?: any,
};

const PlayerList = ({ room, players, username, style }: Props) => {
  return (
    <div
      style={{
        ...style,
        border: 'lightgray 1px solid',
        padding: '10px',
        borderRadius: '5px',
        background: '#FCFEFF',
        color: 'gray',
        maxWidth: '300px',
      }}
    >
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
