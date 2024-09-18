import { Route, Routes, Navigate } from 'react-router-dom';
import './api/axiosDefaults';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/auth/Signup';
import SignIn from './pages/auth/Signin';
import GoalsCreate from './pages/goals/GoalsCreate';
import { useCurrentUser } from './hooks/useCurrentUser';
import './App.css';
import MainNavBar from './components/NavBar';
import GoalsArea from './pages/goals/GoalsArea';
import GoalsDelete from './pages/goals/GoalsDelete';
import ProtectedRoute from './components/ProtectedRoute';
import NotAuthorized from './pages/NotAuthorized';
import GoalsEdit from './pages/goals/GoalsEdit';
import TasksArea from './pages/tasks/TasksArea';
import TaskCreate from './pages/tasks/TaskCreate';
import TasksDelete from './pages/tasks/TasksDelete';
import Footer from './components/Footer';
import SuccessMessage from './components/SuccessMessage';
import GoalDetails from './pages/goals/GoalDetails';
import ContactForm from './pages/contact/ContactForm';

function App() {
  const currentUser = useCurrentUser();

  return (
    <div>
      <MainNavBar />
      <SuccessMessage />
      <Routes>
        <Route path="/" element={<Navigate to={currentUser ? "/home" : "/about"} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/goalsarea" element={<ProtectedRoute><GoalsArea /></ProtectedRoute>} />
        <Route path="/goaldetails/:id" element={<ProtectedRoute><GoalDetails /></ProtectedRoute>} />
        <Route path="/goalscreate" element={<ProtectedRoute><GoalsCreate /></ProtectedRoute>} />
        <Route path="/goalsedit/:id" element={<ProtectedRoute><GoalsEdit /></ProtectedRoute>} />
        <Route path="/goalsdelete/:id" element={<ProtectedRoute><GoalsDelete /></ProtectedRoute>} />
        <Route path="/tasksarea" element={<ProtectedRoute><TasksArea /></ProtectedRoute>} />
        <Route path="/taskcreate" element={<ProtectedRoute><TaskCreate /></ProtectedRoute>} />
        <Route path="/tasksDelete" element={<ProtectedRoute><TasksDelete /></ProtectedRoute>} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<Navigate to={currentUser ? "/home" : "/about"} replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;