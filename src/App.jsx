import { useEffect, useState } from 'react';
import { Route, Routes,} from 'react-router-dom';
import './api/axiosDefaults';
import About from './pages/About';
import SignUp from './pages/auth/Signup';
import SignIn from './pages/auth/Signin';
import GoalsArea from './pages/goals/GoalsArea';
import GoalsCreate from './pages/goals/GoalsCreate';
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
          element={authenticatedUser ? <GoalsArea /> : <About />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/goalsarea" element={<GoalsArea/>} />
        <Route path="goalscreate" element={<GoalsCreate />} />

      </Routes>
    </div>
  );
}

export default App;