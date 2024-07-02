// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * The root of the React application.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
