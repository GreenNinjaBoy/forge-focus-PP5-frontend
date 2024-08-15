// import { useEffect, useState } from 'react';
// import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './api/axiosDefaults';
// import Home from './pages/Home';
// import About from './pages/About';
// import SignUp from './pages/auth/Signup';
// import SignIn from './pages/auth/Signin';
// import { useCurrentUser } from './pages/contexts/CurrentUserContext';
import './App.css';
// import GoalsArea from './pages/goals/GoalsArea';
import MainNavBar from './components/NavBar';
import GoalsCreate from './pages/goals/GoalsCreate';

function App() {
  // const currentUser = useCurrentUser();
  // const [authenticatedUser, setAuthenticatedUser] = useState(false);
  // const [tokensChecked, setTokensChecked] = useState(false);

  // useEffect(() => {
  // //   const checkTokens = () => {
  // //     const refreshTokenTimeStamp = localStorage.getItem('refreshTokenTimeStamp');
  // //     if (refreshTokenTimeStamp) {
  // //       setAuthenticatedUser(true);
  // //     } else {
  // //       setAuthenticatedUser(false);
  // //     }
  // //     setTokensChecked(true);
  // //   };
  // //   checkTokens();
  // // }, [currentUser]);

  return (
    <div>
      <MainNavBar />
      <GoalsCreate />
    </div>
  );
}

export default App;