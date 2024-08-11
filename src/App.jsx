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
  return (
    <div className="App">
      <MainNavBar />
     <GoalsArea />
    </div>
  );
}

export default App;
