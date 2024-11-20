// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import './App.css';
// import { UserProvider } from './ContextApi/UserContext'; // Import UserProvider
// import MainLayout from '../src/pages/MainLayout'; // Import the new MainLayout component

// function App() {
//   return (
//     <UserProvider> {/* Provide user context to the entire app */}
//       <Router>
//         <MainLayout /> {/* Render MainLayout which contains Navbar and Routes */}
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import MovieDetailView from './pages/MovieDetailView';
import FavScreen from './pages/FavScreen';
import WatchedMoviesScreen from './pages/WatchedMoviesScreen';
import { UserProvider } from './ContextApi/UserContext';
import NavbarView from './components/NavbarView';

function App() {
  // const { user, setUser } = useUser();
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  

  return (
    <UserProvider> {/* Wrap the app in UserProvider */}
      <Router>
        {/* Navigation Bar */}
        <NavbarView />
        {/* <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <ul style={{ display: 'flex', listStyleType: 'none' }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <FaHome style={{ marginRight: '8px' }} /> Home
              </Link>
            </li>
          </ul>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{user.name}</span>
              <FaCog style={{ cursor: 'pointer' }} onClick={() => setShowModal(!showModal)} />
              
              {showModal && (
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  right: '10px',
                  width: '200px',
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                }}>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <button 
                    onClick={handleLogout} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ff4d4d',
                      color: 'white',
                      border: 'none',
                      padding: '8px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%',
                      marginTop: '10px'
                    }}
                  >
                    <FaSignOutAlt style={{ marginRight: '5px' }} /> Exit Session
                  </button>
                </div>
              )}
            </div>
          )}
        </nav> */}

        {/* Content */}
        <div className="content" style={{overflowX:'hidden'}}>
          <Routes>
            <Route path="/" element={<HomeScreen />} /> {/* Home Route */}
            
            <Route path="/:movieID" element={<MovieDetailView />} /> {/* Dynamic Movie Route */}
            <Route path="/watched/:movieID" element={<MovieDetailView />} /> {/* Dynamic Watched Movie Route */}
            <Route path="/favourites" element={<FavScreen />} /> {/* Fav Movie Route */}
            <Route path="/watched-movies" element={<WatchedMoviesScreen />} /> {/* Watched Movie Route */}
            
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
