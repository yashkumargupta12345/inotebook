import './App.css';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Navbar from './components/Navbar'; // Add this line to import Navbar
import Home from './components/Home'; // Add this line to import Home
import About from './components/About'; // Add this line to import About
import NoteState from './context/notes/NoteState'; // Add this line to import NoteState


function App() {
  return (
      <>
      <NoteState>
      <Router>
        <Navbar />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
      </>
  );
}

export default App;
