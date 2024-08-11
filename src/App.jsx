import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './api/axiosDefaults';
import Home from './pages/Home';
import About from './pages/Home';
import SignIn from './pages/auth/Signin';
import SignOut from './pages/auth/SignOut';
import { useCurrentUser } from './pages/contexts/CurrentUserContext';
import './App.css';
import GoalsArea from './pages/goals/GoalsArea';
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

  
  return (
    <div className="App">
      <MainNavBar />
     <GoalsArea />
    </div>
  );
}

export default App;
