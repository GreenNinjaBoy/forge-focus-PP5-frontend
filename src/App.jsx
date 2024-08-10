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
