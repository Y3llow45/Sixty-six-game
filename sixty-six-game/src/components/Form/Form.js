import styles from './Form.module.css';
const Form = (handleUsernameBlur, setUsername, setPassword, username, password) => {
  return (
    <fragment>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameBlur ? handleUsernameBlur : null}
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
    </fragment>
  )
}

export default Form;