import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css';
import ToDo from "./pages/todo"
import Login from './pages/login'
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ToDo />} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
