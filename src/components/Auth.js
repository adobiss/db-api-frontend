// src/components/Auth.js
import React, { useState, useEffect } from 'react';
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

  useAuthCheck();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

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
    localStorage.setItem('email', e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;
