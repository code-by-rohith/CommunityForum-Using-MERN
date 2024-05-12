import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestList from './components/RequestList';
import RequestForm from './components/RequestForm';
import About from './components/About'; // Import the About component
import Navbar from './components/Navbar';
import LogReg from './components/LogReg';
import Sidebar from './components/Sidebar';
import Questions from './components/Questions';
import Questions1 from './components/Questions1';
 // Correct import path for Tags component
// Correct import path for Tags component


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (userData) => {
    // Simulating login logic
    console.log('Login:', userData);
    // Assuming successful login, update isLoggedIn state
    setIsLoggedIn(true);
    setUsername(userData.username); // Set the username
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div>
          <Navbar username={username} /> {/* Pass username as prop */}
          <Sidebar />
          <Routes>
            
            <Route path="/questions" element={<Questions />} />
            <Route path="/" element={<RequestList />} />
            <Route path="/request" element={<RequestForm />} /> {/* Corrected path */}
            <Route path="/tags" element={<Questions1 />} /> {/* Corrected path */}
            <Route path="/companies" element={<div>Companies</div>} /> {/* Placeholder route */}
            <Route path="/about" element={<About />} /> {/* Route for the About page */}
          </Routes>
        </div>
      ) : (
        <LogReg handleLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
