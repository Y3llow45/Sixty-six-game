import styles from './Home.module.css';
//import { useState } from 'react';
//import { displaySuccess, displayError } from '../Notify/Notify';
//import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';

function Home() {
  /*const [username, setUsername] = useState('');
  const history = useHistory();*/

  return (
    <div className={styles.container}>
      <h1>hello from home page</h1>
      <NavLink to='/register'>Register</NavLink>
      <NavLink to='/game'>Game</NavLink>
      <NavLink to='/test'>Test</NavLink>
      <br />

      <NavLink to='/game'>Sign Up</NavLink>
      <br />
      <NavLink to='/login'>Login</NavLink>
    </div>
  );
};

export default Home;