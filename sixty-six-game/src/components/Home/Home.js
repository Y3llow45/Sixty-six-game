import { useState } from 'react';
import io from 'socket.io-client';
import styles from './Home.module.css';

const socket = io('http://localhost:5243');

function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username && room) {
      socket.emit('joinRoom', { username, room });
    }
  };

  const createRoom = () => {
    if (username && room) {
      socket.emit('createRoom', { username, room });
      console.log(`${username} created room: ${room}`);
    }
  };

  const leaveRoom = () => {
    if (username && room) {
      socket.emit('leaveRoom', { username, room });
    }
  };

  return (
    <div className={styles.container}>
      <br /><br /><br /><br />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room"
      />
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
}

export default Home;
