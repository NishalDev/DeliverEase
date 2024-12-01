import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' instead of 'react-dom'
import './main.css';
import App from './App';
import './index.css';

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
