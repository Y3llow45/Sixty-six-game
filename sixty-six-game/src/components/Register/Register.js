import styles from './Register.module.css';
import { useState } from 'react';
import { checkUsername, register } from '../../services/services'
import { displaySuccess, displayError, displayInfo } from '../Notify/Notify'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Form from '../Form/Form';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleUsernameBlur = async () => {
    const exists = await checkUsername(username);
    if (exists) {
      displayInfo('Username already exists');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      displayInfo(`Passwords don't match`)
      return;
    }
    try {
      const response = await register(username, password);
      const data = await response.json();
      if (data.success) {
        displaySuccess('Registration successful');
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        history.push('/lessons/0')
      } else {
        displayError('Registration failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Form handleSubmit={handleSubmit}
          handleUsernameBlur={handleUsernameBlur}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password} />
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.registerButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;