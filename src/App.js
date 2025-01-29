import './App.css';
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Navbar from './components/Navbar'; // Add this line to import Navbar
import Home from './components/Home'; // Add this line to import Home
import About from './components/About'; // Add this line to import About
import Login from './components/Login'; // Add this line to import Login
import Signup from './components/Signup'; // Add this line to import Signup
import NoteState from './context/notes/NoteState'; // Add this line to import NoteState
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
      <>
      <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </NoteState>
      </>
  );
}

export default App;
