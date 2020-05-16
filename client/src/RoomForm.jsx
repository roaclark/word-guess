// @flow
import React, { useState } from 'react';

import Button from './Button';
import Input from './Input';

type Props = {
  onSubmit: ({ username: string, room: string }) => void,
};

const RoomForm = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState();
  const [room, setRoom] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !room) {
      return alert('Bad input');
    }
    onSubmit({ username, room });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Input
          id="username"
          onChange={(e) => setUsername(e.target.value.trim())}
          required
          placeholder="Username"
          style={{
            width: '300px',
            padding: '12px 20px',
            margin: '8px 0',
          }}
        />
        <Input
          id="room"
          onChange={(e) => setRoom(e.target.value.trim())}
          placeholder="Room"
          style={{
            width: '300px',
            padding: '12px 20px',
            margin: '8px 0',
          }}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default RoomForm;
