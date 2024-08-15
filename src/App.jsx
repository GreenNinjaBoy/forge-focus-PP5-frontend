import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './api/axiosDefaults';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/auth/Signup';
import SignIn from './pages/auth/Signin';
import { useCurrentUser } from './pages/contexts/CurrentUserContext';
import './App.css';
import MainNavBar from './components/NavBar';

function App() {
  const currentUser = useCurrentUser();
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [tokensChecked, setTokensChecked] = useState(false);

  useEffect(() => {
    const checkTokens = () => {
      const refreshTokenTimeStamp = localStorage.getItem('refreshTokenTimeStamp');
      if (refreshTokenTimeStamp) {
        setAuthenticatedUser(true);
      } else {
        setAuthenticatedUser(false);
      }
      setTokensChecked(true);
    };
    checkTokens();
  }, [currentUser]);

  if (!tokensChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainNavBar />
      <Routes>
        <Route
          path="/"
          element={authenticatedUser ? <Home /> : <Navigate to="/about" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;