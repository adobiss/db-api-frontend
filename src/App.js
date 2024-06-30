// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Main from './components/Main';
import CreateRecord from './components/CreateRecord';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/main" element={<Main />} />
        <Route path="/create" element={<CreateRecord />} />
      </Routes>
    </Router>
  );
};

export default App;
