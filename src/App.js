import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Main from './components/Main';
import CreateRecord from './components/CreateRecord';
import supabase from './supabaseClient';

/**
 * App component manages routing and authentication state.
 */
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthenticated(!!data.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while checking authentication
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/main" /> : <Auth setAuthenticated={setAuthenticated} />} />
        <Route path="/main" element={authenticated ? <Main onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/create" element={authenticated ? <CreateRecord /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
