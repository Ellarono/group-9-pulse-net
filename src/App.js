// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import JobListing from './components/Joblisting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/JobListing">Job Listing</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/JobListing" element={<JobListing/>}/>
            </Routes>
          
        </Router>
        
        
        
      </header>
    </div>
  );
}

export default App;
