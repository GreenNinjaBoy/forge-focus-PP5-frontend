import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './pages/contexts/CurrentUserContext.jsx';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>
  </Router>,
  </React.StrictMode>
);
