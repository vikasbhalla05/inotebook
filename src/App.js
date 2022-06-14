import './App.css';
import About from './components/About';
import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Contexts/Notes/NoteState';
import Alert from './components/Alert';

function App() {

  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Nav />
        <Alert message="This is alert"/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
      
    </>
  );
}

export default App;
