import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';  // Import the home icon
import './App.css';
import HomeScreen from './pages/HomeScreen';
import MovieDetailView from './pages/MovieDetailView';

function App() {
  return (
    <Router style={{display:'flex', flexDirection:'column'}}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>
            {/* Link to Home with an icon */}
            <Link to="/">
              <FaHome style={{ marginRight: '8px' }} /> Home
            </Link>
          </li>
        </ul>
      </nav>

      {/* Wrap routes inside a content container to apply padding */}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />        {/* Home Route */}
          <Route path="/:movieID" element={<MovieDetailView />} /> {/* Dynamic Movie Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
