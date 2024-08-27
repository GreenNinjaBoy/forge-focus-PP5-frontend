import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './api/axiosDefaults';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/auth/Signup';
import SignIn from './pages/auth/Signin';
import GoalsCreate from './pages/goals/GoalsCreate';
import { useCurrentUser } from './pages/contexts/CurrentUserContext';
import './App.css';
import MainNavBar from './components/NavBar';
import Goals from './pages/goals/Goals';
import GoalsArea from './pages/goals/GoalsArea';
import ProtectedRoute from './components/ProtectedRoute';
import NotAuthorized from './pages/NotAuthorized';
import GoalsEdit from './pages/goals/GoalsEdit';
console.log(GoalsEdit);

function App() {
  const currentUser = useCurrentUser();
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [tokensChecked, setTokensChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkTokens = () => {
      const refreshTokenTimeStamp = localStorage.getItem('refreshTokenTimeStamp');
      if (refreshTokenTimeStamp && currentUser) {
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
        <Route path="/" element={authenticatedUser ? <Navigate to="/home" /> : <Navigate to="/about" />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
        <Route path="/goalsarea" element={<ProtectedRoute><GoalsArea /></ProtectedRoute>} />
        <Route path="/goalscreate" element={<ProtectedRoute><GoalsCreate /></ProtectedRoute>} />
        <Route path="/goalsedit" element={<ProtectedRoute><GoalsEdit /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={authenticatedUser ? "/home" : "/about"} state={{ from: location }} />} />
      </Routes>
    </div>
  );
}

export default App;