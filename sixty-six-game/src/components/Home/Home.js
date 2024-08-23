import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import socket from '../../services/socket';
import styles from './Home.module.css';
import { displaySuccess, displayError } from '../../components/Notify/Notify';

const Home = forwardRef(({ sendDataToParent, cleanOnLeave }, ref) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [readyToStart, setReadyToStart] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    socket.on('readyToStart', () => {
      setReadyToStart(true);
    });

    socket.on('start', () => {
      if (!isAdmin) {
        setIsPlaying(true);
        console.log('Game has started!');
      }
    });

    return () => {
      socket.off('readyToStart');
      socket.off('start');
    };
  }, []);

  const joinRoom = () => {
    try {
      if (username && room) {
        socket.emit('joinRoom', { username, room }, (response) => {
          if (response.status === 'ok') {
            setJoinedRoom(true);
            sendDataToParent(room, false);
            displaySuccess(`${username} joined room: ${room}`);
          } else {
            displayError('Failed to join room')
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createRoom = () => {
    if (username && room) {
      socket.emit('createRoom', { username, room }, (response) => {
        if (response.status === 'ok') {
          setIsAdmin(true);
          sendDataToParent(room, true);
          displaySuccess(`${username} created room: ${room}`);
          setJoinedRoom(true);
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
          cleanOnLeave();
          setRoom('')
          setJoinedRoom(false);
          setIsAdmin(false);
          setIsPlaying(false);
          displaySuccess(`${username} left room: ${room}`)
        } else {
          displayError(`Failed to leave room: ${response.message}`)
        }
      });
    }
  };

  const start = () => {
    if (isAdmin) {
      socket.emit('start', room, isAdmin);
    }
  }

  useImperativeHandle(ref, () => ({
    start,
  }));

  return (
    <div className={styles.container}>
      {isPlaying ?
        <button onClick={leaveRoom}>Leave</button> :
        <div>
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
          {joinedRoom ?
            <div>
              <button onClick={leaveRoom}>Leave Room</button>
            </div> :
            <div>
              <button onClick={createRoom}>Create Room</button>
              <button onClick={joinRoom}>Join Room</button>
            </div>}
          {isAdmin && readyToStart ?
            <div>
              <button onClick={start}>START</button>
            </div> :
            null}
        </div>}
    </div>
  );
})

export default Home;
