import styles from './Register.module.css';
import { useState } from 'react';
import { checkUsername, register } from '../../services/services'
import { displaySuccess, displayError, displayInfo } from '../Notify/Notify'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      } else {
        displayError('Registration failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleUsernameBlur}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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