import './App.css';
import {
  BrowserRouter, 
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <>
        <NoteState>
      <BrowserRouter>
          <Navbar />
          <Alert message='NoteKitab OP' />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
            </Routes>
          </div>
      </BrowserRouter>
        </NoteState>
    </>
  );
}

export default App;
