// Login.js
import React, { useState, useEffect } from 'react';
import './Logreg.css';
import { IoGlobeOutline } from "react-icons/io5";

const Login = ({ handleLogin, handleSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      if (username.trim() === '' || password.trim() === '') {
        alert('Please enter a value in both username and password fields.');
        return;
      }
      const userData = { username, password };
      handleLogin(userData);
      // Remaining code...
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '' || email.trim() === '' || phoneNumber.trim() === '') {
      alert('Please enter values in all fields.');
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
    setSignupSuccess(true);
  };

  useEffect(() => {
    if (signupSuccess) {
      setTimeout(() => {
        setIsSigningUp(false);
        setSignupSuccess(false);
      }, 2000);
    }
  }, [signupSuccess]);

  const toggleSignup = () => {
    setIsSigningUp(!isSigningUp);
    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <div>
      <h2 className="globe-header" style={{ textAlign: 'center' }}>
  <IoGlobeOutline className="globe-icon" />Community Forum
</h2>

      <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
        <div style={{ width: '400px' }}>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={isSigningUp ? handleSignupSubmit : handleLoginSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {isSigningUp && (
                <div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">{isSigningUp ? 'Sign Up' : 'Login'}</button>
                {!isSigningUp && (
                  <button type="button" className="btn btn-link p-0" onClick={toggleSignup}>Sign Up</button>
                )}
              </div>
            </form>
            {signupSuccess && (
              <div className="alert1">Signup successful! You can now login.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
