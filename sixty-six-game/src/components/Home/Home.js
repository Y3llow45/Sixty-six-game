import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './Home.module.css';
import { displaySuccess, displayError } from '../../components/Notify/Notify';

const socket = io('http://localhost:5243');

function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [readyToStart, setReadyToStart] = useState(false);

  useEffect(() => {
    socket.on('readyToStart', () => {
      setReadyToStart(true);
    });

    socket.on('gameStarted', () => {
      console.log('Game has started!');
    });

    return () => {
      socket.off('readyToStart');
      socket.off('gameStarted');
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('joinRoom', { username, room }, (response) => {
        if (response.status === 'ok') {
          setJoinedRoom(true);
          displaySuccess(`${username} joined room: ${room}`);
        } else {
          displayError('Failed to join room')
        }
      });
    }
  };

  const createRoom = () => {
    if (username && room) {
      socket.emit('createRoom', { username, room }, (response) => {
        if (response.status === 'ok') {
          displaySuccess(`${username} created room: ${room}`);
          setIsAdmin(response.isAdmin);
        } else {
          displayError(`Failed to create room: ${response.message}`);
        }
      });
    }
  };

  const leaveRoom = () => {
    if (username && room) {
      socket.emit('leaveRoom', { username, room }, (response) => {
        if (response.status === 'ok') {
          setRoom('')
          displaySuccess(`${username} left room: ${room}`)
        } else {
          displayError(`Failed to leave room: ${response.message}`)
        }
      });
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
      {room === '' ?
        <div>
          <button onClick={createRoom}>Create Room</button>
          <button onClick={joinRoom}>Join Room</button>
        </div> :
        <div>
          <button onClick={leaveRoom}>Leave Room</button>
        </div>}


    </div>
  );
}

export default Home;
