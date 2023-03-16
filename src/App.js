import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="about" element={<About />}></Route>

        </Routes>

      </Router>
    </NoteState>
    </>
  );
}

export default App;
