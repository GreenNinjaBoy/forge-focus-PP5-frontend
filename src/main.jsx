import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext.jsx';
import { GlobalMessageProvider } from './contexts/GlobalMessageContext.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
  <CurrentUserProvider>
    <GlobalMessageProvider>
    <App />
    </GlobalMessageProvider>
  </CurrentUserProvider>
  </Router>,
);
