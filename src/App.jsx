import { useEffect, useState } from 'react';
import { Route, Routes,} from 'react-router-dom';
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
          element={authenticatedUser ? <Home /> : <About />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="goalsarea" element={<GoalsArea />} />
        <Route path="goalscreate" element={<GoalsCreate />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="home" element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;