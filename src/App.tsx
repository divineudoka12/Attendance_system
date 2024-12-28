import Auth from './pages/Auth';
import CheckInOut from './pages/CheckInOut';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/checkinout" element={<CheckInOut/>}/>
      </Routes>
    </Router>
  );
}

export default App;
