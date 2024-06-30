// src/components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogin = async () => {
    console.log('Attempting login...');
    const { error, session } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log('Login error:', error.message);
      setError(error.message);
    } else {
      console.log('Login successful, session:', session);
      setError('');
      if (session) {
        navigate('/main'); // Redirect to main page on successful login
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;
