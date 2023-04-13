import './App.css';
import {
  BrowserRouter as 
  Route,
  
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Router, Routes } from 'react-router';


function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert message='NoteKitab OP'/>
        <div className="container">
          <Routes>
            <Route  path='/' element={<Home/>}></Route>
            <Route  path='/about' element={<About/>}></Route>
            <Route  path='/login' element={<Login/>}></Route>
            <Route  path='/signup' element={<SignUp/>}></Route>
          </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
