import './App.css';
import Game from './components/Game/Game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from './components/Test/Test';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
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
        <Routes>
          <Route path='/' element={<Game />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
