// src/components/Auth.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import useAuthCheck from '../hooks/useAuthCheck';

/**
 * Auth component handles user login functionality.
 * 
 * @param {Object} props - The component props
 * @param {Function} props.setAuthenticated - Function to set authenticated state
 */
const Auth = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const passwordRef = useRef();

  useAuthCheck();

  /**
   * Handles the login process.
   */
  const handleLogin = async () => {
    console.log('Attempting login...');
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log('Login error:', error.message);
      setError(error.message);
    } else {
      console.log('Login successful, data:', data);
      setError('');
      if (data) {
        setAuthenticated(true);
        navigate('/main');
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      passwordRef.current.focus();
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        name="email" // Added name attribute for browser autofill
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        onKeyDown={handleEmailKeyDown}
        autoComplete="email" // Enable browser autofill for email
      />
      <input
        type="password"
        name="password" // Added name attribute for browser autofill
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handlePasswordKeyDown}
        autoComplete="current-password" // Enable browser autofill for password
        ref={passwordRef} // Reference to the password field
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;
