import './App.css';
import Game from './components/Game/Game';
import { Switch, Route } from 'react-router-dom'
import Register from './components/Register/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from './components/Test/Test';
import Login from './components/Login/Login';


function App() {
  return (
    <div className="App">
      <ToastContainer
        className="add-toast-container"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Switch>
        <Route path='/' exact component={Game}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/test' component={Test}></Route>
        <Route path='/login' component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
