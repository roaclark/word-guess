// @flow
import React, { useState } from 'react';

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
      <input
        id="username"
        onChange={(e) => setUsername(e.target.value.trim())}
        required
        placeholder="Username"
      />
      <br />
      <input
        id="room"
        onChange={(e) => setRoom(e.target.value.trim())}
        placeholder="Room"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoomForm;
