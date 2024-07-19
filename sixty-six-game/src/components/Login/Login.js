import React, { useState } from 'react';
import styles from './Login.module.css';
import { login } from '../../services/services';
import { displayError, displaySuccess } from '../Notify/Notify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Form from '../Form/Form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password)
      .then(async (res) => {
        const data = await res.json();
        if (res.status !== 200) {
          displayError('Wrong credentials')
          return
        }
        if (data.token && data.username) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          displaySuccess('Logged in')
          history.push('/lessons/0')
        } else {
          displayError("Status error")
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form handleSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password} />
        <button type="submit" className={styles.registerButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;